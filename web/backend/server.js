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
    console.log('전송완료');
    const {servNum, password, name, ganbu } = req.body 
    const hash = await argon2.hash(password);
    db.collection('usercounter').findOne({name : '유저수'}, (err, result)=>{
        //_id는 1씩 늘려주면서 할 거임. 군번으로 해도 될 것 같긴 한데 그냥 했음.
        var userCount = result.totalUser;
        //비밀번호도 애초에 암호화해서 저장해둬야함.
        db.collection('users').insertOne( {
          servNum : servNum , 
          password : hash , 
          name: name,
          cadre: false,
          _id : userCount +1 , //군번을 유니크하게 받는 방법 고안되면 아이디 안 쓸 수도.
        } ,
        (err,result)=>{
            db.collection('usercounter').updateOne({name: '유저수'},{$inc : {totalUser:1}},(err,result)=>{
                if(err) {return console.log(err);
            }
            return res.send("saved");
          })
        });
      });
});

//간부 회원가입. 군번, 비밀번호, 이름 받아올 거임.
app.post('/signup-cadre', async (req, res)=> {
    console.log('전송완료');
    const {servNum, password, name, ganbu } = req.body 
    const hash = await argon2.hash(password);
    db.collection('usercounter').findOne({name : '유저수'}, (err, result)=>{
        //_id는 1씩 늘려주면서 할 거임. 군번으로 해도 될 것 같긴 한데 그냥 했음.
        var userCount = result.totalUser;
        //비밀번호도 애초에 암호화해서 저장해둬야함.
        db.collection('users').insertOne( {
            servNum : servNum , 
            password : hash , 
            name: name,
            cadre: true,
            _id : userCount +1 , //군번을 유니크하게 받는 방법 고안되면 아이디 안 쓸 수도.
        } ,
        (err,result)=>{
            db.collection('usercounter').updateOne({name: '유저수'},{$inc : {totalUser:1}},(err,result)=>{
                if(err) {return console.log(err);
            }
            return res.send("saved");
          })
        });
      });
});

//웹토큰 방식으로 로그인 한다면.... 구현해보겠음 ㅠㅠ
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
    console.log(servNum);
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
  const { date, hospital, inter, Classes } =req.body;//여기서 계급 받기로 수정하기로 함.
  const {access_token} = req.cookies;
  if(!access_token){
    res.status(401).send("accesstoken이 없습니다.")
  }
  try {
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
         } ,  ()=>{
          db.collection('traking').findOne({sn:servNum}, (err,result)=>{
            if(!result)//추적일지가 만들어진 적 없다면 트래킹에 추가해주기.
            {
              db.collection('traking').insertOne({
                name: name,
                sn : servNum,
                ok: 0,
              })
              db.collection('intercounter').findOne({name : '신청서수'}, (err, result)=>{
                var interCount = result.totalInter;
                db.collection('traking').updateOne({sn:servNum},
                  { $push: { 
                    history: { 
                      origin: interCount +  1,
                      ok: 2,
                      Classes : Classes,
                      inter: inter,
                      hospital: hospital,
                      date : date
                    } 
                  } 
                })
                db.collection('intercounter').updateOne({name: '신청서수'},{$inc : {totalInter:1}},(err,result)=>{
                  if(err) 
                    return console.log(err);
                })
              });
              res.send("added");
            }
            else
            {//있으면 그냥 오리진 넘버만 다르게 해서 올려주기.
              db.collection('intercounter').findOne({name : '신청서수'}, (err, result)=>{
                var interCount = result.totalInter;
                db.collection('traking').updateOne({sn:servNum},
                  { $push: {
                    history: { 
                      origin: interCount +  1,
                      ok: 2,
                      Classes : Classes,
                      inter: inter,
                      hospital: hospital,
                      date : date
                    }}})
                db.collection('intercounter').updateOne({name: '신청서수'},{$inc : {totalInter:1}},(err,result)=>{
                  if(err) 
                    return console.log(err);
                })
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
  const {_id,ok} =req.body;
  const findId = ObjectId(_id);
  db.collection('hopelist').findOne({_id:findId},(err,result)=>{//아이디로 군번 찾고
    console.log(result);
    const findSn = result.servNum;
    db.collection('traking').findOne({sn :findSn},(err,result)=>{//군번으로 결과 찾고
      const userdata = result;
      const {origin, Classes, inter, hospital,name,date } =userdata;
      if(ok === 1)//승인
      {
        db.collection('traking').updateOne({sn:findSn},
          { $push: { 
            history: { 
              origin: origin,//오리진 유지,
              ok: 1,
              Classes : Classes,
              inter: inter,
              hospital: hospital,
              date : date
            } 
          } 
        })//업데이트 하고
        db.collection('hopelist').updateOne({_id:findId},{$set:{"ok" : 1}});//진료신청에도 업뎃해주고
        db.collection('resultlist').insertOne({//리절트리스트에도 추가해줘야 입력을 하겠죠?
          name: name,
          sn: findSn,
          ok: 3,//대기.
          Classes : Classes,
          hospital: hospital,
          symptom: inter,//아까 환자 증상으로 입력 받은 거.
          inter: "입력대기중",//입력 받으면 수정해주면 됨.
          day: "",//이것도 입력 받으면 수정.
        },(err,result)=>{//리절트에 넣어줬으면 역시 트래킹에도 넣어줘야함.
          db.collection('traking').updateOne({sn:findSn},
            { $push: { 
              history: { 
                origin: origin,//오리진 유지,
                ok: 3,
                Classes : Classes,
                hospital: hospital,
                symptom: inter,//아까 환자 증상으로 입력 받은 거.
                inter: "입력대기중",//입력 받으면 수정해주면 됨.
                day: "",
              } 
            } 
          })
        });
      }
      else if(ok ===0)//거절
      {
        db.collection('traking').updateOne({sn:findSn},
          { $push: { 
            history: { 
              origin: origin,//오리진 유지,
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
    })
  })
})

//inter도 받을 거임. 그러면 그 inter와, 
app.post('/main/result',(req,res)=>{
  const {_id,ok, inter} =req.body;
  const findId = ObjectId(_id);
  db.collection('resultlist').findOne({_id:findId},(err,result)=>{
    const findSn = result.servNum;
    db.collection('traking').findOne({sn :findSn},(err,result)=>{
      const userdata = result;
      const {origin, Classes ,hospital,date } =userdata;
      if(ok === 5)//완료
      {
        db.collection('traking').updateOne({sn:servNum},
          { $push: { 
            history: { 
              origin: origin,//오리진 유지,
              ok: 5,
              Classes : Classes,
              inter: inter,
              hospital: hospital,
              date : date
            } 
          } 
        })//업데이트 하고
        db.collection('resultlist').update({
          _id:findId
        },
        {
          ok: 5,
          inter : inter,
          day : date,
        });
      }
      else if(ok === 4)//거절
      {
        db.collection('traking').updateOne({sn:servNum},
          { $push: { 
            history: { 
              origin: origin,//오리진 유지,
              ok: 4,
              Classes : Classes,
              inter: inter,
              hospital: hospital,
              date : date
            } 
          } 
        })
        db.collection('resultlist').update({
          _id:findId
        },
        {
          ok: 4,
          inter : inter,
          day : date,
        });
      }
    })
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