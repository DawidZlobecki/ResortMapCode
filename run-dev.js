const { spawn } = require("child_process");

let mapFile = "map.ascii";
let bookingsFile = "bookings.json";

const args = process.argv.slice(2);

if (args[0]) mapFile = args[0];
if (args[1]) bookingsFile = args[1];

console.log("Starting backend with:");
console.log("  map =", mapFile);
console.log("  bookings =", bookingsFile);

const backend = spawn("node", ["index.js", mapFile, bookingsFile], {
  cwd: "./apps/backend",
  stdio: "inherit",
  shell: true,
});

const frontend = spawn("npm", ["run", "dev"], {
  cwd: "./apps/frontend",
  stdio: "inherit",
  shell: true,
});

process.on("SIGINT", () => {
  backend.kill();
  frontend.kill();
  process.exit();
});
