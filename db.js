const config = require('./config');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1/${config.DB}`);

const  db = mongoose.connection;
//连接失败
db.on('error',(err) =>{
    console.log(err);
});
//连接成功
db.on("open",()=>{
    console.log('mongodb connect successfully!')
})