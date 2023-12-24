import jwt from "jsonwebtoken";

export const generateAccessToken = (id, name, email) => {
  const accessToken = jwt.sign(
    { id: id, name: name, email: email },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: process.env.ACCESS_EXPIRY,
    },
  );
  return accessToken;
};

export const generateRefreshToken = (id) => {
  const refreshToken = jwt.sign(
    {
      id: id,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: process.env.REFRESH_EXPIRY },
  );
  return refreshToken;
};
