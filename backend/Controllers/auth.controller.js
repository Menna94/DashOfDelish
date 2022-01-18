const User = require('../Models/User');

//@desc     Signup
//@route    POST /api/users
//@access   public
exports.signup = async (req,res,next) =>{
    try{
        const {fname, lname, email, password, role} = req.body;    
        const user = await new User({
            fname,
            lname,
            email,
            password,
            role
        })
        user.save();
        if(!user){
            res.status(400).send({
                success:false,
                messgae: 'Email Already Exists!',
                data: null
            })
        }
        res.status(201).send({
            success:true,
            messgae: 'User Created Successfully!',
            data: await User.find()
        })
    }
    catch(err){
        res.status(500).send({
            success:false,
            messgae: 'Server Error In Signup!',
            data: err.message
        })
    }
    
}


//@desc     Login
//@route    POST /api/users
//@access   public
exports.login = async (req,res,next) =>{
    try{
        const {email, password} = req.body;
        //check if there's email and password
        if(!email || !password){
            res.status(400).send({
                success:false,
                messgae: 'Please Provide a Valid Email and Password!',
                data: null
            })
        }
        else{
            //look for the user in database using email-> unique 
            const user = await User.findOne({email});
            if(!user){ //if the user doesn't exist
                res.status(404).send({
                    success:false,
                    messgae: 'User Is Not Found!',
                    data: null
                })
            }
            else{
                //check if the entered password matches the one in the database
                const matchedPass = await user.matchPass(password);
                if(!matchedPass){
                    res.status(400).send({
                        success:false,
                        messgae: 'Password is Wrong, Please Try Again!',
                        data: null
                    })
                } else{
                    const token = user.getSignedJWT();
                    res.status(200).send({
                        success:true,
                        messgae: 'User LoggedIn Successfully!',
                        data: user,
                        token: token,
                        expiresIn:3600
                    })
                }
            }
        }
    }
    catch(err){
        res.status(500).send({
            success:false,
            messgae: 'Server Error In Login!',
            data: err.message
        })
    }
}
