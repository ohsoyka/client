function HSLToRGB(h, s, v) {
  const i = Math.floor(h * 6);
  const f = (h * 6) - i;
  const p = v * (1 - s);
  const q = v * (1 - (f * s));
  const t = v * (1 - ((1 - f) * s));

  let r;
  let g;
  let b;

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: r = 0; g = 0; b = 0;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function RGBToHSL(red, green, blue) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d) + (g < b ? 6 : 0); break;
      case g: h = ((b - r) / d) + 2; break;
      case b: h = ((r - g) / d) + 4; break;
      default: h = 0;
    }

    h /= 6;
  }

  return { h, s, l };
}

function componentToHEX(c) {
  const hex = c.toString(16);

  return hex.length === 1 ? `0${hex}` : hex;
}

function RGBToHEX(r, g, b) {
  return `#${componentToHEX(r)}${componentToHEX(g)}${componentToHEX(b)}`;
}

function stringToHEX(string) {
  const asciiCodes = string.split('').map(char => char.charCodeAt());
  const hue = (Math.cos(asciiCodes.reduce((prevCode, code) => prevCode + code)) + 1) / 2;
  const { r, g, b } = HSLToRGB(hue, 0.5, 1);

  return RGBToHEX(r, g, b);
}

function stringToHEXGradient(string = '', { saturation = 0.7, luminosity = 1 } = {}) {
  const asciiCodes = string.split('').map(char => char.charCodeAt());
  const sum = asciiCodes.reduce((accumulator, code) => accumulator + code, 0);
  const hue = (Math.cos(sum) + 1) / 2;
  const fromRGB = HSLToRGB(hue, Math.max(saturation - 0.1, 0), luminosity);
  const toRGB = HSLToRGB(hue + 0.1, Math.min(saturation + 0.1, 1), luminosity);

  return {
    from: RGBToHEX(fromRGB.r, fromRGB.g, fromRGB.b),
    to: RGBToHEX(toRGB.r, toRGB.g, toRGB.b),
  };
}

function RGBToGradient(r, g, b) {
  const { h, s, l } = RGBToHSL(r, g, b);
  const minSaturation = Math.max(s - 0.2, 0);
  const maxSaturation = Math.min(s + 0.2, 1);

  const fromRGB = HSLToRGB(h, minSaturation, l);
  const toRGB = HSLToRGB(h, maxSaturation, l);

  return {
    from: RGBToHEX(fromRGB.r, fromRGB.g, fromRGB.b),
    to: RGBToHEX(toRGB.r, toRGB.g, toRGB.b),
  };
}

export default {
  HSLToRGB,
  RGBToHSL,
  RGBToHEX,
  stringToHEX,
  stringToHEXGradient,
  RGBToGradient,
};
