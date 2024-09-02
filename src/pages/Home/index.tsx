import style from './home.module.css';
import { Hero, Button, Card, Cards, Text, VectorField, ShapeField, Flex, Icon, Img } from '@/components';
import { Feature } from './Feature';
import radial from '@/assets/radial-alt.svg';
export function Home() {
  return (
    <>
      <Hero />
      <Cards layout="grid-left">
        <Card dataTheme={1}>
          <div className="card-header">
            <Text.H4 balance>The industry standard, just more of it.</Text.H4>
            <Text.Body secondary>
              We use industry standard factor risk model methodologies without shortcuts. Use our analytics engine to
              create custom models with portfolio aligned universes, factors and settings.
            </Text.Body>
            <Text.Body secondary>
              Creating custom risk models and sophisticated portfolio reports was never this easy.
            </Text.Body>
            <Button type="secondary" href="http://schedule30.bayesline.com" target="_blank">
              Book a Demo
            </Button>
          </div>
          <img src={radial} className={style.cardImageIllustration} />
          <Img src="composition.png" className={style.cardImageComposition} />
        </Card>
        <Card dataTheme={3}>
          <div className="card-header">
            <Text.H4 balance>Bring vendor data and also your own.</Text.H4>
            <Text.Body secondary>
              Build on top of your existing risk model vendor data. Add proprietary crowding factors, third party alpha
              libraries, custom industry hierarchies and more. Bring your own data with ease and use them in your risk
              models - all within your own private cloud.
            </Text.Body>
          </div>
          <Img src="comparemodels.png" className={style.cardImage} />
          <VectorField variant="straight" className={style.cardVectorField} />
        </Card>
        <Card.Secondary dataTheme={1}>
          <div className="card-header">
            <Text.H4 balance>API first, UX native.</Text.H4>
            <Text.Body secondary>
              Use our programmatic API to speed up research workflows and integrate with existing systems. Slice and
              dice your risk reports with our intuitive user interface for maximum insight.
            </Text.Body>
          </div>

          <ShapeField
            variant="dithered-gradient"
            rows={24}
            columns={24}
            padding={3}
            color1="var(--accent-3)"
            color2="hsl(var(--brand-2))"
            className={style.cardShapeField}
          />
        </Card.Secondary>
      </Cards>

      <Cards layout="grid-col" className={`${style.threeup}`}>
        <Card dataTheme={0}>
          <Icon name="chart" />
          <Text.Body balance secondary as="span">
            <Text.Body as="span">Research Alignment.</Text.Body> Move with the speed of research. Iterate quickly on
            research and backtesting.
          </Text.Body>
        </Card>
        <Card dataTheme={0}>
          <Icon name="layers" />
          <Text.Body balance secondary as="span">
            <Text.Body as="span">Market Alignment.</Text.Body> React to changing market conditions and use reliable and
            relevant analytics when they are most needed.
          </Text.Body>
        </Card>
        <Card dataTheme={0}>
          <Icon name="globe" />
          <Text.Body balance secondary as="span">
            <Text.Body as="span">Portfolio Alignment.</Text.Body> Align your risk models with your universe, styles and
            preferences. Gain a better sense of granularity, accuracy and performance.
          </Text.Body>
        </Card>
      </Cards>
      <Feature.Comparison />
      <Feature.CenterAsset />
      {/* <Feature.Ticker /> */}
    </>
  );
}
