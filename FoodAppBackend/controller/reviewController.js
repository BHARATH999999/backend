const foodReviewModel = require("../model/reviewModel");
const foodPlanModel = require("../model/planModel");


//example -> 1,2,3,4,5 -> avg 15/5 = 3
//you have already an average of 3. one more review is added 3 what will be the new average?
// total sum = avg*length = 3*5 = 15 add new entry to it 
// new total sum = 18
//new length = old length + 1 = 6
//new average = new total sum / new length = 18/6 = 3


async function createReviewController(req, res) {
    try {
        let reviewData = req.body;
        let review = await foodReviewModel.create(reviewData);
        console.log(review);
        let rating = review.rating || 5;
        let reviewId = review["_id"];
        let currentPlan = await foodPlanModel.findById({_id : review.plan});
        // console.log(currentPlan);
        let totalNumRating = 0;
        if(currentPlan?.reviews.length) totalNumRating = currentPlan.reviews.length;
        let sumOfAllRatings = 0;
        if (currentPlan?.totalRating) sumOfAllRatings = currentPlan?.totalRating;
        currentPlan.totalRating = sumOfAllRatings + rating;
        currentPlan.averageRating = (sumOfAllRatings + rating) / (totalNumRating + 1);
        currentPlan.reviews.push(reviewId);
        await currentPlan.save();
        console.log(review);
        res.status(201).json({
            review,
            result: "created"
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

async function getAllReviewController(req, res) {
    try {
        let reviews = await foodReviewModel.find()
            .populate({ path: 'user', select: 'name pic' })
            .populate({ path: 'plan', select: 'name duration price' });
        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

async function getPlanReviewsController(req, res) {
    try{
        let reviews = await foodReviewModel.find({plan : req.params.id});
        res.status(200).json({
            reviews,
            result: "all reviews sent"
        })
    }
    catch(err){
        console.log(err);res.status(200).json({
            reviews,
            result: "all reviews sent"
        })
        res.status(500).json({
            message: err.message
        })
    }
}

async function deleteReviewController(req, res) {
    try {
        let reviews = await foodReviewModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "your review has been deleted",
            data: reviews.data
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
}
module.exports = {
    createReviewController,
    getAllReviewController,
    deleteReviewController,
    getPlanReviewsController
}