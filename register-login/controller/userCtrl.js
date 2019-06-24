const UserModel = require('../model/users');//创建数据库的users集合（表）
const bcrypt = require('bcrypt');//密码加密的模块
const jwt = require('jsonwebtoken');//跨域认证模块
const path = require('path');
const fs = require('fs');


/**
 * 注册
 */
const reg = (req, res) => {
    //1、接收前端传过来的参数

    //加密处理
    let body = Object.assign({}, req.body, {
        password: bcrypt.hashSync(req.body.password, 10) //两个参数必填，一个是加密参数，一个是加密强度
    });

    //上面的代码相当于
    // req.body.password = bcrypt.hashSync(req.body.password，10);



    //判断 注册的用户名是否存在  找到了data为这个对象，没找到data为null
    UserModel.findOne({username: req.body.username})
        .then(data => {
            if (data) {
                res.send({
                    code: -1,
                    message: '用户名已存在'
                })
            } else {
                let user = new UserModel(body); //用req.body前端传过来的键名要和数据库中的字段名是一样的
                user.save()
                    .then(() => {
                        res.send({
                            code: 0,
                            message: '注册成功'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.send({
                            code: -1,
                            message: '注册失败'
                        })
                    })
            }
        })
}


/**
 * 登陆
 */

const login = (req, res) => {
    //先拿到前段传过来的用户名，去数据库查询是否存在，存在再验证密码，不存在就提示给用户用户名错误
    let username = req.body.username;
    let password = req.body.password;

    if(password == '' || username == ''){
        res.send({
            code:-1,
            message:'用户名或密码不能为空'
        })
    }


    UserModel.findOne({
        username: username
    }).then(data => {
        //find如果找到，返回的是那个数组集合，没找到则是一个空数组

        //用findOne，找到就是该对象，没找到就是null
        // console.log(data);
        if (!data) {
            res.send({
                code: -1,
                message: '用户名不存在'
            })
            return;
        }

        //用户名找到之后，再校验密码
        let pwd = data.password; //数据库中加密的密码
        //  bcrypt.compare(password,pwd,(err,isOk)=>{
        //      if(err){
        //          res.send('密码校验失败')
        //      }else if(isOk){
        //          res.send('登陆成功')
        //      }else{
        //          res.send('密码错误')
        //      }
        //  })
        let isOk = bcrypt.compareSync(password, pwd); //要同步执行，异步的话最后执行就没法判断了。
        if (isOk) {
            //要在登录成功时生成一个token,再把id放在token中，以便用户修改头像不需要传id
            let token = jwt.sign({
                username:data.username,
                id:data._id
            },'myKey')
            res.send({
                code: 0,
                message: '登陆成功',
                data:{
                    token:token,
                    userInfo:{
                        username:data.username,
                        avatar:data.avatar
                    }
                }
            })
        } else {
            res.send({
                code: -1,
                message: '密码错误'
            })
        }

    })
}

/**
 * 修改用户头像
 */
const upload = (req,res)=>{
    // console.log(req.file);

    // let id = req.body.id;   这里就不需要获取id了，因为已经把id放在token中，然后验证token成功后再req上加上了userId=用户id

    //1、将temp目录的临时文件移动到当前项目的public 文件夹中，并且修改一个唯一的名字
    //生成一个唯一的存储图片的名字，防止图片名相同
    let newFileName = new Date().getTime()+'_'+req.file.originalname;

    //图片写入的新的路径，public/images里面新建的newFileName   当前文件夹的上一级目录里能找到public
    let newPath = path.resolve(__dirname,'../public/images/',newFileName);

    //读取到传入进来时的文件内容
    let data = fs.readFileSync(req.file.path);
    //将读取到的文件内容写入到public/images文件夹中新创建的文件中去
    fs.writeFileSync(newPath,data);

    //2、修改数据库中当前用户avatar的路径地址为新创建的文件路径地址
    UserModel.updateOne({_id:req.userId},{avatar:`http://localhost:4000/images/${newFileName}`}).then(()=> {
        res.send({
            code:0,
            message:'上传成功',
            data:{
                avatar:`http://localhost:4000/images/${newFileName}`
            }
        })
    }).catch(error=>{
        console.log(error);
        res.send({
            code:-1,
            message:'上传失败'
        })
    })
}
module.exports = {
    reg,
    login,
    upload
}
