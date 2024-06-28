const express = require('express')
const app = new express()

const connectDB = require('./database/connect.js')
require("dotenv").config()

const User = require('./models/users.js')


// sample get users
app.get("/api/v1/users", async (req, res) => {
    try {
        const users = await User.find({})
        res.status(201).json({ users })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})


const PORT = process.env.PORT || 3000
const start = async ()  => {
    // connect to db first then listen to port
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(PORT, () => {
            console.log(`Server is listening to port ${PORT}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();