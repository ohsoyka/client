const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const fetch = require('isomorphic-unfetch');
const path = require('path');
const config = require('./config').current;

const dev = config.environment !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

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

    server.get('/projects', (req, res) => {
      app.render(req, res, '/projects', req.query);
    });

    server.get('/projects/:project_path', (req, res) => {
      app.render(req, res, '/project', Object.assign({}, req.query, { path: req.params.project_path }));
    });

    server.get('/categories', (req, res) => {
      app.render(req, res, '/categories', req.query);
    });

    server.get('/categories/:category_path', (req, res) => {
      app.render(req, res, '/category', Object.assign({}, req.query, { path: req.params.category_path }));
    });

    server.get('/tag/:tag', (req, res) => {
      app.render(req, res, '/tag', Object.assign({}, req.query, { tag: req.params.tag }));
    });

    server.get('/:article_path', (req, res) => {
      app.render(req, res, '/article', Object.assign({}, req.query, { path: req.params.article_path }));
    });

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
