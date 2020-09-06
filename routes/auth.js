require('dotenv').config();
const express= require('express');
const router=express.Router();
const mongoose= require('mongoose');
const User = mongoose.model("User");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys')
const {SENDGRID_API,EMAIL} = require('../config/keys')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:SENDGRID_API
    }
}))





router.post('/signup',(req, res)=>{
    const {name,email,password,pic} = req.body
    if(!email|| !password|| !name){
        return res.status(422).json({error:"please add all fields"}) //to make the server understand that its a error and dont process it 
    }                                                          // 422 is an unprocessable entity
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error:"User already exists"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword =>{
            const user= new User({
                email,
                password:hashedpassword,
                name,
                pic
            })
            user.save()
            .then(user => {
                transporter.sendMail({
                    to:user.email,
                    from:"no-reply@uktech.tech",
                    subject:"Thanks for registering with us.",
                    html:"<h1>Welcome To Instapeople. enjoy using instapeople</h1>"
                })
                res.json({message:"Registered Succesfully"})
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })

        })
        
})

router.post('/signin', (req, res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"Provide The Required Fields"})
    }
    User.findOne({email: email})
    .then(savedUser=>{
        if(!savedUser){
            res.status(422).json({error:"invalid details"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(match => {
            if(match){
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)          //to get the access token to the user.
                const{_id,name,email,followers,following,pic}=savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})                                   
                // res.json({message:"Succesfully Signed In"})
            }else{
                return res.status(422).json({error:"Invalid details"})
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
})

router.post('/reset-password',(req, res) => {
     crypto.randomBytes(32,(err,buffer) => {
         if(err) {
             console.log(err)
         }
         const token = buffer.toString('hex');
         User.findOne({email:req.body.email})
         .then(user => {
             if(!user) {
                 return res.status(422).json({error:"User Do Not Exist"})
             }
             user.resetToken= token
             user.expireToken = Date.now() + 3600000
             user.save().then((result) => {
                transporter.sendMail({
                     to:user.email,
                     from:"no-reply@uktech.tech",
                     subject:"password reset",
                     html:`<p>You request for password reset is here</p>
                     <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset your password</h5>`
                 })
                 res.json({message:"check your email"})
             })
         })
     })
})

router.post('/new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})
module.exports =router
