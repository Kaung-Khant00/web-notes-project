import mongoose from "mongoose";

const NoteSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required."], trim: true },
    description: {
      type: String,
      default: "No description provided.",
      trim: true,
    },
    category: { type: String, default: null },
    tags: { type: [String], default: [] },
    timeline: { type: Date, default: null },
    is_pinned: { type: Boolean, default: false },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);
export default Note;
