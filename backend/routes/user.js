const express=require('express');
const app=express()
const router=express.Router()
const jwt=require('jsonwebtoken')
const {authMiddleware}=require('../middleware')
const zod=require('zod');
const secret=require('../config')
const {User, Bank}=require('../db')
// const inputschema=zod.object({
//     username:zod.string(),
//     firstname:zod.string(),
//     lastname:zod.string(),
//     password:zod.string()
// })
const signupBody = zod.object({
    username: zod.string(),
	firstname: zod.string(),
	lastname: zod.string(),
	password: zod.string()
})


router.post('/signup',async (req,res)=>{
    const { success,error}=signupBody.safeParse(req.body)
    console.log('hello')
    if(!success){
        return res.json({message:"Email already taken / Incorrect inputs"})
    }
    console.log('not hello')
    const userexists=await User.findOne({username:req.body.username})
    if (userexists){
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    


    await User.create({
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:req.body.password
    }).then((newuser)=>{
        const userId=newuser._id
        const token=jwt.sign({userId},secret)
        Bank.create({
            userId,
            balance:1+Math.random()*10000
        })
        res.json({
            message: "User created successfully",
            token: token
        })
    })
    



})
router.post('/signin',async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    
    const userexists=await User.findOne({username:username,password:password})
    
    if(!userexists){
        console.log("No")
        return res.status(401).json({message: "Error while logging in"})
        
    } else{
        const userId=userexists._id
        const token=jwt.sign({userId},secret)
        console.log('hiii')
        return res.json({token:token})
        
    }
})
router.put('/user',authMiddleware,async (req,res)=>{
    const updateuser=zod.object({
        firstname:zod.string().optional(),
        lastname:zod.string().optional(),
        password:zod.string().min(6).optional()
    })
    const allokay=updateuser.safeParse(req.body);
    if(!allokay){
        return res.status(411).json({message: "Error while updating information"})
    }else{
        const userindex=await User.findByIdAndUpdate({_id:req.userId},{password:req.body.password,firstname:req.body.firstname,lastname:req.body.lastname})
        return res.status(200).json({
            message: "Updated successfully"
        })
    }
})
router.get('/bulk',async (req,res)=>{
    const filter=req.query.filter || '';
    try{
        const user = await User.find({$or:[{firstname:{
            '$regex':filter
        }},{lastname:{
            "$regex":filter
        }}]})
        res.json({
            users:user.map(user=>({
                username:user.username,
                firstname:user.firstname,
                lastname:user.lastname,
                _id:user._id
            }))
        })
    } catch(err){
        return res.status(400)
    }
})
module.exports= router