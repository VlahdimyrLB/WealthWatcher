const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// symbol, number, and capital letter checker for password
const passwordValidator = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
  return regex.test(password);
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must Provide a Name"],
      maxlength: [30, "Name must be less than or equal 30 characters"],
      trim: true,
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
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: passwordValidator,
        message:
          "Password must contain at least one uppercase letter, one number, and one special character.",
      },
    },
  },
  {
    timestamps: true,
  }
);

// mddleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
