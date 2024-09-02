import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import style from './feature.module.css';
import { Button, Flex, Text, VectorField, Img, ShapeField, Logo, Icon } from '@/components';
import { useState } from 'react';
import radial from '@/assets/radial.svg';

const FeatureComparison = () => {
  return (
    <div className={`col bleed ${style.comparison}`}>
      <div className={`${style.banner}`}>
        <div className={`${style.bannertext}`}>
          <Text.H5>Move with the markets.</Text.H5>
          <Text.Small secondary balance>
            The right model - at the right time.
          </Text.Small>
        </div>
        <section>
          <VectorField loop />
          <Flex center gap={1}>
            <Text.Small>Bayesline</Text.Small>
            <Text.Small secondary>Seconds</Text.Small>
          </Flex>
        </section>
        <section>
          <VectorField variant="twist" loop />
          <Flex center gap={1}>
            <Text.Small>Traditional tools</Text.Small>
            <Text.Small secondary>Weeks</Text.Small>
          </Flex>
        </section>
      </div>
      <Flex column gap={4} className={`col ${style.text}`}>
        <Text.Body balance>
          Bayesline empowers you to truly own your risk and attribution analytics. See your unique understanding of the
          markets immediately reflected in your equity risk models.
        </Text.Body>
        <div className={`${style.cta}`}>
          <Button type="secondary" theme={1} href="http://schedule30.bayesline.com" target="_blank">
            Book a Demo
          </Button>
          <Text.Small balance secondary>
            Talk to one of our founders directly.
          </Text.Small>
        </div>
      </Flex>
      <div className={`col ${style.ui}`}>
        <Img src="/src/assets/homepage-hero.png" deviceBorder />
      </div>
    </div>
  );
};

const FeatureCenterAsset = () => {
  return (
    <div data-theme="one" className={`theme col ${style.centerAsset}`}>
      <div className={`${style.copy}`}>
        <Text.H2 balance>Your data, our engine.</Text.H2>
        <Text.Body balance secondary as="span">
          <Text.Body as="span">Start unlocking the alpha on your equity risk models today.</Text.Body> Try it out for
          free with just your email or book a demo and talk to us about your needs.
        </Text.Body>
      </div>
      <div className={style.cpu}>
        <Logo.Mark loop className={style.logo} />
        <ShapeField
          color1="var(--accent-1)"
          color2="var(--accent-3)"
          variant="pcb"
          rows={33}
          columns={19}
          padding={1.5}
          className={`col ${style.shapefield}`}
        />
      </div>

      <div className={`${style.ctas}`}>
        <Button type="secondary" size="small" theme={1} href="https://app.bayesline.com" target="_blank">
          Try for Free
        </Button>
        <Button type="primary" size="small" theme={1} href="http://schedule30.bayesline.com" target="_blank">
          Book a Demo
        </Button>
      </div>
    </div>
  );
};

const selectorVariant = {
  hidden: {
    opacity: 0,
    y: 8
  },
  visible: {
    opacity: 1,
    y: 0
  },
  hide: {
    opacity: 0,
    y: -8
  }
};

const selectorImageVariant = {
  hidden: {
    y: 14,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  },
  hide: {
    y: -14,
    opacity: 0
  }
};

const selectorTransitionDelay = {
  type: 'spring',
  duration: 0.5
};

const data = {
  header: "What's next",
  features: [
    {
      id: '1',
      featureTitle: 'Deploy locally',
      featureIcon: 'globe',
      featureDescription:
        'We offer flexibility to deploy in your virtual private cloud environment, keeping your data and settings only visible to you at all times.',
      image: 'homepage-hero.png'
    },
    {
      id: '2',
      featureTitle: 'Smart Insights',
      featureIcon: 'layers',
      featureDescription:
        "Traditional models don't align with realistic portfolios, and can't be adjusted to reflect market changes",
      image: 'homepage-hero.png'
    },
    {
      id: '3',
      featureTitle: 'Growth Trends',
      featureIcon: 'chart',
      featureDescription:
        "It's a great way to see how your portfolio is performing, and how it's doing compared to the market.",
      image: 'homepage-hero.png'
    }
  ]
} as const;

const FeatureTicker = () => {
  const [selectedTab, setSelectedTab] = useState<(typeof data.features)[number]>(data.features[0]);
  return (
    <div className={`col ${style.ticker}`}>
      <nav>
        {data?.features.map((item) => {
          return (
            <button
              key={item.id}
              className={item === selectedTab ? 'selected' : ''}
              onClick={() => {
                setSelectedTab(item);
              }}
            >
              <div className={style.featureTitle}>
                <Icon name={item.featureIcon} />
                <Text.Body>{`${item.featureTitle}`}</Text.Body>
              </div>

              {item === selectedTab ? <motion.div className={style.underline} layoutId="underline" /> : null}
            </button>
          );
        })}
      </nav>{' '}
      <AnimatePresence mode="wait">
        <motion.div
          className={`${style.content}`}
          key={selectedTab.id ? selectedTab.id : ''}
          variants={selectorVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Text.H4 className={`${style.text}`}>{selectedTab ? selectedTab.featureDescription : ''}</Text.H4>{' '}
          <motion.div
            className={` ${style.image}`}
            variants={selectorImageVariant}
            transition={selectorTransitionDelay}
            initial="hidden"
            animate="visible"
            exit="hide"
          >
            <Img deviceBorder src={selectedTab.image} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <img src={radial} className={style.bgImage} />
    </div>
  );
};

export const Feature = Object.assign(
  {},
  {
    Comparison: FeatureComparison,
    CenterAsset: FeatureCenterAsset,
    Ticker: FeatureTicker
  }
);
