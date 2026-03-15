import { test } from "node:test";
import assert from "node:assert";

import validateRoutes from "../routes/validateRoutes.js";

test("validateRoutes returns an express router", () => {
  const router = validateRoutes([{ room: "101", guestName: "Alice" }]);
  assert.ok(router);
  assert.strictEqual(typeof router, "function");
});
