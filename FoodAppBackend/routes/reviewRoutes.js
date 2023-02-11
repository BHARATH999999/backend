const express = require("express");
const { getAllReviewController, createReviewController, deleteReviewController, getPlanReviewsController } = require("../controller/reviewController");
const reviewRouter = express.Router();


reviewRouter.route('/')
    .get(getAllReviewController)
    .post(createReviewController)
    
reviewRouter.get("/deleteReview/:id", deleteReviewController)
reviewRouter.get("/getReviewsOfPlan/:id", getPlanReviewsController);

module.exports = reviewRouter;