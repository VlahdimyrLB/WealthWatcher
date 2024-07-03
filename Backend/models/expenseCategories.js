const mongoose = require('mongoose');

const expenseCategoriesSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('ExpenseCategory', expenseCategoriesSchema);
