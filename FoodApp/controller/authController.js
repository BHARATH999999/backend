const jwt = require("jsonwebtoken")
const secretKey = "secularKey"
const userModel = require("../model/userModel");
const mailSender = require("../utilities/mailSender")

async function signupController(req,res){
    try{
        let data = req.body;
        let newUser =await userModel.create(data);
        console.log(newUser);
        res.json({
            result:"data recieved",
        })}
    catch(err){
        res.status(500).json({
            result:err.message
        })
    }
}


async function loginController(req,res){
    try{
        let data = req.body;
        // console.log(data);
        let {email,password} = data;
        if(email && password){
            let user = await userModel.findOne({email:email});
            if(user){
                if(user.password == password){
                    //create JWT -> payload, secret key, algo by default -> SHA256
                    const token = jwt.sign({ data: user['_id'] }, secretKey);
                    // console.log(token);
                    //put token into cookies
                    res.cookie("JWT",token);
                    console.log(user);
                    res.status(200).json({user});
                }else{
                    res.status(400).json({result:"Email or Password does not match"})
                }
            }else{
                res.status(404).json({result:"User with this email does not exist. Kindly sign up"})
            } 
        }else{
            res.status(400).json({
                result:"Kindly enter email and password both"
            })
        }
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            result:err.message
        })
    }
}

async function forgetPasswordController(req,res){
    try{
        let {email} = req.body;
        let user = await userModel.findOne({email});
        if(user){
            let otp = otpGenerator();
            let afterFiveMin = Date.now() + 1000*60*5;
            await mailSender(email,otp);
            user.otp = otp;
            user.otpExpiry = afterFiveMin;
            await user.save();
            res.status(204).json({
                data:user,
                "message":"Otp send to your mail"
            })
        }else{
            res.status(404).json({
                result:"user with this email does not exist"
            })
        }
       
    }catch(err){
        res.status(500).send(err.message);
    }
}


async function resetPasswordController(req,res){
    try{
        let {otp,password,confirmPassword,email} = req.body;
        let user = await userModel.findOne({email});
        let currentTime = Date.now();
        if(currentTime>user.otpExpiry){
            delete user.otp;
            delete user.otpExpiry;
            await user.save();
            res.status(200).json({
                message:"OTP Expired"
            })
        }else{
            if(user.otp != otp){
                res.status(200).json({
                    message:"OTP does not match"
                })
            }else{
                user = await userModel.findOneAndUpdate({otp},{password,confirmPassword},{runValidators:true,new:true});
                delete user.otp;
                delete user.otpExpiry
                await user.save();

                res.status(201).json({
                    user:user,
                    message:"user password reset complete"
                })
            }
        }
        //key delte -> get the document obj -> modify that object by removing useless keys
        //save this doc in db

    }catch(err){
        res.status(500).send(err.message)
    }
}


function otpGenerator(){
    return Math.floor(Math.random()*1000000);
}


function protectRoute(req,res,next){
    try{
        let cookies = req.cookies;
        let JWT = cookies.JWT;
        if(cookies.JWT){
            const token = jwt.verify(JWT,secretKey);
            console.log(token);
            let userId = token.data;
            req.userId = userId;
            next();
        }else{
            res.send("You are not logged in. Kindly login");
        }
    }catch(err){
        console.log(err);
        res.send(err.message)
    }
    
}

module.exports = {
    signupController,
    loginController,
    resetPasswordController,
    forgetPasswordController,
    protectRoute
}