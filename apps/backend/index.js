import express from "express";
import cors from "cors";
import { loadMap } from "./map/mapLoader.js";
import { loadBookings } from "./bookings/bookingsLoader.js";
import mapRoutes from "./routes/mapRoutes.js";
import validateRoutes from "./routes/validateRoutes.js";
import cabanaRoutes from "./cabanas/cabanaRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());

function getArgValue(flag) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? null : process.argv[index + 1];
}

const mapPath = getArgValue("--map") || "map.ascii";
const bookingsPath = getArgValue("--bookings") || "bookings.json";

const mapData = loadMap(mapPath);
const bookings = loadBookings(bookingsPath);

app.use("/api/map", mapRoutes(mapData));
app.use("/api/validate", validateRoutes(bookings));
app.use("/api/cabanas", cabanaRoutes(mapData, bookings));

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
