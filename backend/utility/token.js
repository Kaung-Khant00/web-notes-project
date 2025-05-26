import jwt from "jsonwebtoken";

export const makeAccessToken = (res, id) => {
  const access_secret = process.env.JWT_ACCESS_SECRET;
  const access_token = jwt.sign({ id }, access_secret, {
    expiresIn: "15m",
  });
  res.cookie("access_token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 15, // max age 15 minutes
  });
};
export const makeRefreshToken = (res, id) => {
  const refresh_secret = process.env.JWT_REFRESH_SECRET;

  const refresh_token = jwt.sign({ id }, refresh_secret, {
    expiresIn: "7d",
  });

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7, // max age seven days
  });
};
