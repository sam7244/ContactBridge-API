const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
//@desc Sign In
//@route POST api/user/signin
//@access public
const SignIn = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("error");
  }

  const haveOne = await User.findOne({ email });

  if (haveOne) {
    throw new Error("already Exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res
      .status(201)
      .json({ id: user._id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("user not created");
  }
});

//@desc LOG IN
//@route POST api/user/login
//@access public
const LogIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Enter All fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("user Not found");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user: {
          email: user.email,
          username: user.username,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECREAT,
      { expiresIn: "15m" }
    );
    res.status(200).json({ token });
  } else {
    res.status(401);
    throw new Error("password does not match");
  }
});

//@desc validate user
//@route POST api/user/curent
//@access private

const current = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { SignIn, LogIn, current };
