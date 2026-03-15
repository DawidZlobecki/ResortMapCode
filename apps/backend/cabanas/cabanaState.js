function createCabanaState(mapRows) {
  const cabanas = {};
  let id = 1;

  for (let y = 0; y < mapRows.length; y++) {
    for (let x = 0; x < mapRows[y].length; x++) {
      if (mapRows[y][x] === "W") {
        const cabanaId = `cabana-${id++}`;
        cabanas[cabanaId] = {
          id: cabanaId,
          x,
          y,
          booked: false,
          room: null,
          guestName: null,
        };
      }
    }
  }

  return cabanas;
}

module.exports = { createCabanaState };
