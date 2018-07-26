const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/photography', (req, res) => {
    app.render(req, res, '/photography', req.query);
  });

  router.get('/photography/:album_path', (req, res) => {
    app.render(req, res, '/photo-album', { ...req.query, path: req.params.album_path });
  });

  router.get('/photography/:album_path/:photo_id', (req, res) => {
    app.render(req, res, '/photo-album', { ...req.query, path: req.params.album_path, photo: req.params.photo_id });
  });

  return router;
};
