const mongoose = require('mongoose')

const connectDB = async (url) => {
    // try {
    //     await mongoose.connect(process.env.MONGO_URI)
    //     console.log("Connected Succesfully");
    // } catch (error) {
    //     console.log("Connection Failed");
    // }

    return mongoose.connect(url)
}

module.exports = connectDB