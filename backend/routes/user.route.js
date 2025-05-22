import { Router } from "express";
import {
  getUser,
  login,
  signup,
  test,
  refresh,
  logout,
} from "../controllers/user.controller.js";
import verifyToken from "../utility/authorization.js";

const userRouter = Router();

userRouter.get("/", verifyToken, getUser);
userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/logout", logout);
userRouter.post("/token-refresh", refresh);
userRouter.post("/test", test);

export default userRouter;
