import React, { useRef, useMemo } from 'react';
import seedrandom from 'seedrandom';
import style from './asset.module.css';
import { assets, themes } from './assets';
import { motion, useInView } from 'framer-motion';
import { templateDivider } from '@/helpers/utils';

const childVariant = {
  hidden: ({
    random
  }: {
    random: {
      clip: string;
    };
  }) => ({
    clipPath: random.clip,
    opacity: 0
  }),
  show: ({ i }: { i: number }) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      duration: 0.3 + i * 0.35,
      ease: [1, 0, 0.17, 1],

      opacity: {
        duration: 0.25,
        delay: 0.1
      }
    }
  })
};
const imageVariant = {
  hidden: ({
    random
  }: {
    random: {
      '--x': string;
      '--y': string;
    };
  }) => ({
    '--x': random['--x'],
    '--y': random['--y'],
    opacity: 0
  }),
  show: ({ i }: { i: number }) => ({
    '--x': '0px',
    '--y': '0px',
    opacity: 1,
    transition: {
      duration: 0.3 + i * 0.35,
      ease: [1, 0, 0.17, 1],
      delay: 0.1
    }
  })
};

const createColorGenerator = (colors: string | any[], subdivisions: { visible: boolean }[]) => {
  let index = 0;
  let colorIndex = 0;

  return () => {
    while (!subdivisions[index].visible && index < subdivisions.length - 1) {
      index++;
    }

    const colorPair = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    index++;
    return colorPair;
  };
};

const width = 288;
const height = 288;

const generateSVGs = ({ seed, theme = 0 }: { seed: string; theme?: number }) => {
  const terminatedSeed = `${seed}\0`;
  const rng = seedrandom(terminatedSeed);

  const isThemeSet = theme > 0;

  const themeKeys = Object.keys(themes);
  const themeOverride = themes[themeKeys[theme - 1]];

  const randomTheme = themes[themeKeys[Math.floor(rng() * themeKeys.length)]];
  const selectedTheme = isThemeSet ? themeOverride : randomTheme;

  let subdivisions = templateDivider(0, 0, width, height, rng);
  let getColor = createColorGenerator(selectedTheme, subdivisions);

  return subdivisions
    .filter((sub) => sub.visible)
    .map((sub) => {
      const colorPair = getColor();
      return {
        src: assets[Math.floor(rng() * assets.length)].path,
        width: sub.width,
        height: sub.height,
        x: sub.x,
        y: sub.y,
        fg: colorPair.fg,
        bg: colorPair.bg,
        visible: sub.visible
      };
    });
};

const directionsArr = [
  { clip: 'inset(0% 0% 25% 0%)' },
  { clip: 'inset(25% 0% 0% 0%)' },
  { clip: 'inset(0% 25% 0% 0%)' },
  { clip: 'inset(0% 0% 0% 25%)' }
];

const imageDirectionsArr = [
  { '--y': '-4px', '--x': '0px' },
  { '--y': '4px', '--x': '0px' },
  { '--y': '0px', '--x': '-4px' },
  { '--y': '0px', '--x': '4px' }
];

export const Asset = React.memo(
  ({ seed, theme = 0 }: { seed: string; theme?: number }) => {
    const svgs = useMemo(() => generateSVGs({ seed, theme }).filter((svg) => svg.visible), [seed, theme]);

    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: true,
      amount: 'some'
    });

    return (
      <svg
        ref={ref}
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className={`${style.asset}`}
        data-seed={seed}
      >
        {svgs.map((svg, index) => {
          const directions = directionsArr[index % directionsArr.length];
          const imageDirections = imageDirectionsArr[index % imageDirectionsArr.length];

          return (
            <motion.g
              initial="hidden"
              variants={childVariant}
              animate={isInView ? 'show' : 'hidden'}
              custom={{ i: index, random: directions }}
              key={`svg-${index}`}
            >
              <rect
                x={svg.x}
                y={svg.y}
                width={svg.width}
                height={svg.height}
                fill={svg.bg}
                shapeRendering="crispEdges"
              />
              <motion.g
                variants={imageVariant}
                custom={{ i: index, random: imageDirections }}
                style={{ x: 'var(--x)', y: 'var(--y)' }}
              >
                <svg
                  width={svg.width}
                  height={svg.height}
                  preserveAspectRatio="xMidYMid meet"
                  x={svg.x}
                  y={svg.y}
                  viewBox={`0 0 144 144`}
                  style={{ color: svg.fg }}
                  className={`${style.foregroundSvg}`}
                >
                  {svg.src()}
                </svg>
              </motion.g>
            </motion.g>
          );
        })}
      </svg>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.seed === nextProps.seed;
  }
);

{
  //rotate seed every 1 second
  /*
    const [count, setCount] = React.useState(Math.floor(Math.random() * 1000));
    React.useEffect(() => {
      const interval = setInterval(() => {
        setCount((count) => count + 1);
      }, 1500);
      return () => clearInterval(interval);
    }, []);
    seed = `${seed}-${count}`;
  */
}

Asset.displayName = 'Asset';
