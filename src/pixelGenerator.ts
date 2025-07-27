import hexToRgb from "./hexToRgb";

interface generatePixelProps {
  width?: number;
  height?: number;
  color?: `#${string}` | `rgb(${number}, ${number}, ${number})`;
  alpha?: number;
}

export default function generatePixel({
  width = 1,
  height = 1,
  color = "#fff",
  alpha = 0,
}: generatePixelProps) {
  let { r, g, b } = { r: 255, g: 255, b: 255 };

  if (typeof color === "string" && color.startsWith("#")) {
    const converted = hexToRgb(color as `#${string}`);
    if (converted) {
      r = converted.r;
      g = converted.g;
      b = converted.b;
    }
  } else {
    const rgbMatch = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (rgbMatch) {
      r = parseInt(rgbMatch[1], 10);
      g = parseInt(rgbMatch[2], 10);
      b = parseInt(rgbMatch[3], 10);
    } else {
      throw new Error("Invalid color format. Use hex or rgb.");
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const base64Png = canvas.toDataURL("image/png");

  return base64Png;
}
