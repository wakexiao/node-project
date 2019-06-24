const express = require('express');
const router = express.Router();

const UserCtrl = require('../controller/userCtrl');
const auth = require('../middle/auth');
//引入multer模块
const multer = require('multer');
//设置 临时文件的目录
const upload = multer({dest : 'C:/Users/19708/Desktop/Three-stage/day04/register-login/temp'})

//注册
router.post('/reg',UserCtrl.reg);

//登陆
router.post('/login',UserCtrl.login);

//用户修改头像
router.post('/upload',auth,upload.single('avatar'),UserCtrl.upload);


module.exports = router;