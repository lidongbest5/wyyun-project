!function(){var e=function(){checked=!1,i(),n()},n=function(){var e=new Lottery("container","/static/hongdian_lottery/images/card1.png","image",290,153,o);e.init("/static/hongdian_lottery/images/2.png","image"),setTimeout(function(){$(".lottery-prize").show()},500)},o=function(){$("#container").hide()},t=function(){$(".page1").hide(),$(".page2").show()},a=function(){var e=$(".name").val(),n=$(".phone").val(),o=$(".address").val(),t=$(".code").val();e.length&&n.length&&o.length&&t.length?checked?$.ajax({url:"/project/hongdian_lottery/checkCode/",type:"POST",data:{code:t,phone:$(".phone").val()},success:function(t){t=JSON.parse(t),t.code?$.ajax({url:"/project/hongdian_lottery/setData/",type:"POST",data:{phone:n,name:e,address:o},success:function(e){e=JSON.parse(e),e.code?c():(alert("已参与过抽奖，每个手机号只能抽奖一次哦~"),$(".b2").one("touchend",a))}}):(alert("验证码错误"),$(".b2").one("touchend",a))}}):(alert("请验证手机号！"),$(".b2").one("touchend",a)):(alert("请完整填写信息！"),$(".b2").one("touchend",a))},c=function(){$(".prize2").show(),$(".page3").show(),$(".page2").hide()},d=function(){$(".page3").hide(),$(".page5").show()},h=function(){var e=$(".phone").val();e.length?/^1[3|4|5|7|8]\d{9}$/.test(e)?$.ajax({url:"/project/hongdian_lottery/getCode/",type:"POST",data:{phone:e},success:function(e){if(0==e){var n=60,o=window.setInterval(function(){$(".getCode").html(n+"秒后重发"),n--,0===n&&(window.clearInterval(o),$(".getCode").html("获取验证码"),$(".getCode").one("touchend",h))},1e3);checked=!0}else 1==e?alert("已验证过该手机号，每个手机号只能抽奖一次哦~"):(alert("发送失败"),$(".getCode").one("touchend",h))}}):(alert("请输入正确手机号"),$(".getCode").one("touchend",h)):(alert("请输入手机号"),$(".getCode").one("touchend",h))},r=function(){var e=$(".code").val();e.length?$.ajax({url:"/project/hongdian_lottery/checkCode/",type:"POST",data:{code:e,phone1:$(".phone1").val(),phone:$(".phone").val()},success:function(e){e=JSON.parse(e),e.code?($(".page4").hide(),$(".page5").show()):(alert("验证码错误"),$(".b4").one("touchend",r))}}):(alert("请填写验证码"),$(".b4").one("touchend",r))},i=function(){$(".b1").one("touchend",t),$(".b2").one("touchend",a),$(".next").one("touchend",d),$(".getCode").one("touchend",h),$(".b4").one("touchend",r)};$(e)}();