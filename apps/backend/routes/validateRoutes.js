const express = require("express");

module.exports = (bookings) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    const { room, guestName } = req.query;

    const match = bookings.find(
      (b) =>
        b.room === room &&
        b.guestName.toLowerCase() === guestName.toLowerCase(),
    );

    if (!match) {
      return res
        .status(400)
        .json({ valid: false, message: "Invalid room or guest name" });
    }

    res.json({ valid: true });
  });

  return router;
};
