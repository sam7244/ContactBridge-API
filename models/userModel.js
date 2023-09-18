const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "please enter the string"],
    },
    email: {
      type: String,
      require: [true, "enter the email is compulsory"],
      unique: [true, "enter the unique email"],
    },
    password: {
      type: String,
      require: [true, "enter the contact number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
