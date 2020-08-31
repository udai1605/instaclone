require('dotenv').config();
const express= require('express');
const router=express.Router();
const mongoose= require('mongoose');
const requireLogin = require('../middleware/requiredLogin');
const { route } = require('./auth');
const Post= mongoose.model('Post');

router.get('/allpost',(req,res) => {
    Post.find()
    .populate("postedBy","_id name")     //to show the user details without sending just objectId
    .then(posts =>{
        res.json({posts})
    })
    .catch(err =>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res) => {
    const {title,body} = req.body
    if(!title||!body){
        res.status(422).json({error:"Please Provide All the Fields"})
    }
    // console.log(req.user)
    // res.send("ok")
    req.user.password=undefined;
    const post=new Post({
        title, body, postedBy:req.user
    })
    post.save().then(result =>{
        res.send({post:result})
    })
    .catch(err =>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req, res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost =>{
        res.json({mypost})
    })
    .catch(err =>{
        console.log(err)
    })
})

module.exports= router