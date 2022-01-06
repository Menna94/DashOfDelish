const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    try{
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split(' ')[1];
        jwt.verify(token, `process.env.JWT_SECRET`);
        next();
    }
    catch(err){
        res.status(401).send({
            message: 'Auth Failed!'
        })
    }
}