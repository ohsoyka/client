const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/projects', (req, res) => {
    app.render(req, res, '/projects', req.query);
  });

  router.get('/projects/:project_path', (req, res) => {
    app.render(req, res, '/project', { ...req.query, path: req.params.project_path });
  });

  return router;
};
