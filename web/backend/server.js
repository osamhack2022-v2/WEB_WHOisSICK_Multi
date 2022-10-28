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
//코스설정 대충 해놨는데 일단 되는거 확인하면 다른 것도 하겠음
app.use(cors({
  origin: "http://127.0.0.1:3000",
  methods : "GET, POST, PUT, DELETE",
  credentials: true,
}));

var db;
MongoClient.connect(mongourl, (err, client)=> {
    if (err) return console.log(err);
    db = client.db('who_is_sick'); //whoissick데이터베이스 폴더에 연결
    app.listen(process.env.PORT, ()=>{
      console.log(`listening on ${process.env.PORT}`)
    });
})

app.get('/',(req,res)=>{
  res.status(200).json({message:'ok'});
})

//회원가입. 군번, 비밀번호, 이름 받아올 거임.
app.post('/signup-private', async (req, res)=> {
    const {servNum, password, name } = req.body 
    const hash = await argon2.hash(password);
    db.collection('users').insertOne( {
          servNum : servNum , 
          password : hash , 
          name: name,
          cadre: false,
        });
    return res.send("user added");
});

//간부 회원가입.
app.post('/signup-cadre', async (req, res)=> {
    const {servNum, password, name } = req.body 
    const hash = await argon2.hash(password);
    db.collection('users').insertOne( {
            servNum : servNum , 
            password : hash , 
            name: name,
            cadre: true,
        });
    return res.send("user added");
});

//웹토큰 방식으로 로그인
app.post('/',(req,res)=>{
  const {servNum, password } =req.body;//군번이랑 비번 받아옴
  db.collection('users').findOne({ servNum : servNum}, async (err,result)=>{
    const userdata = result;
    if(!userdata) {//userdata가 undefined면 못 찾았다는 뜻이니께.
      res.status(403).send("회원가입 되지 않은 군번입니다.");
      return;
    }
    //아르곤으로 암호화했으니 암호화 된 패스워드랑 지금 받은 패스워드 비교.
    if(!(await argon2.verify(userdata.password ,password))) {//userdata의 password와 들어온 애를 비교할 겁니다. 근데 암호화해서요
      res.status(403).send("비밀번호가 틀립니다.");
      return;
    }
    //로그인한 이용자만 쓸 수 있게 하기.    
    const access_token = jwt.sign( { servNum }, 'dkaghzl')//암호키로 암호화해주기.
    res.cookie('access_token', access_token);

    res.send("로그인 성공");
  })
})

app.get('/main', (req,res)=>{
  db.collection('traking').find().toArray((err,result)=>{
    res.send(result);
  })
})

app.post('/main', (req, res)=> {
  const { date, hospital, inter, Classes } =req.body;//여기서 계급 받기
  const {access_token} = req.cookies;
  if(!access_token){
    res.status(401).send("accesstoken이 없습니다.")
  }
  try {//대기가 2.
    const { servNum } = jwt.verify(access_token,'dkaghzl')
    db.collection('users').findOne({ servNum : servNum}, async (err,result)=>{
      const userdata = result;//디코딩한 군번으로 해당유저 찾고
      const { servNum, name } = userdata;
        db.collection('hopelist').insertOne({
           servNum : servNum, 
           name: name,
           Classes: Classes,
           inter : inter,
           ok: 2,
           hospital : hospital,
           day : date, 
         } ,  (err,result)=>{
          const giveNewId = str(result.insertedId);
          db.collection('traking').findOne({sn:servNum}, (err,result)=>{
            if(!result)//추적일지가 만들어진 적 없다면 트래킹에 추가해주기.
            {
              db.collection('traking').insertOne({
                name: name,
                sn : servNum,
                ok: 2,
              })//그리고 Id만들어서 추가해주기.
                db.collection('traking').updateOne({sn:servNum},
                  { $push: { 
                    history: { 
                      origin: giveNewId,
                      ok: 2,
                      Classes : Classes,
                      inter: inter,
                      hospital: hospital,
                      date : date
                    } 
                  } 
              });
              res.send("added");
            }
            else
            {//있으면 다른 신청이라는 뜻이니 새 Id만 만들어서 추가해주기.
                db.collection('traking').updateOne({sn:servNum},
                  { $push: {
                    history: { 
                      origin: giveNewId,
                      ok: 2,
                      Classes : Classes,
                      inter: inter,
                      hospital: hospital,
                      date : date
                    }}
              });
              res.send("updated");
            }
          });         
        })
    if(!userdata) {//userdata가 undefined면 못 찾았다는 뜻이니께.
       throw "userdata가 없습니다.";
    }})
  } catch (err) {
    res.status(401).send("유효한 accesstoken이 아닙니다.");
  }
});

