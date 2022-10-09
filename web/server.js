const express = require('express');
const app = express();
const config = require('config');

app.use(express.urlencoded({extended: true})) 
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');


var db;
MongoClient.connect('mongodb+srv://skagur10:12341234@cluster0.8ebk9zz.mongodb.net/?retryWrites=true&w=majority', function(err, client){
    if (err) return console.log(err);
    //서버띄우는 코드 여기로 옮기기
    db = client.db('todoapp');

    app.listen('8080', function(){
      console.log('listening on 8080')
    });
  })

app.get('/', function(req, res) { 
    res.sendFile(__dirname +'/index.html')
  });
  
app.get('/write', function(req, res) { 
    res.sendFile(__dirname +'/write.html')
});

app.post('/add', function(req, res){
  res.send('전송완료')
  db.collection('usercounter').findOne({name : "유저수"},(err,result)=>{
    console.log(result.userCount)
    var userCount = result.userCount

    db.collection('user').insertOne( {_id : userCount + 1 , 이름 : req.body.name , 군번 : req.body.servNum} ,(err,result)=>{
      console.log('저장완료');
      db.collection('usercounter').updateOne({name:"유저수"},{ $inc: {userCount:1}},(err,result)=>{
        if(err) {return console.log(err)}
      })
    })
    console.log(req.body);
  })

});

app.get('/list',(req,res)=>{
  
  db.collection('user').find().toArray((err, result)=>{
    console.log(result);
    res.render('userlist.ejs', { users : result });
  });
})

app.delete('delete',(req,res)=>{
  console.log(req.body);
  req.body._id = parseInt(req.body._id);
  db.collection('user').deleteOne(req.body, (err,result)=>{
    if(err) {return console.log(err)};
  })
})