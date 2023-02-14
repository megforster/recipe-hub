const express = require('express');
const recipesController = require('../controllers/recipes-controller');

const router = express.Router();

router.get('/all', recipesController.getAllRecipes);

router.get('/:recipeId', recipesController.getRecipeById);

router.post('/', recipesController.addRecipe);

router.patch('/:recipeId', recipesController.updateRecipe);

router.delete('/:recipeId', recipesController.deleteRecipe);

module.exports = router;