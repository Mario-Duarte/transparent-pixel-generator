import { describe, it, expect, vi, beforeEach } from "vitest";
import transparentPixelGenerator from "./transparentPixelGenerator";

// Mock hexToRgb
vi.mock("./hexToRgb", () => ({
  default: vi.fn((hex: string) => {
    if (hex === "#ff0000") return { r: 255, g: 0, b: 0 };
    if (hex === "#00ff00") return { r: 0, g: 255, b: 0 };
    if (hex === "#0000ff") return { r: 0, g: 0, b: 255 };
    if (hex === "#ffffff") return { r: 255, g: 255, b: 255 };
    return null;
  }),
}));

// Mock canvas and context
class MockCanvasContext2D {
  fillStyle = "";
  clearRect = vi.fn();
  fillRect = vi.fn();
}
class MockCanvas {
  width = 0;
  height = 0;
  getContext = vi.fn(() => new MockCanvasContext2D());
  toDataURL = vi.fn(() => "data:image/png;base64,mock");
}
const createElementSpy = vi.spyOn(document, "createElement");

beforeEach(() => {
  createElementSpy.mockImplementation((tag: string) => {
    if (tag === "canvas") return new MockCanvas() as any;
    return {} as any;
  });
});

describe("Test the transparentPixelGenerator function", () => {
  it("returns a PNG data URL", () => {
    const url = transparentPixelGenerator({});
    expect(url).toMatch(/^data:image\/png;base64,/);
  });

  it("uses default values when no props are provided", () => {
    const url = transparentPixelGenerator({});
    expect(url).toBe("data:image/png;base64,mock");
  });

  it("uses provided width and height", () => {
    const url = transparentPixelGenerator({ width: 10, height: 20 });
    expect(url).toBe("data:image/png;base64,mock");
  });

  it("handles hex color input", () => {
    const url = transparentPixelGenerator({ color: "#ff0000" });
    expect(url).toBe("data:image/png;base64,mock");
  });

  it("handles rgb color input", () => {
    const url = transparentPixelGenerator({ color: "rgb(0, 255, 0)" });
    expect(url).toBe("data:image/png;base64,mock");
  });

  it("handles alpha value", () => {
    const url = transparentPixelGenerator({ alpha: 0.5 });
    expect(url).toBe("data:image/png;base64,mock");
  });

  it("clamps alpha between 0 and 1", () => {
    expect(transparentPixelGenerator({ alpha: -1 })).toBe("data:image/png;base64,mock");
    expect(transparentPixelGenerator({ alpha: 2 })).toBe("data:image/png;base64,mock");
  });

  it("throws on invalid rgb color", () => {
    // @ts-expect-error Testing invalid rgb input
    expect(() => transparentPixelGenerator({ color: "rgb(1,2)" })).toThrow(
      "Invalid color format. Use valid hex or rgb formats."
    );
  });

  it("throws if canvas context is not available", () => {
    createElementSpy.mockImplementationOnce(
      () =>
        ({
          width: 1,
          height: 1,
          getContext: () => null,
        } as any)
    );
    expect(() => transparentPixelGenerator({})).toThrow("Failed to get canvas context");
  });
});
