const Recipe = require("../Models/Recipe")
const multer = require('multer');
const uuid = require('uuid');
const User = require("../Models/User");
const mongoose = require('mongoose');

//multer configs
const MINME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
}

exports.storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        const isValid = MINME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid File Type');

        if(isValid){
            error = null
        }
        cb(error , "backend/images")
    },
    filename: (req, file, cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MINME_TYPE_MAP[file.mimetype];
        cb(null, `${name}-${Date.now()}.${ext}`);
    },
})




//@desc     Fetch Single Recipes
//@route    GET /api/recipes/:id
//@access   public
exports.getSingleRecipe = async(req,res,next)=>{
    try{
        const recipe = await Recipe.findById({_id: req.params.id});

        if(!recipe){
            res.status(404).send({
                success:false,
                messgae: 'Requested Recipe is Not Found!',
                data: null
            }) 
        }
        res.status(200).send({
            success:true,
            messgae: 'Requested Recipe is Fetched Successfully!',
            data: recipe
        })
    }
    catch(err){
        res.status(500).send({
            success:false,
            messgae: 'Server Error In Fetching Requested Recipe!',
            data: err.message
        })
    }
}

//@desc     Fetch All Recipes
//@route    GET /api/recipes
//@access   public
exports.getRecipes = async (req,res,next) =>{
    try{
        const recipes = await Recipe.find();

        if(!recipes){
            res.status(404).send({
                success:false,
                messgae: 'Recipes Not Found!',
                data: null
            })
        }
        res.status(200).send({
            success:true,
            messgae: 'Recipes Fetched Successfully!',
            data: recipes
        })
    }
    catch(err){
        res.status(500).send({
            success:false,
            messgae: 'Server Error In Fetching Recipes!',
            data: err.message
        })
    }
    
}



//@desc     Create A Recipe
//@route    POST /api/recipes
//@access   private/@user
exports.createRecipe = async (req,res,next) =>{
    try{
        const url = `${req.protocol}://${req.get('host')}`; 
        const user = req.user.id
        
        const {
            servings, 
            prepTime,
            cookingTime,
            totalTiming, 
            recipeName, 
            briefIntro,
            // recipeImg,
            history,
            nutritionInfo,
            ingredients,
            directions
        } = req.body;

        const recipe = new Recipe({
            servings,
            prepTime,
            cookingTime,
            totalTiming,
            recipeName,
            briefIntro,
            // recipeImg:`${url}/images/${recipeImg}`,
            history,
            nutritionInfo,
            ingredients,
            directions,
            user
        })
        await recipe.save();
        

        if(!recipe){
            return res.status(400).send({
                success:false,
                messgae: 'Error Creating the Recipe!',
                data: null
            })
        }

        // const newRole = await User.findByIdAndUpdate(user,
        //     {
        //         role:'publisher'
        //     },
        //     {
        //         new:true,
        //         runValidators:true
        //     }
        // )
        

        res.status(201).send({
            success:true,
            messgae: 'Recipe Created Successfully!',
            data: recipe,
            recipeId : recipe._id,
            user,
            // newRole
        })
    }
    catch(err){
        res.status(500).send({
            success:false,
            messgae: 'Server Error In Creating Recipe!',
            data: err.message
        })
    }
    
}

//@desc     Update A Recipe
//@route    PUT /api/recipes/:id
//@access   private/@publisher
exports.updateRecipe = async (req,res,next)=>{
    try{
        const id = req.params.id;

        let recipe = await Recipe.findById(id);

        if(!recipe){
            return res.status(404).send({
                success:false,
                messgae: 'The Recipe is Not Found!',
                data: null
            })   
        }



        if(req.user.id !== recipe.user.toString()){
            return res.status(401).send({
                success:false,
                messgae: 'This User Is Not Authorized To Perform Updating On This Object!',
                data: null
            })   
        }
        
        recipe = await Recipe.findByIdAndUpdate(id, req.body,{
            new:true,
            runValidators:true
        })

        if(!recipe){
            res.status(400).send({
                success:false,
                messgae: 'Error In Updating a Recipe!',
                data: err.message
            })   
        }
        res.status(200).send({
            success:true,
            messgae: 'Recipe Updated Successfully!',
            data: recipe
        }) 

    }
    catch(err){
        res.status(500).send({
            success:false,
            messgae: 'Server Error In Updating a Recipe!',
            data: err.message
        })
    }
}

//@desc     Delete A Recipe
//@route    Delete /api/recipes/:id
//@access   private/@publisher
exports.delRecipe = async (req,res,next)=>{
    try{
        const recipe = await Recipe.findById(req.params.id);

        if(req.user.id !== recipe.user.toString()){
            return res.status(401).send({
                success:false,
                messgae: 'This User Is Not Authorized To Perform Deleting On This Object!',
                data: null
            })   
        }

        const recipeDeleted = await Recipe.deleteOne({_id: req.params.id});

        if(!recipeDeleted){
            return res.status(400).send({
                success:false,
                messgae: 'Server Error In Deleting Recipe!',
                data: err.message
            })
        }

        res.status(200).send({
            success:true,
            messgae: 'Recipe Deleted Successfully!',
            data: await Recipe.find()
        })

    }
    catch(err){
        res.status(500).send({
            success:false,
            messgae: 'Server Error In Deleting Recipe!',
            data: err.message
        })
    }
}