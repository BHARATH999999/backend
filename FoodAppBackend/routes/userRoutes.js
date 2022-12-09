const express = require("express");
const userRouter = express.Router();
const {getAllUsersController, profileController , getUserController} = require("../controller/userController")

const {protectRoute} = require("../controller/authController")
userRouter.get("/", protectRoute,getAllUsersController)

userRouter.get("/profile",protectRoute, profileController)

userRouter.patch("/",protectRoute, getUserController)

module.exports = userRouter;