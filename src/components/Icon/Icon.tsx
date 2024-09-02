import style from './icon.module.css';

export const Icon = ({ name = 'bayesian', small = false, secondary = true, ...rest }: IconProps) => {
  const iconPath = IconPaths[name];
  const secondaryClass = secondary ? style.secondary : '';
  return (
    <svg
      width={small ? 20 : 40}
      height={small ? 20 : 40}
      viewBox="0 0 40 40"
      fill="none"
      className={`${rest.className} ${secondaryClass}`}
      shapeRendering="geometricPrecision"
      {...rest}
    >
      {iconPath}
    </svg>
  );
};

export const IconPaths = {
  documentSearch: (
    <>
      <path
        d="M8 5.5L24 5.5M20 11.5L30 11.5M24 17.5L36 17.5M24 23.5L36 23.5M28 29.5L36 29.5M36 35.5L8 35.5M8 29.5L16 29.5M24 30.5L15.95 22.45M15.95 22.45C17.216 21.183 18 19.433 18 17.5 18 13.634 14.866 10.5 11 10.5 7.134 10.5 4 13.634 4 17.5 4 21.366 7.134 24.5 11 24.5 12.933 24.5 14.683 23.716 15.95 22.45Z"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  documentSearchAlt: (
    <>
      <path
        d="M17.5 10L17.5 4M23.5 24L23.5 4M29.5 30L29.5 10M35.5 36L35.5 16M11.5 8L11.5 4M11.5 36L11.5 32M17.5 36L17.5 32M26.5 35L16.45 24.95M16.45 24.95C17.716 23.683 18.5 21.933 18.5 20 18.5 16.134 15.366 13 11.5 13 7.634 13 4.5 16.134 4.5 20 4.5 23.866 7.634 27 11.5 27 13.433 27 15.183 26.216 16.45 24.95Z"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  document: (
    <>
      <path
        d="M14.5 36L14.5 4M20.5 36L20.5 4M26.5 36L26.5 10M32.5 36L32.5 16M8.5 36L8.5 4"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  layers: (
    <>
      <path
        d="M20.5 4V20 36M8.5 8V16M14.5 18L14.5 6M26.5 18V6M32.5 8V16M2.5 10V14M38.5 10V14M8.5 24V32M14.5 34L14.5 22M26.5 34V22M32.5 24V32M2.5 26V30M38.5 26V30"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  layersAlt: (
    <>
      <path
        d="M20.5 39V2M8.5 17V24M14.5 37L14.5 4M26.5 37V4M32.5 17V24M2.5 19V22M38.5 19V22M8.5 27V34M32.5 27V34M2.5 29V32M38.5 29V32M8.5 7V14M32.5 7V14M2.5 9V12M38.5 9V12"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  bayesian: (
    <>
      <path
        d="M20.5 36V4M8.5 16V24M14.5 28L14.5 12M26.5 28V12M32.5 16V24M2.5 18V22M38.5 18V22"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  mail: (
    <>
      <path
        d="M20.5 35V25M8.5 17V35M14.5 35L14.5 21M26.5 35V21M32.5 17V35M2.5 13V35M38.5 13V35M20.5 13V5M26.5 13V7M32.5 13V9M14.5 13V7M8.5 13V9"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  globe: (
    <>
      <path
        d="M36 11.5H4M2 17.5H38M4 29.5H36M28 35.5H12M2 23.5H38M28 5.5H12"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  location: (
    <>
      <path
        d="M29.5 28L29.5 2M23.5 0L23.5 9.5M23.5 40V19M11.5 2L11.5 28M5.5 20L5.5 10M17.5 0L17.5 9.5M17.5 40V19M35.5 20V10"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  warning: (
    <>
      <path
        d="M20.5 36V30M20.5 4V26M8.5 20V36M14.5 36L14.5 12M26.5 36V12M32.5 20V36M2.5 30V36M38.5 30V36"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  folder: (
    <>
      <path
        d="M35 26.5L6 26.5M35 20.5L6 20.5M35 14.5H6M19 8.5L6 8.5M35 32.5L6 32.5"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  folderLink: (
    <>
      <path
        d="M13.5 25.5L5 25.5M34 19.5H5M34 13.5H5M18 7.5L5 7.5M13.5 31.5H5M25.5 25.5H22.5C20.291 25.5 18.5 27.291 18.5 29.5V29.5C18.5 31.709 20.291 33.5 22.5 33.5H25.5M27.5 25.5H30.5C32.709 25.5 34.5 27.291 34.5 29.5V29.5C34.5 31.709 32.709 33.5 30.5 33.5H27.5M29.5 29.5L23.5 29.5"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  settings: (
    <>
      <path
        d="M17 16.5H34M17 10.5H34M24 30.5H7M24 24.5H7M31.5 32.5H29.5C28.395 32.5 27.5 31.605 27.5 30.5V24.5C27.5 23.395 28.395 22.5 29.5 22.5H31.5C32.605 22.5 33.5 23.395 33.5 24.5L33.5 30.5C33.5 31.605 32.605 32.5 31.5 32.5ZM11.5 18.5H9.5C8.395 18.5 7.5 17.605 7.5 16.5L7.5 10.5C7.5 9.395 8.395 8.5 9.5 8.5H11.5C12.605 8.5 13.5 9.395 13.5 10.5V16.5C13.5 17.605 12.605 18.5 11.5 18.5Z"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  chart: (
    <>
      <path
        d="M29.5 36L29.5 10M23.5 36L23.5 16M17.5 36L17.5 22M11.5 36L11.5 28M35.5 36V4M5.5 32L5.5 36"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  experiment: (
    <>
      <path
        d="M25 11.5H16M16 17.5H25M8 29.5H33M37 35.5H4M12 23.5H29M27 5.5H14"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  enterprise: (
    <>
      <path
        d="M11.5 38L11.5 16M17.5 38L17.5 2M23.5 38L23.5 6M29.5 38L29.5 10M5.5 38L5.5 12M35.5 14L35.5 38"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  connect: (
    <>
      <path
        d="M23.5 4L23.5 12 23.5 17 17.5 23 17.5 28 17.5 36M29.5 12L29.5 4M35.5 12L35.5 4M17.5 4L17.5 12 17.5 16M5.5 12L5.5 4M23.5 36L23.5 28 23.5 24M29.5 36L29.5 28M35.5 36L35.5 28M5.5 36L5.5 28M29.5 24L29.5 16M35.5 24L35.5 16M5.5 24L5.5 16M11.5 12L11.5 4M11.5 36L11.5 28M11.5 24L11.5 16"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  cloud: (
    <>
      <path
        d="M26.5 34L26.5 6M20.5 34L20.5 6M14.5 34L14.5 9M8.5 34L8.5 20M32.5 34L32.5 14M2.5 24L2.5 32M38.5 19L38.5 32"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  upload: (
    <>
      <path
        d="M20.5 5L20.5 35M20.5 5L26.5 11M20.5 5L14.5 11M8.5 23L8.5 35M32.5 23V35M26.5 16L26.5 35M14.5 16L14.5 35"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  profile: (
    <>
      <path
        d="M31 11.5H10M8 29.5H33M37 35.5H4M18 23.5H23M27 5.5H14M27 17.5H14"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  logout: (
    <>
      <path
        d="M5 26.5H24M35 20.5L5 20.5M35 20.5L29 26.5M35 20.5L29 14.5M5 14.5H24M33 8.5L5 8.5M33 32.5L5 32.5"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  fragmentize: (
    <>
      <path
        d="M29.5 12L29.5 2M35.5 12L35.5 2M29.5 38L29.5 28M23.5 38L23.5 28M35.5 38L35.5 28M17.5 38L17.5 28M11.5 38L11.5 28M5.5 38L5.5 28M29.5 25L29.5 15M17.5 25L17.5 15M35.5 25L35.5 15M23.5 25L23.5 15"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  uploadData: (
    <>
      <path
        d="M5.5 28L5.5 36M29.5 28V36M23.5 28L23.5 36M11.5 16L11.5 36M11.5 16L5 22.5M11.5 16L18 22.5M17.5 28L17.5 36M29.5 16V24M23.5 16L23.5 24M5.5 4L5.5 12M29.5 4V12M23.5 4L23.5 12M11.5 4L11.5 12M17.5 4L17.5 12M35.5 28V36M35.5 16V24M35.5 4V12"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  barchart: (
    <>
      <path
        d="M11.5 28L11.5 36M17.5 16L17.5 36M23.5 16L23.5 36M29.5 4L29.5 36M5.5 28V36M35.5 4V36"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  chartLog: (
    <>
      <path
        d="M11.5 28L11.5 36M17.5 24L17.5 36M23.5 20L23.5 36M29.5 16L29.5 36M5.5 32V36M35.5 4V36"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  chartRandom: (
    <>
      <path
        d="M11.5 12L11.5 36M17.5 22L17.5 36M23.5 4V36M29.5 22L29.5 36M5.5 22V36M35.5 14V36"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  chartTree: (
    <>
      <path
        d="M14.5 12L14.5 2M26.5 12L26.5 2M32.5 38L32.5 28M26.5 38L26.5 28M20.5 38L20.5 28M14.5 38L14.5 28M8.5 38L8.5 28M32.5 25L32.5 15M8.5 25L8.5 15M20.5 25L20.5 15M2.5 38L2.5 28M38.5 38L38.5 28"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  chartEqualizer: (
    <>
      <path
        d="M28 23.5L38 23.5M28 29.5L38 29.5M2 23.5L12 23.5M2 17.5L12 17.5M2 11.5L12 11.5M15 29.5L25 29.5M15 11.5L25 11.5M15 23.5L25 23.5M15 5.5L25 5.5M2 29.5L12 29.5M15 17.5L25 17.5M28 35.5L38 35.5M15 35.5L25 35.5M2 35.5L12 35.5"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  chartBlocks: (
    <>
      <path
        d="M28 23.5L38 23.5M28 29.5L38 29.5M2 23.5L12 23.5M15 17.5L25 17.5M15 11.5L25 11.5M15 5.5L25 5.5M28 35.5L38 35.5M15 35.5L25 35.5M2 35.5L12 35.5M2 29.5L12 29.5M15.5 30.5L24.5 30.5 24.5 22.5 15.5 22.5 15.5 30.5ZM28.5 18.5L37.5 18.5 37.5 10.5 28.5 10.5 28.5 18.5ZM2.5 18.5L11.5 18.5 11.5 10.5 2.5 10.5 2.5 18.5Z"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  code: (
    <>
      <path
        d="M14 14.5L24 14.5M24 20.5L32 20.5M2 14.5L6 14.5M2 8.5L6 8.5M2 20.5L6 20.5M10 8.5L20 8.5M14 26.5L24 26.5M2 26.5L6 26.5M22 8.5H26M28 8.5H34M26 14.5H30M18 20.5H22M10 32.5H14M2 32.5L6 32.5M34 20.5H38"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  direction: (
    <>
      <path
        d="M10.5 6.5L4.5 12.5 10.5 18.5M18.5 6.5L12.5 12.5 18.5 18.5M30.5 22.5L36.5 28.5 30.5 34.5M22.5 22.5L28.5 28.5 22.5 34.5M26.5 6.5L20.5 12.5 26.5 18.5M34.5 6.5L28.5 12.5 34.5 18.5M14.5 22.5L20.5 28.5 14.5 34.5M6.5 22.5L12.5 28.5 6.5 34.5"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  ),
  quote: (
    <>
      <path
        d="M18 18.5L1 18.5M18 12.5H1M18 6.5H1M16 24.5H8M12 30.5H8M39 18.5L22 18.5M39 12.5H22M39 6.5H22M37 24.5H29M33 30.5H29"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </>
  )
} as const;

export interface IconProps {
  name?: keyof typeof IconPaths;
  className?: string;
  small?: boolean;
  secondary?: boolean;
  style?: React.CSSProperties;
}

Icon.displayName = 'Icon';
