const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongourl = config.get('mongoURI');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();

app.use(express.urlencoded({extended: true})) 

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
app.post('/sign-up', (req, res)=> {
    res.send('전송완료');
    db.collection('usercounter').findOne({name : '유저수'}, (err, result)=>{
        //_id는 1씩 늘려주면서 할 거임. 군번으로 해도 될 것 같긴 한데 그냥 했음.
        var userCount = result.totalUser;
        db.collection('users').insertOne( {_id : userCount +1 ,군번 : req.body.servNum , 비밀번호 : req.body.password , 이름:req.body.name} , (err,result)=>{
          console.log('저장완료')
          db.collection('usercounter').updateOne({name: '유저수'},{$inc : {totalUser:1}},(err,result)=>{
            if(err) {return console.log(err);}
          })
        });
      });
});


app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

//로그인 페이지로 접속하기.
app.get('/login',(req,res)=>{
    res.render("로그인 페이지");
})

//로그인 페이지에서 뭔가 보내면 실행.
app.post('/login', passport.authenticate('local',{
    failureRedirect : '/fail'
}) ,(req,res)=>{
    //성공하면 기본 페이지로
    res.redirect('/');
})


//userlist라는 경로로 들어오면 DB에 저장된 유저 리스트 서버가 찾아줌.
app.get('/userlist',(req,res)=>{
    db.collection('users').find().toArray((err,result)=>{
        console.log(result);
        //응답을 렌더해줄 페이지(뷰)
        res.render('', { 사용자 : res});
    })
})

//아이디 맞는지는 어케 앎?
//얘가 앎 ㅋㅋ 받아온 거 DB랑 비교하는 로직
passport.use(new LocalStrategy({
    usernameField: 'servNum',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, (receivedID, receivedPassword, done) => {
    db.collection('login').findOne({ id: receivedID }, (err, result) => {
      if (err) return done(err)
  
      if (!result) return done(null, false, { message: '등록되지 않은 군번입니다.' })
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
  
  passport.deserializeUser((아이디, done) =>{
    done(null, {})
  }); 