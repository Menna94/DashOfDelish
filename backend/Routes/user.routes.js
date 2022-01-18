const { 
    getRecipesByUser, 
    getUsers, 
    getSingleUser,
    updateUser,
    deleteUser 
} = require('../Controllers/user.controller');
const { protect, authRoles } = require('../Middlewares/auth.middleware');

const express = require('express'),
router = express.Router();


//Fetch All Users
//GET /api/users
router.get('/', getUsers);

//Fetch Single User
//GET /api/users/:id
router.get('/:id', getSingleUser);

//Fetch User's Recipes
//GET /api/users/:id/recipes => id = userId
router.get('/:id/recipes', protect, getRecipesByUser);

//Update A User
//PUT /api/:userId
router.put('/:userId', protect, updateUser);

//Delete A User
//DELETE /api/:userId
router.delete('/:userId', protect, authRoles('admin'), deleteUser);



module.exports = router;