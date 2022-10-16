const express = require('express');
const argon2 = require('argon2');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const mongourl = config.get('mongoURI');
const { validUser } = require('./middleware/auth');

dotenv.config();

const app = express();

app.use(express.json({}));
app.use(cookieParser());
app.use(express.urlencoded({extended: false})) 
//코스설정 대충 해놨는데 일단 되는거 확인하면 다른 것도 하겠음
app.use(cors({
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
    console.log("서버파일 안 ",db);

})
//홈페이지
app.get('/',(req,res)=>{
  //빌드 된 파일 홈. 
  res.status(200).json({message:'ok'});
})


//회원가입. 군번, 비밀번호, 이름 받아올 거임.
app.post('/signup', async (req, res)=> {
    console.log('전송완료');
    const {servNum, password, name, ganbu } = req.body 
    const hash = await argon2.hash(password);

    db.collection('usercounter').findOne({name : '유저수'}, (err, result)=>{
        //_id는 1씩 늘려주면서 할 거임. 군번으로 해도 될 것 같긴 한데 그냥 했음.
        var userCount = result.totalUser;
        //비밀번호도 애초에 암호화해서 저장해둬야함.
        db.collection('users').insertOne( {
            군번 : servNum , 
            비밀번호 : hash , 
            이름: name,
            간부: ganbu,
            병력: { }, //history 라는 변수 명으로 쓸 생각.
            _id : userCount +1 , //군번을 유니크하게 받는 방법 고안되면 아이디 안 쓸 수도.
        } ,
        (err,result)=>{
            res.send('저장완료')
            res.redirect('/');
            db.collection('usercounter').updateOne({name: '유저수'},{$inc : {totalUser:1}},(err,result)=>{
                if(err) {return console.log(err);
            }
          })
        });
      });

});

//로그인 페이지로 접속하기.
app.get('/login',(req,res)=>{
    res.render("로그인 페이지");
})

//웹토큰 방식으로 로그인 한다면.... 구현해보겠음 ㅠㅠ
app.post('/login',async (req,res)=>{
  const {servNum, password } =req.body;//군번이랑 비번 받아옴
  db.collection('users').findOne({ servNum : servNum}, async (err,result)=>{
    const userdata = result;
    if(!userdata) {//userdata가 undefined면 못 찾았다는 뜻이니께.
      res.status(403).send("회원가입 되지 않은 군번입니다.");
      return;
    }
    //아르곤으로 암호화했으니 암호화 된 패스워드랑 지금 받은 패스워드 비교.
    if(!(await argon2.verify(userdata.password,password))) {//userdata의 password와 들어온 애를 비교할 겁니다. 근데 암호화해서요
      res.status(403).send("비밀번호가 틀립니다.");
      return;
    }
    //로그인한 이용자만 쓸 수 있게 하기.
    const access_token = jwt.sign({servNum}, 'dkaghzl')//암호키로 암호화해주기.
    res.cookie('내가 만든 액세스토큰 쿠키',access_token,{
      httpOnly:true,
    });
    
    res.send(json({ userdata}));//로그인 됐으면 유저 데이터 뱉어주기 확인용.
  })
})

//진료신청탭 로그인 한 사람만 들어갈 수 있게 할 거임.

//얘는 json web token 방식일 때
app.get('/reservation' , validUser ,(req,res)=>{
  res.send("인증된 사용자만 볼 수 있는 진료신청 탭");
})

//등록된 사용자가 맞으면 이제 병력을 포스팅하게 만들어주기 위함.
app.post('/reservation' , (req,res)=>{

})

//userlist라는 경로로 들어오면 DB에 저장된 유저 리스트 서버가 찾아줌.
app.get('/userlist',(req,res)=>{
    db.collection('users').find().toArray((err,result)=>{
        console.log(result);
        //응답을 렌더해줄 페이지(뷰)
        res.render('', { 사용자 : res});
    })
})

app.get('userlist/:servNum',(req,res)=>{
  const servNum = req.parms.servNum;//파라미터로 군번 받아오고
  //그 군번과 일치하는 데이터를 DB에서 찾을 거임
  db.collection('users').findOne({ servNum : servNum}, (err,result)=>{
    const userdata = result;//일치하는 결과를 유저 데이터에 넣고
    res.send(json({ userdata }));//유저 데이터는 제이슨 형식으로 보내줄 거임.
  })//맞으면 유저 데이터 뱉어 줌.
})