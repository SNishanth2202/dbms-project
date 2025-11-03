import express from "express";
import cors from "cors";
import { db } from "./db.js";
import ownerRoutes from "./routes/owners.js";
import vehicleRoutes from "./routes/vehicles.js";
import registrationRoutes from "./routes/registrations.js";
import officeRoutes from "./routes/offices.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend static files
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.resolve(__dirname, "../frontend/public");
app.use(express.static(publicPath));

// Routes
app.use("/owners", ownerRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/registrations", registrationRoutes);
app.use("/offices", officeRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
