module.exports = {
  apps: [{
    name: 'ohsoyka-client',
    script: 'server.js',

    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '300M',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],

  deploy: {
    production: {
      user: 'poohitan',
      host: '46.101.99.203',
      ref: 'origin/master',
      repo: 'git@github.com:ohsoyka/client.git',
      path: '/home/poohitan/ohsoyka.com/client',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production --update-env',
    },
  },
};
