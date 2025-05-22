import Note from "../models/note.js";

/// creating note process
const createNote = (req, res, next) => {
  // Check if user is authenticated
  console.log(req.user);
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      error: true,
      message: "User is not authenticated.",
    });
  }
  const { title, description, timeline, tags, category } = req.body;
  const userId = req.user.id;
  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required." });
  }
  if (!description) {
    return res
      .status(400)
      .json({ error: true, message: "Description is required." });
  }
  try {
    const newNote = new Note({
      title,
      description,
      timeline: timeline ? new Date(timeline) : null,
      tags: tags ? tags : [],
      category: category ? category : null,
      user_id: userId,
    });
    newNote.save();
    return res.status(201).json({
      error: false,
      message: "Note created successfully.",
      note: newNote,
    });
  } catch (err) {
    next(err);
  }
};

// getting notes process
const getNote = async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      error: true,
      message: "User is not authenticated.",
    });
  }
  const userId = req.user.id;
  try {
    const notes = await Note.find({ user_id: userId }).sort({
      is_pinned: -1,
      createdAt: -1,
    });
    if (notes.length === 0) {
      return res.status(404).json({
        error: true,
        notes: [],
        message: "No notes found.",
      });
    }
    return res.status(200).json({
      error: false,
      notes: notes,
      message: "Notes fetched successfully.",
    });
  } catch (err) {
    next(err);
  }
};
const updateNote = async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      error: true,
      message: "User is not authenticated.",
    });
  }

  const userId = req.user.id;
  const noteId = req.params.id;
  const { title, description, timeline, tags, category } = req.body;
  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required." });
  }
  if (!description) {
    return res
      .status(400)
      .json({ error: true, message: "Description is required." });
  }
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user_id: userId },
      {
        title,
        description,
        timeline: timeline ? new Date(timeline) : null,
        tags: tags ? tags : [],
        category: category ? category : null,
      },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({
        error: true,
        message: "Note not found.",
      });
    }
    return res.status(200).json({
      error: false,
      message: "Note updated successfully.",
      note: updatedNote,
    });
  } catch (err) {
    next(err);
  }
};
const deleteNote = async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      error: true,
      message: "User is not authenticated.",
    });
  }
  const userId = req.user.id;
  const noteId = req.params.id;
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      user_id: userId,
    });
    if (!deletedNote) {
      return res.status(404).json({
        error: true,
        message: "Note not found.",
      });
    }
    return res.status(200).json({
      error: false,
      message: "Note deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

export { createNote, getNote, updateNote, deleteNote };
