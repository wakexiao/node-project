var Student = {

  /**
   * 需要用到的数据
   */
  data:{
    list:[],
    totalPage:1,//总页数默认是一
    pageNum:1,//当前第几页默认是一
    pageSize:10, //每页显示多少条信息
    seachName:''//当前搜索的内容，默认为空就能把数据库所有的数据搜索到
  },



  /**
   * 查询学生   将所有查询到的学生渲染到页面上
   */
  findStudent: function () {
    $.ajax({
      url:'http://localhost:4000/user/stu',
      data:{
        pageNum:Student.data.pageNum,
        pageSize:Student.data.pageSize,
        name:Student.data.seachName
      },
      method:'get',
      headers:{
        'req_token':localStorage.getItem('token')
      },
      success:function (res) {
        // console.log(res);
        if(res.code === 0){
          Student.data.list = res.data.list;
          Student.data.totalPage = res.data.totalPage;
          //ejs在浏览器上使用的格式
          // var people = ['geddy', 'neil', 'alex'],
          // html = ejs.render('<%= people.join(", "); %>', {people: people});
  
          let html = ejs.render(
            // `
            // <% for (var i=0; i<list.length;i++){ %>
            //   <tr>
            //     <td><%= i+1 %></td>
            //     <td><%= list[i].name %></td>
            //     <td><%= list[i].studyNumber %></td>
            //     <td><%= list[i].sex %></td>
            //     <td><%= list[i].age %></td>
            //   </tr>
            //   <% } %>
            
            // `
            $('#a').html()
            ,
            {
              list:Student.data.list
            }
          )
          // console.log(html);
          //将html添加到tbody中
          $('#tbody').html(html);
  
          let page = ejs.render(
            $('#b').html(),
            {
              num:Student.data.totalPage,
              pageNum:Student.data.pageNum
            }
          )
          // console.log(page);
          $('#page').html(page);
        }else{  //查询失败code为-1时弹出网络异常
          alert('网络异常，请稍后重试')
        }
      }
    })
  },
  //   $.get('http://localhost:4000/user/stu', {
  //     pageNum:Student.data.pageNum,
  //     pageSize:Student.data.pageSize,
  //     name:Student.data.seachName
  //   },function (res) {
  //     // console.log(res);
  //     if(res.code === 0){
  //       Student.data.list = res.data.list;
  //       Student.data.totalPage = res.data.totalPage;
  //       //ejs在浏览器上使用的格式
  //       // var people = ['geddy', 'neil', 'alex'],
  //       // html = ejs.render('<%= people.join(", "); %>', {people: people});

  //       let html = ejs.render(
  //         // `
  //         // <% for (var i=0; i<list.length;i++){ %>
  //         //   <tr>
  //         //     <td><%= i+1 %></td>
  //         //     <td><%= list[i].name %></td>
  //         //     <td><%= list[i].studyNumber %></td>
  //         //     <td><%= list[i].sex %></td>
  //         //     <td><%= list[i].age %></td>
  //         //   </tr>
  //         //   <% } %>
          
  //         // `
  //         $('#a').html()
  //         ,
  //         {
  //           list:Student.data.list
  //         }
  //       )
  //       // console.log(html);
  //       //将html添加到tbody中
  //       $('#tbody').html(html);

  //       let page = ejs.render(
  //         $('#b').html(),
  //         {
  //           num:Student.data.totalPage,
  //           pageNum:Student.data.pageNum
  //         }
  //       )
  //       // console.log(page);
  //       $('#page').html(page);
  //     }else{  //查询失败code为-1时弹出网络异常
  //       alert('网络异常，请稍后重试')
  //     }
  //   })
  // },


  /**
   * 添加学生
   */
  addStudent:function(name,studyNumber){
    $.ajax({
      url:'http://localhost:4000/user/stu',
      data:{name:name,studyNumber:studyNumber},
      method:'post',
      headers:{
        'req_token':localStorage.getItem('token')
      },
      success:function(res){
        if(res.code === 0){
          $('#myModal').modal('hide');
          alert('添加成功');
          // Student.findStudent();
          location.reload();
        }else{
          alert(res.message)
        }
      }
    })
    // $.post('http://localhost:4000/user/stu',{name:name,studyNumber:studyNumber},function(res){
    //   if(res.code === 0){
    //     $('#myModal').modal('hide');
    //     alert('添加成功');
    //     // Student.findStudent();
    //     location.reload();
    //   }else{
    //     alert(res.message)
    //   }
    // })
  },


  /**
   * 事件绑定
   */
  bind:function(){
    //点击分页切换学生
    $('#page').on('click','li',function(){
      // console.log(44444444444)
      // 获取当前点击的是第几页
      console.log($(this).attr('data-num'),$(this).data('num'));//这两个是一样的
      let toPage = $(this).data('num');//要跳转到第几页
      
      //判断toPage 与 pageNum 设置为 toPage  就是如果当前页是1再点击1就不执行
      if(toPage !== Student.data.pageNum){
        Student.data.pageNum = toPage;//把要跳转到第几页传到当前页执行请求事件
        Student.findStudent();
      }

    });

    //点击搜索显示相应的学生
    $('#seachBtn').click(function(){
      let name = $('#seachInput').val();
      Student.data.seachName = name;

      //搜索前需要将 pageNum 设置为1.因为如果当前页为3，而搜索出来的内容没有3页，还显示第三页搜索到的内容，那样就会搜索不到
      Student.data.pageNum = 1;
      Student.findStudent();
    })


     //点击添加学生，弹出模态框
    $('#addBtn').click(function(){
      $('#myModal').modal();
    })

    //点击添加按钮，讲用户填入的数据添加到数据库中
    $('#saveBtn').click(function(){
      let name = $('#username').val();
      let studyNumber = $('#studyNumber').val();

      //得到用户输入的内容后，执行添加函数
      Student.addStudent(name,studyNumber);
    })
  }

}




$(function () {
  // 请求
  Student.findStudent();
  //调用事件绑定
  Student.bind();
})