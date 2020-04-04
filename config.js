const shared = {
  meta: {
    title: 'Сойка',
    description: '',
    keywords: [],
    language: 'uk',
    languageTerritory: 'uk_UA',
    social: {
      twitter: {
        username: '@ohsoyka',
        link: 'https://twitter.com/ohsoyka',
      },
      facebook: {
        username: 'sofiia.soliar',
        link: 'https://fb.com/sofiia.soliar',
      },
      instagram: {
        username: 'ohsoyka',
        link: 'https://instagram.com/ohsoyka',
      },
    },
  },
};

const config = {
  development: {
    ...shared,
    port: 7200,
    clientURL: 'http://localhost:7200',
    apiURL: 'http://localhost:3200',
    cookiesDomain: 'localhost',

    google: {},
  },

  production: {
    ...shared,
    port: 4300,
    clientURL: 'https://ohsoyka.com',
    apiURL: 'https://api.ohsoyka.com',
    cookiesDomain: '.ohsoyka.com',

    git: {
      repo: 'git@github.com:ohsoyka/client.git',
      branch: 'stable',
    },

    server: {
      host: '46.101.99.203',
      username: 'poohitan',
      folder: '~/ohsoyka.com/client',
    },

    pm2: {
      appName: 'ohsoyka-client',
    },

    google: {
      analyticsTrackingId: 'UA-10797087-20',
    },
  },
};

const environment = process.env.NODE_ENV;

module.exports = {
  ...config,
  current: {
    environment,
    ...config[environment],
  },
};
