const express = require("express");
const app = express();
const multer = require('multer');
const ImageModel = require("../model/imageModel")
const storage = multer.diskStorage({
    destination: "uploads", 
    function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({
    storage: storage,
}).single('profile')


app.post('/upload', (req, file, cb) => {
    upload(req, file, (err) => {
        if (err) {
            console.error(err);
        }
        else{
            const image = new ImageModel({
                name: req.body.name,
                image : {
                    data: req.file.filename,
                    contentType: 'image/png',
                }
            });
            image.save()
            .then(() => res.send("Successfully uploaded !"))
            .catch(err => console.log(err))
        }
    })
})
