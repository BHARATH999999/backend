const express = require("express");
const { getImageController, createImageController } = require("../controller/imageController");
const imageRouter = express.Router();

imageRouter.route('/')
    .get(getImageController)
    .post(createImageController);

module.exports = imageRouter;