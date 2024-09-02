import React, { useCallback, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import style from './vectorfield.module.css';
import { Shape, ShapeProps } from './Shape';
interface ShapeFieldProps {
  width?: number;
  height?: number;
  rows?: number;
  columns?: number;
  padding?: number;
  variant?: 'swirl' | 'dithered-gradient' | 'radial' | 'checker' | 'bayesian' | 'pcb';
  color1?: string;
  color2?: string;
  isStatic?: boolean;
  className?: string;
}

const childVariants = {
  hidden: () => ({
    strokeOpacity: 0
  }),
  visible: ({ shimmer, opacity }: { shimmer: number; opacity: number }) => ({
    strokeOpacity: [1, 0.2, 0, 1, 1],
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      duration: 3,
      delay: opacity * ((shimmer * 0.8) / -5.2) * opacity,
      ease: 'linear'
    }
  })
};

const opacitySteps = (combinedNoise: number) => {
  if (combinedNoise <= 0.33) return 0.2;
  if (combinedNoise <= 0.66) return 0.6;
  return 1;
};

const getOpacity = (combinedNoise: number, variant: string, col: number, row: number) => {
  let opacityType: ShapeProps['opacity'];
  switch (variant) {
    case 'swirl':
      opacityType = opacitySteps(combinedNoise);
      break;
    case 'dithered-gradient':
      opacityType = opacitySteps(combinedNoise);
      break;
    case 'radial':
      opacityType = opacitySteps(combinedNoise);
      break;
    case 'bayesian':
      opacityType = opacitySteps(combinedNoise);
      break;
    case 'checker':
      opacityType = opacitySteps(combinedNoise);
      break;
    case 'pcb':
      opacityType = pcbPattern(col, row) > 0.5 ? 0.5 : 1;
      break;
    default:
      opacityType = opacitySteps(combinedNoise);
      break;
  }
  return opacityType;
};

function combinedType(value: number, offset = 0) {
  const offsetValue = value + offset;
  let shapeType: ShapeProps['type'];
  if (value <= 0.33) {
    shapeType = 'line';
  } else if (offsetValue <= 0.66) {
    shapeType = 'ellipse';
  } else {
    shapeType = 'rect';
  }
  return shapeType;
}

const getShapeType = (
  col: number,
  row: number,
  baseNoise: number,
  radialNoise: number,
  index: number,
  y: number,
  height: number,
  variant: string,
  rows: number,
  columns: number
) => {
  let shapeType: ShapeProps['type'];
  const ydistance = y / height;

  switch (variant) {
    case 'swirl':
      shapeType = combinedType(tornado(col, row, rows, columns));
      break;

    case 'dithered-gradient':
      shapeType = combinedType(baseNoise + ydistance);
      break;

    case 'radial':
      shapeType = combinedType(radialNoise, 0.26);
      break;

    case 'bayesian':
      shapeType = combinedType(bayesianCurve(col, row, columns, rows), 0.328);
      break;

    case 'checker':
      shapeType = index % 2 === 0 ? 'rect' : 'ellipse';
      break;

    case 'pcb':
      shapeType = combinedType(pcbPattern(col, row), 0);
      break;

    default:
      shapeType = 'rect';
      break;
  }

  return shapeType;
};