app.post('/main/hope',(req,res)=>{
  const {_id, ok,acceptTime} =req.body;//이것도 승인 받은 시간을 따로 두면 좋을 듯?
  const findId = ObjectId(_id);
  db.collection('hopelist').findOne({_id:findId},(err,result)=>{
    const arrayId = str(result.insertedId)
    console.log(" 말고",ok);
    const findSn = result.servNum;//아이디로 군번 찾고
    const {origin, Classes, inter, hospital,name,date } = result;
      if(ok === 1)//승인
      {
        db.collection('traking').updateOne({sn:findSn},
          { $push: { 
            history: { 
              origin: arrayId,//오리진 유지,
              ok: 1,
              Classes : Classes,
              inter: inter,
              hospital: hospital,
              date : "acceptTime",
            } 
          } 
        })//업데이트 하고
        db.collection('hopelist').updateOne({_id:findId},{$set:{"ok" : 1}});//진료신청에도 업뎃해주고
        
        //이부분부턴 리절트리스트로 넘어가는 부분.
        db.collection('resultlist').insertOne({
          name: name,
          sn: findSn,
          ok: 3,//대기.
       //   origin: arrayId,
          Classes : Classes,
          hospital: hospital,
          symptom: inter,//아까 환자 증상으로 입력 받은 거.
          inter: "입력대기중",//입력 받으면 수정해주면 됨.
          day: "acceptTime",//이것도 입력 받으면 수정.
        })//리절트에 넣어줬으면 역시 트래킹에도 넣어줘야함.
        db.collection('traking').updateOne({sn:findSn},
            { $push: { 
              history: { 
                origin: arrayId,//오리진 유지,
                ok: 3,
                Classes : Classes,
                hospital: hospital,
                symptom: inter,//아까 환자 증상으로 입력 받은 거.
                inter: "입력대기중",//입력 받으면 수정해주면 됨.
                day: "acceptTime",//이역시 입받수.
              } 
            } 
        });

      }
      else if(ok ===0)//거절
      {
        db.collection('traking').updateOne({sn:findSn},
          { $push: { 
            history: { 
              origin: arrayId,//오리진 유지,
              ok: 0,
              Classes : Classes,
              inter: inter,
              hospital: hospital,
              date : date
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

//inter도 받을 거임. 그러면 그 inter와, 
app.post('/main/result',(req,res)=>{
  const {_id, ok, acceptTime, inter} =req.body;
  const findId = ObjectId(_id);
  db.collection('resultlist').findOne({_id:findId},(err,result)=>{
    const findSn = result.sn;
    console.log(result);
      const {origin, Classes ,hospital } = result;
      if(ok === 5)//완료
      {
        db.collection('traking').updateOne({sn:findSn},
          { $push: { 
            history: { 
              origin: origin,//오리진 유지,
              ok: 5,
              Classes : Classes,
              inter: inter,
              hospital: hospital,
              date : acceptTime//date는 클릭 받은 시간으로.
            } 
          } 
        })//업데이트 하고
        db.collection('resultlist').update({_id:findId},
        {
          ok: 5,
          inter : inter,
          day : acceptTime,
        });
      }
      else if(ok === 4)//거절
      {
        db.collection('traking').updateOne({sn:findSn},
          { $push: { 
            history: { 
              origin: origin,//오리진 유지,
              ok: 4,
              Classes : Classes,
              inter: inter,
              hospital: hospital,
              date : acceptTime
            } 
          } 
        })
        db.collection('resultlist').update({_id:findId},
        {
          ok: 4,
          inter : inter,
          day : acceptTime,
        });
      }
    })
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