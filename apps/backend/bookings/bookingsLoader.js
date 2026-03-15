import fs from "fs";

function loadBookings(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

export { loadBookings };
