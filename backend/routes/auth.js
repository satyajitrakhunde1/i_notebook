const express =require('express')
const User = require('../models/User')
const router =express.Router()


router.use(express.json()) //middleware for body parser 

router.post('/',(req,res)=>{
    console.log(req.body)
    const userr =User(req.body)
    userr.save()
    console.log(userr)
    console.log(User)

res.end("hi from auth")

})


module.exports=router