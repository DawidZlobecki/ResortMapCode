import { test } from "node:test";
import assert from "node:assert";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadMap } from "../map/mapLoader.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("loadMap parses map.ascii into a grid", () => {
  const mapPath = path.join(__dirname, "..", "map.ascii");
  const map = loadMap(mapPath);

  assert.ok(Array.isArray(map));
  assert.ok(Array.isArray(map[0]));
  assert.ok(map[0].length > 0);
  assert.strictEqual(map[0][0], ".");
});
