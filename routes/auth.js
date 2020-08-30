require('dotenv').config();
const express= require('express');
const router=express.Router();
const mongoose= require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requiredLogin')
router.get('/proc',requireLogin,(req, res)=>{
    res.send("hello")
})

router.post('/signup',(req, res)=>{
    const {name,email,password} = req.body
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
                name
            })
            user.save()
            .then(user => {
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
                const token=jwt.sign({_id:savedUser._id},process.env.JWT_SECRET)          //to get the access token to the user.
                res.json({token})                                   
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

module.exports =router