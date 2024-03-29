function wp_getdefaultHoverCss(layer_id)
{
	var getli='';
	var geta='';
	var cssstyle='';

	var navStyle = wp_get_navstyle(layer_id,'datasty_');
	if(navStyle.length > 0)
	{
		var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop:\\s*hover\\s*{[^}]+}",'i');
		var tmp = patt1.exec(navStyle);
		if(tmp)
		{			
			var tmp1 = tmp[0].match(/{[^}]+}/)[0];
			tmp1=tmp1.replace('{','').replace('}','');
			getli=getli+tmp1;
		}
 
		patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{[^}]+}",'i');
		tmp = patt1.exec(navStyle);
		if(tmp)
		{			
			var tmp2 = tmp[0].match(/{[^}]+}/)[0];
			tmp2=tmp2.replace('{','').replace('}','');
			geta=geta+tmp2;
		}		
		
		
	}

	navStyle = wp_get_navstyle(layer_id,'datastys_');
	var getlia='';
	if(navStyle.length > 0)
	{		 
		var layidlow=('#nav_'+layer_id+' li.wp_subtop>a:hover').toLowerCase();
		if( ('a'+navStyle).toLowerCase().indexOf(layidlow)>0){			
			var parstr="#nav_"+ layer_id +" li.wp_subtop>a:hover";
			getlia = navStyle.split(new RegExp(parstr,"i"));
			var combilestr='';
			for(key in getlia){
				var ervervalue='';				
				if(('a'+getlia[key]).indexOf('{')<3 && ('a'+getlia[key]).indexOf('{')>0 ){
					var parvalue=getlia[key].split('{');
					if(('a'+parvalue[1]).indexOf('}')>0){
						ervervalue=parvalue[1].split('}')[0];
					}
				}
				combilestr=combilestr+ervervalue;
			}
			geta=geta+combilestr;
		}
		
		layidlow=('#nav_'+layer_id+' li.wp_subtop:hover').toLowerCase();
		if( ('a'+navStyle).toLowerCase().indexOf(layidlow)>0){			
			var parstr="#nav_"+ layer_id +" li.wp_subtop:hover";
			getlia = navStyle.split(new RegExp(parstr,"i"));
			var combilestrs='';
			for(var key in getlia){
				var ervervalue='';				
				if(('a'+getlia[key]).indexOf('{')<3 && ('a'+getlia[key]).indexOf('{')>0 ){
					var parvalue=getlia[key].split('{');
					if(('a'+parvalue[1]).indexOf('}')>0){
						ervervalue=parvalue[1].split('}')[0];
					}
				}
				combilestrs=combilestrs+ervervalue;
			}
			getli=getli+combilestrs;
		}
	 
		
	}
	
	if(getli.length>0){
		getli="#"+layer_id+" li.lihover{"+getli+"} ";
	}
	if(geta.length>0){
		geta="#"+layer_id+" li>a.ahover{"+geta+"} ";
	}
	cssstyle=getli+geta;
	if(cssstyle.length>0 && ($('#canvas #'+layer_id).length>0 || $('#site_footer #'+layer_id).length>0)){
		cssstyle=""+cssstyle+"";
		cssstyle=cssstyle.replace(/[\r\n]/g, " ").replace(/\s+/g, " "); 
		var doms=$('#'+layer_id);
		var oldcssstyle=doms.data('get_layer_hover_css');
		if(oldcssstyle != cssstyle){
			$("#hover"+layer_id+"").text(""+cssstyle+"");
			doms.data('get_layer_hover_css',cssstyle);
			get_plugin_css("H"+ layer_id +"H",cssstyle);
		}
	}
}

function wp_showdefaultHoverCss(layer_id){
	var layertype=$('#'+layer_id).attr('type');
	if(layertype && window['wp_showdefaultHoverCss_'+layertype]){
		return window['wp_showdefaultHoverCss_'+layertype](layer_id);
	}
	return false;
}

