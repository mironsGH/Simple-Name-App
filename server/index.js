import express from "express";
import cors from "cors";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dir, "data.json");

const app = express();
app.use(cors());
app.use(express.json());

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/api/history/:exerciseId", async (req, res) => {
  const data = await readData();
  const sessions = data[req.params.exerciseId] || [];
  const last = sessions.length > 0 ? sessions[sessions.length - 1] : null;
  res.json({ last });
});

app.post("/api/history/:exerciseId", async (req, res) => {
  const { sets } = req.body;
  if (!Array.isArray(sets) || sets.length === 0) {
    return res.status(400).json({ error: "sets required" });
  }
  const data = await readData();
  const session = { date: new Date().toISOString(), sets };
  data[req.params.exerciseId] = [...(data[req.params.exerciseId] || []), session];
  await writeData(data);
  res.json({ ok: true, session });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on :${PORT}`));
