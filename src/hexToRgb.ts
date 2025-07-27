/**
 * Converts a hexadecimal color string to its RGB representation.
 *
 * Accepts both 3-digit and 6-digit hex color codes (with or without the leading '#').
 * Returns an object with `r`, `g`, and `b` properties representing the red, green, and blue components,
 * or `null` if the input is not a valid hex color.
 *
 * @param hex - The hexadecimal color string (e.g., `#fff`, `#ffffff`).
 * @returns An object with `r`, `g`, and `b` properties if valid, or `null` if invalid.
 */
export default function hexToRgb(hex: `#${string}`) {
  let cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (!/^[a-f\d]{6}$/i.test(cleanHex)) {
    return null;
  }

  // Parse the hex string into R, G, and B components
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}
