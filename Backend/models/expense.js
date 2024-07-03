const mongoose = require("mongoose")

const expenseSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IncomeCategory'
    },
    date: Date,
    recurring: Boolean,
    notes: String
})

module.exports = mongoose.model('Expense', expenseSchema)