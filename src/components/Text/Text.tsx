import React from 'react';
import styles from './text.module.css';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  variant?: keyof typeof styles;
  balance?: boolean;
  secondary?: boolean;
}

const TextBase = React.forwardRef<HTMLElement, TextProps>(
  ({ children, className, as: Component = 'span', variant, balance, secondary, ...props }, ref) => {
    const finalClassName = [
      variant && styles[variant],
      className || '',
      balance ? styles.balance : '',
      secondary ? styles.secondary : ''
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref} className={finalClassName} {...props}>
        {children}
      </Component>
    );
  }
);

const Text = ({ children, ...props }: TextProps) => {
  return <TextBase {...props}>{children}</TextBase>;
};

const createStyledText = (variant: keyof typeof styles, defaultTag: React.ElementType = 'span') => {
  return React.forwardRef<HTMLElement, Omit<TextProps, 'variant'>>((props, ref) => (
    <TextBase ref={ref} as={defaultTag} variant={variant} {...props} />
  ));
};

Text.H1 = createStyledText('h1', 'h1');
Text.H2 = createStyledText('h2', 'h2');
Text.H3 = createStyledText('h3', 'h3');
Text.H4 = createStyledText('h4', 'h4');
Text.H5 = createStyledText('h5', 'h5');
Text.H6 = createStyledText('h6', 'h6');
Text.Body = createStyledText('body', 'p');
Text.Small = createStyledText('small', 'span');
Text.Caps = createStyledText('caps', 'span');
Text.SmallCaps = createStyledText('smallCaps', 'span');

export { Text };

Text.displayName = 'Text';
Text.H1.displayName = 'Text.H1';
Text.H2.displayName = 'Text.H2';
Text.H3.displayName = 'Text.H3';
Text.H4.displayName = 'Text.H4';
Text.H5.displayName = 'Text.H5';
Text.H6.displayName = 'Text.H6';
Text.Body.displayName = 'Text.Body';
Text.Small.displayName = 'Text.Small';
Text.Caps.displayName = 'Text.Caps';
Text.SmallCaps.displayName = 'Text.SmallCaps';
