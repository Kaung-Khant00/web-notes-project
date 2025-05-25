import express from "express";
import {
  createNote,
  deleteNote,
  filterNote,
  getNote,
  pinNote,
  searchNotes,
  updateNote,
} from "../controllers/note.controller.js";

const noteRouter = express.Router();

noteRouter.post("/create", createNote);
noteRouter.post("/filter", filterNote);
noteRouter.post("/search", searchNotes);
noteRouter.get("/get", getNote);
noteRouter.put("/update/:id", updateNote);
noteRouter.put("/pin/:id", pinNote);
noteRouter.delete("/delete/:id", deleteNote);

export default noteRouter;
