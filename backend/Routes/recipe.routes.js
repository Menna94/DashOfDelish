const express = require('express');
const router = express.Router();
const { 
    getRecipes, 
    createRecipe, 
    delRecipe,
    updateRecipe,
    getSingleRecipe,
    storage
} 
= require('../Controllers/recipe.controller')
const auth = require('../Middlewares/auth.middleware');
const multer = require('multer');

//Fetch All Recipes
//GET /api/recipes
router.get('/', getRecipes);

//Fetch Single Recipe
//GET /api/recipes/:id
router.get('/:id', getSingleRecipe);

//Create A Recipe
//POST /api/recipes
router.post('/', auth, multer({storage:storage}).single("recipeImg"), createRecipe);

//Update A Recipe
//PUT /api/recipes/:id
router.put('/:id', auth, updateRecipe)

//Delete A Recipe
//Delete /api/recipes/:id
router.delete('/:id', auth, delRecipe)



module.exports = router;