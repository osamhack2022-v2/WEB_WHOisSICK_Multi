const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const mongourl = config.get('mongoURI');
const connectDB =require('./config/db')

const app = express();

app.use(express.urlencoded({extended: true})) 

connectDB();

var db;
MongoClient.connect(mongourl, (err, client)=> {
    if (err) return console.log(err);
    
    db = client.db('who_is_sick'); //whoissick데이터베이스 폴더에 연결

    app.listen(PORT, ()=>{
      console.log(`listening on ${PORT}`)
    });
  })
  
//홈페이지
app.use('/',(req,res)=>{
    res.status(200).json({message : 'ok'});
})

//회원가입. 군번, 비밀번호, 이름 받아올 거임.
app.post('/add', (req, res)=> {
    console.log(req.body);
    //add로 받은 데이터 저장하기.
    db.collection('users').insertOne({군번 : req.body.servNum , 비밀번호 : req.body.password , 이름:req.body.name},(err,result)=>{
        console.log("저장됨");
    })
    res.send('전송완료')
});

//userlist라는 경로로 들어오면 DB에 저장된 유저 리스트 서버가 찾아줌.
app.get('/userlist',(req,res)=>{
    db.collection('users').find().toArray((err,result)=>{
        console.log(result);
        //응답을 렌더해줄 페이지(뷰)
        res.render('', { 사용자 : res});
    })
})
