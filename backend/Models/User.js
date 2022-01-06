const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
});

//Encrypt password using bcrypt
UserSchema.pre('save', async function(next){
   this.password = await bcrypt.hash(this.password, 10);
    next();
})

//sign JWT
UserSchema.methods.getSignedJWT = function (){
    return jwt.sign({id: this._id}, `process.env.JWT_SECRET`,{
        expiresIn: `1d`
    })
}

//match user login password with the hashed one
UserSchema.methods.matchPass = async function(loginPass){
    return await bcrypt.compare(loginPass, this.password)
} 

UserSchema.plugin(uniqueValidator);
const User = mongoose.model('User', UserSchema);
module.exports = User;