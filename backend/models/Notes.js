const mongoose =require('mongoose')

const Noteschema = new Schema({
    title:{
        type:string,
        required:true
    },

    description:{
        type:string,
        required:true
    },
    tag:{
        type:string,
        default:'General'
    },
   
    date:{
        type:string,
        default:Date.now
    },

  });

  module.exports =mongoose.model('notes',Noteschema)