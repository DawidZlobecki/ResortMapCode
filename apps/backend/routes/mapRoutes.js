const express = require("express");

module.exports = (mapRows) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json({ map: mapRows });
  });

  return router;
};
