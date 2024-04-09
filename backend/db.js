const mongoose=require('mongoose')
const URL ="mongodb://localhost:27017"


const  MongoConnect =async ()=>{
    await mongoose.connect(URL)
   .then( console.log("connected to mongoDB"))
}

module.exports =MongoConnect; 