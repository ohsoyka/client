const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/tag/:tag', (req, res) => {
    app.render(req, res, '/tag', { ...req.query, tag: req.params.tag });
  });

  return router;
};
