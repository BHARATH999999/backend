const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    image : {
        data:Buffer,
        contentType: String,
    }
})

module.exports = ImageModel = mongoose.model('Image', ImageSchema);