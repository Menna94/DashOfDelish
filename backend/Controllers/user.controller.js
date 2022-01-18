const User = require("../Models/User");
const Recipe = require('../Models/Recipe');


//@desc     Fetch All Users
//@route    GET /api/users
//@access   private/@admin
exports.getUsers = async (req,res,next) =>{
    try{
        const users = await User.find();

        //check if the Database has users
        //if something went wrong while performing the find query
        if(!users){
            return res.status(404).send({
                success:false,
                messgae: 'Users Not Found!',
                data: null
            })
        }
        res.status(200).send({
            success:true,
            messgae: 'Users Fetched Successfully!',
            count: users.length, //return users' list count
            data: users //return all users
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



//@desc     Fetch Single User
//@route    GET /api/users/:userId
//@access   public
exports.getSingleUser = async (req,res,next) =>{
    try{
        const id= req.params.userId;
        const user = await User.findById(id);

        //check if the userId exists in the Database
        //if something went wrong while performing the find query
        if(!user){
            return res.status(404).send({
                success:false,
                messgae: 'User Is Not Found!',
                data: null
            })
        }
        res.status(200).send({
            success:true,
            messgae: 'User Fetched Successfully!',
            data: user
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



//@desc     Fetch Recipes Published By A User
//@route    GET /api/users/:userId/recipes
//@access   public
exports.getRecipesByUser = async (req,res,next) =>{
    try{
        const user = await User.findById(req.params.userId);

        //check if the userId exists in the Database
        if(!user){
            return res.status(404).send({
                success:false,
                messgae: 'User Is Not Found!',
                data: null
            })
        }

        const recipes = await Recipe.find({user: user.id});
        //check if there are any recipes for that user
        if(!recipes){
            return res.status(404).send({
                success:false,
                messgae: 'Recipes Not Found!',
                data: null
            })
        }

        res.status(200).send({
            success:true,
            messgae: 'Recipes Fetched Successfully!',
            data: recipes //return user's recipes
        })
    }
    catch(err){
        res.status(500).send({
            success:false,
            messgae: `Server Error In Fetching ${user.fname} Recipes!`,
            data: err.message
        })
    }
    
}


//@desc     Update A User
//@route    PUT /api/:userId
//@access   private/@user/@admin
exports.updateUser = async(req,res,next)=>{
    try{
        const userId = req.params.userId;

        const user = await User.findById(userId);

        //check if the userId exists in the Database
        if(!user){
            return res.status(404).send({
                success:false,
                messgae: 'User Is Not Found!',
                data: null
            })
        }
        
        //check if the user requesting to update profile is the profile owner
        if(req.user.id !== userId){
            return res.status(401).send({
                success:false,
                messgae: 'You Are Not Authorized To Perform Updating On This Object!',
                data: null
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, req.body , {
            new: true,
            runValidators: true
        })

        //if something went wrong while performing the update query
        if(!updatedUser){
            return res.status(400).send({
                success:false,
                messgae: 'Error In Updating User!',
                data: null
            })
        }

        res.status(200).send({
            success:true,
            messgae: 'User Updated Successfully!',
            data: updatedUser //return the updated user
        })

    }
    catch(err){
        res.status(500).send({
            success:false,
            messgae: 'Server Error In Updating User!',
            data: err.message
        })
    }
}



//@desc     Delete A User
//@route    DELETE /api/:userId
//@access   private/@admin
exports.deleteUser = async(req,res,next)=>{
    try{
        const userId = req.params.userId;
        const user = await User.findById(userId);

        //check if the userId exists in the Database
        if(!user){
            return res.status(404).send({
                success:false,
                messgae: 'User Is Not Found!',
                data: null
            })
        }
        
        //check if the request is done by the admin 
        if(req.user.role !== 'admin'){
            return res.status(401).send({
                success:false,
                messgae: 'This User Is Not Authorized To Delete This Object!',
                data: null
            })
        }

        const deletedUser = await User.findByIdAndRemove(userId)
        //if something went wrong while performing the delete query
        if(!deletedUser){
            return res.status(400).send({
                success:false,
                messgae: 'Error In Deleting User!',
                data: null
            })
        }
        const users = await User.find();

        res.status(200).send({
            success:true,
            messgae: 'User Deleted Successfully!',
            count: users.length, //return the users' list count
            data: users //retrun the rest of the users
        })

    }
    catch(err){
        res.status(500).send({
            success:false,
            messgae: 'Server Error In Deleting User!',
            data: err.message
        })
    }
}