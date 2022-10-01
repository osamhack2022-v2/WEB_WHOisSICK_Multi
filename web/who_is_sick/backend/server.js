const express = require('express')
const connectDB = require('./config/db')


const app = express();

connectDB();

app.get('/', (req,res)=> res.send('API running'));

app.use(express.json({
    extended: false,
}));

app.use('api/auth',require('./routes/api/auth'));
app.use('api/posts',require('./routes/api/posts'));
app.use('api/profile',require('./routes/api/profile'));
app.use('api/user',require('./routes/api/user'));

const PORT = process.env.PORT || 5500;

app.listen(PORT, ()=>console.log(`Server starts on post ${PORT}`));