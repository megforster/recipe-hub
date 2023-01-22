const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create schema for Recipe
const RecipeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The title text field is required'],
  }
});
// Create model for Recipe
const Recipe = mongoose.model('recipe', RecipeSchema);
module.exports = Recipe;