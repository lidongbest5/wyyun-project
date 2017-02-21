(function(){
    var type = 0,

    init			=	function(){
      var p = getParameterByName('phone');
      if( p ){
        $('.page8').show();
        $.ajax({
          url: '/project/hongdian/getData/',
          type: 'POST',
          data: {
            phone: p
          },
          success: function(data) {
            data = JSON.parse(data);
            if( data.length ){
              var t = data[0].fields.award_type;
              var a;
              if(t===1){
                a = 'iPhone 7';
              }
              else if(t===2){
                a = 'JBL Horizon音箱';
              }
              else if(t===3){
                a = '1:18原厂纯金属车模';
              }
              else if(t===4){
                a = '精美修甲套装';
              }

              var d = new Date(data[0].fields.award_time);
              var d1 = new Date(d);
              d1.setHours ( d.getHours() + 8 );
              $('.page8 ul').html('<li>'+a+'<br/><span>'+d1.toISOString().replace('T', ' ').replace('.000Z', ' ')+'</span></li>');
            }
            else{
              $('.page8 ul').html('没有中奖记录');
            }
          }
        });
      }
      else{
        $('.page1').show();
      }

      var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
      });
    	bindEventListener();
      initLottery();

      $.ajax({
        url: '/project/hongdian/getList/',
        type: 'POST',
        success: function(data) {
          data = JSON.parse(data);
          var len = data.length;

          for( var i = 0; i < len; i++ ){
            var html = '';
            var t = data[i].fields.award_type;
            var a;
            if(t===1){
              a = 'iPhone 7';
            }
            else if(t===2){
              a = 'JBL Horizon音箱';
            }
            else if(t===3){
              a = '1:18原厂纯金属车模';
            }
            else if(t===4){
              a = '精美修甲套装';
            }

            var p = data[i].fields.phone;
            p = p.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            $('.page1-list ul').append('<li>'+p+'<span>'+a+'</span></li>');
          }
        }
      });

      setShare('大奖iPhone7，来试试手气', window.location.href, 'http://ex.wyyun.com/static/hongdian/images/icon.png');
    },

    initLottery = function() {
			var lottery = new Lottery('container', '/static/hongdian/images/card1.png', 'image', 250, 138, drawPercent);
			lottery.init('/static/hongdian/images/2.png', 'image');
			setTimeout(function() {
				$('.lottery-prize').show();
			}, 500);
		},

		drawPercent = function() {
			$('#container').hide();
		},

    onPrize = function() {
      $.ajax({
        url: '/project/hongdian/getPrize/',
        type: 'POST',
        success: function(data){
          data = JSON.parse(data);
          type = data.award;
          if(data.award === 0){
            $('.prize5').show();
          }
          else if(data.award===1){
            $('.prize1').show();
          }
          else if(data.award===2){
            $('.prize2').show();
          }
          else if(data.award===3){
            $('.prize3').show();
          }
          else if(data.award===4){
            $('.prize4').show();
          }
          $('.page2').show();
          $('.page1').hide();
        }
      })
    },

    onRestart = function(){
      window.location.reload();
    },

    onNext = function(){
      $('.page2').hide();
      $('.page4').show();
    },

    onGetCode = function(){
      var val = $('.phone').val();
			if (val.length) {
        if ((/^1[3|4|5|7|8]\d{9}$/.test(val))) {
					$.ajax({
						url: '/project/hongdian/getCode/',
						type: 'POST',
						data: {
							phone: val
						},
						success: function(data) {
              data = JSON.parse(data);
              if( data.success ){
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
              }
              else{
                alert(data.msg);
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
          url: '/project/hongdian/checkCode/',
          type: 'POST',
          data: {
            code: val,
            phone: $('.phone').val()
          },
          success: function(data) {
            data = JSON.parse(data);
            if( data.success ){
              $.ajax({
    						url: '/project/hongdian/setCode/',
    						type: 'POST',
    						data: {
    							phone: $('.phone').val(),
                  type: type
    						},
    						success: function(data) {
                  data = JSON.parse(data);
                  if( data.code ){
                    $('.page4').hide();
                    $('.page5').show();
                  }
                  else{
                    alert('您已过中奖');
                  }
    						}
    					});
            }
            else{
              alert(data.msg);
              $('.b2').one('touchend', onGetPrize);
            }
          }
        });
			} else {
				alert('请填写验证码');
				$('.b2').one('touchend', onGetPrize);
			}
    },

    onSetData = function(){
      var name = $('.name').val(),
          phone = $('.phone1').val(),
          address = $('.address').val();

      if( name.length && phone.length && address.length ){
        $.ajax({
          url: '/project/hongdian/setData/',
          type: 'POST',
          data: {
            phone: phone,
            name: name,
            address: address,
            p: $('.phone').val()
          },
          success: function(data) {
            $('.page5').hide();
            $('.page6').show();
          }
        });
      }
      else{
        alert('请完整填写');
      }
    },

    onShare = function() {
      $('.page7').show();
    },

    onShareClose = function(){
      $('.page7').hide();
    },

    getParameterByName = function(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    setShare = function(share_title, link, img) {
      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: share_title,
          link: link,
          imgUrl: img,
          success: function() {
            onShowSuccess();
          },
          cancel: function() {}
        });

        wx.onMenuShareAppMessage({
          title: share_title,
          desc: share_title,
          link: link,
          imgUrl: img,
          type: '',
          dataUrl: '',
          success: function() {
            onShowSuccess();
          },
          cancel: function() {}
        });
      });
    },

    bindEventListener	=	function(){
      $('.b1').on('touchend', onPrize);
      $('.card3').on('touchend', onRestart);
      $('.card2').on('touchend', onNext);
      $('.getCode').one('touchend', onGetCode);
      $('.b2').one('touchend', onGetPrize);
      $('.b3').on('touchend', onSetData);
      $('.b4').on('touchend', onShare);
      $('.page7').on('touchend', onShareClose);
    };

    $(init);
})();
