const express = require('express')



const app = express();

app.get('/', (req,res)=> res.send('API running'));

const PORT = process.env.port || 5000;

app.listen(PORT, ()=>console.log('Server starts on post ${PORT}'));