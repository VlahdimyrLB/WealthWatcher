const mongoose = require("mongoose")

const incomeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IncomeCategory'
    },
    source: String,
    date: Date,
    notes: String
})

module.exports = mongoose.model('Income', incomeSchema)