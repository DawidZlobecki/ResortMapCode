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

const args = process.argv.slice(2);

const mapPath = args[0] || "map.ascii";
const bookingsPath = args[1] || "bookings.json";

console.log("Backend loading map:", mapPath);
console.log("Backend loading bookings:", bookingsPath);

const mapData = loadMap(mapPath);
const bookings = loadBookings(bookingsPath);

app.use("/api/map", mapRoutes(mapData));
app.use("/api/validate", validateRoutes(bookings));
app.use("/api/cabanas", cabanaRoutes(mapData, bookings));

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
