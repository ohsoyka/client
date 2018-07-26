const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/categories', (req, res) => {
    app.render(req, res, '/categories', req.query);
  });

  router.get('/categories/:category_path', (req, res) => {
    app.render(req, res, '/category', { ...req.query, path: req.params.category_path });
  });

  return router;
};
