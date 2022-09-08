const express = require("express")
const app = express();
const port = 3000;

const userModel = require("./userModel");

app.listen(port,function(){
    console.log(`server started at port ${port}`)
})