$(function(){
    $('.lv-login-body__btn').click(function(){
        $.post('http://localhost:4000/user/login',{
            username:$('input[name="username"]').val(),
            password:$('input[name="password"]').val()
        },function(res){
            console.log(res);
            if(res.code === 0){
                var userInfo = JSON.stringify(res.data.userInfo);//localstorage是以字符串方式存储，要转换
                console.log(userInfo);
                //在本地设置localstorage缓存
                localStorage.setItem('userInfo',userInfo);

                //缓存token在本地
                localStorage.setItem('token',res.data.token);
                
                location.href = '/';
            }else{
                alert(res.message);
            }
        })
    })
})