require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL,
    { 
        useNewUrlParser:true,
        useUnifiedTopology:true
    },
    (err)=>{
    if(err){
        console.log("Err", err);
    }else{
        console.log("웃음을 차지합니다!!!!!!!!!!!!!!!");
    }
})