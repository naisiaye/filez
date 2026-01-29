import express from "express";
const router = express.Router();
export default router;

// import createFile from db queries
import { createFile } from "#db/queries/files";
import { getFolderByIdIncludingFiles, getFolders } from "#db/queries/folders";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

// POST new folder
router.post("/", async (req, res) => {
  try {
    if (!req.body?.name) {
      return res.status(400).json({ error: "Missing required field: name" });
    }
    const { createFolder } = await import("#db/queries/folders");
    const folder = await createFolder(req.body.name);
    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware to parse and validate id, then fetch folder
router.param("id", async (req, res, next, id) => {
  const folder = await getFolderByIdIncludingFiles(id);
  if (!folder) return res.status(404).send("Opps, folder not found.");

  req.folder = folder;
  next();
});

// GET folder by ID including its files
router.get("/:id", (req, res) => {
  res.send(req.folder);
});

// POST new file to a specific folder
router.post("/:id/files", async (req, res) => {
  if (!req.body) return res.status(400).send("Must include Request Body.");

  const { name, size } = req.body;
  if (!name || !size)
    return res.status(400).send("Missing required fields: name, size.");

  const file = await createFile(name, size, req.folder.id);
  res.status(201).send(file);
});
