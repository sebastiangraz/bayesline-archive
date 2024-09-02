import React from 'react';
import style from './cards.module.css';
import { themeClasses } from '@/helpers/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  dataTheme?: keyof typeof themeClasses;
  onClick?: () => void;
}

interface CardsProps {
  children: React.ReactNode;
  className?: string;
  layout?: 'grid-left' | 'grid-col' | 'grid-right';
}

// This interface extends the types to include the specific styled variants
interface BaseCardComponent extends React.FunctionComponent<CardProps> {
  Primary: React.FunctionComponent<CardProps>;
  Secondary: React.FunctionComponent<CardProps>;
}

const BaseCard: React.FunctionComponent<CardProps> = ({ children, className = '', dataTheme = 0, ...otherProps }) => {
  const themeValue = themeClasses[dataTheme];
  const classNames = `col theme ${style.card} ${className}`;
  return (
    <div data-theme={themeValue} className={classNames} {...otherProps}>
      {children}
    </div>
  );
};

const PrimaryCard: React.FunctionComponent<CardProps> = ({ children, className = '', ...otherProps }) => {
  const typeClassName = `${style.primary} ${className}`;
  return (
    <BaseCard className={typeClassName} {...otherProps}>
      {children}
    </BaseCard>
  );
};

const SecondaryCard: React.FunctionComponent<CardProps> = ({ children, className = '', ...otherProps }) => {
  const typeClassName = `${style.secondary} ${className}`;
  return (
    <BaseCard className={typeClassName} {...otherProps}>
      {children}
    </BaseCard>
  );
};

// Make Primary the default
export const Card: BaseCardComponent = Object.assign(PrimaryCard, {
  Primary: PrimaryCard,
  Secondary: SecondaryCard
});

// Define the Cards wrapper component
export const Cards: React.FunctionComponent<CardsProps> = ({
  children,
  className = '',
  layout = 'grid-col',
  ...otherProps
}) => {
  const layoutClasses =
    layout === 'grid-left' ? style.cardsGridLeft : layout === 'grid-right' ? style.cardsGridRight : '';

  const classNames = `col ${style.cards} ${layoutClasses} ${className} `;
  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  );
};
