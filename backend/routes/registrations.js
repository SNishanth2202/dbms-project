import express from "express";
import { db } from "../db.js";
const router = express.Router();

// CREATE registration (supports optional registration_id)
router.post("/", async (req, res) => {
  const { registration_id, vehicle_id, registration_date, expiry_date } = req.body;
  try {
    if (registration_id !== undefined && registration_id !== null && `${registration_id}` !== "") {
      const [result] = await db.query(
        "INSERT INTO Registrations (registration_id, vehicle_id, registration_date, expiry_date) VALUES (?, ?, ?, ?)",
        [registration_id, vehicle_id, registration_date, expiry_date]
      );
      return res.json({ id: registration_id, insertId: result.insertId ?? registration_id, message: "Registration added successfully" });
    } else {
      const [result] = await db.query(
        "INSERT INTO Registrations (vehicle_id, registration_date, expiry_date) VALUES (?, ?, ?)",
        [vehicle_id, registration_date, expiry_date]
      );
      return res.json({ id: result.insertId, message: "Registration added successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all registrations
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.*, v.registration_number, v.vehicle_type
      FROM Registrations r
      JOIN Vehicles v ON r.vehicle_id = v.vehicle_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE registration
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { vehicle_id, registration_date, expiry_date } = req.body;
  try {
    await db.query(
      "UPDATE Registrations SET vehicle_id=?, registration_date=?, expiry_date=? WHERE registration_id=?",
      [vehicle_id, registration_date, expiry_date, id]
    );
    res.json({ message: "Registration updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE registration
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM Registrations WHERE registration_id=?", [id]);
    res.json({ message: "Registration deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
