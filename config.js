const shared = {
  meta: {
    title: 'Сойка',
    description: '',
    keywords: [],
    language: 'uk_UA',
    social: {
      twitter: {
        username: '@ohsojka',
        link: 'https://twitter.com/ohsojka',
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
  development: Object.assign({}, shared, {
    port: 7200,
    clientURL: 'http://localhost:7200',
    apiURL: 'http://localhost:3200',
    cookiesDomain: 'localhost',

    google: {},
  }),

  production: Object.assign({}, shared, {
    port: 4000,
    clientURL: 'https://ohsoyka.com',
    apiURL: 'https://api.ohsoyka.com',
    cookiesDomain: '.ohsoyka.com',

    git: {
      repo: 'git@bitbucket.org:soyka/client.git',
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
    },
  }),
};

const environment = process.env.NODE_ENV;

module.exports = Object.assign({}, config, {
  current: Object.assign({ environment }, config[environment]),
});
