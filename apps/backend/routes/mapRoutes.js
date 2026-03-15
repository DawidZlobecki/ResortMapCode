import express from "express";

export default function mapRoutes(mapRows) {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json({ map: mapRows });
  });

  return router;
}
