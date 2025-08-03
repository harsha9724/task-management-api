const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function register(req,res) {
    try{
        
        const {email,password} = req.body;
        //checking the user is exists with given email
        const existing_user = await User.findOne({email:email});

        if(existing_user){
            return res.status(400).json({
                status:"Failed",
                message:"User already exists"
            })
        }else{
            // hash the password using bcrypt with salt round of 10
            bcrypt.hash(password,10,async (err,hash)=>{
                if(err){
                    return res.status(400).json({
                        status:"Failed",
                        message:err.message
                    })
                }else{
                    // now store the registered user data with hashed password
                  const data=  await User.insertOne({email:email,password:hash});

                    return res.status(201).json({
                        status:"Success",
                        message:"User registered successfully",
                        data:{
                            user_id:data._id
                        }
                    })
                }
            })
        }
        
    }catch(error){
        return res.status(500).json({
            status:"Failed",
            message:error.message
        })
    }
}


async function login(req,res) {
    try{
        
        const {email,password} = req.body;
        //checking the user is exists with given email
        const existing_user = await User.findOne({email:email});

        if(!existing_user){
            return res.status(404).json({
                status:"Failed",
                message:"User doesnot exists"
            })
        }else{
            //compare the hashed the password with plainpassword using bcrypt with salt round of 10
            bcrypt.compare(password,existing_user.password,(error,result)=>{
                if(error){
                    return res.status(400).json({
                        status:"Failed",
                        message:error.message
                    })
                }
                if(!result){
                    return res.status(400).json({
                        status:"Failed",
                        message:"Invalid Credentials"
                    })
                }else{
                    // credentials are matched and we need to create jwt token for the futher authentication
                    jwt.sign(
                        {user_id:existing_user._id}
                        ,process.env.JWT_SCRETE,
                        { expiresIn: '1h' },
                        function(err, token) {
                            if(err){
                                return res.status(400).json({
                                    status:'Failed',
                                    message:err.message
                                })
                            }else{
                                return res.status(200).json({
                                    status:"success",
                                    message:"User login success",
                                    token: token
                                })
                            }
                        }
                    )
                }
            })
        }
        
    }catch(error){
        return res.status(500).json({
            status:"Failed",
            message:error.message
        })
    }
}

module.exports = {register,login}