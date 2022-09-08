const express = require("express")
const app = express();
const port = 3000;
app.use(express.json())
const userModel = require("./userModel");

app.post('/signup',async function (req,res) {
    try{
        let data = req.body;
        let newUser = await userModel.create(data);
        console.log(newUser);
        res.json({
            message : "Data received successfully"
        })}
    catch(err){
        res.send(err.message)
    }
})

app.listen(port,function(){
    console.log(`server started at port ${port}`)
})