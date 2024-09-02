import { motion } from 'framer-motion';
import React from 'react';
import { extractTextFromChildren } from '@/helpers/utils';
interface StaggerTextProps {
  children: React.ReactNode;
  delay?: number;
}

export const StaggerText = (props: StaggerTextProps) => {
  const { delay, children } = props;
  const content = extractTextFromChildren(children);
  const contentWords = content.split(' ');

  // const duration = contentWords.length * 0.064;

  const parentVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay: delay || 0,
        staggerChildren: 0.024,
        duration: 0.3,
        delayChildren: delay || 0.3,
        ease: [0.83, 0, 0.17, 1]
      }
    }
  };

  const childVariant = {
    hidden: { opacity: 0, x: 3 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.5, 0, 0.2, 0.5]
      }
    }
  };

  return (
    <motion.span variants={parentVariant} initial="hidden" whileInView="show">
      {contentWords.map((word, index) => {
        return (
          <motion.span key={index} variants={childVariant}>
            {`${word} `}
          </motion.span>
        );
      })}
    </motion.span>
  );
};
