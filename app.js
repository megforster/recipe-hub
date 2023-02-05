const express = require('express');
const bodyParser = require('body-parser');

const recipeRoutes = require('./routes/recipe-routes');

const app = express();

app.use(recipeRoutes);

app.listen(3000);