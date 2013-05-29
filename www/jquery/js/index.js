$(function(){
	var t = "Longeur : " + $("div").length + "<br />" + "texte : " + $("div").text().trim() + "<br />" + "html : " +  $("div").html().trim();
	$("div:eq(0)").html(t);
	$("li:odd").hide(2000);	//tous les li paires
	
	$("li:even").css("cursor", "pointer");
	$("li:even:eq(1)").css({color:"#f00", fontWeight:"bold"});	//premier li impaire
	$("li:even").each(function(pos){		
		$(this).data("pos", pos.toString());		//-- $(this).attr("data-pos", pos.toString()); ajoute un data-pos mais pas en attribut dans le DOM !!!
		$(this).click(function(){			
			$(this).text($(this).data("pos"));		// == $(this).text($(this).attr("data-pos"));  aussi dans le DOM si data-pos existe
		});
	});
	
	//jQuery.fx.off = true;		Bloque toutes les animations

	$("p").css({position:"absolute", backgroundColor:"#df7708", width:50, height:50, display:"block", padding:"5px", cursor: "pointer", textAlign:"center"});
	
	$("p").bind({
		click : function(){
			$(this).css("cursor", "default");
			if($(this).width() == 250){
				$(this).animate({width:'-=200', height:'-=200', borderRadius: "-=140", fontSize:"-=24", backgroundColor:"#df7708", opacity:1}, 1000 , function(){
					$(this).css({cursor: "pointer"}).text("un carré");
				})
			}
			if($(this).width() == 50){
				$(this).animate({width:'+=200', height:'+=200', borderRadius: "+=140", fontSize:"+=24", backgroundColor:"#0877df", opacity:0.5}, 1000, function(){
					$(this).css({cursor: "pointer"}).text("un rond");					
				})	
			}
		}		
	});
	
	$("p").trigger("click");		//appelle l'évènement click bindé précédemment
	
	$("span").wrap("<div style='color:green' />");		//ajoute un parent à l'élément
	
	//$("span").attr("data-id", "test");
	$("span").data("id", "test");
	
	$("#ajax").bind({
		
		click: function(){
			
			$("#retour_ajax").html("Recherche en cours...");
			
			$.ajax({
	            type: "GET",
	            url: "index.php",
	            contentType: "application/json; charset=utf-8",
	            dataType: "json",
	            async: false,
	            data: {"action":"ok"},
	            error: function (xhr, status) {
	            	alert("erreur Ajax!\n" + status);
	            },
	            success: function (data) {
	            	$("#retour_ajax").html("id : " + data.id + "<br />texte : " + data.text);

	            }
	        });
			
		}
	})
	
});
