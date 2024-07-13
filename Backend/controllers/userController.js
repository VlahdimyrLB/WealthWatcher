const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, username, password } = req.body;

  // Check if all required fields are provided
  if (!name || !username || !password) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: { name: newUser.name, username: newUser.username },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Cannot find user" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    try {
      await User.create({ name, username, password });
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {}
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    const user = await User.findOneAndUpdate({ _id: userId }, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.send(400).json({ msg: `No user with id: ${userId}` });
    }

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOneAndDelete({ _id: userId });

    if (!user) {
      return res.send(400).json({ msg: `No user with id: ${userId}` });
    }

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
