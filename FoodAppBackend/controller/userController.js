const userModel = require("../model/userModel")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


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

async function profilePicUploader(req,res){
    try{
        const userId = req.userId;
        const user = await userModel.findById(userId);
        const userPic = req.file.path;
        console.log(user);
        console.log(userPic);
        app.post('/profile/pic/upload', upload.single('avatar'), function (req, res, next) {
            // req.file is the `avatar` file
            // req.body will hold the text fields, if there were any
        })
        const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
        app.post('/cool-profile', cpUpload, function (req, res, next) {
        })
    }catch(err){
        res.send(err.message);
    }
}


module.exports = {
    profileController:profileController,
    getAllUsersController:getAllUsersController,
    getUserController : getUserController
}