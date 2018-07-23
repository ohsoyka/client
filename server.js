const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const fetch = require('isomorphic-unfetch');
const path = require('path');
const config = require('./config').current;

const dev = config.environment !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const articlesRouter = require('./routes/articles');
const projectsRouter = require('./routes/projects');
const pagesRouter = require('./routes/pages');
const categoriesRouter = require('./routes/categories');
const tagsRouter = require('./routes/tags');
const photographyRouter = require('./routes/photography');
const adminRouter = require('./routes/admin');

app.prepare()
  .then(() => {
    const server = express();

    server.get('/robots.txt', (req, res) => res.sendFile(path.join(__dirname, '/robots.txt')));
    server.use(cookieParser());

    server.get('/rss', async (req, res) => {
      const response = await fetch(`${config.apiURL}/rss`);
      const xml = await response.text();

      res.header({ 'Content-Type': 'application/rss+xml' }).send(xml);
    });

    server.get('/search', (req, res) => {
      app.render(req, res, '/search', req.query);
    });

    server.get('/login', (req, res) => {
      app.render(req, res, '/login', req.query);
    });

    server.use(categoriesRouter(app));
    server.use(pagesRouter(app));
    server.use(tagsRouter(app));
    server.use(projectsRouter(app));
    server.use(photographyRouter(app));
    server.use(adminRouter(app));
    server.use(articlesRouter(app)); // Have to be last

    server.get('*', (req, res) => handle(req, res));

    server.listen(config.port, (error) => {
      if (error) {
        throw error;
      }

      console.log(`Listening on ${config.port}`);
    });
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
