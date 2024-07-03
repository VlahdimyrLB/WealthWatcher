const express = require('express')
const app = new express()
const bcrypt = require('bcrypt')

const connectDB = require('./database/connect.js')
const User = require('./models/user.js')

require("dotenv").config()
const PORT = process.env.PORT || 3000


// parse JSON body middleware
app.use(express.json());

// sample get users
app.get("/api/v1/users", async (req, res) => {
    try {
        const users = await User.find({})
        res.status(201).json({ users })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})

// User registration endpoint
app.post('/api/v1/register', async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const user = new User({ name, username, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// user login endpoint
app.post('/api/v1/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const start = async ()  => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(PORT, () => {
            console.log(`Server is listening to port ${PORT}...`)
        })
    } catch (error) {
        console.log(error.message)
    }
}

start();