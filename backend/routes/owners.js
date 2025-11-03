import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Get all owners
router.get("/", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM Owners");
  res.json(rows);
});

// Add new owner (supports optional owner_id if schema requires it)
router.post("/", async (req, res) => {
  const { owner_id, owner_name, owners_name, address, phone } = req.body;
  // accept either owner_name or owners_name from client, prefer owners_name
  const nameValue = owners_name ?? owner_name;
  try {
    if (owner_id !== undefined && owner_id !== null && `${owner_id}` !== "") {
      const [result] = await db.execute(
        "INSERT INTO Owners (owner_id, owners_name, address, phone) VALUES (?, ?, ?, ?)",
        [owner_id, nameValue, address, phone]
      );
      return res.json({ id: owner_id, insertId: result.insertId ?? owner_id, message: "Owner added successfully" });
    } else {
      const [result] = await db.execute(
        "INSERT INTO Owners (owners_name, address, phone) VALUES (?, ?, ?)",
        [nameValue, address, phone]
      );
      return res.json({ id: result.insertId, message: "Owner added successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Error adding owner" });
  }
});

// Update owner
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { owner_name, owners_name, address, phone } = req.body;
  const nameValue = owners_name ?? owner_name;

  const [rows] = await db.execute("SELECT * FROM Owners WHERE owner_id = ?", [id]);
  if (rows.length === 0) {
    return res.status(404).json({ message: "Owner not found" });
  }

  await db.execute(
    "UPDATE Owners SET owners_name=?, address=?, phone=? WHERE owner_id=?",
    [nameValue, address, phone, id]
  );
  res.json({ message: "Owner updated successfully" });
});

// Delete owner
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.execute("DELETE FROM Owners WHERE owner_id=?", [id]);
  res.json({ message: "Owner deleted successfully" });
});

export default router;
