// WCAG 2.x contrast helpers for colors we don't control up front (e.g. a plugin's
// brand accent). Hex in, hex out; 6-digit "#RRGGBB" only.

type RGB = [number, number, number];

const toRgb = (hex: string): RGB => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
};
const toHex = (c: RGB) =>
  '#' + c.map((x) => Math.round(x).toString(16).padStart(2, '0')).join('').toUpperCase();
const mix = (a: RGB, b: RGB, t: number): RGB => [0, 1, 2].map((i) => a[i] * t + b[i] * (1 - t)) as RGB;
const luminance = (c: RGB) => {
  const [r, g, b] = c.map((v) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export function contrastRatio(a: string, b: string): number {
  const x = luminance(toRgb(a));
  const y = luminance(toRgb(b));
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/** `color` laid over `ground` at `alpha` — the solid color a tinted chip shows. */
export function tint(color: string, ground: string, alpha: number): string {
  return toHex(mix(toRgb(color), toRgb(ground), alpha));
}

/**
 * The same hue as `color`, darkened just enough to read on `background`
 * (default target 4.8:1 — a margin over AA's 4.5:1 for rounding and AA-large).
 */
export function readableTextColor(color: string, background: string, target = 4.8): string {
  const base = toRgb(color);
  const bg = toHex(toRgb(background));
  let out = toHex(base);
  for (let k = 0; k <= 1 && contrastRatio(out, bg) < target; k += 0.01) {
    out = toHex(mix([0, 0, 0], base, k));
  }
  return out;
}
