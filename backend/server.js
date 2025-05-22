import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import connectDB from "./connectDB.js";
import handleError from "./Error/handleError.js";
import cookieParser from "cookie-parser";
import noteRouter from "./routes/note.route.js";
import verifyToken from "./utility/authorization.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/user", userRouter);
app.use("/note", verifyToken, noteRouter);

app.use(handleError);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port : ${PORT}`);
});
