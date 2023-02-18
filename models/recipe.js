const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for Recipe
const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The title text field is required']
  }, 
  image: {
    type: String, 
    required:[false]
  },
  ingrediants:{
    type: String, 
    required: [true, 'The ingrediants field is required']
  }, 
  directions:{
    type: String, 
    required:[true, 'The  directions field is required']
  } 
});

// Create model for Recipe
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;