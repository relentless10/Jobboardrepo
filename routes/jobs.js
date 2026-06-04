const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  try {
    const result = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { company, role, url, status, notes } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO jobs (company, role, url, status, notes) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [company, role, url, status, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack, full: JSON.stringify(err) });
  }
});

router.put("/:id", async (req, res) => {
  const { company, role, url, status, notes } = req.body;
  try {
    const result = await pool.query(
      "UPDATE jobs SET company=$1, role=$2, url=$3, status=$4, notes=$5 WHERE id=$6 RETURNING *",
      [company, role, url, status, notes, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Job not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM jobs WHERE id=$1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Deleted", job: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
