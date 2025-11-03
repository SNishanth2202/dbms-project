import express from "express";
import { db } from "../db.js";
const router = express.Router();

// CREATE vehicle (supports optional vehicle_id)
router.post("/", async (req, res) => {
  const { vehicle_id, owner_id, vehicle_type, registration_number, model } = req.body;
  try {
    if (vehicle_id !== undefined && vehicle_id !== null && `${vehicle_id}` !== "") {
      const [result] = await db.query(
        "INSERT INTO Vehicles (vehicle_id, owner_id, vehicle_type, registration_number, model) VALUES (?, ?, ?, ?, ?)",
        [vehicle_id, owner_id, vehicle_type, registration_number, model]
      );
      return res.json({ id: vehicle_id, insertId: result.insertId ?? vehicle_id, message: "Vehicle added successfully" });
    } else {
      const [result] = await db.query(
        "INSERT INTO Vehicles (owner_id, vehicle_type, registration_number, model) VALUES (?, ?, ?, ?)",
        [owner_id, vehicle_type, registration_number, model]
      );
      return res.json({ id: result.insertId, message: "Vehicle added successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all vehicles
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT v.*, o.owners_name 
      FROM Vehicles v
      JOIN Owners o ON v.owner_id = o.owner_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE vehicle
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { owner_id, vehicle_type, registration_number, model } = req.body;
  try {
    await db.query(
      "UPDATE Vehicles SET owner_id=?, vehicle_type=?, registration_number=?, model=? WHERE vehicle_id=?",
      [owner_id, vehicle_type, registration_number, model, id]
    );
    res.json({ message: "Vehicle updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE vehicle
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM Vehicles WHERE vehicle_id=?", [id]);
    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
