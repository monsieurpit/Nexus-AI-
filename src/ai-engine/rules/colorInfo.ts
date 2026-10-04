// "is #862945 a cool color?" got "I don't actually know that one, that hex code ain't in this shit I gotta look at"
// (2026-10-04). A hex code is just numbers: this works out what colour it is (RGB, HSL, a plain-English name and the
// closest named colour) so the model can give a real opinion.

const NAMED: Array<[string, number, number, number]> = [
  ['black', 0, 0, 0], ['white', 255, 255, 255], ['grey', 128, 128, 128], ['silver', 192, 192, 192], ['charcoal', 54, 69, 79],
  ['red', 220, 20, 60], ['crimson', 220, 20, 60], ['maroon', 128, 0, 0], ['burgundy', 128, 0, 32], ['wine', 114, 47, 55],
  ['raspberry', 135, 38, 87], ['rose', 255, 0, 127], ['pink', 255, 192, 203], ['hot pink', 255, 105, 180], ['magenta', 255, 0, 255],
  ['plum', 142, 69, 133], ['purple', 128, 0, 128], ['violet', 143, 0, 255], ['lavender', 181, 126, 220], ['indigo', 75, 0, 130],
  ['navy', 0, 0, 128], ['blue', 30, 90, 220], ['royal blue', 65, 105, 225], ['sky blue', 135, 206, 235], ['cyan', 0, 200, 220],
  ['teal', 0, 128, 128], ['turquoise', 64, 224, 208], ['mint', 152, 255, 152], ['green', 34, 139, 34], ['lime', 50, 205, 50],
  ['olive', 128, 128, 0], ['forest green', 34, 85, 34], ['yellow', 255, 220, 0], ['gold', 212, 175, 55], ['mustard', 225, 173, 1],
  ['orange', 255, 140, 0], ['coral', 255, 127, 80], ['salmon', 250, 128, 114], ['peach', 255, 203, 164], ['brown', 139, 69, 19],
  ['chocolate', 123, 63, 0], ['tan', 210, 180, 140], ['beige', 245, 245, 220], ['cream', 255, 253, 208],
];

export function findHexColor(text: string): string | null {
  const m = (text || '').match(/#([0-9a-f]{6}|[0-9a-f]{3})\b/i);
  return m ? m[1] : null;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
    else h = ((rn - gn) / d + 4) * 60;
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function hueName(h: number): string {
  const names: Array<[number, string]> = [[15, 'red'], [40, 'orange'], [65, 'yellow'], [150, 'green'], [190, 'cyan/teal'], [250, 'blue'], [290, 'purple'], [335, 'magenta/pink'], [361, 'red']];
  return names.find(([max]) => h < max)![1];
}

export function describeHexColor(hex: string): string | null {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  const [hue, sat, light] = rgbToHsl(r, g, b);
  const tone = light < 20 ? 'very dark' : light < 38 ? 'dark' : light < 62 ? 'mid' : light < 82 ? 'light' : 'very light';
  const chroma = sat < 12 ? 'greyish' : sat < 40 ? 'muted' : sat < 70 ? 'rich' : 'vivid';
  let best = NAMED[0];
  let bestD = Infinity;
  for (const n of NAMED) {
    const d = (n[1] - r) ** 2 + (n[2] - g) ** 2 + (n[3] - b) ** 2;
    if (d < bestD) { bestD = d; best = n; }
  }
  const family = sat < 12 ? 'grey' : hueName(hue);
  return `#${h.toUpperCase()} = RGB(${r}, ${g}, ${b}), HSL(${hue}°, ${sat}%, ${light}%): a ${tone}, ${chroma} ${family} — closest named colour: ${best[0]}.`;
}
