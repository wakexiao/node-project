# 需要的模块
- express
- mongoose
- ejs

## mongoose 操作

### 查询

    -find()

### 新增

    -save()

### 删除
    
    -delete()

## restFulApi
> 使用同一个url地址，根据不同的请求方式来做到不同的功能点，就是这个api的设计思想。

- get 查询
- post 新建
- put 更新
- delete 删除

## 接口文档
    
    APM.md

## 密码加密

### 使用 bcrypt 来实现密码的加密加盐的操作
- 1、下载安装 npm install bcrypt --save
- 2、在用户注册的时候，使用brcypt.hash将密码给加密加盐处理，再存储到数据库中。
- 3、用户登录，从数据库中拿出加密后的密码，用 bracypt.compare 方法验证密码是否一致
