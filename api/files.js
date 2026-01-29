import express from "express";
const router = express.Router();
export default router;

// import getFilesIncludingFolderName from db queries
import { getFilesIncludingFolderName } from "#db/queries/files";

// GET all files including their folder names

router.get("/", async (req, res) => {
  const files = await getFilesIncludingFolderName();
  res.send(files);
});
