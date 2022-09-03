const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

let user;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//get karna hai data from sayHello
app.get("/sayHello",function(req,res){
    res.json({
        user:user
    })
})

//post
app.post("/sayHello",function(req,res){
    user = req.body;
    res.json({
        message:"Data recieved Successfully",
        user:user
    })
})

//patch
app.patch("/sayHello",function(req,res){
    dataToUpdate = req.body;

    for(key in dataToUpdate){
        user[key] = dataToUpdate[key];
    }
    res.json({
        message:"Data updated",
        user:user
    })
})

//delete
app.delete("/sayHello",function(req,res){
    user = {}; // Delete whole keys

    //Delete only the specific keys mentioned
    // dataToUpdate = req.body;

    // for(key in dataToUpdate){
    //     delete user[key];
    // }
    
    res.json({
        message:"Deletion done",
        user:user
    })
})

app.get("/getMultiply/:num1/:num2",function(req,res){
    console.log(req.params);
    let num1 = req.params.num1;
    let num2 = req.params.num2;
    let mul = num1*num2;

    res.end("Multiply of params are "+mul)
})


//get kana hai data from sayBye
app.get("/sayBye",function(req,res){
    res.end("Bye");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})