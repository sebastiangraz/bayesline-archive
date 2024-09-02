import { Button, Icon, Text } from '@/components';
import style from './pricing.module.css';

export function Pricing() {
  return (
    <>
      <div className={`col ${style.page}`}>
        <Text.H2 className={`col ${style.title}`}>Our product offering.</Text.H2>
        <div className={`${style.tiers}`}>
          <div className={style.card}>
            <Icon name="experiment" />
            <Text.H4>Free</Text.H4>
            <Text.Body secondary balance>
              Try the platform with no strings attached on a sample dataset covering US equities. Sign up with your
              email and get started in minutes. No credit card required.
            </Text.Body>
            <Button theme={1} type="secondary" href="https://app.bayesline.com/" target="_blank">
              Try for free
            </Button>
            <ul>
              <li>Use API or GUI</li>
              <li>Build custom risk models</li>
              <li>View risk model summary reports (R2, t-stats, factor correlations, etc.)</li>
              <li>Upload sample portfolios and factors</li>
              <li>Create portfolio analytics (risk decomposition, value at risk, etc.)</li>
            </ul>
          </div>
          <hr />
          <div className={style.card}>
            <Icon name="enterprise" />
            <Text.H4>Enterprise</Text.H4>
            <Text.Body secondary balance>
              Talk to us about your specific use case.
              <br />
            </Text.Body>
            <Button theme={1} type="secondary" href="http://schedule30.bayesline.com" target="_blank">
              Book a Demo
            </Button>
            <ul>
              <li>Everything in the free tier</li>
              <li>Cloud deployment on your VPC</li>
              <li>Integrate with vendor data</li>
              <li>Custom hierarchies (industry, portfolio, etc.)</li>
              <li>SLAs</li>
              <li>Implementation support</li>
              <li>Dedicated Slack channel</li>
              <li>White glove service for custom reports</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
