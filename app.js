require('dotenv').config();
const express= require('express');
const app = express();
const mongoose=require('mongoose');
require("./models/user.js");
require("./models/post.js");
app.use(express.json());
app.use(require("./routes/auth.js"));
app.use(require("./routes/post.js"));
app.use(require("./routes/user.js"));


mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected',()=>{
    console.log('Connected to Mongo Server');
})
mongoose.connection.on('error',(err)=>{
    console.log('Error Connecting To Database');
})






app.get('/',function(req,res){
    res.send("hello world");
})

app.listen(3000,function(){
    console.log("server started"); 
})