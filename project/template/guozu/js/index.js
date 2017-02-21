(function(){
  var width = $(window).width(),
  $page1 = $('.page1'),
  $page2 = $('.page2'),
  $page3 = $('.page3'),
  $page4 = $('.page4'),
  $page5 = $('.page5'),
  $voice = $('.voice'),

  audio,
  load,
  myChart,
  map_data = [],
  highlight_data = [],
  img = null,
  city,
  record,
  rdata,
  checked = false,
  code,
  type,
  inter = null,

  planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',

  geoCoordMap = {
    '海门':[121.15,31.89],
    '鄂尔多斯':[109.781327,39.608266],
    '招远':[120.38,37.35],
    '舟山':[122.207216,29.985295],
    '齐齐哈尔':[123.97,47.33],
    '盐城':[120.13,33.38],
    '赤峰':[118.87,42.28],
    '青岛':[120.33,36.07],
    '乳山':[121.52,36.89],
    '金昌':[102.188043,38.520089],
    '泉州':[118.58,24.93],
    '莱西':[120.53,36.86],
    '日照':[119.46,35.42],
    '胶南':[119.97,35.88],
    '南通':[121.05,32.08],
    '拉萨':[91.11,29.97],
    '云浮':[112.02,22.93],
    '梅州':[116.1,24.55],
    '文登':[122.05,37.2],
    '上海':[121.48,31.22],
    '攀枝花':[101.718637,26.582347],
    '威海':[122.1,37.5],
    '承德':[117.93,40.97],
    '厦门':[118.1,24.46],
    '汕尾':[115.375279,22.786211],
    '潮州':[116.63,23.68],
    '丹东':[124.37,40.13],
    '太仓':[121.1,31.45],
    '曲靖':[103.79,25.51],
    '烟台':[121.39,37.52],
    '福州':[119.3,26.08],
    '瓦房店':[121.979603,39.627114],
    '即墨':[120.45,36.38],
    '抚顺':[123.97,41.97],
    '玉溪':[102.52,24.35],
    '张家口':[114.87,40.82],
    '阳泉':[113.57,37.85],
    '莱州':[119.942327,37.177017],
    '湖州':[120.1,30.86],
    '汕头':[116.69,23.39],
    '昆山':[120.95,31.39],
    '宁波':[121.56,29.86],
    '湛江':[110.359377,21.270708],
    '揭阳':[116.35,23.55],
    '荣成':[122.41,37.16],
    '连云港':[119.16,34.59],
    '葫芦岛':[120.836932,40.711052],
    '常熟':[120.74,31.64],
    '东莞':[113.75,23.04],
    '河源':[114.68,23.73],
    '淮安':[119.15,33.5],
    '泰州':[119.9,32.49],
    '南宁':[108.33,22.84],
    '营口':[122.18,40.65],
    '惠州':[114.4,23.09],
    '江阴':[120.26,31.91],
    '蓬莱':[120.75,37.8],
    '韶关':[113.62,24.84],
    '嘉峪关':[98.289152,39.77313],
    '广州':[113.23,23.16],
    '延安':[109.47,36.6],
    '太原':[112.53,37.87],
    '清远':[113.01,23.7],
    '中山':[113.38,22.52],
    '昆明':[102.73,25.04],
    '寿光':[118.73,36.86],
    '盘锦':[122.070714,41.119997],
    '长治':[113.08,36.18],
    '深圳':[114.07,22.62],
    '珠海':[113.52,22.3],
    '宿迁':[118.3,33.96],
    '咸阳':[108.72,34.36],
    '铜川':[109.11,35.09],
    '平度':[119.97,36.77],
    '佛山':[113.11,23.05],
    '海口':[110.35,20.02],
    '江门':[113.06,22.61],
    '章丘':[117.53,36.72],
    '肇庆':[112.44,23.05],
    '大连':[121.62,38.92],
    '临汾':[111.5,36.08],
    '吴江':[120.63,31.16],
    '石嘴山':[106.39,39.04],
    '沈阳':[123.38,41.8],
    '苏州':[120.62,31.32],
    '茂名':[110.88,21.68],
    '嘉兴':[120.76,30.77],
    '长春':[125.35,43.88],
    '胶州':[120.03336,36.264622],
    '银川':[106.27,38.47],
    '张家港':[120.555821,31.875428],
    '三门峡':[111.19,34.76],
    '锦州':[121.15,41.13],
    '南昌':[115.89,28.68],
    '柳州':[109.4,24.33],
    '三亚':[109.511909,18.252847],
    '自贡':[104.778442,29.33903],
    '吉林':[126.57,43.87],
    '阳江':[111.95,21.85],
    '泸州':[105.39,28.91],
    '西宁':[101.74,36.56],
    '宜宾':[104.56,29.77],
    '呼和浩特':[111.65,40.82],
    '成都':[104.06,30.67],
    '大同':[113.3,40.12],
    '镇江':[119.44,32.2],
    '桂林':[110.28,25.29],
    '张家界':[110.479191,29.117096],
    '宜兴':[119.82,31.36],
    '北海':[109.12,21.49],
    '西安':[108.95,34.27],
    '金坛':[119.56,31.74],
    '东营':[118.49,37.46],
    '牡丹江':[129.58,44.6],
    '遵义':[106.9,27.7],
    '绍兴':[120.58,30.01],
    '扬州':[119.42,32.39],
    '常州':[119.95,31.79],
    '潍坊':[119.1,36.62],
    '重庆':[106.54,29.59],
    '台州':[121.420757,28.656386],
    '南京':[118.78,32.04],
    '滨州':[118.03,37.36],
    '贵阳':[106.71,26.57],
    '无锡':[120.29,31.59],
    '本溪':[123.73,41.3],
    '克拉玛依':[84.77,45.59],
    '渭南':[109.5,34.52],
    '马鞍山':[118.48,31.56],
    '宝鸡':[107.15,34.38],
    '焦作':[113.21,35.24],
    '句容':[119.16,31.95],
    '北京':[116.46,39.92],
    '徐州':[117.2,34.26],
    '衡水':[115.72,37.72],
    '包头':[110,40.58],
    '绵阳':[104.73,31.48],
    '乌鲁木齐':[87.68,43.77],
    '枣庄':[117.57,34.86],
    '杭州':[120.19,30.26],
    '淄博':[118.05,36.78],
    '鞍山':[122.85,41.12],
    '溧阳':[119.48,31.43],
    '库尔勒':[86.06,41.68],
    '安阳':[114.35,36.1],
    '开封':[114.35,34.79],
    '济南':[117,36.65],
    '德阳':[104.37,31.13],
    '温州':[120.65,28.01],
    '九江':[115.97,29.71],
    '邯郸':[114.47,36.6],
    '临安':[119.72,30.23],
    '兰州':[103.73,36.03],
    '沧州':[116.83,38.33],
    '临沂':[118.35,35.05],
    '南充':[106.110698,30.837793],
    '天津':[117.2,39.13],
    '富阳':[119.95,30.07],
    '泰安':[117.13,36.18],
    '诸暨':[120.23,29.71],
    '郑州':[113.65,34.76],
    '哈尔滨':[126.63,45.75],
    '聊城':[115.97,36.45],
    '芜湖':[118.38,31.33],
    '唐山':[118.02,39.63],
    '平顶山':[113.29,33.75],
    '邢台':[114.48,37.05],
    '德州':[116.29,37.45],
    '济宁':[116.59,35.38],
    '荆州':[112.239741,30.335165],
    '宜昌':[111.3,30.7],
    '义乌':[120.06,29.32],
    '丽水':[119.92,28.45],
    '洛阳':[112.44,34.7],
    '秦皇岛':[119.57,39.95],
    '株洲':[113.16,27.83],
    '石家庄':[114.48,38.03],
    '莱芜':[117.67,36.19],
    '常德':[111.69,29.05],
    '保定':[115.48,38.85],
    '湘潭':[112.91,27.87],
    '金华':[119.64,29.12],
    '岳阳':[113.09,29.37],
    '长沙':[113,28.21],
    '衢州':[118.88,28.97],
    '廊坊':[116.7,39.53],
    '菏泽':[115.480656,35.23375],
    '合肥':[117.27,31.86],
    '武汉':[114.31,30.52],
    '大庆':[125.03,46.58]
  },

  init			=	function(){
    var s = getParameterByName('shareid')
    if( s ){
      $('.share-img').attr('src', '/static/guozu/upload/'+s+'.png');
      $('.page8').show();
    }
    window.setTimeout(function(){
      load = window.setInterval(function(){
        if( window.uData ){
          window.clearInterval(load);
          $page1.addClass('animated rotateOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $page1.hide();
            $('.i1-t').addClass('animated bounceInRight visible');
            $('.slide1 .p2').addClass('animated rotateIn visible');
            audio = document.getElementById('music');
            audio.play();
          });
          onGetData();
          var url;
          var f = getParameterByName('fromsource');
          if( f ){
            url = "http://ex.wyyun.com/project/lesports_guozu/?fromsource="+f+"&shareid="+window.uData.openid;
          }
          else{
            url = "http://ex.wyyun.com/project/lesports_guozu/?shareid="+window.uData.openid;
          }
          setShare("点亮中国 助威国足", url, "http://ex.wyyun.com/static/guozu/images/p4.png");
          $('.preview').attr('src', window.uData.headimgurl);
          img = window.uData.headimgurl;
          $.ajax({
            url: '/project/lesports_guozu/guozuSaveImage/',
            type: 'POST',
            data: {
              img: window.uData.headimgurl,
              openid: window.uData.openid
            },
            success: function(){}
          });
        }
      },100);
    }, 1500);

    var swiper = new Swiper('.swiper-loading', {
      direction: 'vertical'
    });

    swiper.on('transitionStart', function(swiper){
      // console.log(swiper);
    });

    swiper.on('onSlideChangeEnd', function(swiper){
      if( swiper.activeIndex === 0 ){
        $('.i1-t').addClass('animated bounceInRight visible');
        $('.slide1 .p2').addClass('animated rotateIn visible');
        $('.up').show();
      }
      else if( swiper.activeIndex === 1 ){
        $('.i2-t').addClass('animated bounceInDown visible');
        $('.slide2 .p10').addClass('animated rotateIn visible');
        $('.up').show();
      }
      else if( swiper.activeIndex === 2 ){
        $('.i3-t').addClass('animated bounceInRight visible');
        $('.p3').addClass('animated bounceInLeft visible');
        $('.p4').addClass('animated zoomIn visible');
        $('.up').hide();
      }
    });

    var swiper_tip = new Swiper('.swiper-tip', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      direction: 'horizontal',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: 30
    });

    $('.map').height(width*0.75);

    bindEventListener();
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

  removeURLParameter = function(url, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts= url.split('?');
    if (urlparts.length>=2) {

        var prefix= encodeURIComponent(parameter)+'=';
        var pars= urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i= pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        url= urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        return url;
    } else {
        return url;
    }
  },

  convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        });
      }
    }
    return res;
  },

  convertHightlightData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
          data: data[i]
        });
      }
    }
    return res;
  },

  onGetData = function(){
    var openid;
    if( window.location.href.indexOf('shareid=') !== -1 ){
      openid = window.location.href.split('shareid=')[1].split('&')[0];
    }
    else{
      openid = window.uData.openid;
    }
    $.ajax({
      url: '/project/lesports_guozu/getData/',
      type: 'POST',
      data: {
        openid: openid
      },
      success: function(data){
        myChart = echarts.init(document.getElementById('map'));

        data = JSON.parse(data);
        city = JSON.parse(data.city);
        record = JSON.parse(data.record);
        rdata = JSON.parse(data.data);
        type = data.type;

        setMap();

        $('.page3-title span').text(data.total+225000);
        var tmp = '';
        for( var i = 0; i < 10; i++ ){
          tmp += '<li class="clearfix"><div><span>'+ (i+1) +'</span>'+ city[i].fields.name +'</div>'+ city[i].fields.count +'次</li>';
        }

        $('.page3-list ul').html(tmp);
      }
    });
  },

  onStart = function(){
    $page2.addClass('animated bounceOutDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $page2.hide();
      window.addEventListener('devicemotion', handler, false);
    });
  },

  handler = function(event){
    if( $('.ball').attr('src') !== '/static/guozu/images/ball.gif' ){
      $('.ball').attr('src', '/static/guozu/images/ball.gif');
    }
    var x = event.accelerationIncludingGravity.x;
    var wid = width*0.45;
    if( Math.abs(x/6) > 1 ){
        onLight();
    }
    else{
        $('.ball').css('transform', 'translateX('+wid*x/6+'px)');
    }
  }

  setPopup = function(i){
    // console.log(rdata[i]);
    var city = rdata[i].fields.city.length ? rdata[i].fields.city : '北京';
    $('.map-avatar').attr('src', getImage(rdata[i].fields.image));
    $('.map-title').text('来自'+city+'的'+rdata[i].fields.name+':');
    $('.map-word').text(rdata[i].fields.word);
    var date = new Date(rdata[i].fields.date);
    $('.map-time').text(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate());
  },

  setMap = function(){
    $('.map').empty();
    myChart = echarts.init(document.getElementById('map'));
    city.forEach(function(item){
      map_data.push({name: item.fields.name, value: item.fields.count});
    });

    if( rdata.length ){
      if( type === 1 ){
        rdata[0] = record[0];
      }
      rdata.forEach(function(item){
        highlight_data.push({name: item.fields.city, value: 300});
      });

      setPopup(0);
      var i = 1;
      if( inter ){
        window.clearInterval(inter);
      }
      inter = window.setInterval(function(){
        $('.map-modal').addClass('animated bounceOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $('.map-modal').removeClass('animated bounceOut');
          setPopup(i);
          i++;
          if( i > (rdata.length-1) ){
            i = 0;
          }

          $('.map-modal').addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('.map-modal').removeClass('animated bounceIn')
          });
        });
      }, 3000);
    }

    var option = {
      tooltip : {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        y: 'bottom',
        x:'right',
        textStyle: {
          color: '#fff'
        },

      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false
          }
        },
        roam: false,
				zoom: 1.2,
        itemStyle: {
					normal: {
						areaColor: '#d32c25',
						borderColor: '#111',
						shadowColor: '#d32c25',
						shadowBlur: 110
					},
					emphasis: {
						areaColor: '#d32c25'
					}
				}
      },
      series : [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(map_data),
          symbolSize: function (val) {
            if(val[2] > 3000) {
							//val[2]=85000;
							return 10;
						} else if(val[2] < 120) {

							return val[2] / 30;
						} else {
							return val[2] / 500;
						}
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#ddb926'
            }
          }
        },
        {
					name: '北京到莫斯科',
					type: 'lines',
					zlevel: 1,
					effect: {
						show: true,
						period: 5,
						trailLength: 0.7,
						color: '#fff',
						symbolSize: 5
					},
					lineStyle: {
						normal: {
							color: "red",
							width: 0,
							curveness: 0.2
						}
					},
					data: [{
						coords: [
							[116.4551, 40.2539], // 起点
							[81.4124, 55.0901] // 终点
							// 如果 polyline 为 true 还可以设置更多的点
						],
						// 统一的样式设置
						lineStyle: {
							normal: {}
						}
					}]
				}, {
					name: '北京到莫斯科',
					type: 'lines',
					zlevel: 2,
					effect: {
						show: true,
						period: 5,
						trailLength: 0,
						symbol: planePath,
						symbolSize: 25
					},
					lineStyle: {
						normal: {
							color: 'white',
							width: 0,
							opacity: 0.4,
							curveness: 0.2
						}
					},
					data: [{
						coords: [
							[116.4551, 40.2539], // 起点
							[81.4124, 55.0901] // 终点
							// 如果 polyline 为 true 还可以设置更多的点
						],
						// 统一的样式设置
						lineStyle: {
							normal: {}
						}
					}]
				},
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(highlight_data),
          symbolSize: 15,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#f4e925',
              borderWidth: 0
            },
            emphasis: {
              color: '#f4e925',
              borderWidth: 0
            }
          },
          zlevel: 1
        }
      ]
    };
    myChart.setOption(option);
  },

  onLight = function(){
    $page4.css('z-index', 99);
    $page4.addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $page4.removeClass('animated fadeInUp');
      window.removeEventListener('devicemotion', handler, false);
      $('.ball').attr('src', '/static/guozu/images/ball1.gif');
    });;
  },

  onSubmit = function(){
    if( img ){
      var name = window.uData.nickname.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
      $('.p8').hide();
      $('.publish-tip').show();
      $.ajax({
        url: '/project/lesports_guozu/submit/',
        type: 'POST',
        data: {
          img: img,
          word: $('.swiper-tip .swiper-slide-active').attr('data'),
          index: $('.swiper-tip .swiper-slide-active').attr('index'),
          name: name,
          image_type: img.indexOf('http:') !== -1 ? 1 : 2,
          openid: window.uData.openid
        },
        success: function(data){
          data = JSON.parse(data);
          record = JSON.parse(data.record);
          setMap();
          onClose1();
          // $('.page5-img .page5-avatar').attr('src', getImage(record[0].fields.image));
          // $('.page5-img span').text(parseInt(record[0].pk)+224900);
          // $('.page5-img .page5-name').text(record[0].fields.name);
          // $('.page5-img .page5-word').text(record[0].fields.word);
          $('.page5-img .logo').attr('src', '/static/guozu/upload/'+data.img);

          var url;
          var f = getParameterByName('fromsource');
          if( f ){
            url = "http://ex.wyyun.com/project/lesports_guozu/?fromsource="+f+"&shareid="+window.uData.openid;
          }
          else{
            url = "http://ex.wyyun.com/project/lesports_guozu/?shareid="+window.uData.openid;
          }

          // if( parseInt(record[0].pk)%10 === 0 || parseInt(record[0].pk)%10 === 6 ){
            $('.phone').show();
            var city = record[0].fields.city.length ? record[0].fields.city : '北京';
            setShare('来不及解释了，今天我站国足！我在'+city+'，排名第'+(parseInt(record[0].pk)+224900)+'位为国足助威！接下来该你了！',
            url, getImage(record[0].fields.image));
          // }
          // else{
          //   setShare(record[0].fields.name+'在'+record[0].fields.city+'，是第'+(parseInt(record[0].pk)+224900)+'位点亮中国的球迷！'+record[0].fields.word,
          //   url, getImage(record[0].fields.image));
          // }

          $('.page3-title span').text(parseInt($('.page3-title span').text())+1);
          $page5.css('z-index', 99);
          $page5.show();
          $('.p8').show();
          $('.publish-tip').hide();
          $('.p8').one('touchend', onSubmit);
        },
        error: function(data){
          $('.p8').one('touchend', onSubmit);
        }
      })
    }
    else{
      alert('请先上传照片！');
      $('.p8').one('touchend', onSubmit);
    }

    return false;
  },

  getImage = function(img){
    if( img.indexOf('http:') !== -1 ){
      return img;
    }
    else{
      return '/static/guozu/upload/m_'+img;
    }
  },

  onUpload = function(){
    var formData = new FormData($('#upload_form')[0]);
    formData.append('file', $('input[type=file]')[0].files[0]);
    formData.append('openid', window.uData.openid);
    $('#upload_form').prepend('<p class="upload-tip">上传中...</p>')
    $.ajax({
      url: '/project/lesports_guozu/upload/',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: function(data){
        img = data;
        $('.preview').attr('src', getImage(data));
        $('.upload-tip, .upload-btn').hide();
      }
    });
  },

  onVoice = function(){
    if( $voice.hasClass('open') ){
      $voice.removeClass('open').attr('src', '/static/guozu/images/voice-no.png');
      audio.pause();
    }
    else{
      $voice.addClass('open').attr('src', '/static/guozu/images/voice.png');
      audio.play();
    }
  },

  onClose1 = function(){
    $page4.css('z-index', 2);
    $page4.addClass('animated zoomOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $page4.removeClass('animated zoomOut');
    });
    window.addEventListener('devicemotion', handler, false);
  },

  onClose2 = function(){
    $page5.css('z-index', 1);
    $page5.addClass('animated zoomOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $page5.removeClass('animated zoomOut');
    });;
  },

  onGetCode = function(){
    var val = $('.phone-number').val();
    if (val.length) {
      if ((/^1[3|4|5|7|8]\d{9}$/.test(val))) {
        $('.getcode').html('发送中...');
        $.ajax({
          url: '/project/lesports_guozu/getCode/',
          type: 'POST',
          data: {
            phone: val
          },
          success: function(data) {
            $('.phone2 span').text(val);
            code = data;
            var t = 60;
            var a = window.setInterval(function() {
              $('.getcode').html(t + '秒后重发');
              t--;
              if (t === 0) {
                window.clearInterval(a);
                $('.getcode').html('获取验证码');
                $('.getcode').one('touchend', onGetCode);
              }
            }, 1000);
          }
        });
      } else {
        alert('请输入正确手机号');
        $('.getcode').one('touchend', onGetCode);
      }
    } else {
      alert('请输入手机号');
      $('.getcode').one('touchend', onGetCode);
    }
  },

  onAward = function(){
    var val = $('.code').val();
    if( val.length ){
      if (val == code) {
        $('.phone1').hide();
        $('.phone2').show();
        $.ajax({
          url: '/project/lesports_guozu/getMsg/',
          type: 'POST',
          data: {
            phone: $('.phone-number').val()
          },
          success: function(data){
            console.log(data);
          }
        });
      }
      else{
        alert('验证码错误');
      }
    }
    else{
      alert('请输入验证码');
    }
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

  onShowSuccess = function(){
    $('.page7').hide();
    $('.page6').css('z-index', 1000);
    $page5.addClass('animated zoomOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $page5.removeClass('animated zoomOut');
    });
  },

  onShowShare = function(){
    $('.page7').show();
  },

  onHideShare = function(){
    $('.page7').hide();
  },

  onHideTips = function(){
    $('.tipss').hide();
  },

  onHome = function(){
    var url = removeURLParameter(window.location.href, 'code');
    url = removeURLParameter(url, 'state');
    window.location.href = url;
  },

  onShareStart = function(){
    $('.page2, .page8').hide();
    window.addEventListener('devicemotion', handler, false);
  },

  bindEventListener	=	function(){
    $voice.on('touchend', onVoice);
    $('.p4').on('touchend', onStart);
    $('.p6').on('touchend', onLight);
    $('.p8').one('touchend', onSubmit);
    $('#upload_file').on('change', onUpload);
    $('.page4 .close').on('touchend', onClose1);
    $('.page5 .close').on('touchend', onClose2);
    $('.phone-btn').on('touchend', onAward);
    $('.getcode').one('touchend', onGetCode);
    $('.p11').on('touchend', onShowShare);
    $('.page7').on('touchend', onHideShare);
    $('.tipss').on('touchend', onHideTips);
    $('.p12').on('touchend', onHome);
    $('.p14').on('touchend', onShareStart);
  };

  $(init);
})();
