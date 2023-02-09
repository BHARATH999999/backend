const multer = require('multer');
const ImageModel = require("../model/imageModel")
const storage = multer.diskStorage({
    destination: "uploads", 
    function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

// const upload = multer({
//     storage: storage,
// }).single('profile')

async function getImageController(req, res) {
    try {
        const img = await ImageModel.findOne({
            _id: req.body.id,
        });
        if (!img) {
            return res.status(404).json({
                message: "Profile not found"
            })
        }else{
            return res.status(200).json({
                img: img,
            })
        }
    }catch(err) {
        console.log(err);
        return res.status(500).json({
            error: err
        })
    }
}

function createImageController(req, res) {
    // upload(req, req.profile, (err) => {
    //     if (err) {
    //         console.error(err);
    //     }
    // })
    const image = new ImageModel({
        name : Date.now() + req.name,
        image : {
            data: req.profile,
            contentType: 'image/png',
        }
    });
    try{
        let response = image.save();
        console.log(response)
        res.send("Successfully uploaded !")
    }
    catch(err){
        console.log(err)
    }
    console.log(image._id);
}

module.exports = {
    createImageController,
    getImageController
}