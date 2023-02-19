const HttpError = require('../models/http-error');
const {validationResult} = require("express-validator")
const Recipe = require('../models/recipe');

const getAllRecipes = async (req, res, next)=>{
    let recipes;

    try{
        recipes = await Recipe.find();
    }catch(err){
        const error = new HttpError("Something went wrong, could not find recipe(s)", 500);
        return next(error);
    }

    if(!recipes||recipes.length===0){
        const error = new HttpError("Could not find any recipes", 404);
        return next(error);
    }

    res.json({recipes: recipes.map(recipe=>recipe.toObject({getters:true}))});
};

const getRecipeById = async (req, res, next)=>{
    const recipeId = req.params.recipeId;
    let recipe;

    try{
        recipe = await Recipe.findById(recipeId);
    }catch(err){
        const error = new HttpError("Something went wrong, could not find a recipe", 500);
        return next(error);
    }

    if(!recipe){
        const error = new HttpError('Something went wrong, could not find a recipe for the provided id', 404);
        return next(error);
    }
    
    res.json({recipe: recipe.toObject({getters:true})});
};

const addRecipe = async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid inputs passed. Please  check your data.', 422));
    }
    
    const {title, ingrediants, image,  directions} = req.body;

    const newRecipe = new Recipe({
        title, 
        image: "t",
        ingrediants,
        directions
    })
    console.log("!!!!!!!!"+newRecipe.title);
    try{
        await newRecipe.save();
    }catch(err){
        const error = new HttpError("Adding recipe failed, please try again", 500);
        return next(error);
    }


    res.status(201).json({recipe: newRecipe});
};

const updateRecipe = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new HttpError('Invalid inputs passed. Please  check your data.', 422);
        return next(error);
    }

    const {title, image, ingrediants, directions} = req.body;
    const recipeId = req.params.recipeId;
    let recipe;

    try{
        recipe = await Recipe.findById(recipeId);
    }catch(err){
        const error = new HttpError("Something went wrong, could not find a recipe for the provided id", 500);
        return next(error);
    }

    recipe.title = title;
    recipe.image = image;
    recipe.ingrediants = ingrediants;
    recipe.directions = directions;

    try{
        await recipe.save();
    }catch(err){
        const error = new HttpError("Something went wrong, could not update the recipe", 500)
        return next(error);
    }

    res.status(200).json({recipe: recipe.toObject({getters:true})});
};

const deleteRecipe = async (req, res, next) => {
    const recipeId = req.params.recipeId;
    let recipe;

    try{
        recipe = await Recipe.findById(recipeId);
    }catch(err){
        const error = new HttpError("Something went wrong, could not find a recipe for the provided id", 500);
        return next(error);
    }

    try{
        await recipe.remove();
    }catch(err){
        const error = new HttpError("Something went wrong, could not delete recipe.")
        return next(error);
    }

    res.status(200).json({message:"Recipe deleted."});
};

exports.getAllRecipes = getAllRecipes;
exports.getRecipeById = getRecipeById;
exports.addRecipe = addRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;