function wp_showdefaultHoverCss_new_navigation(layer_id)
{
	 
	var plugin_name=$("#"+layer_id).attr('type');
	var hover=$("#"+layer_id).find('.nav1').attr('hover');
	if(hover!=1){ return;}
	
	wp_getdefaultHoverCss(layer_id);
	var n=0;
	var rootpid=0;
	if(plugin_name=='new_navigation'){
		var page_id=$("#page_id").val();
		rootpid=$("#page_id").attr("rpid")*1;
	}else{
		var page_id=$('#'+layer_id+'').find(".default_pid").html();
		if(page_id==0 || page_id.length==0){
			page_id=$('#nav_'+layer_id+'').children('li:first').attr('pid');	
		}
	}

	$('#nav_'+layer_id+'').children('li').each(function(){
		var type_pid=$(this).attr('pid');		
		if( (type_pid==page_id ) && plugin_name=='new_navigation' ){
			$(this).addClass("lihover").children('a').addClass("ahover");
		}
		if(type_pid==rootpid && rootpid>0){
			$(this).addClass('rootlihover');
		}
		var t_bool = false;
		var whref = window.location.href.replace(/^https?:/,'').replace(/&brd=1$/,'');;
		var t_href= $(this).find("a").attr("href").replace(/^https?:/,'').replace(/&brd=1$/,'');;
 		var $nav1 =  $('#'+layer_id).children('.wp-new_navigation_content').children('.nav1');
		var sethomeurl = $nav1.attr("sethomeurl");
		if(sethomeurl) sethomeurl = sethomeurl.replace(/^https?:/,'');
		var cururl = window.location.href.replace(/^https?:/,'');
		if( (whref.indexOf("&menu_id=")>0 && t_href.indexOf("id=")>0 && whref.indexOf(t_href)>-1) || t_href == sethomeurl &&  sethomeurl.indexOf(cururl)>-1 ){
			t_bool = true;
		}

		if(whref == t_href || whref== t_href+"&brd=1" || t_bool){ $(this).addClass("lihover").children('a').addClass("ahover"); }
		n++;
	});
	if(!$('#nav_'+layer_id+'').children('li.lihover').length){
		$('#nav_'+layer_id+'').children('li.rootlihover:first').addClass("lihover").children('a').addClass("ahover");
	}
	$('#nav_'+layer_id+' .rootlihover').removeClass('rootlihover');
}
function wp_nav_addMoreButton(layer_id)
{  
	var type_style=$("#"+layer_id).find('.wp-new_navigation_content').attr('type');
	
	var index=0;
	var func=function(){
		if(!$('#scroll_container #'+layer_id+':visible').length){
			if(index<=20){
				setTimeout(func,500);
				index++;
			}
			return;
		}

		var firstLiTop = 0;
		var hasMore = false;
		$('#scroll_container  #nav_'+layer_id).children('li.wp_subtop').each(function(i){
			if(i == 0) {firstLiTop = $(this).offset().top;return true;}	
			if($(this).offset().top > firstLiTop)
			{
				if(i==1){
					var twice=$("#"+layer_id).data('twiced');
					if(!twice){
						$("#"+layer_id).data('twiced',true);
						setTimeout(func,1500);
						return false;
					}
				}	

				if(type_style==2){
					$(this).remove();
				}else{

				$('#'+layer_id).data('hasMore','yes');//配置逻辑获取
				var more = $.trim($('#'+layer_id).children('.wp-new_navigation_content').children('.nav1').attr('more'));
				var doms = $(this).prev().prev().nextAll().clone();
				var objA = $(this).prev().children('a');
				if(objA.children('span').length > 0) objA.children('span').html(more);
				else objA.html(more);

				if(objA.hasClass('sub'))
				{
					objA.next('ul').empty();
					doms.appendTo(objA.next('ul'));
				}
				else
				{
					objA.after('<ul></ul>');
					doms.appendTo(objA.next('ul'));
					objA.addClass('sub');
				}
				objA.addClass('nav_more_link');
				$(this).prev().nextAll().remove();
				objA.next('ul').children('li').removeClass('wp_subtop').removeClass('lihover').children('a').removeClass("ahover");
				hasMore = true;
				
				objA.attr('href','javascript:void(0);');

				//点击"更多"弹出全站导航
				if($("#"+layer_id).find('.nav1').attr('moreshow') == 1)
				{
					$(document).undelegate("#"+layer_id+" .nav_more_link",'click').delegate("#"+layer_id+" .nav_more_link",'click',function (e){
						var func=function(){
							$('#'+layer_id).find('#basic-modal-content_'+layer_id).modal({
								containerId:'wp-new_navigation-simplemodal-container_'+layer_id,
								zIndex:9999,
								close:false,
								onOpen:function(dialog){
									dialog.overlay.fadeIn('slow', function(){
										dialog.container.slideDown('slow',function(){
											dialog.data.fadeIn('slow','swing',function(){
												$('.wp_menus').not('.wp_thirdmenu0').each(function(){
													var left = $(this).parent().parent().children('a').eq(0).outerWidth()+5;
													$(this).css({position:'relative',left:left+'px'});
												});
											});
										});
									});
								},
								onClose:function(dialog){
									dialog.data.fadeOut('slow',function (){
										dialog.container.slideUp('slow', function () {
											dialog.overlay.fadeOut('slow', function () {
												$.modal.close();
											});
										});
									});
								}
							});
						}
						if($('#'+layer_id).find('#basic-modal-content_'+layer_id).length){
							func();
						}else{
							var morediv=$('#'+layer_id).find('.navigation_more');
							var more_color=morediv.attr('data-more');
							var typeval=morediv.attr('data-typeval');
							var menudata=morediv.attr('data-menudata');
							$.ajax({
								type: "POST",
								url: parseToURL("new_navigation", "windowpopup"),
								data: {layer_id:layer_id,color:more_color,typeval:typeval,menudata:menudata},
								success: function (response) {
									if (response == 'Session expired')
										window.location.href = getSessionExpiredUrl();
									morediv.replaceWith(response);
									func();
								},
								error: function (xhr, textStatus, errorThrown) {
									wp_alert(xhr.readyState + ',' + xhr.status + ' - ' + (errorThrown || textStatus) + "(get nav).<br/>" + translate("Request failed!"));
									return false;
								}
							});
						}
						return false;
					});
				
				}
				return false;
				}
			}
		});
		if(!hasMore) $('#'+layer_id).data('hasMore','no');
		wp_showdefaultHoverCss(layer_id);
	};
	func();
}

