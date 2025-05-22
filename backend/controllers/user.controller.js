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
  if (!refresh_token) {
    return res
      .status(200)
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
  if (!email) {
    return res.status(400).json({ error: true, message: "email required." });
  }
  if (!password) {
    return res.status(400).json({ error: true, message: "Password required." });
  }
  try {
    const isUserExists = await User.findOne({ email }).select("+password");
    if (!isUserExists) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid Creditial." });
    }
    const isCorrectPassword = await bcrypt.compare(
      password,
      isUserExists.password
    );
    if (!isCorrectPassword) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid Creditial." });
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
    return res.status(400).json({ error: true, message: "Username required." });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "email required." });
  }
  if (!password) {
    return res.status(400).json({ error: true, message: "Password required." });
  }
  try {
    const isEmailUsed = await User.findOne({ email });
    if (isEmailUsed) {
      return res
        .status(409)
        .json({ error: true, message: "Email has already taken." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ user_name, password: hashedPassword, email });
    const savedUser = await newUser.save();
    makeAccessToken(res, isUserExists._id);
    makeRefreshToken(res, isUserExists._id);
    if (savedUser) {
      return res
        .status(200)
        .json({ error: false, message: "User successfully created" });
    }
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
export { getUser, login, signup, logout, refresh, test };
