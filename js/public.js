$(function() {

	$(".nav ul li a:last").css("border","none");
	$('nav#mmenu').mmenu({
		extensions	: [ 'effect-slide-menu', 'pageshadow' ],
		counters	: false,
		navbar 		: {
			title		: '菜单',
		},
		navbars		: [
			 {
				position	: 'top',
				content		: [
					'prev',
					'title',
					'close'
				]
			}, {
				position	: 'bottom',
				content		: [
					''
				]
			} 
		]
	});
	/*index*/
	
    $('.banner').slick({
		dots: true,
        autoplay:true,
        arrows:false, 
        autoplaySpeed:3000,
    });
		
	 $('.syzz_con .left').slick({
		dots: true,
        autoplay:true,
        arrows:true, 
        autoplaySpeed:3000,
    });

    $('.testimonials').slick({
		dots: true,
        autoplay:true,
        //slidesToShow:2,
        arrows:false, 
        autoplaySpeed:3000,
    });
	 

		$(".links").hover(function(){
			$(".links ul").slideDown(500)
			
		},
		function(){
				$(".links ul").slideUp(500)
		})
		
		
		$(".er_a").hover(function(){
			$(".er_img").show();		
		},
		function(){
			$(".er_img").hide();
		
		})
		
				
		// $(".f_da").slick({
		// 	fade: true,
		// 	useTransform: true,
		// 	arrows: false,
		// 	asNavFor:".f_xiao"
		// })	
		// $('.f_xiao').slick({
		//   slidesToShow: 3,	
		//   slidesToScroll: 1,
		//   arrows:true,	  
		//   focusOnSelect: true,
		//  useTransform: true,
		//  asNavFor:".f_da"
	
		// });
		$('.f_xiao').slick({
		  slidesToShow: 3,	
		  slidesToScroll: 1,
		  arrows:true,	  
		  focusOnSelect: true,
		  useTransform: true,
		 // asNavFor:".f_da"		 
	
		});

	
		var left_img = $(".left img").attr("src");
		$(".pic_li").hover(function(){
			var img_src = $(this).find("img").attr("src");
			$(".left img").attr("src",img_src);
		},function(){
		
		})
		$(".nav li").hover(function(){
			$(this).find("ul").fadeIn()
		},function(){
			$(this).find("ul").fadeOut()
		})

		// 百度地图API功能
        var map = new BMap.Map("map", {
            enableMapClick: false
        });    
        // 创建Map实例 并定们到海南
        var initpoint = new BMap.Point(109.849165,19.04336);
        map.centerAndZoom(initpoint,11);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

        map.setMapStyle({
            style: 'grayscale'
        });



        var randomCount = 1000;
        var data = [];
        var citys = citys =["海口","三亚","儋州市","文昌","琼海","万宁","东方","定安","屯昌","澄迈","临高","白沙","昌江","乐东","陵水","保亭","琼中"];
        // 构造数据
        while (randomCount--) {
            var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [cityCenter.lng -  Math.random() * 0.4, cityCenter.lat -  Math.random() * 0.4]
                },
                count: 30 * Math.random(),
                time: 100 * Math.random()
            });
        }

        var dataSet = new mapv.DataSet(data);
        var options = {
            size: 13,
            gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
            max: 60,
            animation: {
                type: 'time',
                stepsRange: {
                    start: 0,
                    end: 100
                },
                trails: 10,
                duration: 4,
            },
            draw: 'heatmap'
        }
        //初始化热力图背景数据
        var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

    	var marker = new BMap.Marker(initpoint);  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

        var Uarry=$(".f_xiao a");//获取所有的a元素

        Uarry.each(function(){
        	localinfo = $(this).attr("data-point").split(",");
        	var bmap_point = new BMap.Point(localinfo[0] , localinfo[1]);			

			var marker = new BMap.Marker(bmap_point);  // 创建标注
			map.addOverlay(marker);              // 将标注添加到地图中
			marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        });


		// On After slide change
		$('.f_xiao').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			var Tresult=Uarry.eq(currentSlide).text(); //获取标题
			var landPoint = Uarry.eq(currentSlide).attr("data-point").split(",");
			var projectNO = Uarry.eq(currentSlide).attr("data-no");
			//console.log(projectNO + '---'+  nextSlide + Tresult + landPoint );
			var bmap_point = new BMap.Point(landPoint[0] , landPoint[1]);			

			// var marker = new BMap.Marker(bmap_point);  // 创建标注
			// map.addOverlay(marker);              // 将标注添加到地图中
			// marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
			var opts = {
				width : 240,     // 信息窗口宽度
				height: 90,     // 信息窗口高度
				offset: {width: -5 , height: -40 },
				title : "<b>"+Tresult+ "</b>" , // 信息窗口标题
			}
			var infoWindow = new BMap.InfoWindow(projectNO + "<br>地址：海南省海口市长堤路爱力大厦<br> 电话（微信同号）:180 7890 4890", opts);  // 创建信息窗口对象 
	        
			map.openInfoWindow(infoWindow,bmap_point); //开启信息窗口

			map.panTo(bmap_point); //移动地图到目标位置
		});


		
});

  