//编辑模式水平拖动动态刷新修改More按钮
function wp_updateMoreButton(layer_id)
{
	var $layer = $('#'+layer_id);
	var $nav1 = $layer.children('.wp-new_navigation_content').children('.nav1');
	var tmp_css = $.trim($("#datastys_"+layer_id).text());
	var tmp_cssa = $.trim($("#datasty_"+layer_id).text()); 
	$.post(parseToURL("new_navigation","refreshNavigator",{menustyle:$.trim($nav1.attr('skin')),saveCss:'yes',page_id:$("#page_id").val(),blockid:layer_id,typeval:$.trim($layer.find(".wp-new_navigation_content").attr('type')),colorstyle:$.trim($nav1.attr('colorstyle')),direction:$.trim($nav1.attr('direction')),more:$.trim($nav1.attr('more')),hover:$.trim($nav1.attr('hover')),hover_scr:$.trim($nav1.attr('hover_scr')),umenu:$.trim($nav1.attr('umenu')),dmenu:$.trim($nav1.attr('dmenu')),moreshow:$.trim($nav1.attr('moreshow')),morecolor:$.trim($nav1.attr('morecolor'))}),{"addopts": $layer.mod_property("addopts")||{},menudata:$("#"+layer_id).data("menudata")},function(data){
		$layer.find('.wp-new_navigation_content').html(data);		
		$("#datastys_"+layer_id).text(tmp_css);
		get_plugin_css(layer_id,tmp_cssa+" "+tmp_css);
	});
	wp_showdefaultHoverCss(layer_id);
}

