(function(){
    var

    init			=	function(){
      checked = false;
    	bindEventListener();
      initLottery();
    },

    initLottery = function() {
			var lottery = new Lottery('container', '/static/hongdian_lottery/images/card1.png', 'image', 290, 153, drawPercent);
			lottery.init('/static/hongdian_lottery/images/2.png', 'image');
			setTimeout(function() {
				$('.lottery-prize').show();
			}, 500);
		},

		drawPercent = function() {
			$('#container').hide();
		},

    onStart = function() {
      $('.page1').hide();
      $('.page2').show();
    },

    onSetData = function(){
      var name = $('.name').val(),
          phone = $('.phone').val(),
          address = $('.address').val(),
          code = $('.code').val();

      if( name.length && phone.length && address.length && code.length ){
          if(checked){
            $.ajax({
              url: '/project/hongdian_lottery/checkCode/',
              type: 'POST',
              data: {
                code: code,
                phone: $('.phone').val()
              },
              success: function(data) {
                data = JSON.parse(data);
                if( data.code ) {
                  $.ajax({
                    url: '/project/hongdian_lottery/setData/',
                    type: 'POST',
                    data: {
                      phone: phone,
                      name: name,
                      address: address
                    },
                    success: function(data) {
                      data = JSON.parse(data);
                      if( data.code ) {
                        onPrize();
                      }
                      else{
                        alert('已参与过抽奖，每个手机号只能抽奖一次哦~');
                        $('.b2').one('touchend', onSetData);
                      }
                    }
                  });
                } else {
                  alert('验证码错误');
                  $('.b2').one('touchend', onSetData);
                }
              }
            });
          }
          else{
            alert('请验证手机号！');
            $('.b2').one('touchend', onSetData);
          }
      }
      else{
        alert('请完整填写信息！');
        $('.b2').one('touchend', onSetData);
      }
    },

    onPrize = function() {
      $('.prize2').show();
      $('.page3').show();
      $('.page2').hide();
      // $.ajax({
      //   url: '/project/hongdian_lottery/getPrize/',
      //   type: 'POST',
      //   data: {
      //     phone: $('.phone').val()
      //   },
      //   success: function(data){
      //     data = JSON.parse(data);
      //     if(data.award === 0){
      //       $('.prize2').show();
      //     }
      //     else{
      //       $('.prize1').show();
      //       if( data.award === 1 ) {
      //          $('.prize1 span').html('恭喜获得特等奖');
      //       } else if( data.award === 2 ) {
      //           $('.prize1 span').html('恭喜获得一等奖');
      //       } else if( data.award === 3 ) {
      //           $('.prize1 span').html('恭喜获得二等奖');
      //       } else if( data.award === 4 ) {
      //           $('.prize1 span').html('恭喜获得三等奖');
      //       } else if( data.award === 5 ) {
      //           $('.prize1 span').html('恭喜获得四等奖');
      //       }
      //     }
      //     $('.page3').show();
      //     $('.page2').hide();
      //   }
      // })
    },

    onNext = function(){
      $('.page3').hide();
      $('.page5').show();
    },

    onGetCode = function(){
      var val = $('.phone').val();
			if (val.length) {
        if ((/^1[3|4|5|7|8]\d{9}$/.test(val))) {
					$.ajax({
						url: '/project/hongdian_lottery/getCode/',
						type: 'POST',
						data: {
							phone: val
						},
						success: function(data) {
              if( data == 0 ){
                var t = 60;
                var a = window.setInterval(function() {
                  $('.getCode').html(t + '秒后重发');
                  t--;
                  if (t === 0) {
                    window.clearInterval(a);
                    $('.getCode').html('获取验证码');
                    $('.getCode').one('touchend', onGetCode);
                  }
                }, 1000);
                checked = true;
              }
              else if(data == 1) {
                alert('已验证过该手机号，每个手机号只能抽奖一次哦~');
              }
              else{
                alert('发送失败');
                $('.getCode').one('touchend', onGetCode);
              }
						}
					});
				} else {
					alert('请输入正确手机号');
					$('.getCode').one('touchend', onGetCode);
				}
      } else {
				alert('请输入手机号');
				$('.getCode').one('touchend', onGetCode);
			}
    },

    onGetPrize = function() {
      var val = $('.code').val();
      if (val.length) {
        $.ajax({
          url: '/project/hongdian_lottery/checkCode/',
          type: 'POST',
          data: {
            code: val,
            phone1: $('.phone1').val(),
            phone: $('.phone').val()
          },
          success: function(data) {
            data = JSON.parse(data);
            if( data.code ) {
              $('.page4').hide();
              $('.page5').show();
            } else {
              alert('验证码错误');
              $('.b4').one('touchend', onGetPrize);
            }
          }
        });
			} else {
				alert('请填写验证码');
				$('.b4').one('touchend', onGetPrize);
			}
    },

    bindEventListener	=	function(){
      $('.b1').one('touchend', onStart);
      $('.b2').one('touchend', onSetData);
      $('.next').one('touchend', onNext);
      $('.getCode').one('touchend', onGetCode);
      $('.b4').one('touchend', onGetPrize);
    };

    $(init);
})();
