import style from './button.module.css';
import { motion, useInView } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { VectorField } from '../VectorField';
import { Text } from '@/components';
import { themeClasses, extractTextFromChildren } from '@/helpers/utils';
import { ScrambleText } from '@/helpers/ScrambleText';
import React, { useRef } from 'react';

interface ButtonProps {
  type?: 'primary-interactive' | 'primary' | 'secondary';
  size?: 'default' | 'small';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  to?: string;
  theme?: keyof typeof themeClasses;
}

export const Button = ({
  children,
  type = 'primary',
  size = 'default',
  href = '',
  to = '',
  theme = 0,
  onClick,
  ...rest
}: ButtonProps) => {
  const MotionComponent = motion(Link);

  const themeValue = themeClasses[theme || 0];
  const typeValue = type === 'primary' ? style.primary : style.secondary;
  const className = rest.className ? rest.className : '';
  const sizeValue = size === 'small' ? style.small : '';
  const isInteractive = type === 'primary-interactive';

  const buttonStyle = `theme ${style.button} ${typeValue} ${sizeValue} ${className} `;

  const destination = href ? href : to;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 'some'
  });

  const sanitizedText = extractTextFromChildren(children);
  const ScrambledTextComponent = React.useCallback(() => {
    return <ScrambleText inputText={sanitizedText} inView={isInView} />;
  }, [sanitizedText, isInView]);

  return (
    <div ref={ref} className={style.ref}>
      <MotionComponent
        {...rest}
        data-theme={themeValue}
        className={buttonStyle}
        whileHover="hover"
        initial="default"
        animate="default"
        to={destination}
        target={href ? '_blank' : ''}
        disabled={onClick ? true : false}
        onClick={onClick}
      >
        <Text variant={size === 'default' ? 'caps' : 'smallCaps'}>
          <ScrambledTextComponent />
        </Text>
        {isInteractive && <VectorField variant="straight" count={9} padding={13} className={style.field} />}
      </MotionComponent>
    </div>
  );
};

Button.displayName = 'Button';
