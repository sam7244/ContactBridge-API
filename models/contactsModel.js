const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "enter the user Id"],
      ref: "User",
    },
    name: {
      type: String,
      require: ["please enter the string"],
    },
    email: {
      type: String,
      require: ["enter the email is compulsory"],
    },
    phone: {
      type: String,
      require: ["enter the contact number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
