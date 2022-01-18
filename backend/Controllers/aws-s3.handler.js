const AWS = require('aws-sdk');
const uuid = require('uuid');
const auth = require('../Middlewares/auth.middleware');
const jwt = require('jsonwebtoken');

const s3 = new AWS.S3({
    credentials:{
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey:process.env.SECRET_ACCESS_KEY
    },
    region: 'us-east-1'
    
})


module.exports = (app)=>{

    app.get('/api/upload', auth, (req,res, next)=>{

        try{
            //decoding userId to use it to make a personalized images folder in our s3 bucket
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  
            var userId = decoded.id  

            const key = `${userId}/${uuid.v1()}.jpeg`;

            s3.getSignedUrl('putObject',{
                Bucket:'dashofdelish-bucket',
                Key: key,
                ContentType:'image/jpeg'

            }, (err, url)=>{
                res.send({
                    key,
                    url
                })
            })
        }
        catch(err){
            res.status(500).send({
                success:false,
                message: err.message
            })
        }
        
    })
}