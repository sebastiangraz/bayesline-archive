import { Link } from '@tanstack/react-router';
import style from './navigation.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo, Text } from '@/components';
import { useEffect, useRef, useState } from 'react';
import { useStickyObserver } from '@/helpers/utils';
import { settings } from '@/settings';

const PromoBanner = () => {
  return (
    <Link to={settings.promoBannerLink} className={style.promoBanner}>
      {/* <Icon small name="chartTree" className={style.promoIcon} /> */}
      <Text.Small className={style.promoText} balance>
        {settings.promoBannerText}
      </Text.Small>{' '}
      <svg width="13" height="14" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 11L11 6.5M11 6.5L2 6.5M11 6.5L6.5 2" stroke="currentColor" />
      </svg>
    </Link>
  );
};

export const Navigation = ({
  backButton = false,
  promoBanner = false
}: {
  backButton?: boolean;
  promoBanner?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isSticky = useStickyObserver(ref, {
    rootMargin: '-1px 0px 0px 0px',
    threshold: [1]
  });

  const entryStyle = backButton ? style.entry : '';

  return (
    <div className={`col theme ${style.navigation} ${entryStyle}`}>
      <div ref={ref} className={`col bleed ${style.switch}`}>
        <DesktopNavigation isSticky={isSticky} />
        <MobileNavigation isSticky={isSticky} />
      </div>
      {backButton && (
        <div className={`col ${style.back}`}>
          <svg width="13" height="14" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 11L2 6.5M2 6.5L11 6.5M2 6.5L6.5 2" stroke="currentColor" />
          </svg>

          <Link to="/blog">{'Back to index'}</Link>
        </div>
      )}

      {promoBanner && <PromoBanner />}
    </div>
  );
};

const DesktopNavigation = (props: any) => {
  const { isSticky } = props;

  return (
    <nav className={`col ${style.desktop}`}>
      <div className={`${style.logowrapper}`}>
        <Link to="/" className={`${style.logo} ${style.link}`}>
          <div className={style.logosentinel}>
            <Logo type={!isSticky} />
          </div>
        </Link>
      </div>

      <div className={` ${style.links}`}>
        {navItems.map((item, index) => {
          const highlight = item.highlight ? style.highlight : '';
          const isLink = item.to.startsWith('http');
          return (
            <Link
              key={`${item.to}-${index}`}
              to={item.to}
              target={isLink ? '_blank' : ''}
              className={`${style.link} ${highlight}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

const MobileNavigation = (props: any) => {
  const { isSticky } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null); // Ref to the nav element

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleNavClick = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navElement = navRef.current as HTMLElement | null;
      if (navElement && !navElement.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);

  return (
    <nav className={`col ${style.mobile} ${isSticky || isMenuOpen ? style.isOpaque : ''}`} ref={navRef}>
      <Link to="/" className={`${style.mobilelogo} ${style.link}`} onClick={handleNavClick}>
        <Logo.Mark className={style.link} />
      </Link>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={style.mobilelinks}
            layout="size"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item, index) => (
              <Link
                key={`${item.to}-${index}`}
                to={item.to}
                target={item.to.startsWith('http') ? '_blank' : ''}
                className={`${style.mobilelink} ${item.highlight ? style.highlight : ''}`}
                onClick={handleNavClick}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`${style.burger} ${isMenuOpen ? style.open : ''}`} onClick={handleMenuToggle}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M34 25.5H6M34 19.5H6M34 13.5H6"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </nav>
  );
};

export const navItems = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/pricing', label: 'Pricing' },
  { to: 'https://app.bayesline.com/equity/code-examples', label: 'API Docs' },
  { to: 'https://app.bayesline.com/', label: 'Explore', highlight: true }
] as { to: string; label: string; highlight?: boolean }[];
