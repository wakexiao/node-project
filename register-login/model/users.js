//先引入db.js模块,连接到数据库

const db = require('../config/db');

//设计表(集合)  schema 相当于数据库中的设计表，规定表中有什么东西
const schema = new db.Schema({  //new 的形式创建，返回的schema是一个构造函数
    //用户名
    // username:String,  //设置用户名必填
    username:{
        type:String,
        required:true //必填
    },
    //密码
    // password:String,  //设置密码必填
    password:{
        type:String,
        required:true
    },
    //用户昵称
    nickname:String,
    //性别
    sex:{
        type:String,
        default:1
    },
    //avatar 用户头像
    avatar:{
        type:String,
        //用户没设置头像，默认是这个地址的图片
        default:'http://localhost:4000/images/avatar.jpg'
    }
}
// ,{ //第二个参数，不让表名默认为复数形式，指定表名
//     collection:'user'
// }
)

//基于 schema 创建出 model 
module.exports = db.model('user',schema);

//db.model 第一个参数是 model 的名字(数据库表名)，并且是复数形式的，user 就是users
// 如果想确定表名就是user而不是users，可以在创建 schema (第六行) 的时候传递第二个参数
    // {
    //     collection:'user'
    // }