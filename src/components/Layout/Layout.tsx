import { Footer, Navigation } from '@/components';
import style from './layout.module.css';
import { useMatchRoute } from '@tanstack/react-router';
import { settings } from '@/settings';
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  theme?: string;
}

export const Layout = (props: LayoutProps) => {
  const { children, theme } = props;

  const showBackButton = ['/blog/$postId'];
  const showPromoBanner = settings.promoBannerShow;
  const matchRoute = useMatchRoute();
  const matchedShowBackButton = showBackButton.some((route) => matchRoute({ to: route }));
  const matchedShowPromoBanner = showPromoBanner && !matchedShowBackButton;

  return (
    <div data-theme={theme}>
      <main className={style.layoutgrid}>
        <Navigation backButton={matchedShowBackButton} promoBanner={matchedShowPromoBanner} />
        {children}
        <Footer />
      </main>
    </div>
  );
};
