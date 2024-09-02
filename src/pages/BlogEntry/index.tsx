import { Asset, Icon, Markdown, Text } from '@/components';
import { Route } from '@/routes/blog/$postId';
import style from './blogentry.module.css';
import { entryMeta } from '@/pages/Blog/entryMeta';
import { Link } from '@tanstack/react-router';
import { readableDate } from '@/helpers/utils';
function tableOfContents(toc: any) {
  return (
    <div className={`${style.toc}`}>
      <Text.Caps>Chapters</Text.Caps>
      <ul>
        {toc.map((item: any) => {
          return (
            <li key={item.id}>
              <a href={`#${item.id}`}>
                <Text.Body secondary>{item.value}</Text.Body>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function getImageUrl(fileName: string, name: string) {
  return new URL(`./entries/${fileName}/${name}`, import.meta.url).href;
}

export function BlogEntry() {
  const { post } = Route.useLoaderData();
  const { Page, title, fileName, excerpt, published, toc, thumbnail, seed } = post;
  const date = readableDate(published);
  const tableOfContentsComponent = tableOfContents(toc);
  const seedValue = seed || `${title}-${published}`;
  const currentTimestamp = Date.now();
  const thumbnailBool = thumbnail ? true : false;

  const entryByDate = entryMeta
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .filter((entry) => new Date(entry.published).getTime() <= currentTimestamp);

  const entryByDateExcludeCurrent = entryByDate.filter((entry) => entry.fileName !== fileName);

  return (
    <div className={`col bleed`}>
      <div className={`col theme ${style.hero}`}>
        <div className={`col ${style.title}`}>
          <Text.H2>{title}</Text.H2>
          <Text.Body secondary className={`${style.date}`}>
            {date}
          </Text.Body>
        </div>
        <Text.H5 className={`col ${style.excerpt}`}>{excerpt}</Text.H5>
        <div className={`col ${style.entryImage}`}>
          {thumbnailBool ? <img src={getImageUrl(fileName, thumbnail)} /> : <Asset seed={seedValue} />}
        </div>
        <div className={`col ${style.chapters}`}>{toc.length >= 2 && tableOfContentsComponent}</div>
      </div>

      <div className={`col ${style.content}`}>
        <Markdown>
          <Page />
        </Markdown>
      </div>
      <div className={`col ${style.disclaimer}`}>
        <Icon name="warning" className={style.icon} />
        <details>
          <summary>
            {' '}
            <Text.Small>
              This website is a general communication being provided for informational purposes only. It is educational
              in nature and not designed to be a recommendation for any specific investment product, strategy, plan
              feature or other purposes. By receiving this communicationyou agree with the intended purpose described
              above. Any examples used in this material are generic, hypothetical and for illustration purposes only.
              None of Bayesline, Inc., its affiliates or representatives is suggesting that the recipient or any other
              person take a specific course of action or any action at all.
            </Text.Small>{' '}
            <Text.Small secondary>Expand</Text.Small>
          </summary>
          <div>
            <Text.Small secondary>
              Communications such as this are not impartial and are provided in connection with the advertising and
              marketing of products and services. Prior to making any investment or financial decisions, an investor
              should seek individualized advice from personal financial, legal, tax and other professionals that take
              into account all of the particular facts and circumstances of an investor's own situation.
            </Text.Small>
            <Text.Small secondary>
              Opinions and statements of financial market trends that are based on current market conditions constitute
              our judgment and are subject to change without notice. We believe the information provided here is
              reliable but should not be assumed to be accurate or complete. The views and strategies described may not
              be suitable for all investors.
            </Text.Small>
          </div>
        </details>
      </div>

      {entryByDate.length > 0 && (
        <div className={`col ${style.more}`}>
          <Text.H5 className={`col`}>More articles</Text.H5>
          <ul className={`col`}>
            {entryByDateExcludeCurrent.slice(0, 4).map(({ title, fileName, published, thumbnail, seed }) => {
              const date = readableDate(published);
              const seedValue = seed || `${title}-${published}`;
              const thumbnailBool = thumbnail ? true : false;

              return (
                <li key={fileName} className={`col`}>
                  <Link
                    className={`col`}
                    to={`/blog/$postId`}
                    params={{
                      postId: `${fileName}`
                    }}
                  >
                    <div className={`col ${style.thumbnail}`}>
                      {thumbnailBool ? <img src={getImageUrl(fileName, thumbnail)} /> : <Asset seed={seedValue} />}
                    </div>

                    <div className={`col ${style.meta}`}>
                      {<Text.Body>{title}</Text.Body>}
                      <Text.Caps secondary className={`${style.date}`}>
                        {date}
                      </Text.Caps>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
