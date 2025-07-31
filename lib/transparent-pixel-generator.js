function l(a) {
  let r = a.startsWith("#") ? a.slice(1) : a;
  if (r.length === 3 && (r = r.split("").map((s) => s + s).join("")), !/^[a-f\d]{6}$/i.test(r))
    return null;
  const e = parseInt(r, 16), i = e >> 16 & 255, o = e >> 8 & 255, c = e & 255;
  return { r: i, g: o, b: c };
}
function h({
  width: a = 1,
  height: r = 1,
  color: e = "#ffffff",
  alpha: i = 0
}) {
  let { r: o, g: c, b: s } = { r: 255, g: 255, b: 255 };
  const g = typeof i == "number" && !isNaN(i) ? Math.max(0, Math.min(1, i)) : 0;
  if (typeof e == "string" && e.startsWith("#")) {
    const t = l(e);
    t && (o = t.r, c = t.g, s = t.b);
  } else {
    const t = e.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (t)
      o = parseInt(t[1], 10), c = parseInt(t[2], 10), s = parseInt(t[3], 10);
    else
      throw new Error("Invalid color format. Use valid hex or rgb formats.");
  }
  const n = document.createElement("canvas");
  n.width = a, n.height = r;
  const f = n.getContext("2d");
  if (!f)
    throw new Error("Failed to get canvas context");
  return f.clearRect(0, 0, n.width, n.height), f.fillStyle = `rgba(${o}, ${c}, ${s}, ${g})`, f.fillRect(0, 0, n.width, n.height), n.toDataURL("image/png");
}
export {
  h as transparentPixelGenerator
};
