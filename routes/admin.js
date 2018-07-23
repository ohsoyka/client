const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/admin', (req, res) => {
    app.render(req, res, '/admin', req.query);
  });

  router.get('/admin/articles/:article_path/edit', (req, res) => {
    app.render(req, res, '/admin/articles/edit', { ...req.query, path: req.params.article_path });
  });

  router.get('/admin/pages/:page_path/edit', (req, res) => {
    app.render(req, res, '/admin/pages/edit', { ...req.query, path: req.params.page_path });
  });

  router.get('/admin/projects/:project_path/edit', (req, res) => {
    app.render(req, res, '/admin/projects/edit', { ...req.query, path: req.params.project_path });
  });

  router.get('/admin/categories/:category_path/edit', (req, res) => {
    app.render(req, res, '/admin/categories/edit', { ...req.query, path: req.params.category_path });
  });

  return router;
};
