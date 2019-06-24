const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/sz1903';
//连接数据库是要加{useNewUrlParser: true}这个，否则会警告提示
mongoose.connect(url,{useNewUrlParser: true})
    .then(()=>{
        console.log('数据库连接成功')
    })
    .catch(error=>{
        console.log('数据库连接失败')
    })


module.exports = mongoose;