const express=require('express');
const {authMiddleware}=require('../middleware')
const {Bank}=require('../db');
const mongoose=require('mongoose');
const router=express.Router();
router.get('/balance',authMiddleware,async(req,res)=>{
    const account= await Bank.findOne({
        userId:req.userId
    })
    return res.json({balance:account.balance})
})
router.post('/transfer',authMiddleware,async (req,res)=>{
    const session=await mongoose.startSession()
    session.startTransaction()
    const to=req.body.to;
    const amount=req.body.amount;
    const account= await Bank.findOne({
        userId:req.userId
    }).session(session)
    console.log(account)
    if (!account||account.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "Invalid sender account/low balance"
        })
    }
    const reciever=await Bank.findOne({userId:to}).session(session)
    if (!reciever){
        session.abortTransaction()
        return res.status(400).json({
            message: "Invalid reciever account"
        })
    }
    await Bank.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Bank.updateOne({userId:to},{$inc:{balance:amount}}).session(session)
    await session.commitTransaction()
    res.json({
        message: "Transfer successful"
    })
    console.log('done')
})
module.exports=router