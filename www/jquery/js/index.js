$(function(){
	var t = "Longeur : " + $("div").length + "<br />" + "texte : " + $("div").text().trim() + "<br />" + "html : " +  $("div").html().trim();
	$("div").html(t);
	$("li:odd").hide(2000);	//tous les li paires
	
	$("li:even").css("cursor", "pointer");
	$("li:even:eq(1)").css({color:"#f00", fontWeight:"bold"});	//premier li impaire
	$("li:even").each(function(pos){
		//$(this).attr("data-pos", pos.toString());
		$(this).data("pos", pos.toString());
		$(this).click(function(){
			//$(this).text($(this).attr("data-pos"));
			$(this).text($(this).data("pos"));
		});
	});
	

	$("p").css({position:"absolute", backgroundColor:"#df7708", width:50, height:50, display:"block", padding:"5px", cursor: "pointer"});
	
	/*.animate({width:'+=200', height:'+=200', borderRadius: "+=140"}, 1000, function(){
		$("<span>c'était </span>").prependTo(this);
	});
	*/
	
	$("p").bind({
		click : function(){
			$(this).css("cursor", "default");
			if($(this).width() == 250){
				$(this).animate({width:'-=200', height:'-=200', borderRadius: "-=140"}, 1000, function(){
					$(this).css("cursor", "pointer");
				});	
			}
			if($(this).width() == 50){
				$(this).animate({width:'+=200', height:'+=200', borderRadius: "+=140"}, 1000, function(){
					$(this).css("cursor", "pointer");
				});	
			}
		}		
	});
	
	$("p").trigger("click");
});
