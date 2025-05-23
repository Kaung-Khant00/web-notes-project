import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    user_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    background_color: { type: String, default: "bg-gray-200" },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
