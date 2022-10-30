const express = require('express');
const argon2 = require('argon2');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const path = require('path');
const mongourl = config.get('mongoURI');
const { validUser } = require('./middleware/auth');
const { access } = require('fs');
const { send } = require('process');
const ObjectId = require('mongodb').ObjectId;

dotenv.config();

const app = express();

app.use(express.json({}));
app.use(cookieParser());
app.use(express.urlencoded({extended: false})) 
app.use(cors({
  origin: "http://127.0.0.1:3000",
  methods : "GET, POST, PUT, DELETE",
  credentials: true,
}));

var db;
MongoClient.connect(mongourl, (err, client)=> {
    if (err) return console.log(err);
    db = client.db('who_is_sick'); 
    app.listen(process.env.PORT, ()=>{
      console.log(`listening on ${process.env.PORT}`)
    });
})

app.get('/',(req,res)=>{
  res.status(200).json({message:'ok'});
})

app.post('/signup-private', async (req, res)=> {
    const {sn, password, name } = req.body 
    const hash = await argon2.hash(password);
    db.collection('users').insertOne( {
          sn : sn , 
          password : hash , 
          name: name,
          cadre: false,
        });
    return res.send("user added");
});

app.post('/signup-cadre', async (req, res)=> {
    const {sn, password, name } = req.body 
    const hash = await argon2.hash(password);
    db.collection('users').insertOne( {
            sn : sn , 
            password : hash , 
            name: name,
            cadre: true,
        });
    return res.send("user added");
});

app.post('/',(req,res)=>{
  const {sn, password } =req.body;
  db.collection('users').findOne({ sn : sn}, async (err,result)=>{
    const userdata = result;
    if(!userdata) {
      res.status(403).send("회원가입 되지 않은 군번입니다.");
      return;
    }
    if(!(await argon2.verify(userdata.password ,password))) {
      res.status(403).send("비밀번호가 틀립니다.");
      return;
    }  
    const access_token = jwt.sign( { sn }, 'dkaghzl')
    res.cookie('access_token', access_token);

    res.send("로그인 성공");
  })
})

app.get('/main', (req,res)=>{
  db.collection('hopelist').find().toArray((err,result)=>{
    res.send(result);
  })
})

app.post('/main', (req, res)=> {
  const { day, hospital, inter, Classes } =req.body;
  const {access_token} = req.cookies;
  if(!access_token){
    res.status(401).send("accesstoken이 없습니다.")
  }
  try {
    const { sn } = jwt.verify(access_token,'dkaghzl')
    db.collection('users').findOne({ sn : sn}, async (err,result)=>{
      const userdata = result;
      const { sn, name } = userdata;
        db.collection('hopelist').insertOne({
           sn : sn, 
           name: name,
           Classes: Classes,
           inter : inter,
           ok: 2,
           hospital : hospital,
           day : day, 
         } ,  (err,result)=>{
          const giveNewId = ObjectId(result.insertedId).str;
          db.collection('traking').findOne({sn:sn}, (err,result)=>{
            if(!result)
            {
              db.collection('traking').insertOne({
                name: name,
                sn : sn,
                ok: 2,
              })
                db.collection('traking').updateOne({sn:sn},
                  { $push: { 
                    history: { 
                      origin: giveNewId,
                      ok: 2,
                      Classes : Classes,
                      inter: inter,
                      hospital: hospital,
                      day : day
                    } 
                  } 
              });
              res.send("added");
            }
            else
            {
                db.collection('traking').updateOne({sn:sn},
                  { $push: {
                    history: { 
                      origin: giveNewId,
                      ok: 2,
                      Classes : Classes,
                      inter: inter,
                      hospital: hospital,
                      day : day
                    }}
              });
              res.send("updated");
            }
          });         
        })
    if(!userdata) {
       throw "userdata가 없습니다.";
    }})
  } catch (err) {
    res.status(401).send("유효한 accesstoken이 아닙니다.");
  }
});

app.post('/main/hope',(req,res)=>{
  const {_id, ok, day} =req.body;
  const findId = ObjectId(_id);
  db.collection('hopelist').findOne({_id:findId},(err,result)=>{
    const arrayId = _id;
    const findSn = result.sn;
    db.collection('user').findOne({sn:findSn},(err,result)=>{
      if(!(result.cadre))
        return res.send(403);
    })
    const { Classes, inter, hospital,name,day } = result;
      if(ok === 1)
      {
        db.collection('traking').updateOne({sn:findSn},
          { $push: { 
            history: { 
              origin: arrayId,
              ok: 1,
              Classes : Classes,
              inter: inter,
              hospital: hospital,
              day : day,
            } 
          } 
        })
        db.collection('hopelist').updateOne({_id:findId},{$set:{"ok" : 1}});
        db.collection('resultlist').insertOne({
          name: name,
          sn: findSn,
          ok: 3,
          origin: arrayId,
          Classes : Classes,
          hospital: hospital,
          symptom: inter,
          inter: "입력대기중",
          day: day,
        })
        db.collection('traking').updateOne({sn:findSn},
            { $push: { 
              history: { 
                origin: arrayId,
                ok: 3,
                Classes : Classes,
                hospital: hospital,
                symptom: inter,
                inter: "입력대기중",
                day: day,
              } 
            } 
        });

      }
      else if(ok ===0)
      {
        db.collection('traking').updateOne({sn:findSn},
          { $push: { 
            history: { 
              origin: arrayId,
              ok: 0,
              Classes : Classes,
              inter: inter,
              hospital: hospital,
              day : day
            } 
          } 
        })
        db.collection('hopelist').updateOne({_id:findId},{$set:{"ok" : 0}});
      }
      else{
        return res.send("아무것도 안 함");
      }
  })
})

app.post('/main/result',(req,res)=>{
  const {_id, ok, day, inter} =req.body;
  const findId = ObjectId(_id);
  db.collection('user').findOne({sn:findSn},(err,result)=>{
    if(!(result.cadre))
      return res.send(403);
  })
  db.collection('resultlist').findOne({_id:findId},(err,result)=>
  {
    const findSn = result.sn;
    const {origin, Classes ,hospital } = result;
    db.collection('traking').updateOne({sn:findSn},
    { $push: { 
        history: { 
          origin: origin,
          ok: 5,
          Classes : Classes,
          inter: inter,
          hospital: hospital,
          day : day
        }} })
  })
  db.collection('resultlist').update({_id:findId},
  {
    $set: {ok: ok,
    inter : inter,
    day : day,
    }
  });
  res.send("ok");
})

app.get('/main/hopelist',(req,res)=>{
  db.collection('hopelist').find().toArray((err,result)=>{
    res.send(result);
  })
})

app.get('/main/resultlist',(req,res)=>{
  db.collection('resultlist').find().toArray((err,result)=>{
    res.send(result);
  })
})

app.get('/main/traking',(req,res)=>{
  db.collection('traking').find().toArray((err,result)=>{
    res.send(result);
  })
})