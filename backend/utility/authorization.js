import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }
  try {
    const verified = jwt.verify(access_token, process.env.JWT_ACCESS_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid or expired token" });
  }
};
export default verifyToken;
