const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const validateToekn = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECREAT, (error, decoded) => {
      if (error) {
        res.status(400);
        throw new Error("the token is not verified");
      }

      req.user = decoded.user;
      next();
    });
  }

  if (!token) {
    res.status(400);
    throw new Error("the token is invalid");
  }
});

module.exports = validateToekn;
