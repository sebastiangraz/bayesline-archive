import { useState, useEffect } from 'react';
import style from './brand.module.css';
import { Text } from '@/components';

export const Swatch = ({ color }: { color: string }) => {
  const [colorInfo, setColorInfo] = useState({ hex: '', hsl: '' });

  useEffect(() => {
    const fetchColor = () => {
      const el = document.createElement('div');
      el.style.display = 'none';
      el.style.color = color;
      document.body.appendChild(el);
      const computedColor = getComputedStyle(el).color;
      document.body.removeChild(el);

      const rgba = parseColor(computedColor);
      if (rgba) {
        setColorInfo({
          hex: rgbaToHex(rgba),
          hsl: rgbToHsl(rgba)
        });
      } else {
        setColorInfo({ hex: 'Invalid color', hsl: '' });
      }
    };

    fetchColor();
  }, [color]);

  return (
    <>
      <div className={`${style.swatch}`} style={{ background: color }}></div>
      <div className={`${style.swatchinfo}`}>
        <Text.SmallCaps>{colorInfo.hex}</Text.SmallCaps>
        <Text.SmallCaps secondary>{colorInfo.hsl}</Text.SmallCaps>
      </div>
    </>
  );
};

const parseColor = (colorString: string) => {
  const result = colorString.match(/[\d.]+/g);
  return result ? result.map(Number) : null;
};

// Convert RGBA to HEX
const rgbaToHex = (rgba: number[]) => {
  let [r, g, b, a = 1] = rgba;
  const alpha = Math.round(a * 255);
  const hexAlpha = alpha.toString(16);
  const hex =
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
  return alpha === 255 ? hex : hex + (hexAlpha.length === 1 ? '0' + hexAlpha : hexAlpha);
};

// Convert RGB to HSL
const rgbToHsl = (rgba: number[]) => {
  let [r, g, b, a = 1] = rgba;
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Include the alpha component to create HSLA
  return `hsl(${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}% / ${+a.toFixed(2)})`;
};

export function getColor(color: string) {
  return `var(--${color})`;
}

Swatch.displayName = 'Swatch';
