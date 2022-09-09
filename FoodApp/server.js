const express = require("express")
//npm i cookie-parser
const cookieParser = require("cookie-parser")
const app = express();
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
                    res.cookie("token","sample value");
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

app.get("/users",function(req,res){
    console.log(req.cookies);
    // res.send(req.cookies);
})
app.listen(port,function(){
    console.log(`server started at port ${port}`)
})