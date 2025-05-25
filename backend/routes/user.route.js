import { Router } from "express";
import {
  getUser,
  login,
  signup,
  test,
  refresh,
  logout,
  username,
  color,
} from "../controllers/user.controller.js";
import verifyToken from "../utility/authorization.js";

const userRouter = Router();

userRouter.get("/", verifyToken, getUser);
userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/logout", logout);
userRouter.post("/update-username", verifyToken, username);
userRouter.post("/update-color", verifyToken, color);
userRouter.post("/token-refresh", refresh);
userRouter.post("/test", test);

export default userRouter;
