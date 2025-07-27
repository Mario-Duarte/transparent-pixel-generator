import { describe, it, expect } from "vitest";
import hexToRgb from "./hexToRgb";

describe("tests hexToRgb function", () => {
  it("converts 6-digit hex with # to RGB", () => {
    expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb("#123456")).toEqual({ r: 18, g: 52, b: 86 });
  });

  it("converts 3-digit hex with # to RGB", () => {
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb("#abc")).toEqual({ r: 170, g: 187, b: 204 });
  });

  it("converts 6-digit hex without # to RGB", () => {
    // @ts-expect-error Testing input without #
    expect(hexToRgb("abcdef")).toEqual({ r: 171, g: 205, b: 239 });
  });

  it("converts 3-digit hex without # to RGB", () => {
    // @ts-expect-error Testing input without #
    expect(hexToRgb("123")).toEqual({ r: 17, g: 34, b: 51 });
  });

  it("returns null for invalid hex strings", () => {
    expect(hexToRgb("#ff")).toBeNull();
    expect(hexToRgb("#fffff")).toBeNull();
    expect(hexToRgb("#gggggg")).toBeNull();
    // @ts-expect-error Invalid input
    expect(hexToRgb("xyz")).toBeNull();
    // @ts-expect-error Empty input
    expect(hexToRgb("")).toBeNull();
  });

  it("is case-insensitive", () => {
    expect(hexToRgb("#ABCDEF")).toEqual({ r: 171, g: 205, b: 239 });
    expect(hexToRgb("#abcdef")).toEqual({ r: 171, g: 205, b: 239 });
  });
});
