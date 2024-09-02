import { motion } from 'framer-motion';
import style from './logo.module.css';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { Link } from '@tanstack/react-router';
import logotype from '@/assets/logotype.svg';
import logomark from '@/assets/logomark.svg';
import { Text } from '@/components';
import React from 'react';
interface LogoMarkProps {
  className?: string;
  loop?: boolean;
}

interface LogoTypeProps {
  className?: string;
  type?: boolean;
}
interface BaseLogoProps {
  children?: React.ReactNode;
  className?: string;
  loop?: boolean;
  type?: boolean;
  variant?: keyof typeof Logo;
}

interface BaseLogoComponent extends React.FunctionComponent<BaseLogoProps> {
  Default: React.FunctionComponent<BaseLogoProps>;
  Mark: React.FunctionComponent<LogoMarkProps>;
}

const parentVariant = {
  hidden: {
    transition: {
      duration: 0.1,
      staggerChildren: 0.015,
      staggerDirection: -1
    }
  },
  show: {
    transition: {
      staggerChildren: 0.01,
      duration: 0.1,
      delayChildren: 0.025,
      ease: [0.83, 0, 0.17, 1],
      staggerDirection: 1
    }
  }
};

const childVariant = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.5, 0, 0.2, 0.5]
    }
  }
};

const BaseLogo = ({ children, className = '', variant, loop = false, type = true, ...rest }: BaseLogoProps) => {
  const isLogoDefault = variant === 'Default';

  const handleDownloadType = () => {
    const link = document.createElement('a');
    link.href = logotype;
    link.download = 'logotype.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadMark = () => {
    const link = document.createElement('a');
    link.href = logomark;
    link.download = 'logomark.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    return isLogoDefault ? handleDownloadType() : handleDownloadMark();
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <div className={`~RIGHT_CLICK_TO_DOWNLOAD~ ${className} ${loop ? style.loop : ''} ${style.logo}`} {...rest}>
          {children}
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className={style.contextMenuContent}>
          <ContextMenu.Item className={style.contextMenuItem} onSelect={handleDownload} asChild>
            <Text.Small>Download SVG</Text.Small>
          </ContextMenu.Item>
          <ContextMenu.Separator className={style.contextMenuSeparator} />
          <ContextMenu.Item className={style.contextMenuItem} asChild>
            <Link to="/brand">Brand page</Link>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

const LogoMark = (props: LogoMarkProps) => {
  const { className = '', ...rest } = props;
  return (
    <motion.div className={`${style.mark} ${className} `} {...rest}>
      B
    </motion.div>
  );
};

const LogoType = (props: LogoTypeProps) => {
  const { className = '', type = true, ...rest } = props;

  return (
    <motion.svg
      id="logoSvg"
      className={`${className} ${style.type}`}
      variants={parentVariant}
      initial="hidden"
      animate={type ? 'show' : 'hidden'}
      preserveAspectRatio="xMinYMid meet"
      viewBox="0 0 188 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <motion.path
        variants={childVariant}
        d="M17.5131 19.2264C17.5131 24.3661 14.4674 27.0311 9.13729 27.0311H0V0.38072H8.75657C13.3252 0.38072 16.371 2.47468 16.371 7.61441C16.371 10.4698 14.7339 12.1069 12.6018 12.9445C15.4953 13.6679 17.5131 15.4572 17.5131 19.2264ZM7.99513 4.37828H4.37828V11.612H7.99513C10.2794 11.612 11.9927 10.8505 11.9927 7.99513C11.9927 5.13972 10.2794 4.37828 7.99513 4.37828ZM9.13729 15.0385H4.37828V23.0336H9.13729C12.1831 23.0336 13.1349 21.3203 13.1349 19.036C13.1349 16.7517 12.1831 15.0385 9.13729 15.0385Z"
        fill="currentColor"
      />
      <motion.path
        variants={childVariant}
        d="M41.8165 27.0311H37.2478L35.6107 20.7493H26.9303L25.2932 27.0311H20.8769L28.4913 0.38072H34.2021L41.8165 27.0311ZM27.9583 16.7517H34.5828L31.2705 3.84528L27.9583 16.7517Z"
        fill="currentColor"
      />
      <motion.path
        variants={childVariant}
        d="M54.8624 27.0311H50.4841V16.7517L42.1083 0.38072H46.6769L52.6923 12.9064L58.6696 0.38072H63.2382L54.8624 16.7517V27.0311Z"
        fill="currentColor"
      />
      <motion.path
        variants={childVariant}
        d="M83.5547 27.0311H68.3259V0.38072H83.174V4.37828H72.7042V10.8505H82.7933V14.8481H72.7042V23.0336H83.5547V27.0311Z"
        fill="currentColor"
      />
      <motion.path
        variants={childVariant}
        d="M97.2824 27.4119C91.1909 27.4119 88.1451 24.2138 87.9547 18.8457H92.333C92.5234 21.9295 94.1985 23.6047 97.4727 23.6047C100.366 23.6047 102.079 22.0818 102.079 19.7975C102.079 17.97 101.128 16.9801 98.8433 16.1425L94.0462 14.3912C90.6959 13.1729 88.7542 10.9267 88.7542 7.50019C88.7542 2.5889 92.2188 0 97.3204 0C102.651 0 105.887 3.8072 106.077 7.99513H101.699C101.432 5.21587 99.6428 3.8072 97.1682 3.8072C94.6554 3.8072 93.1325 5.02551 93.1325 7.04333C93.1325 8.83271 93.8178 9.63223 96.3686 10.584L100.747 12.1831C104.364 13.5156 106.458 15.9522 106.458 19.6071C106.458 24.7468 102.612 27.4119 97.2824 27.4119Z"
        fill="currentColor"
      />
      <motion.path
        variants={childVariant}
        d="M126.981 27.0311H112.513V0.38072H116.892V23.0336H126.981V27.0311Z"
        fill="currentColor"
      />
      <motion.path variants={childVariant} d="M137.424 27.0311H133.045V0.38072H137.424V27.0311Z" fill="currentColor" />
      <motion.path
        variants={childVariant}
        d="M164.62 27.0311H158.528L149.772 5.67273V27.0311H145.584V0.38072H151.675L160.432 21.7391V0.38072H164.62V27.0311Z"
        fill="currentColor"
      />
      <motion.path
        variants={childVariant}
        d="M188 27.0311H172.771V0.38072H187.619V4.37828H177.149V10.8505H187.239V14.8481H177.149V23.0336H188V27.0311Z"
        fill="currentColor"
      />
    </motion.svg>
  );
};

const MarkPrimitive = (props: LogoMarkProps) => {
  return (
    <BaseLogo variant="Mark" {...props}>
      <LogoMark className={style.isolated} />
    </BaseLogo>
  );
};

const LogoPrimitive = (props: BaseLogoProps) => {
  return (
    <BaseLogo variant="Default" {...props}>
      <LogoMark />
      <LogoType type={props.type} />
    </BaseLogo>
  );
};

export const Logo: BaseLogoComponent = Object.assign(LogoPrimitive, {
  Default: LogoPrimitive,
  Mark: MarkPrimitive
});

Logo.Mark.displayName = 'Logo.Mark';
Logo.displayName = 'Logo';
