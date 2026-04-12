import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Download, Share2, Move, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { templates } from "@/lib/templates";
import ShareDialog from "@/components/ShareDialog";

type Language = "en" | "hi" | "gu";

const fontMap: Record<Language, string> = {
  en: "Poppins, sans-serif",
  hi: "Noto Sans Devanagari, sans-serif",
  gu: "Noto Sans Gujarati, sans-serif",
};

const nameLabelMap: Record<Language, string> = {
  en: "Name: ",
  hi: "नाम: ",
  gu: "નામ: ",
};

const transliterateMap: Record<string, Record<Language, string>> = {
  a: { en: "a", hi: "अ", gu: "અ" },
  b: { en: "b", hi: "ब", gu: "બ" },
  c: { en: "c", hi: "क", gu: "ક" },
  d: { en: "d", hi: "द", gu: "દ" },
  e: { en: "e", hi: "ए", gu: "એ" },
  f: { en: "f", hi: "फ", gu: "ફ" },
  g: { en: "g", hi: "ग", gu: "ગ" },
  h: { en: "h", hi: "ह", gu: "હ" },
  i: { en: "i", hi: "इ", gu: "ઇ" },
  j: { en: "j", hi: "ज", gu: "જ" },
  k: { en: "k", hi: "क", gu: "ક" },
  l: { en: "l", hi: "ल", gu: "લ" },
  m: { en: "m", hi: "म", gu: "મ" },
  n: { en: "n", hi: "न", gu: "ન" },
  o: { en: "o", hi: "ओ", gu: "ઓ" },
  p: { en: "p", hi: "प", gu: "પ" },
  q: { en: "q", hi: "क", gu: "ક" },
  r: { en: "r", hi: "र", gu: "ર" },
  s: { en: "s", hi: "स", gu: "સ" },
  t: { en: "t", hi: "त", gu: "ત" },
  u: { en: "u", hi: "उ", gu: "ઉ" },
  v: { en: "v", hi: "व", gu: "વ" },
  w: { en: "w", hi: "व", gu: "વ" },
  x: { en: "x", hi: "क्स", gu: "ક્સ" },
  y: { en: "y", hi: "य", gu: "ય" },
  z: { en: "z", hi: "ज़", gu: "ઝ" },
  A: { en: "A", hi: "अ", gu: "અ" },
  B: { en: "B", hi: "ब", gu: "બ" },
  C: { en: "C", hi: "क", gu: "ક" },
  D: { en: "D", hi: "द", gu: "દ" },
  E: { en: "E", hi: "ए", gu: "એ" },
  F: { en: "F", hi: "फ", gu: "ફ" },
  G: { en: "G", hi: "ग", gu: "ગ" },
  H: { en: "H", hi: "ह", gu: "હ" },
  I: { en: "I", hi: "इ", gu: "ઇ" },
  J: { en: "J", hi: "ज", gu: "જ" },
  K: { en: "K", hi: "क", gu: "ક" },
  L: { en: "L", hi: "ल", gu: "લ" },
  M: { en: "M", hi: "म", gu: "મ" },
  N: { en: "N", hi: "न", gu: "ન" },
  O: { en: "O", hi: "ओ", gu: "ઓ" },
  P: { en: "P", hi: "प", gu: "પ" },
  Q: { en: "Q", hi: "क", gu: "ક" },
  R: { en: "R", hi: "र", gu: "ર" },
  S: { en: "S", hi: "स", gu: "સ" },
  T: { en: "T", hi: "त", gu: "ત" },
  U: { en: "U", hi: "उ", gu: "ઉ" },
  V: { en: "V", hi: "व", gu: "વ" },
  W: { en: "W", hi: "व", gu: "વ" },
  X: { en: "X", hi: "क्स", gu: "ક્સ" },
  Y: { en: "Y", hi: "य", gu: "ય" },
  Z: { en: "Z", hi: "ज़", gu: "ઝ" },
  "0": { en: "0", hi: "0", gu: "0" },
  "1": { en: "1", hi: "1", gu: "1" },
  "2": { en: "2", hi: "2", gu: "2" },
  "3": { en: "3", hi: "3", gu: "3" },
  "4": { en: "4", hi: "4", gu: "4" },
  "5": { en: "5", hi: "5", gu: "5" },
  "6": { en: "6", hi: "6", gu: "6" },
  "7": { en: "7", hi: "7", gu: "7" },
  "8": { en: "8", hi: "8", gu: "8" },
  "9": { en: "9", hi: "9", gu: "9" },
  " ": { en: " ", hi: " ", gu: " " },
};

