import React, { useState, useEffect } from 'react';
import style from './cookie.module.css';
import { Button, Flex, Text } from '@/components';
import { settings } from '@/settings';
interface Props {
  onConsent: (accepted: boolean) => void;
}

const useScrollCheck = (): boolean => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = (): void => {
      const scrolled = window.scrollY > 10;
      setHasScrolled(scrolled);
    };

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return hasScrolled;
};

export const Cookie = ({ onConsent }: Props) => {
  const [show, setShow] = useState(false);
  const hasScrolled = useScrollCheck();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null && hasScrolled) {
      setShow(true);
    } else {
      setShow(false);
      if (consent === 'accepted') {
        onConsent(true);
        initializeTracking();
      } else if (consent === 'rejected') {
        onConsent(false);
      }
    }
  }, [onConsent, hasScrolled]);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    onConsent(true);
    setShow(false);
    initializeTracking();
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    onConsent(false);
    setShow(false);
  };

  const initializeTracking = () => {
    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${settings.GTagID}`;
    document.head.appendChild(scriptTag);

    scriptTag.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', settings.GTagID);
    };
  };

  return (
    <>
      {/* @ts-ignore */}
      <div className={`theme col bleed cookie ${style.cookie} ${!show ? style.show : ''}`}>
        <div className={`col ${style.cookieWrapper}`}>
          <Text.Small balance className={style.info}>
            You control your data. <br />
            <Text secondary>
              We use cookies to track functional & statistical data.{' '}
              <a href="https://www.google.com/policies/technologies/cookies/">Info</a>
            </Text>{' '}
          </Text.Small>
          <Flex gap={1}>
            <Button theme={1} type="primary" size="small" onClick={handleAccept}>
              Accept
            </Button>
            <Button theme={0} type="secondary" size="small" onClick={handleReject}>
              Reject
            </Button>
          </Flex>
        </div>
      </div>
    </>
  );
};
