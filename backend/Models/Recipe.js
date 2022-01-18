const mongoose = require('mongoose');


const ingredientsSubSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    amount: {
        type:Number,
        required: true
    }
})

const directionsSubSchema = new mongoose.Schema({
    stepTitle:{
        type:String
    },
    step: {
        type:Number,
        required: true
    },
    stepDetails:{
        type:String,
        required: true
    }
})

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type:String,
        required: true
    },
    // recipeImg:{
    //     type:String,
    //     // required: true
    // },

    servings: {
        type:Number,
        required: true
    },
    prepTime:String,
    cookingTime:String,
    totalTiming: {
        type:String,
        required: true
    },
    briefIntro: {
        type:String,
        required: true
    },
    
    history: String,
    nutritionInfo:String,
    ingredients: {
        type: [ingredientsSubSchema], 
        required: true
    },
    directions: {
        type: [directionsSubSchema], 
        required: true
    },
    avgRating: {
        type:Number,
        min:[0.5, 'Rate With At Least 0.5 Star'],
        max: [5, 'Maximum Rate is 5 Stars']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
},{
    timestamps:true
})


const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe