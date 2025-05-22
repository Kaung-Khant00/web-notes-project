import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  updateNote,
} from "../controllers/note.controller.js";

const noteRouter = express.Router();

noteRouter.post("/create", createNote);
noteRouter.get("/get", getNote);
noteRouter.put("/update/:id", updateNote);
noteRouter.delete("/delete/:id", deleteNote);

export default noteRouter;
