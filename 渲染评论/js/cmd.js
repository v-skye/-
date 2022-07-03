// 定义一个函数用来获取评论列表
function getCommenList(){
    $.ajax({
        method:'GET',
        url:'http://www.liulongbin.top:3006/api/cmtlist',
        data:{},success:function(res){
            // console.log(res)
            if(res.status !==200){
                return alert('获取评论列表失败')
            }
            // console.log('获取数据成功')
            // 创建一个空数组
            var rows = []
            // 循环res.data
            $.each(res.data,function(i,item){
                var str = '<ul class="list-group" id="cmt-list"><li class="list-group-item"><span class="badge" style="background-color: palevioletred;">评论时间：'+item.time+'</span><span class="badge" style="background-color: pink;">评论人：'+item.username+'</span>'+item.content+'</li></ul>'
                rows.push(str)
            })
            $('#cmt-list').empty().append(rows.join(''))
        }
    })
}

// 调用
getCommenList()

// 添加评论
$(function(){
    // 绑定一个submit事件
    $('#formAddcmt').submit(function(e){
        // 阻止默认行为
        e.preventDefault()
        var data = $(this).serialize()//serialize()快速获取表单中的数据；注意用serialize()快速获取表单数据时需要为每个表单元素加上name属性
        // console.log(data)
        // 发起ajax请求
        $.post('http://www.liulongbin.top:3006/api/addcmt',data,function(res){
            if(res.status !==201){
                return alert('发表评论失败')
            }
            // 刷新评论列表  
            getCommenList()
            // 获取成功之后清空输入框里面的信息 直接获取from表单使用它的reset方法清空

            // 此时获取到的是一个jquery对象需要把它转换成dom对象；使用: jQuery对象[0]转换
            $('#formAddcmt')[0].reset()

        })
    })
})