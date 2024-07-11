const mongoose=require('mongoose')
const { number } = require('zod')
//put your mongoose link below
mongoose.connect('')
const userschema=new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    password:String
})
const bankschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    balance:{type:Number,
        required:true
    }
})
const User=mongoose.model('User',userschema)
const Bank=mongoose.model('Bank',bankschema)
module.exports={
    User,Bank
}