import style from './flex.module.css';

interface FlexProps {
  children: React.ReactNode;
  className?: string;
  column?: boolean;
  between?: boolean;
  wrap?: boolean;
  center?: boolean;
  gap?: 1 | 2 | 3 | 4 | 5;
  style?: string;
}

export const Flex = (props: FlexProps) => {
  const { children, ...rest } = props;

  const row = rest.column ? style.column : '';
  const wrap = rest.wrap ? style.wrap : '';
  const className = rest.className ? rest.className : '';
  const between = rest.between ? style.between : '';
  const center = rest.center ? style.center : '';
  const classNameOverride = rest.style ? rest.style : '';

  let gap = '';
  switch (rest.gap) {
    case 1:
      gap = style.gap1;
      break;
    case 2:
      gap = style.gap2;
      break;
    case 3:
      gap = style.gap3;
      break;
    case 4:
      gap = style.gap4;
      break;
    case 5:
      gap = style.gap5;
      break;
    default:
      gap = '';
  }

  return (
    <div className={`${className} ${style.flex} ${row} ${wrap} ${gap} ${between} ${center} ${classNameOverride}`}>
      {children}
    </div>
  );
};
