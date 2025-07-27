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
export default function hexToRgb(hex: `#${string}`): {
    r: number;
    g: number;
    b: number;
} | null;
