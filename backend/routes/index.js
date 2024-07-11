const express=require('express')
const app=express()
const router=express.Router()
const accountrouter=require('./account')
const userrouter=require('./user');
router.use("/user",userrouter)
router.use("/account",accountrouter)
module.exports=router
