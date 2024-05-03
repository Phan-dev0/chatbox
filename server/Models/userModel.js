const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    password: { type: String, required: true, minlength: 3, maxlength: 1000 },
  },
  {
    timestamps: true,
  }
);

// mongoose will create colection of User
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;