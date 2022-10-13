const express = require('express');
const argon2 = require('argon2');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const mongourl = config.get('mongoURI');
const { validUser } = require('./middleware/auth');
/*세션 방식 구현시 필요한 애들.
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
*/

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false})) 

var db;
MongoClient.connect(mongourl, (err, client)=> {
    if (err) return console.log(err);
    
    db = client.db('who_is_sick'); //whoissick데이터베이스 폴더에 연결

    app.listen(4001, ()=>{
      console.log(`listening on ${4001}`)
    });
})
  
//홈페이지
app.get('/',(req,res)=>{
  //빌드 된 파일 홈.  
  //res.sendFile(__dirname + '/web/wis/build/index.html');
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
/*
app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 
*/
//로그인 페이지로 접속하기.
app.get('/login',(req,res)=>{
    res.render("로그인 페이지");
})

/*로그인 페이지에서 뭔가 보내면 실행. 세션 방식.
app.post('/login', passport.authenticate('local',{
    failureRedirect : '/fail'
}) ,(req,res)=>{
    //성공하면 기본 페이지로
    res.redirect('/');
})
*/

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

/* 얘는 세션 방식일 때  
app.get('/reservation', isLogin ,(req,res)=>{
  res.render("진료신청탭");
})*/

//얘는 json web token 방식일 때
app.get('/reservation' , validUser ,(req,res)=>{
  res.send("인증된 사용자만 볼 수 있는 진료신청 탭");
})

//등록된 사용자가 맞으면 이제 병력을 포스팅하게 만들어주기 위함.
app.post('/reservation' , (req,res)=>{

})


/*세션 방식으로 구현할 때 필요한 친구.
const isLogin = (req,res,next)=>{
    if(req.user){
        next()
    } else{
        res.sent("로그인한 사용자만 사용 가능합니다.");
    }
}
*/

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

/*세션 방식 로그인 로직
passport.use(new LocalStrategy({
    usernameField: 'servNum',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, (receivedID, receivedPassword, done) => {
    db.collection('login').findOne({ id: receivedID }, (err, result) => {
      if (err) return done(err)
  
      if (!result) return done(null, false, { message: '등록되지 않은 군번입니다.' })
      //이거 암호화 해야함.
      if (receivedPassword == result.pw) {
        return done(null, result)
      } else {
        return done(null, false, { message: '비밀번호가 다릅니다.' })
      }
    })
  }));

  //세션 방식이라 세션 만들어줄 거임
  passport.serializeUser((user, done) => {
    done(null, user.servNum)
  });
  
  passport.deserializeUser((id, done) =>{
    db.collection('login').findOne({ servNum : id},(err,result)=>{
        done(null, result)
    })
  }); */