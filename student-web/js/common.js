//判断用户是否登录，如果登录了才能显示学生信息页，否则跳到登录页面


// let userInfo = localStorage.getItem('userInfo');//还需要判断本地是否有localstorage，没有就给一个null，不给的话会报错
let userInfo = localStorage.getItem('userInfo');
console.log(userInfo);
userInfo = userInfo?JSON.parse(userInfo):null;

if(!userInfo){
    //返回登录页面
    location.href = '/login.html'; 
}else{
    //如果本地localstorage存在userInfo说明已经登录了  不做处理    
    //修改用户的头像和名称
    $('.nickname').html(userInfo.username);
    $('.avatar').attr('src',userInfo.avatar);
}


//只有用户登录了之后才能修改头像
$('#setAvatar').click(function(){
    $('#myModal1').modal();
})
//点击上传，发送ajax请求给后台修改头像数据
$('#saveAvatar').click(function(){
    if($('input[name="file"]')[0].files.length === 0){
        alert('请选择文件');
        return;
    }
    var formData = new FormData();
    console.log(formData);
    formData.append('avatar',$('input[name="file"]')[0].files[0])
    $.ajax({
        url:'http://localhost:4000/user/upload',
        method:'POST',
        headers:{
            'req_token':localStorage.getItem('token')
        },
        data:formData,
        processData: false, 
        contentType: false, 
        success:function(res){
            console.log(res);
            if(res.code === 0){
                //成功就修改用户头像图片路径
                $('.avatar').attr('src',res.data.avatar);
                //但是用户头像路径是从userInfo中拿的，所以本地localstorage也要更新，否则数据库更新了，本地localstorage没更新，用户刷新网页头像还是没变
                var userInfo = JSON.parse(localStorage.getItem('userInfo'));
                userInfo.avatar = res.data.avatar;
                localStorage.setItem('userInfo',JSON.stringify(userInfo));
                alert('修改成功');
            }else{
                alert(res.message);
            }

            //修改完头像隐藏模态框
            $('#myModal1').modal('hide');
        }
    })
})