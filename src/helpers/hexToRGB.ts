export default function hexToRGB(hex: string): {
  red: number;
  green: number;
  blue: number;
  rgbString: string;
} {
  hex = hex.replace(/^#/, "");

  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return {
    red: r,
    green: g,
    blue: b,
    rgbString: `rgb(${r}, ${g}, ${b})`,
  };
}
