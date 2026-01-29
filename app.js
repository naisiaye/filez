import express from "express";
const app = express();
export default app;

import foldersRouter from "#api/folders";
import filesRouter from "#api/files";

app.use(express.json());

app.use("/files", filesRouter);
app.use("/folders", foldersRouter);

app.use((err, req, res, next) => {
  return res.status(404).send(err.detail);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(404).send("Oops, something went wrong!");
});
