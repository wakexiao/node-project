# 学生管理系统接口文档

以下接口的 baseURL 为 http://localhost:4000

## 1、注册

- 请求地址：`user/reg`
- 请求方式：`POST`
- 请求参数：`body`

| 参数名字 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- |
| username | String | Y | 用户名 |
| passworde | String | Y | 密码 |
| sex | Number | N | 性别 |
| nickname | String | N | 用户昵称 |
| avatar | String | N | 用户头像 |

- 返回
``` js
{
    code:0,// 0代表成功，-1代表失败
    message:'ok'
}
```

## 2、登陆

- 请求地址：`user/login`
- 请求方式：`POST`
- 请求参数：`body`

| 参数名字 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- |
| username | String | Y | 用户名 |
| passworde | String | Y | 密码 |

- 返回
``` js
{
    code:0,// 0代表成功，-1代表失败
    message:'ok'
}
```


## 3、新增学生

- 请求地址：`user/stu`
- 请求方式：`POST`
- 请求参数：`body`

| 参数名字 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- |
| username | String | Y | 学生姓名 |
| studyNumber | Number | Y | 学号 |
| sex | Number | N | 性别 |
| age | Number | N | 年龄 |


- 返回
``` js
{
    code:0,// 0代表成功，-1代表失败
    message:'ok'
}
```

## 4、查询学生 ( 分页 - 模糊搜索 )

- 请求地址：`user/stu`
- 请求方式：`GET`
- 请求参数：`query`

| 参数名字 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- |
| pageNum | Number | N | 请求的页数 |
| pageSize | Number | N | 每页显示的条数 |
| studyNumber | Number | Y | 查询学生的学号 |


- 返回
``` js
{
    code:0,// 0代表成功，-1代表失败
    message:'ok'
}
```


## 5、修改用户头像

- 请求地址：`user/upload`
- 请求方式：`POST`
- 请求参数：`body`

| 参数名字 | 参数类型 | 是否必须 | 说明 |
| --- | --- | --- | --- |
| id | String | Y | 用户id |
| avatar | File | Y | 图像文件 |


- 返回
``` js
{
    code:0,// 0代表成功，-1代表失败
    message:'ok'
}
```