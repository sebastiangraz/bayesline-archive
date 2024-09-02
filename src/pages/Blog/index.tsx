import { Link } from '@tanstack/react-router';
import style from './blog.module.css';
import { Text, Asset } from '@/components';

import { readableDate, themeClasses } from '@/helpers/utils';
import { entryMeta } from './entryMeta';

function getImageUrl(fileName: string, name: string) {
  return new URL(`../BlogEntry/entries/${fileName}/${name}`, import.meta.url).href;
}

export function Blog() {
  const currentTimestamp = Date.now();

  const entryByDate = entryMeta
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .filter((entry) => new Date(entry.published).getTime() <= currentTimestamp);

  return (
    <div className="col bleed">
      <div className={`col ${style.heading}`}>
        <Text.H2>Blog</Text.H2>
      </div>

      <ul className={`col  ${style.ul}`}>
        {entryByDate.map(({ title, fileName, excerpt, theme, featured, published, thumbnail, seed }) => {
          const themeValue = themeClasses[theme] || '';
          const date = readableDate(published);
          const seedValue = seed || `${title}-${published}`;

          const featuredClass = featured ? `theme ${style.featured}` : '';
          const hasThemeClass = themeValue !== '' ? `theme ${style.theme}` : '';
          const classNames = `${featuredClass} ${hasThemeClass}`;

          return (
            <li key={fileName} data-theme={featured ? themeValue : ''} className={`col ${classNames}`}>
              <Link
                className={`col ${style.wrapper}`}
                to={`/blog/$postId`}
                params={{
                  postId: `${fileName}`
                }}
              >
                <div data-theme={themeValue} className={`col theme ${style.thumbnail}`}>
                  {thumbnail ? <img src={getImageUrl(fileName, thumbnail)} /> : <Asset seed={seedValue} />}
                </div>
                <div className={`col ${style.meta}`}>
                  <div className={`col ${style.header}`}>
                    {featured ? <Text.H3>{title}</Text.H3> : <Text.H5>{title}</Text.H5>}
                    <Text.Body className={`${style.date}`}>{date}</Text.Body>
                  </div>

                  <div className={`col ${style.excerpt}`}>
                    <Text.Body secondary>{excerpt}</Text.Body>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
