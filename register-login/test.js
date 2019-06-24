// 实验 bcrypt 模块的功能

const bcrypt = require('bcrypt');

const pwd = '123';


// //bcrypt.hashSync 同步处理，可以用try catch 方法来抛出错误
// bcrypt.hash(pwd,10,(err,data)=>{//回调函数err在前面，做一个错误优先处理
//     if(err){
//         console.log('加密失败')
//     }else{
//         console.log(data);
//         // 每次加密的字符串都不一样
//         //  data == $2b$10$OM8poYDs9GchlVr9humw9eaVVtEr/Y4zV4YfWGCKL.XTN/jFydIqO
//     }
// })

const str = '$2b$10$OM8poYDs9GchlVr9humw9eaVVtEr/Y4zV4YfWGCKL.XTN/jFydIqO';

//bcypt.compare 方法能校验加密的密码和输入的密码
//第一个参数，要校验的数据，第二个参数，加密之后的数据，第三个参数，回调函数
bcrypt.compare('123',str,function(err,isOk){
    console.log(isOk);
    if(err){
        console.log('校验出问题了')
    }else if(isOk){
        console.log('匹配成功')
    }else{
        console.log('匹配失败')
    }
})