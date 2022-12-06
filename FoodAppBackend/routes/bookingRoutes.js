const express = require("express");
const bookingRouter = express.Router();

const {createSession} = require("../controller/bookingController")

bookingRouter.post('/createSession',createSession);

bookingRouter.get('/createSession',function(req,res){
    res.sendFile("../booking.html")
})

module.exports = bookingRouter;