function wp_removeLoading(layer_id)
{
	
	var $nav1 = $('#'+layer_id).find(".nav1");
	var ishorizon=$nav1.attr("ishorizon");
	if(ishorizon=='1'){
		$("#"+layer_id).find('.wp-new_navigation_content').css({height:'auto',overflow:'hidden'});
	}else{
		$("#"+layer_id).find('.wp-new_navigation_content').css({width:'auto',overflow:'hidden'});
	}
	// 修复IE浏览器部分版本导航无法显示问题 2013/12/26
 
	var temptimer = setTimeout(function(){
		$("#"+layer_id).find('.wp-new_navigation_content').css("overflow", 'visible');
		clearTimeout(temptimer);
	}, 50);
}

function richtxt(layer_id)
{
	var type=$("#"+layer_id).find('.wp-new_navigation_content').attr('type');
	if(type==2){
		var baseloop = 0;
		 $("#"+layer_id).find('.ddli').each(function(){
			 $(this).addClass("setdiff"+baseloop);
			 baseloop++;
		 });
	}
}

function wp_createNavigationgetSubMenuHoverCssFunc(param){
	var layer_id=param.layer_id;
	var editmode=param.editmode;
	function getSubMenuHoverCss(css_pro,type){
		var typeval=type;
		if(typeval==1){
			var regex = "#nav_layer[0-9|a-z|A-Z]+\\s+ul+\\s+li+\\s+a:\\s*hover\\s*{\\s*"+css_pro+"\\s*:[^;]+";
		}else{
			var regex = "#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{\\s*"+css_pro+"\\s*:[^;]+";
		}
		if(editmode){
			var navStyle = $.trim($("#datastys_"+layer_id).text());
		}else{
			var navStyle = $.trim($("#"+layer_id).data("datastys_"));
		}
		if(navStyle.length > 0){
			var patt1 =new RegExp(regex,'i');
			var tmp = patt1.exec($.trim(navStyle));
			if(tmp)
			{
				return $.trim((tmp[0].match(/{[^:]+:[^;]+/)[0]).match(/:[^;]+/)[0].replace(':',''));
			}
		}
		if(editmode){
			navStyle = $.trim($("#datasty_"+layer_id).text());
		}else{
			navStyle = $.trim($("#"+layer_id).data("datasty_"));
		}
		if(navStyle.length > 0)
		{
			if(typeval==1){
				var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+ul+\\s+li+\\s+a:\\s*hover\\s*{[^}]+}",'i');
			}else{
				var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{[^}]+}",'i');
			}
			var tmp = patt1.exec(navStyle);

			if(tmp)
			{
				var tmp1 = tmp[0].match(/{[^}]+}/)[0];
				var patt2 = new RegExp(css_pro+"\\s*:\\s*[^;]+;",'i');
				tmp = patt2.exec(tmp1);
				if(tmp) return $.trim(tmp[0].replace(/[^:]+:/,'').replace(';',''));
			}
		}
		return $.trim($("#nav_"+layer_id+" ul li a").css(css_pro));
	}
	window[layer_id+'_getSubMenuHoverCss']=getSubMenuHoverCss;
}

