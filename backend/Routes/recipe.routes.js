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
const { protect, authRoles }  = require('../Middlewares/auth.middleware');
const multer = require('multer');

//Fetch All Recipes
//GET /api/recipes
router.get('/', getRecipes);

//Fetch Single Recipe
//GET /api/recipes/:id
router.get('/:id', getSingleRecipe);

//Create A Recipe
//POST /api/recipes
// , multer({storage:storage}).single("recipeImg")
router.post('/', protect, createRecipe);

//Update A Recipe
//PUT /api/recipes/:id
router.put('/:id', protect, updateRecipe)

//Delete A Recipe
//Delete /api/recipes/:id
router.delete('/:id', protect, delRecipe)



module.exports = router;