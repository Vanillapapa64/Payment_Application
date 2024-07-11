const jwt=require('jsonwebtoken');
const secret=require('./config');
const authMiddleware=(req,res,next)=>{
    const authorization=req.headers.authorization;
    
    if (!authorization || !authorization.startsWith('Bearer')){
        return res.status(403).json({msg:'no auth'})
    }
    const token=authorization.split(' ')[1];
    try {
        const decoded=jwt.verify(token,secret);
        req.userId=decoded.userId;
        next()
    }catch(err){
        res.status(403).json({msg:'tatti'})
    }
}
module.exports={
    authMiddleware
}
