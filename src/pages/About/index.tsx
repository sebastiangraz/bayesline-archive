import { Flex, Icon, Img, ShapeField, Text } from '@/components';
import style from './about.module.css';
import progress from '@/assets/progress.svg';

export function About() {
  return (
    <>
      <div className={`col ${style.page}`}>
        <div className={`col ${style.hero}`}>
          <div className={`col ${style.intro}`}>
            <Text.H3 balance>
              We are reimagining <Text secondary>financial analytics on AI infrastructure.</Text>
            </Text.H3>
          </div>

          <div className={`col ${style.illustration1}`}>
            <img src={progress} />
          </div>

          <div className={`col ${style.illustration2}`}>
            <ShapeField
              variant="bayesian"
              color1="var(--accent-3)"
              color2="hsl(var(--pink) / var(--opacity-6))"
              rows={35}
              columns={35}
              padding={2}
            />
          </div>

          <div className={`col ${style.valueprops}`}>
            <ul>
              <li>
                <Icon name="connect" />
                <Text.Small secondary balance>
                  We are changing the way investment managers interact with financial analytics. From
                  one-size-doesn't-fit-all to highly customizable and blazing fast.
                </Text.Small>
              </li>
              <li>
                <Icon name="bayesian" />
                <Text.Small secondary balance>
                  Our first goal is to revolutionize equity risk models and analytics. Traditional models don't align
                  with realistic investment universes or styles - we're changing that.
                </Text.Small>
              </li>
              <li>
                <Icon name="fragmentize" />
                <Text.Small secondary balance>
                  We aim to be the one stop shop analytics provider for the modern investment manager. All asset
                  classes, all strategies, all in one place.
                </Text.Small>
              </li>
            </ul>
          </div>
        </div>
        <div className={`col ${style.founders}`}>
          <Text.H4 balance className={`col ${style.header}`}>
            Bayesline was founded in 2024 by Sebastian Janisch and Misha van Beek, with a mission to reimagine financial
            analytics—putting flexibility and performance first.
          </Text.H4>
          <hr className="col" />
          <div className={`col ${style.founderlist} `}>
            <div className={`${style.founder}`}>
              <Img src="sebastian" className={style.avatar} />

              <Text.H5>Sebastian Janisch</Text.H5>

              <Flex gap={2} className={style.social}>
                <Text.Caps secondary>Co-founder</Text.Caps>
                <hr />
                <Text.SmallCaps secondary>
                  <a href="https://www.linkedin.com/in/sebastianjanisch/" target="_blank">
                    Connect
                  </a>
                </Text.SmallCaps>
              </Flex>
              <ul>
                <li>
                  <Text.Small balance secondary>
                    A software engineer with a passion for quant research, Sebastian has spent the last 10 years
                    leveraging the power of machine learning to challenge, innovate, and reshape how institutions think
                    about financial modeling.
                  </Text.Small>
                </li>
                <li>
                  <Text.Small balance secondary>
                    Prior to Bayesline, he was at Bloomberg where he incubated the next generation of customizable and
                    actionable quant products as part of the Quant & AI Research group.
                  </Text.Small>
                </li>
                <li>
                  <Text.Small balance secondary>
                    Sebastian built his expertise in quant research during his time as a Director in BlackRock’s
                    Financial Modeling Group where he researched and implemented equity risk models that analyze
                    trillions in assets.
                  </Text.Small>
                </li>
                <li>
                  <Text.Small balance secondary>
                    Sebastian holds a Bachelor of Science in Information Systems from University of Hamburg and a
                    Masters of Science in Finance & IT from Warwick Business School.
                  </Text.Small>
                </li>
              </ul>
            </div>
            <div className={`${style.founder}`}>
              <Img src="misha" className={style.avatar} />
              <Text.H5>Misha van Beek</Text.H5>

              <Flex gap={2} className={style.social}>
                <Text.Caps secondary>Co-founder</Text.Caps>
                <hr />
                <Text.SmallCaps secondary>
                  <a href="https://www.linkedin.com/in/mishavanbeek/" target="_blank">
                    Connect{' '}
                  </a>
                </Text.SmallCaps>
              </Flex>

              <ul>
                <li>
                  <Text.Small balance secondary>
                    Misha has spent the past 10 years coupling his professional quant training with his personal
                    interest in all things AI and hands-on engineering.
                  </Text.Small>
                </li>
                <li>
                  <Text.Small balance secondary>
                    Before co-founding Bayesline, Misha was a Managing Director at BlackRock where he evolved Aladdin’s
                    portfolio risk models spanning tens of trillions in assets.
                  </Text.Small>
                </li>
                <li>
                  <Text.Small balance secondary>
                    Under his leadership, his team also developed Aladdin’s economic scenario engine, as well as
                    investment models that run roughly $400 billion in strategic asset allocations.
                  </Text.Small>
                </li>
                <li>
                  <Text.Small balance secondary>
                    Prior to BlackRock, he worked as a quant analyst at Rabobank. Misha holds a Master of Science in
                    Finance & Economics from the London School of Economics and a PhD in Financial Mathematics from the
                    University of Amsterdam.
                  </Text.Small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
