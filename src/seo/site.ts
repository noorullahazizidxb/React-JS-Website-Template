export const SITE_URL = 'https://ourworks.devminds.net/';
export const SITE_NAME = 'DevMinds';
export const TITLE = 'DevMinds Works — Our Projects & Work | DevMinds Software Studio';
export const DESCRIPTION =
  'DevMinds Works: our projects and work — web platforms, mobile apps and products like DevMinds Marketplace, Jobs, Notes and Budget App, built by Noorullah Azizi and team.';
export const SOCIAL_DESCRIPTION = 'Premium digital products, engineered for performance and crafted with care.';
export const OG_IMAGE = `${SITE_URL}og.png`;

export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://devminds.net/#organization',
      name: 'DevMinds',
      url: 'https://devminds.net',
      logo: `${SITE_URL}logo-light@4x.png`,
      founder: { '@type': 'Person', name: 'Noorullah Azizi', url: 'https://noorullah-azizi.devminds.net' },
      sameAs: ['https://github.com/noorullahazizidxb', 'https://noorullah-azizi.devminds.net'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: 'DevMinds Works',
      url: SITE_URL,
      publisher: { '@id': 'https://devminds.net/#organization' },
    },
    {
      '@type': 'CollectionPage',
      name: 'DevMinds Works — Our Projects',
      url: SITE_URL,
      isPartOf: { '@id': `${SITE_URL}#website` },
      about: { '@id': 'https://devminds.net/#organization' },
    },
  ],
};
