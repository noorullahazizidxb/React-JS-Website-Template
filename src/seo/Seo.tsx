import { Helmet } from 'react-helmet-async';
import { DESCRIPTION, OG_IMAGE, SITE_NAME, SITE_URL, SOCIAL_DESCRIPTION, TITLE, jsonLd } from './site';

/** Owns every SEO tag in <head>; index.html keeps a static copy for non-JS crawlers. */
export function Seo() {
  return (
    <Helmet prioritizeSeoTags>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={SOCIAL_DESCRIPTION} />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={SOCIAL_DESCRIPTION} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
