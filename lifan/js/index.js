(function(){
    var $img 		=	$('.image-container img'),
        $a          =   $('.image-container a'),

        flag        =   true,

    init			=	function(){
        checkImg();
        setImg();
    	bindEventListener();
    },

    checkImg 			=	function(){
    	$a.each(function(){
            var $this   =  $(this); 
    		$this.css('height',$this.width());
    	});
    },

    setImg 				=	function(){
    	// $('.fancybox').fancybox({});
    },

    onShowMore 			=	function(){
    	var con 		=	$(this).closest('.news-container');

    	con.find('.cutoff').hide();
    	con.find('.full').show();

    	$(this).remove();
    },

    onShowComments      =   function(){
        var con         =   $(this).closest('.comments');

        con.find('.comment-more').show();

        $(this).remove();

        return false;
    },

    onComment           =   function(e){
        var $this       =   $(this),
            $con        =   $this.closest('.comment-con'),
            $input      =   $con.find('input'),
            val         =   $input.val(),
            id          =   parseInt($input.attr('data-id'));

        if( val.length ){
            $this.html('发布中...');
            $.ajax({
                url: '/project/lifan/setComment/',
                type: 'POST',
                data: {'id': id, 'val': val},
                success: function(data){
                    data = JSON.parse(data);
                    if( data.code == 1 ){
                        var con         =   $this.closest('.comments');

                        con.find('ul').prepend($('<li>'+ val +'</li>'));

                        con.find('.comment-more').show();
                        con.find('input').val('');
                        con.find('ul > a').remove();
                        $this.html('发布');
                    }
                },
                error : function(){
                    alert("提交失败，请重试！");
                }
            });
        }
    },

    setImgPreview       =   function(){
        if( flag ){
            var self = $(this);
            var current = this.style.backgroundImage;
            current = current.slice(4,current.length-1);
            var images = self.closest(".image-container").find("a");
            var urls = [];
            images.each(function(i,n){
                var src = n.style.backgroundImage;
                src = src.slice(4,src.length-1);
                urls.push(src);
            });
            wx.previewImage({
                current: current,
                urls: urls
            });
        }
        flag = true;
    },

    bindEventListener	=	function(){
        $('.news-container a').on('touchend', onShowMore);
        $('.comments ul > a').on('touchend', onShowComments);
        $('.comment-con a').on('touchend', onComment);
        $(document).on("touchmove",".fancybox",function(){
            flag = false;
        });
        $(document).on("touchend",".fancybox", setImgPreview);
    };

    $(init);
})();



