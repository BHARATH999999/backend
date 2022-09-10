const express = require("express")
//npm i cookie-parser
const cookieParser = require("cookie-parser")

//npm i jsonwebtoken
const jwt = require("jsonwebtoken")
const secretKey = "svdknZnvdvn32t&CC"

const app = express();
app.use(cookieParser());
const port = 3000;


app.use(express.json())
const userModel = require("./userModel");

app.post('/signup',async function (req,res) {
    try{
        let data = req.body;
        let newUser = await userModel.create(data);
        console.log(newUser);
        res.json({
            message : "Data received successfully"
        })}
    catch(err){
        res.send(err.message)
    }
})

app.post("/login",async function(req,res){
    try{
        let data = req.body;
        // console.log(data);
        let {email,password} = data;
        if(email && password){
            let user = await userModel.findOne({email : email});
            if(user){
                if(user.password == password){
                    // console.log(user['_id']);
                    const token = jwt.sign({data : user['_id']}, secretKey);
                    console.log(token);
                    res.cookie("JWT",token);
                    res.send("User Logged in");
                }
                else{
                    res.send("Email or Password does not match")
                }
            }
            else{
                res.send("User with this email doesn't exists. Kindly Sign up")
            }
        }
        else{
            res.send("Kindly enter both Email and Password")
        }
    }catch(err){
        console.log(err.message);
        res.send(err.message);
    }
})

app.patch("/forgetPassword",async function(req,res){
    try{
        let {email} = req.body;
        let afterFiveMin = Date.now() + 1000*60*5;
        let otp = otpGenerator();
        // res.json({
        //     otp : otp
        // })

        let user = await userModel.findOneAndUpdate({email : email},{otp : otp, otpExpiry : afterFiveMin},{new : true})
        console.log(user);
        res.json({
            data : user,
            message : "Otp sent to your mail"
        })
        
    }
    catch(err){
        res.send(err.message);
    }
})

app.patch("/resetPassword", async function(req,res){
    try{
        let {otp, password, confirmPassword, email} = req.body;
        let user = await userModel.findOne({email});
        let currentTime = Date.now();

        if(currentTime > user.otpExpiry){
            delete user.otp;
            delete user.otpExpiry;
            res.json({
                message : "OTP expired"
            })
        }
        else{
            if(user.otp != otp){
                res.json({
                    message : "Invalid OTP"
                })
            }
            else{
                user = await userModel.findOneAndUpdate({otp},{password,confirmPassword},{runValidators : true, new : true})
                delete user.otp;
                delete user.otpExpiry;
                await user.save();
                res.json({
                    user : user,
                    message : "reset password successful"
                })
            }
        }
        console.log(user);
        res.json({
            data : user,
            message : "Password for the user is reset"
        })
    }
    catch(err){
        res.send(err.message);
    }
})

function otpGenerator(){
    return Math.floor(Math.random()*1000000);
}

app.get("/users", protectedRoute, async function(req,res){
    // console.log(req.cookies);
    try{
        let users = await userModel.find();
        res.json(users);
    }
    catch(err){
        res.send(err.message);
    }
})

app.get("/user", protectedRoute, async function(req,res){
    // console.log(req.cookies);
    try{
        const userId = req.userId;
        const user = await userModel.findById(userId);
        res.json({
            data : user,
            message : "Data about logged in user is send"
        });
    }
    catch(err){
        res.send(err.message);
    }
})

function protectedRoute(req,res,next){
    try{
        let cookies = req.cookies;
        let JWT = cookies.JWT;  
        if(JWT){
            const token = jwt.verify(JWT,secretKey);
            console.log(token);
            let userId = token.data;
            req.userId = userId;
            next();
        }
        else{
            res.send("You are not logged in. Kindly login")
        }
    }
    catch(err){
        console.log(err);
        res.send(err.message);
    }
}

app.listen(port,function(){
    console.log(`server started at port ${port}`)
})