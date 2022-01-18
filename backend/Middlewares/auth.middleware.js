const jwt = require('jsonwebtoken');
const User = require('../Models/User');

exports.protect = async (req,res,next) =>{
    try{
        let token;
        const bearerToken = req.headers.authorization;
        token = bearerToken.split(' ')[1];
        
        if(!token){
            throw new Error('You Are Not Authorized To Access This Route!')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);


        next();
    }
    catch(err){
        res.status(401).send({
            message: 'Auth Failed!'
        })
    }
}

exports.authRoles = (...roles) =>{
    return async ( req, res, next)=>{
        if(!roles.includes(req.user.role)){
            throw new Error('This User Is Not Authorized To Complete This Action')
        }
        next(); 
    } 
}