function shapes(
  rows: number,
  columns: number,
  padding: number,
  color1: string,
  color2: string,
  variant: string,
  isStatic: boolean,
  width: number,
  height: number
) {
  return Array.from({ length: rows * columns }, (_, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);

    const cellWidth = (width - columns * padding) / columns;
    const cellHeight = (height - rows * padding) / rows;

    const x = col * (cellWidth + padding) + padding / 2;
    const y = row * (cellHeight + padding) + padding / 2;

    const shapeSize = Math.min(cellWidth, cellHeight) - padding;

    // const midX = width / 2 - cellWidth / 2;
    const midY = height / 2 - cellHeight / 2;

    // radial tools
    // const rx = (x - midX) / width;
    const ry = (y - midY) / height;

    // const rdistance = Math.sqrt(rx * rx + ry * ry);

    //linear tools
    const dx = col / columns;
    // const dy = row / rows;
    // const interpolation = Math.abs(rx - ry);
    // const xdistance = x / width;
    // const ydistance = y / height;
    // const diagDistance = Math.sqrt(dx * dx + dy * dy);

    // noise tools, noice indeed
    const baseNoise = (0.5 - Math.random()) * 0.66;
    const noise = (Math.sin(dx * Math.PI) + Math.cos(ry * Math.PI)) / 2;
    const radialNoise = (Math.sin(dx * Math.PI) + Math.cos(ry * Math.PI)) / 4;
    const opacity = getOpacity(baseNoise + noise, variant, col, row);
    const shapeType = getShapeType(col, row, baseNoise, radialNoise, index, y, height, variant, rows, columns);
    const color = shapeType === 'rect' ? color1 : color2;

    return (
      <motion.g
        key={`${row}-${col}`}
        variants={!isStatic ? (childVariants as any) : {}}
        custom={{ shimmer: index, opacity: opacity }}
        // custom={{ shimmer: opacity * index * 0.03 * (index * 0.01) }}
        initial="hidden"
        animate="visible"
      >
        <Shape x={x} y={y} type={shapeType} size={shapeSize} isStatic={isStatic} opacity={opacity} color={color} />
      </motion.g>
    );
  });
}

export const ShapeField = React.memo(
  ({
    width = 240,
    height = 240,
    rows = 16,
    columns = 16,
    padding = 4.5,
    color1 = 'var(--foreground)',
    color2 = 'var(--foreground-accent)',
    variant = 'swirl',
    isStatic = false,
    className = ''
  }: ShapeFieldProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const isInView = useInView(svgRef, {
      once: false,
      amount: 'some'
    });

    const shouldAnimate = !isStatic && isInView;

    const memoizedShapes = useMemo(
      () => shapes(rows, columns, padding, color1, color2, variant, !shouldAnimate, width, height),
      [rows, columns, padding, color1, color2, variant, shouldAnimate, width, height]
    );

    const classNames = `${style.shapefield} ${className}`;

    return (
      <motion.svg
        className={classNames}
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${width} ${height}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        ref={svgRef}
      >
        {memoizedShapes}
      </motion.svg>
    );
  }
);

function gaussian(x: number, mean: number, variance: number) {
  return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
}

function bayesianCurve(col: number, row: number, columns: number, rows: number) {
  const meanW = columns / 2;
  const meanH = rows / 2;

  const varianceW = Math.pow(columns / 8, 1.85);
  const varianceH = Math.pow(rows / 4, 1.9);

  const baseWidth = gaussian(col, meanW, varianceW);
  const baseHeight = gaussian(row, meanH, varianceH);

  const normalizedWidth = baseWidth * columns;
  const normalizedHeight = baseHeight * rows;

  return (normalizedWidth / 2) * 0.12 + normalizedHeight / 5.3;
}
const tornado = (col: number, row: number, rows: number, columns: number) => {
  const angle = Math.atan2(row - rows / 2, col - columns / 2);
  const radius = Math.sqrt(Math.pow(row - rows / 2, 2) + Math.pow(col - columns / 2, 2));
  const spiral = Math.sin(angle * 1.2 + radius / 0.85);
  return spiral;
};

function pcbPattern(col: number, row: number) {
  // Variability in the grid spacing
  let gridSizes = [2, 5, 9, 27, 1, 1, 1];
  const gridSize = gridSizes[Math.floor(Math.random() * gridSizes.length * 0.2)];

  // Establish connections based on variable grid sizes
  const connections =
    col % gridSizes[(col % gridSize) * 1] > gridSize || row % gridSizes[(row % gridSize) * 8] === 0 ? 1 : 0;

  // Looks like generated text
  // const connections =
  // col % gridSizes[(col % gridSize) * 20] > gridSize || row % gridSizes[(row % gridSize) * 8] === 0 ? 1 : 0;

  // Looks like icons with text
  //   const connections =
  //     col % gridSizes[(row % gridSize) * 2] < 2 || row % gridSizes[gridSize * 12 + col] === 0 ? 0 : 0.6;

  return connections;
}

ShapeField.displayName = 'ShapeField';
