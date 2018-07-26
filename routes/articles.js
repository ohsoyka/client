const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/articles', (req, res) => {
    app.render(req, res, '/articles', req.query);
  });

  router.get('/:article_path', (req, res) => {
    app.render(req, res, '/article', { ...req.query, path: req.params.article_path });
  });

  return router;
};
