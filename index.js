const express=require('express')
const app=express();
const bodyParser = require('body-parser');
const fs=require('fs');
const https=require('https');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
app.use(bodyparser.json())
let b=mongoose.connect('mongodb://127.0.0.1:27017/crud');

const cses3=new mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    java: {
        type: Number,
        required: true
      },
      os: {
        type: Number,
        required: true
      },
      mst: {
        type: Number,
        required: true
      },
      devops: {
        type: Number,
        required: true
      },
      c: {
        type: Number,
        required: true
      },
},{ collection: 'data' })

const post = mongoose.model('data', cses3);

app.get('/get', (req, res) => {
  post.find()
    .then((data) => {
      res.send(data)
    })
})

app.post('/', async (req, res) => {
    var data = {
      _id: req.body._id,
      name: req.body.name,
      java: req.body.java,
      os: req.body.os,
      mst: req.body.mst,
      devops: req.body.devops,
      c: req.body.c
    }
    const m = new post(data)
    m.save()
      .then((info) => {
        res.json(info)
      })
  })

app.get('/:id',async (req,res)=>{
    post.findOne({_id:req.params.id}).then((data)=>{
        res.send(data)
    })
})
 app.put('/update/:id',async (req,res)=>{
    var data={
        name:req.body.name,
        email:req.body.email     
    }
    var n=req.params.id
    post.findByIdAndUpdate(n,data).then(()=>{
        res.send("UPDATED SUCCESSFUL")
    })
})
  
app.delete('/delete/:id',async (req,res)=>{
       
    var n=req.params.id
    post.findByIdAndDelete(n).then(()=>{
            res.send("deleted SUCCESSFUL")
    })
        
})

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/login.html');
// })

var server=app.listen(3000,()=>{ 
    console.log('server running');
})