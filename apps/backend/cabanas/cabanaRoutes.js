const express = require("express");
const { createCabanaState } = require("./cabanaState");

module.exports = (mapRows, bookings) => {
  const router = express.Router();
  const cabanas = createCabanaState(mapRows);

  router.get("/", (req, res) => {
    res.json(Object.values(cabanas));
  });

  router.post("/book", (req, res) => {
    const { cabanaId, room, guestName } = req.body;
    const cabana = cabanas[cabanaId];

    if (!cabana) return res.status(404).json({ message: "Cabana not found" });
    if (cabana.booked)
      return res.status(400).json({ message: "Cabana already booked" });

    const match = bookings.find(
      (b) =>
        b.room === room &&
        b.guestName.toLowerCase() === guestName.toLowerCase(),
    );

    if (!match)
      return res.status(400).json({ message: "Invalid room or guest name" });

    cabana.booked = true;
    cabana.room = room;
    cabana.guestName = guestName;

    res.json({ message: "Cabana booked successfully", cabana });
  });

  return router;
};
