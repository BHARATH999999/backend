const mongoose = require('mongoose')

let dbLink = "mongodb://dbUser:Bharath@ac-ydvi2re-shard-00-00.tgijfc6.mongodb.net:27017,ac-ydvi2re-shard-00-01.tgijfc6.mongodb.net:27017,ac-ydvi2re-shard-00-02.tgijfc6.mongodb.net:27017/?ssl=true&replicaSet=atlas-ubnxi8-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(dbLink).then(function(){
console.log("connected");
}).catch(function(err){
    console.log("error",err);
})