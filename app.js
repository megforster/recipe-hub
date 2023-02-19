const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const recipeRoutes = require('./routes/recipe-routes');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*', );
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/recipes', recipeRoutes);

app.use((req, res, next)=>{
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});

app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code||500);
    res.json({message:error.message||"An unknown error occured."})
});

mongoose
    .connect("mongodb://localhost:27017/recipe-hub")
    .then(()=>{
        console.log("Sucessfully connected to database!");
        app.listen(5001);
    })
    .catch(err =>{
        console.log(err);
    });

