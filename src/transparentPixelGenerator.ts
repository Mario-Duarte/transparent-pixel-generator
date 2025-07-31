import hexToRgb from "./hexToRgb";

interface transparentPixelGeneratorProps {
  width?: number;
  height?: number;
  color?: `#${string}` | `rgb(${number}, ${number}, ${number})`;
  alpha?: number;
}

/**
 * Generates a Base64 PNG data URL representing a pixel of the specified size, color, and alpha transparency.
 * The pixel can be customized with width, height, color (in hex or RGB format), and alpha transparency.
 * If no parameters are provided, it defaults to a 1x1 transparent pixel.
 *
 * usage example:
 * ```ts
 * const pixelUrl = transparentPixelGenerator({ width: 10, height: 10, color: "#ff0000", alpha: 0.5 });
 * console.log(pixelUrl); // "data:image/png;base64,..."
 * ```
 * This function is useful to create transparent semi-transparent background as CSS opacity attribute applies to the whole element
 * and child elements, while this pixel can be used as a background image with specific opacity.
 *
 * @param params - The configuration object for the pixel generator.
 * @param params.width - The width of the generated pixel image in pixels. Defaults to 1px.
 * @param params.height - The height of the generated pixel image in pixels. Defaults to 1px.
 * @param params.color - The color of the pixel. Accepts a hex string (e.g., "#ffffff") or an RGB string (e.g., "rgb(255,255,255)"). Defaults to "#ffffff".
 * @param params.alpha - The alpha transparency value (between 0 and 1). Defaults to 0 (fully transparent).
 * @returns A base64-encoded PNG data URL representing the generated pixel ready to be consumed by CSS.
 * @throws Will throw an error if the color format is invalid or if the canvas context cannot be obtained.
 */
export default function transparentPixelGenerator({
  width = 1,
  height = 1,
  color = "#ffffff",
  alpha = 0,
}: transparentPixelGeneratorProps): string {
  let { r, g, b } = { r: 255, g: 255, b: 255 };
  const safeAlpha =
    typeof alpha === "number" && !isNaN(alpha)
      ? Math.max(0, Math.min(1, alpha))
      : alpha;

  if (typeof color === "string" && color.startsWith("#")) {
    const converted = hexToRgb(color as `#${string}`);
    if (converted) {
      r = converted.r;
      g = converted.g;
      b = converted.b;
    }
  } else {
    const rgbMatch = color.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (rgbMatch) {
      r = parseInt(rgbMatch[1], 10);
      g = parseInt(rgbMatch[2], 10);
      b = parseInt(rgbMatch[3], 10);
    } else {
      throw new Error("Invalid color format. Use valid hex or rgb formats.");
    }
  }

  // Create a canvas to draw the pixel
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/png");
}
