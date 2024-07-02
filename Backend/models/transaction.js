const mongoose = require('mongoose')

const budgetScehma = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: { 
        type: String, 
        enum: ['income', 'expense'] 
    }, // "income" or "expense"
    amount: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'type' // Dynamic ref based on 'type' field above (income or expense) pag nakapili ng type then mag bebase na tong category kung saang category siya sana magets ney
    },
    date: Date,
    notes: String
})

module.exports = mongoose.model('Budget', budgetScehma)