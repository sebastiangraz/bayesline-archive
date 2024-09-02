import { StaggerText } from '@/helpers/StaggerText';
import style from './hero.module.css';
import { Button, Img, Text, VectorField } from '@/components';
import nvidia from '@/assets/nvidia.svg';
import ycomb from '@/assets/ycomb.svg';
import { motion } from 'framer-motion';
interface HeroProps {
  title?: string;
}

export const Hero = (props: HeroProps) => {
  const { title = '' } = props;

  return (
    <div className={`col bleed`}>
      <div className={`col ${style.hero}`}>
        <div className={`col ${style.content}`}>
          <Text.H1 balance>
            <StaggerText>Unlock alpha in your&nbsp;risk models.</StaggerText>
          </Text.H1>
          <Text.Body secondary balance>
            Use our next generation infrastructure to build more insightful equity risk models in seconds. Configure
            your own universe, bring custom factors, run backtests and reports on the fly.
          </Text.Body>
          <div className={`${style.ctas}`}>
            <Button size="small" theme={1} type="primary-interactive" href="https://app.bayesline.com" target="_blank">
              Try for Free
            </Button>
            <Button size="small" theme={3} type="primary" href="http://schedule30.bayesline.com" target="_blank">
              Book a Demo
            </Button>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 'all' }}
            transition={{ duration: 0.56, delay: 0.1 }}
            className={`${style.badges}`}
          >
            <div className={`${style.badge}`}>
              <a href="https://www.ycombinator.com/companies/bayesline" target="_blank">
                <img src={ycomb} alt="badge" />
              </a>
              <Text.Small>YCombinator S24</Text.Small>
            </div>
            <div className={`${style.badge}`}>
              <img src={nvidia} alt="badge" />
              <Text.Small>Nvidia Inception</Text.Small>
            </div>
          </motion.div>
        </div>
      </div>
      <div className={`col ${style.ui}`}>
        <div className={`col ${style.cue}`}>
          <VectorField />
        </div>

        <Img src="homepage-hero-alt.png" alt="hero" className={style.image} />
      </div>
    </div>
  );
};
