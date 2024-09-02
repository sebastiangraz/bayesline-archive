import { useState, memo, useRef } from 'react';
import style from './brand.module.css';
import { Asset, Button, Flex, Icon, Text } from '@/components';
import { themes } from '@/components/Asset/assets';
export const AssetGenerator = memo(() => {
  const [seedVal, setSeedVal] = useState(`${Math.floor(Math.random() * 10000) + 1}`);
  const [theme, setTheme] = useState(0);

  const svgRef = useRef<HTMLDivElement>(null);

  const handleSeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeedVal(event.target.value);
  };

  const handleThemeChange = (newTheme: number) => {
    setTheme(newTheme);
  };

  const handleSetRandom = () => {
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    setSeedVal(randomNumber.toString());
  };

  const handleDownload = () => {
    if (svgRef.current) {
      const svgElement = svgRef.current.children[0] as SVGSVGElement;
      inlineCSSVariables(svgElement);
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `asset-${seedVal}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={`${style.generator}`}>
      <div className={style.form}>
        <Text.SmallCaps secondary>Seed value</Text.SmallCaps>
        <input type="number" value={seedVal} onChange={handleSeedChange} className={`${style.input}`} />
        <Text.SmallCaps secondary>Theme override</Text.SmallCaps>
        <div className={style.toggleGroup}>
          <button
            key="0-random"
            className={`${style.toggleButton} ${theme === 0 ? style.active : ''}`}
            onClick={() => handleThemeChange(0)}
          >
            <Icon name="experiment" small />
          </button>
          {Object.entries(themes).map(([themeKey], index) => {
            return (
              <button
                key={`${index}-${themeKey}`}
                className={`${style.toggleButton} ${theme === index + 1 ? style.active : ''}`}
                onClick={() => handleThemeChange(index + 1)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <Text.SmallCaps secondary>Controls</Text.SmallCaps>
        <Flex gap={2}>
          <Button type="secondary" theme={1} size="small" onClick={handleDownload}>
            Download SVG
          </Button>
          <Button type="secondary" size="small" onClick={handleSetRandom}>
            Random
          </Button>
        </Flex>
      </div>
      <div ref={svgRef} className={style.image}>
        <Asset seed={seedVal} theme={theme} key={theme} />
      </div>
    </div>
  );
});

// Converts CSS variables to their computed values
const inlineCSSVariables = (svgElement: SVGSVGElement, maxDepth: number = 4) => {
  const rootStyle = getComputedStyle(document.documentElement);
  const svgStyle = getComputedStyle(svgElement);

  const replaceVariables = (value: string) => {
    const regex = /var\((--[^)]+)\)/g;

    return value.replace(regex, (_, variableName) => {
      const variableValue = svgStyle.getPropertyValue(variableName) || rootStyle.getPropertyValue(variableName);
      return variableValue ? variableValue.trim() : '';
    });
  };

  const processStyleAttribute = (styleValue: string) => {
    return styleValue
      .split(';')
      .map((style) => {
        const [property, value] = style.split(':');
        if (value && value.includes('var(')) {
          return `${property}:${replaceVariables(value)}`;
        }
        return style;
      })
      .join(';');
  };

  const traverseElements = (element: Element, depth: number) => {
    if (depth > maxDepth) return;

    if (element instanceof SVGElement) {
      // Replace fill, stroke, and style attributes that may contain CSS variables
      ['fill', 'stroke', 'style'].forEach((attrName) => {
        const attrValue = element.getAttribute(attrName);
        if (attrValue) {
          let computedValue;
          if (attrName === 'style') {
            computedValue = processStyleAttribute(attrValue);
          } else {
            computedValue = replaceVariables(attrValue);
          }
          if (computedValue) {
            element.setAttribute(attrName, computedValue);
          }
        }
      });

      // Recursively process all child elements, including nested SVGs, while tracking depth
      Array.from(element.children).forEach((child) => traverseElements(child, depth + 1));
    }
  };

  traverseElements(svgElement, 1);
};
