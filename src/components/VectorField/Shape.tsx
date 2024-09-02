import React from 'react';

export const Shape = React.memo(({ x, y, type, size = 8, opacity, isStatic, color }: ShapeProps) => {
  if (!type) return null;
  // don’t add strokeOpacity if isStatic is
  const isStaticProps = isStatic ? { strokeOpacity: opacity } : {};
  const commonProps = {
    stroke: 'currentColor',
    vectorEffect: 'non-scaling-stroke',
    strokeWidth: 1.25,
    fill: 'none',
    style: { color },
    ...isStaticProps
  };
  switch (type) {
    case 'line':
      return <line x1={x} y1={y + size / 2} x2={x + size} y2={y + size / 2} {...commonProps} />;
    case 'rect':
      return <rect x={x} y={y} width={size} height={size} {...commonProps} />;
    case 'ellipse':
      return <ellipse cx={x + size / 2} cy={y + size / 2} rx={size / 2} ry={size / 2} {...commonProps} />;
    default:
      return null;
  }
});

export interface ShapeProps {
  x: number;
  y: number;
  size: number;
  type: 'rect' | 'ellipse' | 'line' | null;
  opacity: number;
  isStatic?: boolean;
  color: string;
}
