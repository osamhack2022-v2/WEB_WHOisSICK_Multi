const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
var cors = require('cors');

const app = express();

connectDB();



app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req,res)=> res.sendFile(path.join(__dirname, '../build/index.html')));


app.get('/user', (req,res)=> {
    res.json({
        name: '남혁',
        serviceNum:'21-76047390',
        password: '%fD!243a#',
        sickHistory: {},
    });
});


//app.get('/', (req,res)=> res.send('API running'));

app.use(express.json({
    extended: false,
}));
app.use(cors());

/*
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/user',require('./routes/api/user'));
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server starts on post ${PORT}`));


//리액트한테 라우팅 권리 넘기기.
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });