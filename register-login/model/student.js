//先引入db.js模块,连接到数据库
const db = require('../config/db');

const schema = new db.Schema({
    name:{
        type:String,
        required:true
    },
    studyNumber:{
        type:Number,
        required:true
    },
    sex:{
        type:Number,
        default:0
    },
    age:{
        type:Number,
        default:18
    }
})

module.exports = db.model('students',schema);