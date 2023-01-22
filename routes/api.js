const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
router.get('/recipes', (req, res, next) => {
  // This will return all the data, exposing only the id and title field to the client
  Recipe.find({}, 'title')
    .then((data) => res.json(data))
    .catch(next);
});
router.post('/recipes', (req, res, next) => {
  if (req.body.title) {
    Recipe.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "title field cannot be empty",
    });
  }
});
router.delete('/recipes/:id', (req, res, next) => {
  Recipe.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});
module.exports = router;
