const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized",
      error: "No token provided",
      data: null,
    });
  }

  // Check if the authorization header is in the format "Bearer <token>"
  const parts = authorization.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      status: false,
      message: "Invalid token format",
      error: 'Token must be in the format "Bearer <token>"',
      data: null,
    });
  }

  const token = parts[1];

  jwt.verify(token, JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).json({
        status: false,
        message: "You're not authorized",
        data: null,
      });
    }

    req.user = decode;
    next();
  });
};
