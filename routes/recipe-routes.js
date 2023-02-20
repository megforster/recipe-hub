const {Router} = require('express');
const {check} = require('express-validator');
const recipesController = require('../controllers/recipes-controller');

const router = Router();

router.get('/all', recipesController.getAllRecipes);

router.get('/:recipeId', recipesController.getRecipeById);

router.post(
    '/',
    [
        check('title').not().isEmpty(),
        check('image').not().isEmpty(),
        check('ingrediants').not().isEmpty(), 
        check('directions').not().isEmpty()
    ], 
    recipesController.addRecipe
);

router.patch(
    '/:recipeId',
    [
        check('title').not().isEmpty(), 
        check('image').not().isEmpty(),
        check('ingrediants').not().isEmpty(), 
        check('directions').not().isEmpty()
    ],  
    recipesController.updateRecipe
);

router.delete('/:recipeId', recipesController.deleteRecipe);

module.exports = router;