const transliterate = (text: string, lang: Language): string => {
  if (lang === "en") return text;
  return text.split("").map((char) => transliterateMap[char]?.[lang] || char).join("");
};

interface ImageAdjustments {
  offsetX: number;
  offsetY: number;
  scale: number;
}

const RENDER_SCALE = 2; // render at 2× for crisp output

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const template = templates.find((t) => t.id === id) || templates[0];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [translatedName, setTranslatedName] = useState("");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [posterDataUrl, setPosterDataUrl] = useState<string | null>(null);
  const [adjustments, setAdjustments] = useState<ImageAdjustments>({ offsetX: 0, offsetY: 0, scale: 1 });
  const [showAdjust, setShowAdjust] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

  const W = template.width * RENDER_SCALE;
  const H = template.height * RENDER_SCALE;

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);

    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, W, H);

      const pos = template.imagePosition;
      const cx = pos.x * W;
      const cy = pos.y * H;
      const radius = (pos.size * W) / 2;

      if (userImage) {
        const uImg = new Image();
        uImg.crossOrigin = "anonymous";
        uImg.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();

          // Cover-fit the image inside the circle
          const aspect = uImg.width / uImg.height;
          let dw: number, dh: number;
          if (aspect > 1) {
            dh = radius * 2;
            dw = dh * aspect;
          } else {
            dw = radius * 2;
            dh = dw / aspect;
          }
          dw *= adjustments.scale;
          dh *= adjustments.scale;
          const drawX = cx - dw / 2 + adjustments.offsetX * RENDER_SCALE;
          const drawY = cy - dh / 2 + adjustments.offsetY * RENDER_SCALE;
          ctx.drawImage(uImg, drawX, drawY, dw, dh);
          ctx.restore();

          // Orange outer border
          ctx.beginPath();
          ctx.arc(cx, cy, radius + 8 * RENDER_SCALE, 0, Math.PI * 2);
          ctx.strokeStyle = "#D4600E";
          ctx.lineWidth = 4 * RENDER_SCALE;
          ctx.stroke();

          // White inner border
          ctx.beginPath();
          ctx.arc(cx, cy, radius + 3 * RENDER_SCALE, 0, Math.PI * 2);
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 5 * RENDER_SCALE;
          ctx.stroke();

          drawText(ctx);
        };
        uImg.src = userImage;
      } else {
        // Placeholder
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 3 * RENDER_SCALE;
        ctx.stroke();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = `${14 * RENDER_SCALE}px Poppins, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Your Photo", cx, cy);

        drawText(ctx);
      }
    };
    bgImg.src = template.image;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, userImage, name, translatedName, language, W, H, adjustments]);

  const drawText = (ctx: CanvasRenderingContext2D) => {
    const tp = template.textPosition;
    const displayName = language === "en" ? name : translatedName;
    if (displayName?.trim()) {
      const fs = tp.fontSize * RENDER_SCALE;
      ctx.font = `bold ${fs}px ${fontMap[language]}`;
      ctx.fillStyle = tp.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 6 * RENDER_SCALE;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.fillText(displayName, tp.x * W, tp.y * H, W * 0.85);
      ctx.shadowColor = "transparent";
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUserImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setTranslatedName(transliterate(name, lang));
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setTranslatedName(transliterate(value, language));
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `poster-${template.name.toLowerCase().replace(/\s/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleShare = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setPosterDataUrl(canvas.toDataURL("image/png"));
    setShareOpen(true);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!userImage) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, offsetX: adjustments.offsetX, offsetY: adjustments.offsetY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !userImage) return;
    const dx = (e.clientX - dragStart.current.x) / 2;
    const dy = (e.clientY - dragStart.current.y) / 2;
    setAdjustments({
      ...adjustments,
      offsetX: dragStart.current.offsetX + dx,
      offsetY: dragStart.current.offsetY + dy,
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!userImage) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStart.current = { x: touch.clientX, y: touch.clientY, offsetX: adjustments.offsetX, offsetY: adjustments.offsetY };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || !userImage) return;
    const touch = e.touches[0];
    const dx = (touch.clientX - dragStart.current.x) / 2;
    const dy = (touch.clientY - dragStart.current.y) / 2;
    setAdjustments({
      ...adjustments,
      offsetX: dragStart.current.offsetX + dx,
      offsetY: dragStart.current.offsetY + dy,
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-primary text-primary-foreground py-3 px-4 shadow-md">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/templates")} className="text-primary-foreground hover:bg-primary-foreground/10 -ml-2">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-bold">Edit Poster</h1>
        </div>
      </header>

      <main className="px-3 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <div className="w-full max-w-[360px]">
              <canvas
                ref={canvasRef}
                width={W}
                height={H}
                className="w-full rounded-lg shadow-lg border border-border"
                style={{ aspectRatio: `${template.width}/${template.height}`, cursor: userImage ? "grab" : "default" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border shadow-sm space-y-4">
              <div>
                <Label className="text-foreground font-semibold mb-2 block">Upload Photo</Label>
                <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary transition-colors bg-secondary/50 min-h-[60px]">
                  <Camera className="h-8 w-8 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {userImage ? "Change photo" : "Tap to upload from camera or gallery"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              {userImage && (
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAdjust(!showAdjust)}
                    className="w-full flex items-center justify-center gap-2 py-3"
                  >
                    <Move className="h-4 w-4" />
                    {showAdjust ? "Hide Adjustments" : "Adjust Photo Position"}
                  </Button>
                  
                  {showAdjust && (
                    <div className="mt-3 p-4 rounded-lg bg-secondary/30 border border-border space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium flex items-center gap-1 min-w-[80px]">
                          <Move className="h-4 w-4" />
                          X
                        </span>
                        <Slider
                          value={[adjustments.offsetX]}
                          onValueChange={([v]) => setAdjustments({ ...adjustments, offsetX: v })}
                          min={-100}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-xs w-8 text-right">{adjustments.offsetX}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium flex items-center gap-1 min-w-[80px]">
                          <Move className="h-4 w-4" />
                          Y
                        </span>
                        <Slider
                          value={[adjustments.offsetY]}
                          onValueChange={([v]) => setAdjustments({ ...adjustments, offsetY: v })}
                          min={-100}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-xs w-8 text-right">{adjustments.offsetY}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium flex items-center gap-1 min-w-[80px]">
                          <ZoomIn className="h-4 w-4" />
                          Scale
                        </span>
                        <Slider
                          value={[adjustments.scale * 100]}
                          onValueChange={([v]) => setAdjustments({ ...adjustments, scale: v / 100 })}
                          min={50}
                          max={200}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-xs w-8 text-right">{Math.round(adjustments.scale * 100)}%</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAdjustments({ offsetX: 0, offsetY: 0, scale: 1 })}
                        className="w-full text-muted-foreground py-2"
                      >
                        Reset
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <div>
                <Label htmlFor="name" className="text-foreground font-semibold mb-2 block">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="bg-secondary/50 h-12 text-base"
                />
              </div>

              <div>
                <Label className="text-foreground font-semibold mb-2 block">Language</Label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="bg-secondary/50 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 py-4 text-base font-bold" onClick={handleDownload}>
                <Download className="mr-2 h-5 w-5" />
                Download PNG
              </Button>
              <Button variant="outline" className="flex-1 py-4 text-base font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={handleShare}>
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </main>

      <ShareDialog open={shareOpen} onOpenChange={setShareOpen} posterDataUrl={posterDataUrl} />
    </div>
  );
};

export default Editor;
