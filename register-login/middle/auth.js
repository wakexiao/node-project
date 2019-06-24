//判断token有效性的中间件函数
const jwt =require('jsonwebtoken');

module.exports = (req,res,next)=>{
    //拿到前端请求的token
    let token = req.get('req_token');
    if(!token){
        res.send({
            code:-1,
            message:'token不存在'
        })
    }else{
        //有token判断token的有效性
        jwt.verify(token,'myKey',(err,data)=>{
            if(err){
                //token失效或有问题
                res.send({
                    code:-1,
                    message:'token已失效'
                })
            }else{
                console.log(data);
                //token没问题
                //data里面有用户id，再把用户id绑定在req上
                req.userId = data.id;
                next();
            }
        })
    }
}