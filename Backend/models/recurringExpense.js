const mongoose = require("mongoose")

const recurringExpenseSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IncomeCategory'
    },
    startDate: Date,
    frequency: String, // "weekly" or "monthly" chucu
    notes: String
})

module.exports = mongoose.model('Expense', recurringExpenseSchema)