const express = require('express');
const router = express.Router();
const auth = require('../middle/auth');
const studentCtrl = require('../controller/studentCtrl');

router.route('/stu')
    .post(auth,studentCtrl.add)//添加学生
    .get(auth,studentCtrl.find)//查询学生

    
module.exports = router;
