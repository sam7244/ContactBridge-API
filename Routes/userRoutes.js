const express = require("express");
const { current, SignIn, LogIn } = require("../controllers/userController");
const validateToekn = require("../middleware/validateUserToken");

const router1 = express.Router();

router1.route("/signin").post(SignIn);
router1.route("/login").post(LogIn);
router1.route("/current").get(validateToekn, current);

module.exports = router1;
