const express = require('express');
const path = require('path');

const app = express();
 
//引入所有抽离出去的文件
const userRouter = require('./routes/routes');
const studentRouter = require('./routes/student');

//设置req.body
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//设置模板引擎与模板页面的路径
app.set('views',path.resolve(__dirname,'./views'));
app.set('view engine', 'ejs');

//设置静态资源托管
app.use(express.static(path.resolve(__dirname,'./public')));


//设置所有的请求都加上一个响应头，来允许跨域  必须写在响应前面
app.use((req,res,next)=>{
    //设置响应头
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Headers','req_token')
    next();
})

// app.use('/user',userRouter);
// app.use('/user',studertRouter);
app.use('/user',[userRouter,studentRouter]);



app.listen(4000);
console.log('服务器启动成功');