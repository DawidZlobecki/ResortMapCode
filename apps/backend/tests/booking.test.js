import { test } from "node:test";
import assert from "node:assert";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadBookings } from "../bookings/bookingsLoader.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("loadBookings reads bookings.json", () => {
  const bookingsPath = path.join(__dirname, "..", "bookings.json");
  const bookings = loadBookings(bookingsPath);

  assert.ok(Array.isArray(bookings));
  assert.ok(bookings.length > 0);
  assert.deepStrictEqual(bookings[0], {
    room: "101",
    guestName: "Alice Smith",
  });
});
