const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        maxlength: 50,
    },
    text:{
        type:String,
        required: [true, 'Please Add A Comment'],
        trim:true,
        maxlength: 50,
    },
    rating:{
        type: Number,
        required:[true, 'Please Add At Least Half Star'],
        min: 0.5,
        max:5
    },
    recipe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

//get average rating
reviewSchema.statics.getAvgRating = async function(recipeId){
    const obj = await this.aggregate([
        {
            $match: {recipe: recipeId}
        },{
            $group:{
                _id: "$recipe",
                avgRating : { $avg: "$rating" }
            }
        }
    ])


    try{
        await this.model('Recipe').findByIdAndUpdate(recipeId,{
            avgRating: obj[0].avgRating
        })
    }
    catch(err){
        console.log(err);
    }
}

//call getAvgRating before save
reviewSchema.pre('save', function(){
    this.constructor.getAvgRating(this.recipe)
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review