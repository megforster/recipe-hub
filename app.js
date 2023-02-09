const express = require('express');
const bodyParser = require('body-parser');

const recipeRoutes = require('./routes/recipe-routes');

const app = express();

app.use('/api/recipes', recipeRoutes);

app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code||500);
    res.json({message:error.message||"An unknown error occured."})
});

app.listen(5001);