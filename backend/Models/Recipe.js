const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type:String,
        required: true
    },
    recipeImg:{
        type:String,
        required: true
    },

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
    // ingredients: {
    //     type:String,
    //     required: true
    // },
    // steps: {
    //     type:String,
    //     required: true
    // },
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe