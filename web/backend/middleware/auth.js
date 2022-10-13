const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const mongourl = config.get('mongoURI');

var db
MongoClient.connect(mongourl, (err, client)=> {
    if (err) return console.log(err);
    
    db = client.db('who_is_sick'); //whoissick데이터베이스 폴더에 연결
})

const validUser = (req,res,next) => {
    const {access_token} = req.cookies;
    if(!access_token){//내가 만든 acesstoken 쿠키가 없으면 컷해주기.
      res.status(401).send("accesstoken이 없습니다.")
    }
  
    try {
      const { servNum } = jwt.verify(access_token,'dkaghzl')//디코딩하면 '암호키'로 암호화했던 군번이 들어있음.
      //그 군번으로 DB에서 유효한 사용자인지 찾을 거임.
      db.collection('users').findOne({ servNum : servNum}, async (err,result)=>{
       const userdata = result;
  
       if(!userdata) {//userdata가 undefined면 못 찾았다는 뜻이니께.
         throw "userdata가 없습니다.";
       }
       await next();
      })
    } catch (err) {
      res.status(401).send("유효한 accesstoken이 아닙니다.");
    }
  };

module.exports= {
    validUser,
}