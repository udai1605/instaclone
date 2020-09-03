const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const User=mongoose.model('User')
const {JWT_SECRET} = require('../config/keys')

module.exports =(req,res,next) => {
    const {authorization}=req.headers;
    if(!authorization){
        res.status(401).json({error:"You Are Unauthorized"})
    }
    const token= authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:" You Are UnAuthorized"})
        }
        const{_id}=payload
        User.findById(_id).then(userdata=>{
            req.user=userdata
            next()
        })
        
    })
}