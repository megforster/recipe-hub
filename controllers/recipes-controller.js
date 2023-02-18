const HttpError = require('../models/http-error');
const {validationResult} = require("express-validator")
const Recipe = require('../models/recipe');


let DUMMY_RECIPES = [{id:'0', title:"Buttermilk Biscuits", image:"data:image/jpeg;base64,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",  ingrediants:"flour, salt, honey, buttermilk, baking powder", directions:"Mix the flour, salt, and baking powder together. Make a well in the middle and pour the buttermilk and honey"}, {id:'1', title:"Buttermilk Biscuits2", image:"data:image/jpeg;base64,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",  ingrediants:"flour, salt, honey, buttermilk, baking powder", directions:"Mix the flour, salt, and baking powder together. Make a well in the middle and pour the buttermilk and honey"}];

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
        const error = new HttpError('Could not find a recipe for the provided id', 404);
        return next(error);
    }
    
    res.json({recipe: recipe.toObject({getters:true})});
};

const addRecipe = async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs passed. Please  check your data.', 422);
    }
    
    const {title, ingrediants, directions} = req.body;
    const newRecipe = new Recipe({
        title, 
        image: "data:image/jpeg;base64,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",
        ingrediants,
        directions
    })

    try{
        await newRecipe.save();
    }catch(err){
        const error = new HttpError("Adding recipe failed, please try again", 500);
        return next(error);
    }


    res.status(201).json({recipe: newRecipe});
};

const updateRecipe = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs passed. Please  check your data.', 422);
    }

    const {title, image, ingrediants, directions} = req.body;
    const recipeId = req.params.recipeId;

    const updatedRecipe = { ...DUMMY_RECIPES.find(r => r.id === recipeId)};
    const recipeIndex = DUMMY_RECIPES.findIndex(r => r.id === recipeId);
    updatedRecipe.title = title;
    updatedRecipe.image = image;
    updatedRecipe.ingrediants = ingrediants;
    updatedRecipe.directions = directions;
    
    DUMMY_RECIPES[recipeIndex] = updatedRecipe;

    res.status(200).json({place:updatedRecipe});
};

const deleteRecipe = (req, res, next) => {
    const recipeId = req.params.recipeId;
    DUMMY_RECIPES = DUMMY_RECIPES.filter(r => r.id !== recipeId);
    res.status(200).json({message:"Deleted recipe."});
};

exports.getAllRecipes = getAllRecipes;
exports.getRecipeById = getRecipeById;
exports.addRecipe = addRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;