const StudentModel = require('../model/student');

/**
 * 新增学生
 */

const add = (req, res) => {
    //1、拿到前端传入进来的学号和学生姓名
    let name = req.body.name;
    let studyNumber = req.body.studyNumber;

    //2、用拿到的数据去数据库查询是否已存在，存在则提示已注册，不存在执行注册
    StudentModel.findOne({
        name: name,
        studyNumber: studyNumber
    }).then(data => {
        if (data) {
            res.send({
                code: -1,
                message: '该学生已注册'
            })
        } else {
            //注册
            //判断是否传入有学生姓名和学号，没有就提示，有就添加到数据库
            if (!name || !studyNumber) {
                res.send({
                    code: -1,
                    message: '学号或姓名不能为空'
                })
                return;
            } else {
                let student = new StudentModel(req.body);
                student.save().then(() => {
                    res.send({
                        code: 0,
                        message: '添加学生成功'
                    })
                }).catch(error => {
                    // console.log(error);
                    res.send({
                        code: -1,
                        message: '添加学生失败，请重试'
                    })
                })
            }

        }
    })
}


/**
 * 学生分页查询
 */

const find = (req, res) => {
    //拿到前端传入的查询数据   通过get查询，所以直接拿？后面的参数，也就是query中的参数，但是是一个字符串，所以要转换一下
    let pageNum = parseInt(req.query.pageNum) || 1; //当没传的话默认是1，因为前端可以不传
    let pageSize = parseInt(req.query.pageSize) || 10;
    let name = req.query.name; //可以模糊搜索姓名

    //获取到数据库里所有的学生
    // 因为name是定义的变量，所以用第二种创建正则的方式
    StudentModel.find({name: new RegExp(name)}).countDocuments().then(num => { //count是从数据库找到所有数据的个数，相当于.length
        //使用count方法可能会出现一个警告，用countDocuments获取总数
        console.log(num);
        if (num > 0) {
            //得到数据库中的所有数据的总数，求总的页数
            let totalPage = Math.ceil(num / pageSize);

            //再从数据库中找到所有的数据  第几页就跳过页数减一乘每页显示的条数              sort({_id:-1})为设置数据倒序显示
            StudentModel.find({name: new RegExp(name)}).skip((pageNum - 1) * pageSize).sort({_id:-1}).limit(pageSize).then(data => {
                // console.log(data); //数据库中搜索到的所有的数据
                res.send({
                    code: 0,
                    message: 'ok',
                    data: {
                        list: data, //拿到当前页的数据
                        totalPage //当前页数
                    }
                })
            }).catch(error => {
                console.log(error);
                res.send({
                    code: -1,
                    message: '可能因为网络原因加载失败'
                })
            })
        }else{
            res.send({
                code:-1,
                message:'查无此人'
            })
        }
    })
}

//暴露出去
module.exports = {
    add,
    find
}