function layer_new_navigation_content_func(params){
	var layer_id = params['layer_id'];
	$("#"+layer_id).find('.menu_hs11').css('visibility','hidden');
    var contentfunc=function(){
        if($("#"+layer_id).is(':visible')){
                $("#"+layer_id).find('.wp-new_navigation_content').each(function(){
                  var wid = $(this).width();
                  var liwid = $(this).find('li:eq(0)');
                  var lipadd = parseInt(liwid.css('padding-right'))+parseInt(liwid.css('padding-left'));
                                    if ($.inArray(params.menustyle, ['hs7','hs9','hs11','hs12']) != -1) {
                      var bwidth = parseInt(liwid.css("borderRightWidth") || '0');
                      if(bwidth > 0) $('li.wp_subtop', this).width(function(i, h){return h - bwidth - 1});
                  }
                  if(parseInt(liwid.width())>(wid-lipadd)){
                    $(this).find('li.wp_subtop').css('width',wid-lipadd);
                  }
                });
                $("#"+layer_id).find('.menu_hs11,.menu_hs7,.menu_hs12').css('visibility','');
                var contenth=$("#"+layer_id+" .wp-new_navigation_content").height();
                if(contenth==0){
                    $("#"+layer_id+" .wp-new_navigation_content").css('height','');
                }
         }else{
                 setTimeout(contentfunc,60);
         }
    }
	contentfunc();
		if(params.isedit){$('#'+layer_id).mod_property({"addopts": params.addopts});}
	if((params.addopts||[]).length > 0 && /^hs/i.test(params.menustyle)){$('#nav_'+layer_id+' li.wp_subtop:last').css("border-right", 'none');}
    if(! params.isedit){
        if($.inArray(params.menustyle, ['vertical_vs6','vertical_vs7']) != -1){
            var $layer=$('#'+layer_id).find(".wp-new_navigation_content");
            var vswidth=$layer.width();
            var $ul=$layer.find('ul.navigation');
            $ul.css({width:vswidth+'px'});
            $ul.find("li.wp_subtop").css({width:(vswidth-14)+'px'});
        }
    }
};
function layer_new_navigation_hs7_func(params){
	var layer_id = params['layer_id'];
	$('.menu_hs7', '#' + layer_id).css('visibility', 'hidden');
	window[layer_id+'_getSubMenuHoverCss'] = function(css_pro,type){
		var typeval=type;
		if(typeval==1){
			var regex = "#nav_layer[0-9|a-z|A-Z]+\\s+ul+\\s+li+\\s+a:\\s*hover\\s*{\\s*"+css_pro+"\\s*:[^;]+";
		}else if(typeval == 2){
			var regex = "#nav_layer[0-9|a-z|A-Z]+\\s+ul\\s+li\\s*{\\s*"+css_pro+"\\s*:[^;]+";
		}else if(typeval == 3){
			var regex = "#nav_layer[0-9|a-z|A-Z]+\\s+ul\\s+li\\s*:\\s*hover\\s*{\\s*"+css_pro+"\\s*:[^;]+";
		}
		else{
			var regex = "#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{\\s*"+css_pro+"\\s*:[^;]+";
		}
		
		var navStyle = wp_get_navstyle(layer_id, 'datastys_');
		if(navStyle.length > 0)
		{
			var patt1 =new RegExp(regex,'i');
			var tmp = patt1.exec($.trim(navStyle));
			if(tmp)
			{
				return $.trim((tmp[0].match(/{[^:]+:[^;]+/)[0]).match(/:[^;]+/)[0].replace(':',''));
			}
		}

		navStyle = wp_get_navstyle(layer_id, 'datasty_');
		if(navStyle.length > 0)
		{
			if(typeval==1){
				var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+ul+\\s+li+\\s+a:\\s*hover\\s*{[^}]+}",'i');
			}else if(typeval == 2){
				var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+ul\\s+li\\s*{[^}]+}",'i');
			}else if(typeval == 3){
				var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+ul\\s+li\\s*:\\s*hover\\s*{[^}]+}",'i');
			}else{
				var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{[^}]+}",'i');
			}
			var tmp = patt1.exec(navStyle);
			
			if(tmp)
			{
				var tmp1 = tmp[0].match(/{[^}]+}/)[0];
				var patt2 = new RegExp(css_pro+"\\s*:\\s*[^;]+;",'i');
				tmp = patt2.exec(tmp1);
				if(tmp) return $.trim(tmp[0].replace(/[^:]+:/,'').replace(';',''));
			}
		}

		return $.trim($("#nav_"+layer_id+" ul li a").css(css_pro));
	};
	
	$('#'+layer_id).layer_ready(function(){
		setTimeout(function(){
			wp_nav_addMoreButton(layer_id);
		},0);
		if($('#'+layer_id).closest('.full_column[infixed=1]').length>0){
			if(window[layer_id+'_oldlayerincanvas']==null) window[layer_id+'_oldlayerincanvas']=($('#'+layer_id).closest('#canvas').length>0);		
			var timerfunc=function(){
				var timer=window[layer_id+'_fixedtimer']
				if(timer) clearInterval(timer);
				window[layer_id+'_fixedtimer']=setInterval(function(){
					var nowlayerincanvas=($('#'+layer_id).closest('#canvas').length>0);
					if(window[layer_id+'_oldlayerincanvas'] != nowlayerincanvas){
						$('#nav_'+layer_id).find('li').filter(function(){
							return $(this).attr('hover_state')=='1'
						}).triggerHandler('mouseout')
						window[layer_id+'_oldlayerincanvas']=nowlayerincanvas
					}
				},60)
			}
			timerfunc();
		}	
		$('#nav_'+layer_id).find('li').unbind('hover').hover(function(){
			if($('#'+layer_id).closest('.full_column[infixed=1]').length>0){
				$(this).attr('hover_state','1');
				var nowlayerincanvas=($('#'+layer_id).closest('#canvas').length>0);
				if(window[layer_id+'_oldlayerincanvas'] != nowlayerincanvas){
					$('#nav_'+layer_id).find('li').filter(function(){
						return $(this).attr('hover_state')=='1'
					}).triggerHandler('mouseout')
					window[layer_id+'_oldlayerincanvas']=nowlayerincanvas
					setTimeout(function(){
						$('#nav_'+layer_id+' .wp_subtop').removeClass("lihover").children('a').removeClass("ahover");
					},0);
					$(this).triggerHandler('mouseover')
					return;
				}
			}
			if(params.isedit){
				var resizehandle = parseInt($('#'+layer_id).children('.ui-resizable-handle').css('z-index'));
				if($(this).hasClass('wp_subtop')) $(this).parent().css('z-index',resizehandle+1);
				var canvas_zindex = $('#canvas').css('z-index');
				var $toolbar = $(".propblk[super='"+layer_id+"']");
				if($toolbar.length > 0)  $toolbar.css('z-index',canvas_zindex - 1);
			}
			$(this).children('ul').show();
			var type=$("#"+layer_id).find('.wp-new_navigation_content').attr('type');
			if(type==2){
				var self = $(this);
				var pos = 0 ;
				var loops = 0;
				$('#nav_'+layer_id).find('li').each(function(){
					if(loops == 1) return true;
					if(self.html() == $(this).html()){
						loops = 1;
						return true;
					}else{
						pos = pos + $(this).outerWidth();
					}	
					 
				})
				 
				$("#"+layer_id).find('.ddli').hide();
				var this_width = $('#nav_'+layer_id).outerWidth();
				var thisul_left = $('#nav_'+layer_id).css("padding-left");
				thisul_left = parseInt(thisul_left);
				$(this).children('.ddli').outerWidth(this_width).css("margin-left","-"+(thisul_left+pos+5)+"px");
				$(this).children('.ddli').eq(0).slideDown();
			}
		},function(){
			$(this).removeAttr('hover_state')
			$(this).children('ul').hide();		
			if(params.isedit){
				var resizehandle = parseInt($('#'+layer_id).children('.ui-resizable-handle').css('z-index'));
				var isHover = true;
				$('#nav_'+layer_id).find('ul').each(function(){
					if($(this).css('display') != 'none') {isHover = false;return false;}
				});
				if(isHover){
					if(!($.browser.msie && $.browser.version < 9)) $(this).parent().css('z-index',resizehandle-1);
					var $toolbar = $(".propblk[super='"+layer_id+"']");
					if($toolbar.length > 0)  $toolbar.css('z-index','999');
				}		
			}
			var type=$("#"+layer_id).find('.wp-new_navigation_content').attr('type');
			if(type==2){
				$("#"+layer_id).find('.ddli').slideUp();
			}
		});
		
		//子菜单位置设置
		$(".menu_"+params.menustyle+" #nav_"+layer_id).find('li').mouseenter(function(){
			var firstLi = $(this);
			var firestLiouterWidth = firstLi.outerWidth();
			var tmp_max_width = 0;
			firstLi.children('ul').children('li').each(function(){
				if($(this).outerWidth() < firestLiouterWidth)
					$(this).width(firestLiouterWidth - parseInt($(this).parent('ul').css('padding-right')) - parseInt($(this).parent('ul').css('padding-left')) - parseInt($(this).css('padding-left')) - parseInt($(this).css('padding-right')));
				else if($(this).outerWidth() > tmp_max_width) tmp_max_width = $(this).outerWidth();
			});
				
			if(tmp_max_width > 0) firstLi.children('ul').children('li').each(function(){
				$(this).width(tmp_max_width - parseInt($(this).css('padding-left')) - parseInt($(this).css('padding-right')));
			});
				
			if(firstLi.parent('ul').attr('id') != 'nav_'+layer_id)
				firstLi.children('ul').css('margin-left',firstLi.outerWidth());
			tmp_max_width = 0;
		});
	
		$('#nav_'+layer_id).find('li').hover(function(){
			if(!$(this).hasClass('wp_subtop'))
			{
				$(this).css('background-image',window[layer_id+'_getSubMenuHoverCss']('background-image',3));
				$(this).css('background-repeat',window[layer_id+'_getSubMenuHoverCss']('background-repeat',3));
				$(this).css('background-color',window[layer_id+'_getSubMenuHoverCss']('background-color',3));
				$(this).css('background-position',window[layer_id+'_getSubMenuHoverCss']('background-position',3));
			}
			if($(this).children('ul').length > 0)
			{
				$(this).children('ul').css('background-image',window[layer_id+'_getSubMenuHoverCss']('background-image',2));
				$(this).children('ul').css('background-repeat',window[layer_id+'_getSubMenuHoverCss']('background-repeat',2));
				$(this).children('ul').css('background-color',window[layer_id+'_getSubMenuHoverCss']('background-color',2));
				$(this).children('ul').css('background-position',window[layer_id+'_getSubMenuHoverCss']('background-position',2));
	
				$(this).children('ul').children('li').css({'background-image':'none','background-color':'transparent'});
			}
		},function(){
			if(!$(this).hasClass('wp_subtop'))
				$(this).css({'background-color':'transparent','background-image':'none'});
		});
	
		//第三级即下级菜单随高度增加位置动态修改
		$(".menu_"+params.menustyle+" #nav_"+layer_id+" ul li").hover(function(){
			if($(this).children('ul').length > 0)
			{
				$(this).children('ul').css('margin-top',-1 * ($(this).outerHeight() + parseInt($(this).parent().css('padding-top'))));
			}
		});
	
		$('.menu_'+params.menustyle+' #nav_'+layer_id).find('li').hover(function(){
			var direction=$("#"+layer_id).find('.nav1').attr('direction');
			var height = parseInt($(this).outerHeight());
			if($(this).parent().hasClass('navigation'))
			{
				$('#nav_'+layer_id+' .wp_subtop').removeClass("lihover").children('a').removeClass("ahover");
				if(direction==1){//向上展				
					$(this).children('ul').css('top','auto').css('bottom',height + 'px');
				}else{				
					$(this).children('ul').css('top',height+'px').css('bottom','auto');	
				}
				$(this).children('a').css({'font-family':window[layer_id+'_getSubMenuHoverCss']("font-family",0),'font-size':window[layer_id+'_getSubMenuHoverCss']("font-size",0),'color':window[layer_id+'_getSubMenuHoverCss']("color",0),'font-weight':window[layer_id+'_getSubMenuHoverCss']("font-weight",0),'font-style':window[layer_id+'_getSubMenuHoverCss']("font-style",0)});
			}else{
				if(direction==1){
					$(this).children('ul').css('top','auto').css('bottom', -1*parseInt($('#nav_'+layer_id+' ul').css('padding-bottom')) + 'px');
				}else{
					$(this).children('ul').css('top',height+'px').css('bottom','auto');					
				}
				$(this).children('a').css({'font-family':window[layer_id+'_getSubMenuHoverCss']("font-family",1),'font-size':window[layer_id+'_getSubMenuHoverCss']("font-size",1),'color':window[layer_id+'_getSubMenuHoverCss']("color",1),'font-weight':window[layer_id+'_getSubMenuHoverCss']("font-weight",1),'font-style':window[layer_id+'_getSubMenuHoverCss']("font-style",1)});
			}
		},function(){
			if($(this).parent().hasClass('navigation'))
			{
				wp_showdefaultHoverCss(layer_id);
			}
			 $(this).children('a').attr("style",'');
		});		
		
		wp_showdefaultHoverCss(layer_id);
		wp_removeLoading(layer_id);
	});
};
function layer_media_init_func(layerid){
	var $curlayer=$('#'+layerid), _duration = -1;
	$('#wp-media-image_'+layerid).mouseover(function (event) {
		if($curlayer.data('wopop_effects') && $curlayer.hasClass('now_effecting')){
			return;
		}
		var effect=$curlayer.data('wopop_imgeffects');
		var $this=$(this);
		var running=$this.data('run');
		if(effect && running!=1){
			var effectrole = effect['effectrole'];
			var dset = effect['dset']; 
			var effectel=$curlayer;
			if(effectrole=='dantu' &&  effect['effect']=="effect.rotation"){
				$curlayer.data('iseffectrotate',true);
				effectel=$curlayer.find('.wp-media_content');
			}else if(effectrole !='dantu' && dset && dset['effect']=="effect.rotation"){
				$curlayer.data('iseffectrotate',true);
				effectel=$curlayer.find('.wp-media_content');
			}
			
			effectel.setimgEffects(true,effect,1);
			
			if(effectrole !='dantu' && typeof(dset)!="undefined"){
				// fixed bug#5949
				if ($curlayer.hasClass('now_effecting')) {
					_duration = dset.duration;
					$curlayer.wopop_effect_command('stop');
				}
				var temp_effect = {};
				temp_effect['type'] = effect['type'];
				temp_effect['effectrole'] = 'dantu';
				temp_effect['effect'] = effect['dset']['effect'];
				temp_effect['duration'] =  effect['dset']['duration'];
				effectel.setimgEffects(true,temp_effect,1);
			}
		}
	});
	// fixed bug#5949
	$curlayer.mouseleave(function(e){
		var $target = $(this), _tt = parseInt(_duration);
		if (!isNaN(_tt) && _tt >= 0 && !$target.hasClass('now_effecting')) {
			var timer = setTimeout(function(){
				$target.showEffects();
				_duration = -1;
				clearTimeout(timer);
			}, _tt);
		}
	});

	var imgover=$('#wp-media-image_'+layerid).closest('.img_over');
	imgover.children('.imgloading').width(imgover.width()).height(imgover.height());
	imgover.css('position','relative');
	$('#'+layerid).layer_ready(function(){
		layer_img_lzld(layerid);
	});
}