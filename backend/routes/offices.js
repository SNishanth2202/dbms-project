import express from "express";
import { db } from "../db.js";
const router = express.Router();

// CREATE office (supports optional office_id)
router.post("/", async (req, res) => {
  const { office_id, office_name, location } = req.body;
  try {
    if (office_id !== undefined && office_id !== null && `${office_id}` !== "") {
      const [result] = await db.query(
        "INSERT INTO Offices (office_id, office_name, location) VALUES (?, ?, ?)",
        [office_id, office_name, location]
      );
      return res.json({ id: office_id, insertId: result.insertId ?? office_id, message: "Office added successfully" });
    } else {
      const [result] = await db.query(
        "INSERT INTO Offices (office_name, location) VALUES (?, ?)",
        [office_name, location]
      );
      return res.json({ id: result.insertId, message: "Office added successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all offices
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Offices");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE office
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { office_name, location } = req.body;
  try {
    await db.query(
      "UPDATE Offices SET office_name=?, location=? WHERE office_id=?",
      [office_name, location, id]
    );
    res.json({ message: "Office updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE office
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM Offices WHERE office_id=?", [id]);
    res.json({ message: "Office deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
