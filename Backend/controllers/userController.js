const User = require("../models/user");

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
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
