$(function(){
	
	var touch = "click";
	
	$(".pimg_box").on(touch, function() {
		var SscrollTop = $(window).scrollTop() ;
		var WindHei =  $(window).height() ;
		var tctoph = ( SscrollTop + WindHei / 2 ) - 250 ;
		$(this).children('.pinimg').css('top',tctoph);
		$(this).children('.pinimg').fadeIn(300);
		$('#subback2').fadeIn(300);
	});
	
	$("#subback2").on(touch, function() {
		$(".pinimg").fadeOut(300);
	});
	
	$(".footerlink_box dt , #menu_brand > dt , #menu_cate > dt , #menu_gide > dt, #menu_gift > dt").on(touch, function() {
		var Display = $(this).next().css('display') ;
		$(this).next().slideToggle();
		if(Display=="none"){
			$(this).addClass('m_con');
		}else{
			$(this).removeClass('m_con');
		}
	});

	$("#menu_cate_gift dt , #menu_cate_gohannootomo dt , #menu_cate_ryorinomoto dt, #menu_cate_souzai dt, #menu_cate_seasoning dt, #menu_cate_kayanoyanomen dt, #menu_cate_nabe dt, #menu_cate_kashi dt, .nf_catelist_acd dt").on(touch, function() {
		var Display = $(this).next().css('display') ;
		$(this).next().slideToggle();
		if(Display=="none"){
			$(this).addClass('m_con');
		}else{
			$(this).removeClass('m_con');
		}
	});
	
	$("#footerlink_box_more dt , .seasonrecipe_box dt , .sitemlist_box > dl > dt").on(touch, function() {
		$(this).next().slideToggle();
		$(this).css('display','none')
	});
	
	var subbackflg ;
	var siteWidth ;
	$('#menu_ico').on(touch, function() {
		siteWidth = $('body').width();
		$('#subback').fadeIn(500);
		$('nav ul').css('width',siteWidth - 53);
		$('body').css('position','fixed');
		subbackflg = $('#subback').css('display');
	});
	
	$('#subback').on(touch, function(){
		$('#subback').fadeOut(500);
		$('nav ul').css('width',0);
		$('body').css('position','relative');
		subbackflg = false ;
	});
	
	$(window).on('resize',function(){
		if(subbackflg=='block'){
			siteWidth = $('body').width();
			$('#navmenu').css('width',siteWidth - 53);
		}
	});
	
	$('#search_ico').on(touch,function(){
		$('#topsearch_box').css('height','100%');
		$('#closeb_btn').fadeIn(400);
	});
	
	$('#closeb_btn').on(touch,function(){
		$('#topsearch_box').css('height',0);
		$('#closeb_btn').fadeOut(400);
	});
	
	var timerID;
	$(window).on('load scroll',function (){
		var SscrollTop = $(this).scrollTop() ;
		if (timerID) {
        	clearTimeout(timerID);
    	}
		timerID = setTimeout(function() {
			if(SscrollTop > 50){
				$('#pagetop').css('bottom',15);
			}else{
				$('#pagetop').css('bottom',-100);
			}
		},200);
	});
	
	$(".itemsearchs_box input").focus(function(){
		$('#pagetop').css('opacity',0);
	}).blur(function(){
		$('#pagetop').css('opacity',100);
	});
	
	// var headerHight = 70; //ヘッダの高さ
	// $('a[href^=#]').click(function(){
	// 	var speed = 500;
	// 	var href= jQuery(this).attr("href");
	// 	var target = jQuery(href == "#" || href == "" ? 'html' : href);
	// 	var position = target.offset().top-headerHight;
	// 	jQuery('body,html').animate({scrollTop:position}, speed, 'swing');
	// 	return false;
	// });
	
	// $('.favorite_box').on(touch,function(){
	// 	var dispa = $(this).hasClass("favorite_on");
	// 	$(this).toggleClass('favorite_on');
	// 	if(dispa){
	// 		$(this).html("<span>お気に入り登録</span>");
	// 	}else{
	// 		$(this).html("<span>お気に入り登録済</span>");
	// 	}
	// });
	
	// $('.refbtn').on(touch,function(){
	// 	var dispa = $(this).hasClass("recipemainon");
	// 	$(this).toggleClass('recipemainon');
	// 	if(dispa){
	// 		$(this).html("<span>お気に入り登録</span>");
	// 	}else{
	// 		$(this).html("<span>お気に入り登録済</span>");
	// 	}
	// });
	
	$('.recipemain_box > dl > dt').on(touch,function(){
		$(this).css('display','none');
		$(this).next().slideToggle();
	});
	
	if($('.wintop_t_rank_box').length){
		/*
		$('.wintop_t_rank_box .cartbtn_box').on(touch,function(){
			var deul = parseInt($(this).parent().parent().css('right'));
			$('.simo_box').css('left',deul);
		});
		*/
		$(' .wintop_t_rank_box .mxnext , .wintop_t_rank_box mxallpre').on(touch,function(){
			var deul = parseInt($(this).parent().children().children('ul').css('right'));
			var deul2 = $(window).width();
			var deul3 = deul + deul2 - 15;
			$(this).parent().children().children('ul').children().children('.simo_box').css('left',deul3);
		});
		
		$('.wintop_t_rank_box .mxprev').on(touch,function(){
			var deul = parseInt($(this).parent().children().children('ul').css('right'));
			var deul2 = $(window).width();
			var deul3 = deul - deul2 + 15;
			$(this).parent().children().children('ul').children().children('.simo_box').css('left',deul3);
		});
	}
	// $('.cartbtn_box').on(touch,function(){
	// 	var tchsimo = $(this).nextAll('.simo_box');
	// 	var disps = tchsimo.hasClass("simo_not_box");
	// 	var STop = $(window).scrollTop();
	//	
	// 	var DHeight = $(tchsimo).height() ;
	//	
	// 	var WHeight = ($(window).height() / 2 ) -( DHeight / 2 ) ;
	// 	ZHeight = STop+WHeight;
	// 	tchsimo.css('top',ZHeight);
	// 	$(tchsimo).fadeIn(500);
	// 	$('#subback2').fadeIn(500);
	// });
	
	$('#subback2 , .simo_close').on(touch, function(){
		$('#subback2').fadeOut(500);
		$('.simo_box').fadeOut(500);
		$('nav ul').css('width',0);
		$('body').css('position','relative');
	});
	
	$('.material_box > dl > dt').on(touch,function(){
		$(this).next().slideToggle();
		$(this).toggleClass('material_on');
	});
	
	$('.material_box > dl > dd > p').on(touch,function(){
		$(this).parent('dd').slideToggle();
		$(this).parent('dd').parent('dl').children('dt').toggleClass('material_on');
	});
	
	$('.skit_tcon_dcon > dl > dt').on(touch,function(){
		$(this).next().slideToggle();
		$(this).toggleClass('material_on');
	});
	
	$('.skit_tcon_dcon > dl > dd > p').on(touch,function(){
		$(this).parent('dd').slideToggle();
		$(this).parent('dd').parent('dl').children('dt').toggleClass('material_on');
	});
	
	$('.qanda_box > dl > dt').on(touch,function(){
		$(this).next().slideToggle();
		$(this).toggleClass('qandaon_on');
	});
	
	$('.qanda_box > dl > dd > p').on(touch,function(){
		$(this).parent('dd').slideToggle();
		$(this).parent('dd').parent('dl').children('dt').toggleClass('qandaon_on');
	});
	
	$('.qanda_box > dl > dd > dl > dt').on(touch,function(){
		$(this).next().slideToggle();
		$(this).css('display','none');
	});
	
	$('span.next_ico').on(touch,function(){
		$(this).next('span').css('display','inline');
		$(this).css('display','none');
	});
	
	$('div.postage_box div a').on(touch,function(){
		$('#slide_in01').css('left',0);
	});
	
	$('.motsu_sa_nhpbox01').on(touch,function(){
		$('#slide_in02').css('left',0);
	});
	
	$('.motsu_sa_nhpbox02').on(touch,function(){
		$('#slide_in01').css('left',0);
	});
	
	$('#slide_in01 a').on(touch,function(){
		$('#slide_in01').css('left','100%');
	});
	
	$('div.wrapping_box ul li:nth-of-type(2) a, div.wrapping_box ul li:nth-of-type(2) span').on(touch,function(){
		$('#slide_in02').css('left',0);
	});
	
	$('#slide_in02 a').on(touch,function(){
		$('#slide_in02').css('left','100%');
	});
	
	$('.product_detail_point a').on(touch,function(){
		$('#slide_in03').css('left',0);
	});
	
	$('#slide_in03 a').on(touch,function(){
		$('#slide_in03').css('left','100%');
	});
	
	$('.itemcon_slideBtn_abouticon').on(touch,function(){
		$('#slide_in_abouticon').css('left',0);
	});
	
	$('#slide_in_abouticon a').on(touch,function(){
		$('#slide_in_abouticon').css('left','100%');
	});
	$('.material_sub > dl > dd > dl >dt').on(touch,function(){
		$(this).next().slideToggle();
		$(this).toggleClass('materialon');
	});
	
	/* 6/6以降修正分 ここから */
	
	$('.guide_accordion_box dt').on(touch,function(){
		$(this).nextAll().slideToggle();
		$(this).toggleClass('materialon');
	});
	
	/* 6/6以降修正分 ここまで */
	
	
	$('#refine_box ul li').on(touch,function(){
		$(this).remove();
	});

	/*
	$("#giftsearchl > dl > dt > select").change( function(){
		var seValue = $(this).val() ;
		var selii = '#giftsearchl > dl > dd' ;
		if(seValue==0){
			$(selii).css("display","none");
		}
		if(seValue==1){
			$(selii).css("display","block");
		}
	});

	$("#secitate_box > dl > dt > select").change( function(){
		$("#secitate_box dd select").css("display",'none');
		var secValue = $(this).val() ;
		if(secValue!=0){
			var SSelect = "#secitate_box > dl > dd > select:nth-of-type(" + secValue + ")" ;
			$(SSelect).css("display",'block');
		}
	});
	 */

	$('#condition_box > form > dl > dt').on(touch,function(){
		$(this).next().slideToggle();
		$(this).toggleClass('conditionon');
	});
	
	$('#sseclose_btn').on(touch,function(){
		$('#condition_box').children().children().children('dd').slideToggle();
		$('#condition_box').children().children().children('dt').toggleClass('conditionon');
	});
	
	/*
	$('.campaignmain_box > div > ul > li > ul:nth-of-type(2) li:nth-of-type(1)').on(touch,function(){
		var dispa = $(this).hasClass("fvcon");
		$(this).toggleClass('fvcon');
		if(dispa){
			$(this).html("<span>お気に入り登録</span>");
		}else{
			$(this).html("<span>お気に入り登録済</span>");
		}
	});
	
	/* 6/6以降修正分 ここから */
	/*
	$('.vote_btn').on(touch,function(){
		var voten = $(this).next('.vote_box'); 
		$(voten).css('left',0);
	});
	*/
	/* 6/6以降修正分 ここまで */

	//------ KBH_OPE-5223追加分 ------
	$('.itemcon_set_consideration').on(touch,function(){
		$('#set_consideration').css('left',0);
	});
	$('#set_consideration > a').on(touch,function(){
			$(this).parent().css('left','100%');
	});
	
	//------ KBH_OPE-5223追加分 ------
	$('.vote_box a').on(touch,function(){
		$(this).parent().css('left','100%');
	});
	
	$('.rdvotebtn').on(touch,function(){
		$('#rdvote_box').css('left',0);
	});
	
	$('#rdvote_box a').on(touch,function(){
		$('#rdvote_box').css('left','100%');
	});
	
	$('.coquestionmain_box > dl > dd > dl > dd > dl > dt').on(touch,function(){
		$(this).css('display','none');
		$(this).next().slideToggle();
	});
	
	$('.coquestionmain_box > dl > dd > dl > dt').on(touch,function(){
		$(this).next().slideToggle();
		$(this).toggleClass('coquestionmainon');
	});
	
	$('.coquestionmain_box > dl > dt').on(touch,function(){
		$(this).next().slideToggle();
		$(this).toggleClass('coquestionmainon');
	});
	
	$('.searchallmain_box > dl > dt').on(touch,function(){
		$(this).css('display','none');
		$(this).next().slideToggle();
	});
	
	
	$('.brandcnt_box13 > dl > dt').on(touch,function(){
		$(this).next().slideToggle();
		$(this).toggleClass('brandcnt_box13on');
	});
		
	$('.brandcnt_box13 > dl > dd > dl > dt').on(touch,function(){
		$(this).next().slideToggle();
		$(this).toggleClass('brandcnt_box13on');
	});
	
	$('.brandcnt_box13 > dl > dd > dl > dd > p').on(touch,function(){
		$(this).parent('dd').slideToggle();
		$(this).parent('dd').parent('dl').children('dt').toggleClass('brandcnt_box13on');
	});
	
	$('.brandcnt_box13 > dl > dd > dl > dd > p').on(touch,function(){
		$(this).parent('dd').slideToggle();
		$(this).parent('dd').parent('dl').children('dt').toggleClass('gift_accordion_boxon');
	});
	
	$('.gift_accordion_box > dl > dt').on(touch,function(){
		$(this).next().slideToggle();
		$(this).toggleClass('gift_accordion_boxon');
	});
		
	$('.gift_accordion_box > dl > dd > dl > dt').on(touch,function(){
		$(this).next().slideToggle();
		$(this).toggleClass('gift_accordion_boxon');
	});
	
	$('.gift_accordion_box > dl > dd > dl > dd > p').on(touch,function(){
		$(this).parent('dd').slideToggle();
		$(this).parent('dd').parent('dl').children('dt').toggleClass('gift_accordion_boxon');
	});
	
	
	var $interval = 6000; // 切り替わりの間隔（ミリ秒）
	var $fade_speed = 1000; // フェード処理の早さ（ミリ秒）
	
	$("#nbs_sleider li").css({"position":"relative","overflow":"hidden"});
	$("#nbs_sleider li").hide().css({"position":"absolute","top":0,"left":0});
	
	$("#nbs_sleider li:first").addClass("active").show();
	var es_flg =true ;
	setInterval(function(){
		var $active = $("#nbs_sleider li.active");
		var $next = $active.next("li").length?$active.next("li"):$("#nbs_sleider li:first");
		$active.fadeOut($fade_speed).removeClass("active");
		$next.fadeIn($fade_speed).addClass("active");
	},$interval);
	
	
	mxslider(1,3,15,false,false);
	mxslider(2,3,15,false,false);
	mxslider(3,3,15,false,false);
	mxslider(4,1,0,true,true);
	mxslider(5,3,15,false,false);
	mxslider(6,3,15,false,false);
	mxslider(7,1,0,false,false);
	mxslider(8,1,15,true,false);
	mxslider(10,3,15,false,false); // サイトトップ今月のおすすめ商品
	mxslider(11,3,15,false,false);
	mxslider(12,1,0,true,true);
	mxslider(13,1,0,true,true);
	mxslider(14,3,24,false,false);
	mxslider(15,2,15,false,false);
	mxslider(16,2,15,false,false);
	mxslider(17,2,15,false,false);
	mxslider(18,1,0,true,false);
	mxslider(19,3,15,false,false);
	mxslider(20,2,15,false,false);
	mxslider(21,1,15,false,false,true);
	mxslider(22,1,0,true,true,true);
	
	function mxslider(slidernum,snum,msi,navflg,autotime,thumbnailflg){
		var thumbnailflg = thumbnailflg ;
		var Snum = snum ;
		var Msize = msi ;
		var click_count = 0;
		var SiteWidth = 0 ;
		var Slidernow = 0 ;
		var Ynum = 0 ;
		var Ynums = $('#mxslider'+slidernum+' > ul > li').length ;
		var Nnum = 0 ;
		var click_flg = true ;
		var Slidernow = 0;
		var SlideWidth = 0 ;
		var direction ;
		var position ;
		var Nnum_s2 = 0 ;
		$('#mxslider'+slidernum+' > ul').on('touchstart', onTouchStart);
		$('#mxslider'+slidernum+' > ul').on('touchmove', onTouchMove);
		$('#mxslider'+slidernum+' > ul').on('touchend', onTouchEnd);
		
		var autimeh = 3500 ;
		
		if(autotime){
			var thumindex = $('.thumbnail_box > ul > li').index(this);
			//click_count = 1;
			if(click_flg){
				setInterval(function(){
					if(click_flg){
						if(navflg){
							var click_count2 = click_count + 2 ;
							$('#navul'+slidernum+' li:nth-of-type('+click_count2+')').addClass('onc');
							$('#navul'+slidernum+' li:not(:nth-of-type('+click_count2+'))').removeClass('onc');
						}
						$('#mxslider'+slidernum).nextAll('.mxprev').css('display','block');
						Nnum = ( Ynum / Snum ) -1 ;
						Nnum_s2 = ( Ynum / Snum ) -2 ;
						
						if(click_count==Nnum_s2){
							$('#mxslider'+slidernum).nextAll('.mxnext').css('display','none');
							$('#mxslider'+slidernum).nextAll('.mxallpre').css('display','block');
						}
						
						if(click_count==Nnum){
							if(navflg){
									$('#navul'+slidernum+' li:nth-of-type(1)').addClass('onc');
									$('#navul'+slidernum+' li:not(:nth-of-type(1))').removeClass('onc');
								}
								click_flg = false ;
								click_count = 0 ;
								$('#mxslider'+slidernum).nextAll('.mxprev').css('display','none');
								$('#mxslider'+slidernum).nextAll('.mxallpre').css('display','none');
								$('#mxslider'+slidernum).nextAll('.mxnext').css('display','block');
								$('#mxslider'+slidernum).children('ul').animate({'right':0},500,function(){click_flg = true});
						}else{
							click_flg = false ;
							Slidernow = (SiteWidth - Msize) * (click_count + 1) ;
							$('#mxslider'+slidernum).children('ul').animate({'right':Slidernow},500,function(){click_flg = true});
							click_count++;
						}
					}
				},autimeh);
			}
		}
		
		$(window).on('load resize',function(){
			//画面横幅
			SiteWidth = $(window).width(); 
			Ynum = $('#mxslider'+slidernum+' > ul > li').length ;

            if (Ynum <= snum) {
                $('#mxslider'+slidernum).nextAll('.mxprev').css('display', 'none');
                $('#mxslider'+slidernum).nextAll('.mxnext').css('display', 'none');
            } else {
                var remainder = Ynum % snum;
                if (remainder > 0) {
                    Ynum += (snum - remainder);
                }
            }

			//要素サイズ
			var SSize = (SiteWidth - ( Msize * (Snum + 1) )) / Snum ;
			$('#mxslider'+slidernum+' > ul > li').css('width',SSize);
			$('#mxslider'+slidernum+' > ul').css('right',(SiteWidth - Msize) * click_count);
		});
		
		if(thumbnailflg){
			$('#mxslider'+slidernum).parent().nextAll('.thumbnail_box').children('ul').children('li').on(touch,function(){
				var thumindex = $('#mxslider'+slidernum).parent().nextAll('.thumbnail_box').children('ul').children('li').index(this);
				var thumindex2 = thumindex + 1 ;
				
				if(click_flg){
					
					click_flg = false ;
					
					if(navflg){
						$('#navul'+slidernum+' li:nth-of-type('+thumindex2+')').addClass('onc');
						$('#navul'+slidernum+' li:not(:nth-of-type('+thumindex2+'))').removeClass('onc');
					}
					
					Slidernow = (SiteWidth - Msize) * thumindex;
					
					$('#mxslider'+slidernum).parent().nextAll('.thumbnail_box').children('ul').children('li:nth-of-type('+thumindex2+')').addClass('onc');
					$('#mxslider'+slidernum).parent().nextAll('.thumbnail_box').children('ul').children('li:not(:nth-of-type('+thumindex2+'))').removeClass('onc');
					
					$('#mxslider'+slidernum).children('ul').animate({'right':Slidernow},500,function(){click_flg = true});
					
					if(thumindex==0){
						$('#mxslider'+slidernum).nextAll('.mxprev').css('display','none');
					}else if(thumindex2==Ynums){
						$('#mxslider'+slidernum).nextAll('.mxnext').css('display','none');
						$('#mxslider'+slidernum).nextAll('.mxprev').css('display','block');
						$('#mxslider'+slidernum).nextAll('.mxallpre').css('display','block');
					}else{
						$('#mxslider'+slidernum).nextAll('.mxnext').css('display','block');
						$('#mxslider'+slidernum).nextAll('.mxprev').css('display','block');
					$('#mxslider'+slidernum).nextAll('.mxallpre').css('display','none');
					}
					
					click_count = thumindex ;
				}
			});
		}
		
		function onTouchStart(event) {
			position = getPosition(event);
		}
	
		function onTouchMove(event) {
			direction = (position > getPosition(event)) ? "left" : "right";
		}
	
		function onTouchEnd(event) {
		/*
			Nnum = ( Ynum / Snum ) - 1 ;
			if(direction=="left"){
				Slidernow = (SiteWidth - Msize) * (click_count + 1);
				
				
				
				if(click_flg){
					if(click_count!=Nnum){
						
						if(navflg){
							var click_count2 = click_count + 2 ;
							$('#navul'+slidernum+' li:nth-of-type('+click_count2+')').addClass('onc');
							$('#navul'+slidernum+' li:not(:nth-of-type('+click_count2+'))').removeClass('onc');
						}
						
						click_flg = false ;
						click_count++;
						$('#mxslider'+slidernum+' > ul').animate({'right':Slidernow},500,function(){click_flg = true});
					}
					if(click_count==Nnum){
						$('#mxslider'+slidernum).nextAll('.mxnext').css('display','none');
						$('#mxslider'+slidernum).nextAll('.mxallpre').css('display','block');
					}
					if(click_count!=0){
						$('#mxslider'+slidernum).nextAll('.mxprev').css('display','block');
					}
				}
			}else{
				if(navflg){
					if(click_count!=0){
						$('#navul'+slidernum+' li:nth-of-type('+click_count+')').addClass('onc');
						$('#navul'+slidernum+' li:not(:nth-of-type('+click_count+'))').removeClass('onc');
					}
				}
				Slidernow = (SiteWidth - Msize) * (click_count - 1);
				if(click_flg){
					if(click_count!=0){
						click_flg = false ;
						click_count--;
						$('#mxslider'+slidernum+' > ul').animate({'right':Slidernow},500,function(){click_flg = true});
						if(click_count==0){
							$('#mxslider'+slidernum).nextAll('.mxprev').css('display','none');
						}else{
							
							
							$('#mxslider'+slidernum).nextAll('.mxnext').css('display','block');
							$('#mxslider'+slidernum).nextAll('.mxallpre').css('display','none');
						}
					}
				}
			}
		*/
		}
	
		function getPosition(event) {
			return event.originalEvent.touches[0].pageX;
		}
		
		if(navflg){
			var Ynumo = $('#mxslider'+slidernum+' > ul > li').length ;
			var Yul = '<ul id="navul'+slidernum+'" class="navul clearfix">' ;
			for(var i = 0; i < Ynumo; i++){
				if(i==0){
					Yul = Yul + '<li class="onc">'+i+'</li>' ;
				}else{
					Yul = Yul + '<li>'+i+'</li>' ;
				}
			}
			Yul = Yul + '</ul>' ;
			$('#mxslider'+slidernum).after(Yul);
			
			$(window).on('load',function(){
				var maruhaba = 7 * Ynumo ;
				var margumargin = 5 *  ( Ynumo - 1 );
				var maruleft = ( maruhaba + margumargin ) / 2 ;
				$('#navul'+slidernum).css('margin-left',-maruleft);
			});
			
			/*
			$('#navul'+slidernum+' > li').on(touch,function(){
				if(click_flg){
					click_flg = false ;
					var navulclicknum = $('#navul'+slidernum+' > li').index(this) ;
					var navulclicknum2 = navulclicknum + 1 ;
					
					
					
					var SiteWidth2 = $(window).width();
					var slidernow2 = SiteWidth2 * navulclicknum ;
					
					click_count = navulclicknum ;
					
					if(click_count+1==Ynumo){
						$('#mxslider'+slidernum).nextAll('.mxnext').css('display','none');
						$('#mxslider'+slidernum).nextAll('.mxallpre').css('display','block');
					}else{
						$('#mxslider'+slidernum).nextAll('.mxnext').css('display','block');
						$('#mxslider'+slidernum).nextAll('.mxallpre').css('display','none');
					}
					if(click_count==0){
						$('#mxslider'+slidernum).nextAll('.mxprev').css('display','none');
					}else{
						$('#mxslider'+slidernum).nextAll('.mxprev').css('display','block');
					}
					$('#mxslider'+slidernum).children('ul').animate({'right':slidernow2},500,function(){click_flg = true});
					
					$('#navul'+slidernum+' li:nth-of-type('+navulclicknum2+')').addClass('onc');
					$('#navul'+slidernum+' li:not(:nth-of-type('+navulclicknum2+'))').removeClass('onc');
				}
			});
			*/
		}
		
		
		$('#mxslider'+slidernum).nextAll('.mxnext').on("click",function(){
			if(click_flg){
				
				if(navflg){
					var click_count2 = click_count + 2 ;
					$('#navul'+slidernum+' li:nth-of-type('+click_count2+')').addClass('onc');
					$('#navul'+slidernum+' li:not(:nth-of-type('+click_count2+'))').removeClass('onc');
				}
				
				$('#mxslider'+slidernum).nextAll('.mxprev').css('display','block');
				Nnum = ( Ynum / Snum ) - 1 ;
				if(click_count!=Nnum){
					click_flg = false ;
					Slidernow = (SiteWidth - Msize) * (click_count + 1) ;
					$('#mxslider'+slidernum).children('ul').animate({'right':Slidernow},500,function(){click_flg = true});
					click_count++;
					if(click_count==Nnum){
						$('#mxslider'+slidernum).nextAll('.mxnext').css('display','none');
						$('#mxslider'+slidernum).nextAll('.mxallpre').css('display','block');
					}
				}
				
				if(thumbnailflg){
					var click_count3 = click_count + 1 ;
					$('#mxslider'+slidernum).parent().nextAll('.thumbnail_box').children('ul').children('li:nth-of-type('+click_count3+')').addClass('onc');
					$('#mxslider'+slidernum).parent().nextAll('.thumbnail_box').children('ul').children('li:not(:nth-of-type('+click_count3+'))').removeClass('onc');
				}
			}
		});
		
		$('#mxslider'+slidernum).nextAll('.mxprev').on("click",function(){
			if(click_flg){
				
				if(navflg){
					$('#navul'+slidernum+' li:nth-of-type('+click_count+')').addClass('onc');
					$('#navul'+slidernum+' li:not(:nth-of-type('+click_count+'))').removeClass('onc');
				}
				
				click_flg = false ;
				Slidernow = (SiteWidth - Msize) * (click_count - 1) ;
				$('#mxslider'+slidernum).children('ul').animate({'right':Slidernow},500,function(){click_flg = true});
				click_count--;
				$('#mxslider'+slidernum).nextAll('.mxnext').css('display','block');
				$('#mxslider'+slidernum).nextAll('.mxallpre').css('display','none');
				if(click_count==0){
					$('#mxslider'+slidernum).nextAll('.mxprev').css('display','none');
				}else{
				}
				
				if(thumbnailflg){
					var click_count3 = click_count + 1 ;
					$('#mxslider'+slidernum).parent().nextAll('.thumbnail_box').children('ul').children('li:nth-of-type('+click_count3+')').addClass('onc');
					$('#mxslider'+slidernum).parent().nextAll('.thumbnail_box').children('ul').children('li:not(:nth-of-type('+click_count3+'))').removeClass('onc');
				}
			}
		});
			
		$('#mxslider'+slidernum).nextAll('.mxallpre').on(touch,function(){
			if(click_flg){
				if(navflg){
					$('#navul'+slidernum+' li:nth-of-type(1)').addClass('onc');
					$('#navul'+slidernum+' li:not(:nth-of-type(1))').removeClass('onc');
				}
				click_flg = false ;
				click_count = 0 ;
				$('#mxslider'+slidernum).nextAll('.mxprev').css('display','none');
				$('#mxslider'+slidernum).nextAll('.mxallpre').css('display','none');
				$('#mxslider'+slidernum).nextAll('.mxnext').css('display','block');
				$('#mxslider'+slidernum).children('ul').animate({'right':0},500,function(){click_flg = true});
			}
			
			if(thumbnailflg){
				$('#mxslider'+slidernum).parent().nextAll('.thumbnail_box').children('ul').children('li:nth-of-type(1)').addClass('onc');
				$('#mxslider'+slidernum).parent().nextAll('.thumbnail_box').children('ul').children('li:not(:nth-of-type(1))').removeClass('onc');
			}
		});
		
	}
	
	$(window).load(function() {
		var ahash = location.hash;
		if(ahash){
			var gotoNum = $(ahash).offset().top;
			$('html,body').animate({ scrollTop: gotoNum }, 'fast');
		}
		return false;
	});
	
	$(window).on('scroll',function(){
		var ScrollT = $(this).scrollTop() ;
		var eh_height = $('.en_header').innerHeight();
		var m_height = $('#header .header_top').innerHeight();
		var t_height =  m_height ;
		var MaxTScroll = eh_height ;
		if(ScrollT > MaxTScroll){
			$('#header .header_top').addClass('st_block');
			$('.section_ts').css('margin-top',t_height);
		}else{
			$('#header .header_top').removeClass('st_block');
			$('.section_ts').css('margin-top',0);
		}
	});

	$('.teiki_box_atten > dl > dt, .item_accordion_box > dl > dt').on('click',function(){
		$(this).next('dd').slideToggle();
		$(this).toggleClass('plus');
	});

	// 商品詳細おまとめ割引
	$('.omatome_cartin_btn').on('click', function(){
			window.location.href = $('#omatomeselect'+$(this).data('omatomeselect')).val();
	});

	// 商品詳細レコメンド
	if( location.pathname.match(/^\/sp\/(kayanoya|shobouan|hibina|kubarashouyu|kubara|gift)\/([^/]+)?\/([^/]+)?\/[0-9]{4,8}(\/|)/) ) {
		if ( typeof json !== 'undefined' ) {
			if(json && json.product && json.product.id ) {
				dataLayer.push({'event': 'recommendSliderLoaded'});
				$.ajax({
					url: '//api.logreco1.jp/k_shop/json/recommend/view?item_ids='+json.product.id,
					type:'GET',
					dataType: 'jsonp',
					timeout:10000,
					success: function(data) {
					  // alert("ok");
					},
					error: function(data) {
						// alert("ng");
						$("#recommend_area").hide();
					},
					complete : function(data) {
						var html = '';
						var count=0;
						var products = [];
	
						if (data.responseJSON.items.length > 0){
							$("#recommend_area").show();
							$(data.responseJSON.items).each(function(){
								html += '<li><a href="/sp'+this['column2']+'" data-logreco-item="'+this['item_id']+'"><ul><li><img src="'+this['column3']+'" alt="'+this['column1']+'"></li><li>'+this['column1']+'</li><li>'+this['column4']+'円</li></ul></a></li>';
								products[count++] = this['item_id'];
							});
							$("#recommend_insert_area").html(html);
							mxslider(99,3,15,false,false);
							setLinkDelay('#mxslider99 li a')
		
							var productsStr = products.join();
							dataLayer.push({'productsStr': productsStr});  
							dataLayer.push({'event': 'showRecommend'});
						} else {
							$("#recommend_area").hide();
						}
					}
				});
			}
		}

		function setLinkDelay(selector) {
			$(selector).click(function(e){
				dataLayer.push({'clickedProductId': $(this).data('logreco-item')});  
				dataLayer.push({'event': 'clickRecommend'});
				e.preventDefault();
				var Link = $(this).attr("href");
				setTimeout(function() {
					window.location.href = Link;
				},1000);
			});
		}
	}

});
