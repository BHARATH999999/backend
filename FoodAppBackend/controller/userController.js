const userModel = require("../model/userModel")


async function profileController(req,res){
    try{
        const userId = req.userId;
        const user = await userModel.findById(userId);
        //to send json data
        res.json({
            user:user,
            message:"Data about logged in user is send"
        })
    }catch(err){
        res.send(err.message)
    }
}

async function getAllUsersController(req,res){
    try{
        let users = await userModel.find();
        res.json(users);
    }catch(err){
        res.send(err.message);
    }
    // console.log(req.cookies);
    // res.send("cookie read");
}

async function getUserController(req,res){
    try{
        // console.log(req.);
        const user = await userModel.findByIdAndUpdate(req.body._id,req.body);
        console.log(user);
        res.json(user);
    }
    catch(err){
        res.send(err.message);
    }
}


module.exports = {
    profileController:profileController,
    getAllUsersController:getAllUsersController,
    getUserController : getUserController
}