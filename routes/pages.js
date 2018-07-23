const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/pages/:page_path', (req, res) => {
    app.render(req, res, '/page', { ...req.query, path: req.params.page_path });
  });

  return router;
};
