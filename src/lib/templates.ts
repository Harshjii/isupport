import template1 from "@/assets/template-1.jpg";
import template2 from "@/assets/template-2.jpg";
import template3 from "@/assets/template-3.jpg";
import template4 from "@/assets/template-4.jpg";
import template5 from "@/assets/template-5.jpg";
import template6 from "@/assets/template-6.jpg";
import templateMain from "@/assets/template-main.png";

export interface PosterTemplate {
  id: string;
  name: string;
  image: string;
  /** Natural width/height of the template image */
  width: number;
  height: number;
  imagePosition: { x: number; y: number; size: number }; // centre-x, centre-y, diameter — all as fractions 0-1
  textPosition: { x: number; y: number; fontSize: number; color: string }; // fractions 0-1 for x,y
}

export const templates: PosterTemplate[] = [
  {
    id: "main",
    name: "Campaign Classic",
    image: templateMain,
    width: 454,
    height: 679,
    imagePosition: { x: 0.22, y: 0.595, size: 0.42 },
    textPosition: { x: 0.8, y: 0.82, fontSize: 22, color: "#FFFFFF" },
  },
  {
    id: "1",
    name: "Lotus Classic",
    image: template1,
    width: 600,
    height: 800,
    imagePosition: { x: 0.5, y: 0.35, size: 0.5 },
    textPosition: { x: 0.5, y: 0.72, fontSize: 32, color: "#8B2500" },
  },
  {
    id: "2",
    name: "Bold Red",
    image: template2,
    width: 600,
    height: 800,
    imagePosition: { x: 0.5, y: 0.4, size: 0.5 },
    textPosition: { x: 0.5, y: 0.75, fontSize: 32, color: "#FFFFFF" },
  },
  {
    id: "3",
    name: "Tricolor Pride",
    image: template3,
    width: 600,
    height: 800,
    imagePosition: { x: 0.5, y: 0.3, size: 0.5 },
    textPosition: { x: 0.5, y: 0.88, fontSize: 32, color: "#8B2500" },
  },
  {
    id: "4",
    name: "Royal Mandala",
    image: template4,
    width: 600,
    height: 800,
    imagePosition: { x: 0.5, y: 0.4, size: 0.5 },
    textPosition: { x: 0.5, y: 0.75, fontSize: 32, color: "#FFD700" },
  },
  {
    id: "5",
    name: "Rally Sunset",
    image: template5,
    width: 600,
    height: 800,
    imagePosition: { x: 0.5, y: 0.3, size: 0.5 },
    textPosition: { x: 0.5, y: 0.6, fontSize: 32, color: "#FFFFFF" },
  },
  {
    id: "6",
    name: "Modern Stripes",
    image: template6,
    width: 600,
    height: 800,
    imagePosition: { x: 0.5, y: 0.4, size: 0.5 },
    textPosition: { x: 0.5, y: 0.75, fontSize: 32, color: "#FFFFFF" },
  },
];
