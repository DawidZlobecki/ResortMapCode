import fs from "fs";

export function loadMap(path) {
  const raw = fs.readFileSync(path, "utf8");
  return raw.split("\n").map((row) => row.split(""));
}
