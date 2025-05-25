import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { makeAccessToken, makeRefreshToken } from "../utility/token.js";
import { cookieOptions } from "../utility/cookie.config.js";

const getUser = async (req, res, next) => {
  //  get the user id stored in token
  const { id } = req.user;
  try {
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(400).json({ error: true, message: "User not found" });
    }
    return res.status(200).json({
      error: false,
      user: userData,
      message: "User found successfully",
    });
  } catch (err) {
    next(err);
  }
};

const test = async (req, res) => {
  console.log(req.cookies);
};
/*  making access_token with refresh_token */
const refresh = async (req, res, next) => {
  const refresh_token = req.cookies.refresh_token;
  console.log(refresh_token);
  if (!refresh_token) {
    return res
      .status(401)
      .json({ error: true, message: "Refresh token not found." });
  }
  try {
    const verified = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    console.log(verified);
    if (verified) {
      const userData = await User.findById(verified.id);
      console.log(userData);
      if (!userData) {
        return res.status(400).json({ error: true, message: "User not found" });
      }
      console.log(userData);
      makeAccessToken(res, userData._id);
      return res.status(200).json({
        error: false,
        message: "Access Token Generated successfully.",
      });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid or expired token" });
  }
};
/*    Login process   */
const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email) {
    return res
      .status(400)
      .json({ error: true, message: { email: "Email required." } });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: { password: "Password required." } });
  }
  try {
    const isUserExists = await User.findOne({ email }).select("+password");
    if (!isUserExists) {
      return res
        .status(400)
        .json({ error: true, message: { email: "Invalid Credential." } });
    }
    const isCorrectPassword = await bcrypt.compare(
      password,
      isUserExists.password
    );
    if (!isCorrectPassword) {
      return res
        .status(401)
        .json({ error: true, message: { email: "Invalid Credential." } });
    }
    makeAccessToken(res, isUserExists._id);
    makeRefreshToken(res, isUserExists._id);
    return res
      .status(200)
      .json({ error: false, message: "User Login Successfully" });
  } catch (err) {
    next(err);
  }
};

/*   Sign up process   */
const signup = async (req, res, next) => {
  const { user_name, email, password } = req.body;
  if (!user_name || !email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "ALL fields are required." });
  }
  if (!user_name) {
    return res
      .status(400)
      .json({ error: true, message: { user_name: "Username required." } });
  }
  if (!email) {
    return res
      .status(400)
      .json({ error: true, message: { email: "Email required." } });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: { password: "Password required." } });
  }
  try {
    const isEmailUsed = await User.findOne({ email });
    if (isEmailUsed) {
      return res
        .status(409)
        .json({ error: true, message: { email: "Email has already taken." } });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      user_name,
      password: hashedPassword,
      email,
    });
    makeAccessToken(res, newUser._id);
    makeRefreshToken(res, newUser._id);
    if (newUser) {
      return res
        .status(200)
        .json({ error: false, message: "User successfully created" });
    }
  } catch (err) {
    next(err);
  }
};
const username = async (req, res, next) => {
  const { user_name } = req.body;
  if (!req.user && !req.user.id) {
    return res
      .status(401)
      .json({ error: true, message: "User is not authenticated." });
  }
  try {
    const isUserExists = await User.findById(req.user.id);
    if (!isUserExists) {
      return res(400).json({ error: true, message: "User is not found." });
    }
    isUserExists.user_name = user_name;
    await isUserExists.save();
    return res
      .status(200)
      .json({ error: false, message: "Username has changed successfully." });
  } catch (err) {
    next(err);
  }
};
const color = async (req, res, next) => {
  if (!req.user && !req.user.id) {
    return res
      .status(401)
      .json({ error: true, message: "User is not authenticated." });
  }
  console.log("checking if the background is exists", req.body);
  const { background_color } = req.body;
  try {
    const isUserExists = await User.findById(req.user.id);
    if (!isUserExists) {
      return res
        .status(400)
        .json({ error: true, message: "User is not found." });
    }
    isUserExists.background_color = background_color;
    await isUserExists.save();
    return res.status(200).json({
      error: false,
      user: isUserExists,
      message: "Background-color has changed successfully.",
    });
  } catch (err) {
    next(err);
  }
};
const logout = async (req, res, next) => {
  res.clearCookie("access_token", cookieOptions);
  res.clearCookie("refresh_token", cookieOptions);
  return res
    .status(200)
    .json({ error: false, message: "User logout successfully" });
};
/* const category = async (req, res, next) => {
  const { category } = req.body;
  if (!category) {
    return res.status(400).json({ error: true, message: "Category required." });
  }
  try {
    const userId = req.user.id;
    const isCategoryExists = await User.findOne({
      _id: userId,
      categories: { $in: [category] },
    });
    if (isCategoryExists) {
      return res
        .status(409)
        .json({ error: true, message: "Category already exists." });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { categories: category } },
      { new: true }
    );
    return res.status(200).json({
      error: false,
      message: "Category added successfully.",
      categories: updatedUser.categories,
    });
  } catch (err) {
    next(err);
  }
}; */
export { getUser, login, signup, logout, color, username, refresh, test };
