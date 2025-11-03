import express from "express";
import cors from "cors";
import { db } from "./db.js";
import ownerRoutes from "./routes/owners.js";
import vehicleRoutes from "./routes/vehicles.js";
import registrationRoutes from "./routes/registrations.js";
import officeRoutes from "./routes/offices.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/owners", ownerRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/registrations", registrationRoutes);
app.use("/offices", officeRoutes);

app.get("/", (req, res) => {
  res.send("Vehicle Registration API is running ");
});

app.listen(5000, () => console.log("Server running on port 5000"));
