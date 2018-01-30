function HSVToRGB(h, s, v) {
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
  const { r, g, b } = HSVToRGB(hue, 0.5, 1);

  return RGBToHEX(r, g, b);
}

function stringToHEXGradient(string) {
  const asciiCodes = string.split('').map(char => char.charCodeAt());
  const hue = (Math.cos(asciiCodes.reduce((prevCode, code) => prevCode + code)) + 1) / 2;
  const fromRGB = HSVToRGB(hue, 0.6, 1);
  const toRGB = HSVToRGB(hue, 0.8, 1);

  return {
    from: RGBToHEX(fromRGB.r, fromRGB.g, fromRGB.b),
    to: RGBToHEX(toRGB.r, toRGB.g, toRGB.b),
  };
}

export default {
  HSVToRGB,
  RGBToHEX,
  stringToHEX,
  stringToHEXGradient,
};
