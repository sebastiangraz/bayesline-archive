import { Helmet } from 'react-helmet-async';
import { settings } from '@/settings';
interface SEOProps {
  title: string;
  description: string;
}

export const SEO = (props: SEOProps) => {
  const { title, description } = props;

  const siteTitle = settings.siteTitle;
  const siteDescription = settings.siteDescription;

  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description ? description : siteDescription;

  return (
    <Helmet>
      <title data-rh="true">{metaTitle}</title>
      <meta name="description" content={metaDescription} data-rh="true" />
      <meta property="og:title" content={metaTitle} data-rh="true" />
      {/* <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={description} /> */}
    </Helmet>
  );
};
