const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const mongourl = config.get('mongoURI');

MongoClient.connect(mongourl, (err, client)=> {
    var db;
    if (err) return console.log(err);
    
    db = client.db('who_is_sick'); //whoissick데이터베이스 폴더에 연결
    module.exports = db;
})