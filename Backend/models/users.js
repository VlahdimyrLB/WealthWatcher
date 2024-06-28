const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide Name"],
    trim: true,
    maxlength: [20, "Name must be less than or equal 20 characters"],
    unique: true, 
  },
  username: {
    type: String,
    required: [true, "Must Provide Username"],
    trim: true,
    maxlength: [20, "Username must be less than or equal 20 characters"],
    unique: true, 
  },
  password: {
    type: String,
    required: [true, "Must Provide Password"],
    trim: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
