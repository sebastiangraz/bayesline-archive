import style from './footer.module.css';
import { Logo, Text, navItems } from '@/components';
import footer from '@/assets/footer.svg';
import { Link } from '@tanstack/react-router';

const footerItems = [
  { to: '/tos', label: 'Terms of Service' },
  { to: '/privacy', label: 'Privacy Policy' }
];

export const Footer = () => {
  const currentTimestamp = Date.now();
  const date = new Date(currentTimestamp);
  const mergedItems = [...footerItems, ...navItems];
  return (
    <div className={`col theme ${style.footer}`} data-theme="one">
      <div className={`col ${style.content}`}>
        <div className={style.slogan}>
          <Text.H4>Unlock alpha in your risk models.</Text.H4>
        </div>
        <div className={`${style.logo}`}>
          <div className={style.logowrapper}>
            <Logo.Mark loop className={style.logomark} />
          </div>
          <img src={footer} className={style.logoimage} alt="radial" />
        </div>
        <hr />
        <div className={style.menu}>
          <nav>
            {mergedItems.map((item, index) => {
              const isLink = item.to.startsWith('http');
              return (
                <Link key={index} to={item.to} target={isLink ? '_blank' : ''} className={`${style.menuItem}`}>
                  <Text.SmallCaps secondary>{item.label}</Text.SmallCaps>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className={style.copyright}>
          <Text.SmallCaps secondary>© {date.getFullYear()} · Bayesline</Text.SmallCaps>
        </div>
      </div>
    </div>
  );
};
