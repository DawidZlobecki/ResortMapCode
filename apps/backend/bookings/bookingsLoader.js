const fs = require("fs");

function loadBookings(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

module.exports = { loadBookings };
