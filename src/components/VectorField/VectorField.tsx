import { useMotionValue, useTransform, useSpring, motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import style from './vectorfield.module.css';

interface VectorFieldProps {
  variant?: 'swirl' | 'straight' | 'radial' | 'checker' | 'grid' | 'magnify' | 'twist';
  loop?: boolean;
  count?: number;
  padding?: number;
  className?: string;
  style?: React.CSSProperties;
}

const arrowVariant = {
  hidden: {
    scale: 0
  },
  visible: ({ i }: { i: number }) => ({
    scale: 1,
    transition: {
      duration: 0.5 + i * 0.01,
      ease: [1, 0.2, 0.3, 0.9]
    }
  })
};

const loopArrowVariant = {
  hidden: {
    scale: 0
  },
  visible: ({ i }: { i: number }) => ({
    scale: [0.2, 1, 1, 0.2],
    transition: {
      duration: 1,
      ease: 'linear',
      scale: {
        ease: [1, 0.2, 0.3, 0.9],

        duration: 2,
        delay: i * 0.005,
        repeat: Infinity,
        repeatType: 'loop'
      }
    }
  })
};

export const VectorField = ({
  variant = 'swirl',
  loop = false,
  count = 14,
  padding = 6,
  className,
  ...props
}: VectorFieldProps) => {
  const svgSize = 192; // Size of the SVG canvas
  const svgPadding = 6; // Padding around the canvas
  const size = svgSize - svgPadding * 2; // Size of the vector field

  const numArrows = count; // Number of arrows along one dimension
  const arrowPadding = padding; // Padding between arrows
  const arrowSize = (size - arrowPadding * (numArrows - 1)) / numArrows;

  const mouseX = useMotionValue(size / 2 + svgPadding);
  const mouseY = useMotionValue(size / 2 + svgPadding);
  const svgRef = useRef<SVGSVGElement>(null);

  const isInView = useInView(svgRef, {
    once: false,
    amount: 'some'
  });

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const scale = svgSize / rect.width; // Calculate scale factor based on current width
    mouseX.set((event.clientX - rect.left) * scale);
    mouseY.set((event.clientY - rect.top) * scale);
  };

  const handleMouseLeave = () => {
    mouseX.set(size / 2 + svgPadding);
    mouseY.set(size / 2 + svgPadding);
  };

  const arrows = Array.from({ length: numArrows * numArrows }, (_, index) => {
    const x = (index % numArrows) * (arrowSize + arrowPadding) + svgPadding + arrowSize / 2;
    const y = Math.floor(index / numArrows) * (arrowSize + arrowPadding) + svgPadding + arrowSize / 2;
    let bufferVariable = null;
    const angle = useTransform<number, number>([mouseX, mouseY], ([latestX, latestY]) => {
      const dx = latestX - x;
      const dy = latestY - y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const baseAngle = Math.atan2(dy, dx);

      switch (variant) {
        case 'swirl':
          bufferVariable = dist / -2;
          break;

        case 'twist':
          bufferVariable = dist / -2;
          break;

        case 'straight':
          bufferVariable = 0 - Math.min(0, dist);
          break;

        case 'radial':
          bufferVariable = 100 - Math.min(100, dist);
          break;

        case 'checker':
          bufferVariable = ((index % numArrows) * 45 + Math.floor(index / numArrows) * 45) % 90;
          break;

        case 'magnify':
          bufferVariable = Math.sqrt((x - svgSize / 2) ** 2 + (y - svgSize / 2) ** 2) > svgSize / 3.5 ? 0 : 100;
          break;

        default:
          bufferVariable = 0;
          break;
      }

      const bufferRadius = bufferVariable;

      const offsetAngle = baseAngle + (bufferRadius / Math.max(dist, bufferRadius)) * (Math.PI / 2);

      return offsetAngle * (180 / Math.PI);
    });

    const opacity = useTransform<number, number>([mouseX, mouseY, angle], ([latestX, latestY]) => {
      const distance = Math.sqrt((latestX - x) ** 2 + (latestY - y) ** 2);
      const cellSize = svgSize / 4;
      const cellX = Math.floor(x / cellSize);
      const cellY = Math.floor(y / cellSize);
      const cellCenterX = (cellX + 0.5) * cellSize;
      const cellCenterY = (cellY + 0.5) * cellSize;

      const lineWidth = arrowSize * 1;
      const distToCellCenter = Math.sqrt(Math.pow(x - cellCenterX, 2) + Math.pow(y - cellCenterY, 2));

      const axisDistInCell = Math.min(Math.abs(x - cellCenterX), Math.abs(y - cellCenterY));

      const twist = (col: number, row: number, length: number) => {
        const angle = Math.atan2(row - length / 2, col - length / 2);
        const radius = Math.sqrt(Math.pow(row - length / 2, 2) + Math.pow(col - length / 2, 2));
        const spiral = Math.sin(angle * 0.5 + radius / 0.5);
        return spiral;
      };

      switch (variant) {
        case 'swirl':
          // make a spiral by multiplying the index each revolution by the distance from the cursor
          return 1;

        case 'twist':
          return twist(index, index, numArrows) >= 0.5 ? 1 : 0.2;

        case 'straight':
          // should return a plus shaped vector field, 2 arrows wide
          if (
            //x
            (Math.abs(x - latestX) < size && Math.abs(y - latestY) < (arrowSize - 0.5) * 2) ||
            //y
            (Math.abs(y - latestY) < size && Math.abs(x - latestX) < (arrowSize - 0.5) * 2)
          ) {
            return 1;
          } else {
            return 0.5;
          }

        case 'radial':
          return Math.max(
            0.5,
            Math.min(1, Math.sin(distance / (arrowSize * 2) + ((index % (arrowSize * 3)) / size) * 2)) / 2 + 0.5
          );
        case 'checker':
          return Math.floor((index % numArrows) + Math.floor(index / numArrows)) % 2 === 0
            ? Math.min(1, Math.sin((distance / size) * 2)) / 2 + 0.4
            : 0.1;

        case 'magnify':
          // if within the circle, return 1, else 0
          if (Math.sqrt((x - svgSize / 2) ** 2 + (y - svgSize / 2) ** 2) > svgSize / 3.5) {
            return distance < svgSize / 10 ? 1 : 0.4;
          } else {
            return distance < svgSize / 3.5 ? 1 : 0.4;
          }

        case 'grid':
          if (axisDistInCell < lineWidth) {
            return 1;
          } else {
            return Math.max(0.32, 1 - (axisDistInCell * distToCellCenter) / (cellSize / 2));
          }

        default:
          return 1;
      }
    });

    const radialIndex = Math.floor((225 + angle.get()) % 180);

    const x2 = useSpring(
      useTransform(angle, (a) => x + arrowSize * Math.cos((a * Math.PI) / 180)),
      { stiffness: 400, damping: 20, mass: 0.1 }
    );
    const y2 = useSpring(
      useTransform(angle, (a) => y + arrowSize * Math.sin((a * Math.PI) / 180)),
      { stiffness: 400, damping: 20, mass: 0.1 }
    );

    const springOpacity = useSpring(opacity, { stiffness: 400, damping: 20, mass: 0.1 });

    return { x, y, x2, y2, angle: radialIndex, opacity: springOpacity };
  });

  const classNames = `${style.vectorfield} ${className}`;
  return (
    <svg
      ref={svgRef}
      width={'100%'}
      // width={svgSize}
      // height={'100%'}
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={classNames}
      style={{
        visibility: isInView ? 'visible' : 'hidden',
        // aspectRatio: 1
        // maxWidth: svgSize,
        // width: '100%'
        ...props.style
      }}
    >
      {arrows.map((arrow, index) => (
        <motion.line
          vectorEffect={'non-scaling-stroke' as any}
          key={index}
          x1={arrow.x}
          y1={arrow.y}
          x2={arrow.x2}
          y2={arrow.y2}
          stroke="currentColor"
          strokeOpacity={arrow.opacity}
          strokeWidth={1.33}
          variants={loop ? loopArrowVariant : arrowVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={{ i: arrow.angle }}
        />
      ))}
    </svg>
  );
};

VectorField.displayName = 'VectorField';
