const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kanban",
});

db.connect((err) => {
  if (err) {
    console.error("Could not connect to MySQL", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.get("/", (req, res) => {
  res.send("working fine!");
});

app.get("/cards", (req, res) => {
  const sql = "SELECT * FROM cards";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.json(results);
    }
  });
});

app.post("/api", (req, res) => {
  // res.json(req.body);

  const title = req.body.title || "deep";
  const column = req.body.column || "backlog";

  const sql = `INSERT INTO cards (title, \`column\`) VALUES ('${title}', '${column}')`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Failed to insert data", details: err });
    } else {
      res.json(results);
    }
  });
});

app.listen(8000, () => {
  console.log(`Server running at http://localhost:8000`);
});
