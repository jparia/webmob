/*
 * @jquery
 */

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
				$(this).animate({width:'-=200', height:"-=200", borderRadius: "-=140", fontSize:"-=24", backgroundColor:"#df7708", opacity:1}, 1000 , function(){
					$(this).css({cursor: "pointer"}).text("un carré");
				})
			}
			if($(this).width() == 50){
				$(this).animate({width:'+=200', height:"+=200", borderRadius: "+=140", fontSize:"+=24", backgroundColor:"#0877df", opacity:0.5}, 1000, function(){
					$(this).css({cursor: "pointer"}).text("un rond");					
				})	
			}
		}		
	});
	
	$("p").trigger("click");		//appelle l'évènement click bindé précédemment
	
	$("span").wrap("<div style='color:green' />");		//ajoute un parent à l'élément
	
	//$("span").attr("data-id", "test");
	$("span").data("id", "test");
	
	$("#ObtenirPersonne").bind({
		
		click: function(){
			
			$("#ResultatPersonne").html("Recherche des personnes en cours...");
			
			$.ajax({
	            type: "GET",
	            url: "index.php",
	            contentType: "application/json; charset=utf-8",
	            dataType: "json",
	            async: false,
	            data: {"action":"obtenirPersonnes"},
	            error: function (xhr, status) {
	            	alert("erreur Ajax!\n" + status);
	            },
	            success: function (personnes) {
	            	var html = "";
	               	for( var i = 0; i < personnes.length; i++){
		            	html += "<h2>Personne " + (i+1) + "</h2>";
		            	html += "  Nom : " + personnes[i].nom;
		            	html += "<br />  Prénom : " + personnes[i].prenom;		            	
		            	for( var y = 0; y < personnes[i].adresses.length; y++){
		            		html += "<br />    <b>Adresse " + (y+1) + "</b>";
		            		html += "<br />      Rue : " + personnes[i].adresses[y].rue;
		            		html += "<br />      Ville : " + personnes[i].adresses[y].ville;
		            		html += "<br />      Code postal : " + personnes[i].adresses[y].cp;
		            	}
	               	}
	            	$("#ResultatPersonne").html(html);

	            }
	        });
			
		}
	})
	
	$("#ModifierFormulaire").data("anim", false);
		
	$("#ModifierFormulaire").bind({
		
		click: function(){
			var anim = $(this).data("anim")
			if(anim){
				return false;
			}
			$(this).data("anim", true);
			var nom = $("input[name='nom']");
			var prenom = $("input[name='prenom']");	
			// 
			if(nom.width() <= 200){
				nom.val("ARIA");
				prenom.val("Jean-Pierre");
				//el.css({width:"500px", backgroundColor:"#fcc"});
				nom.animate({width:"+=500px", backgroundColor:"#fcc"}, {duration: 1000, easing: "easeOutElastic", complete: function() {
					$("#ModifierFormulaire").data("anim", false);
			    }});
				prenom.animate({width:"+=500px", backgroundColor:"#fcc"}, {duration: 1000, easing: "easeOutElastic"});				
				$("form").animate({backgroundColor:"#ffc", border:"1px solid #611"});			
			}
			else{
				nom.val("");
				prenom.val("");
				nom.animate({width:"-=500px", backgroundColor:"#fff"}, {duration: 1000, easing: "easeOutCirc", complete: function() {
					$("#ModifierFormulaire").data("anim", false);					
			    }});
				prenom.animate({width:"-=500px", backgroundColor:"#fff"}, {duration: 1000, easing: "easeOutCirc"});				
				$("form").animate({backgroundColor:"#fff", border:"1px solid #fff"});		
			}
			
			return false;
			
		}
	
	});
	
	$("input[name='password']").bind({
		keyup: function(){
			if ($(this).next().get(0).tagName.toLowerCase() == "span"){
				$(this).next().remove();
			}			
			var t = setPassword($(this).val());
			$(this).after("<span class=\"" + t + "\">" + t + "</span>");
			return false;
		}
	});
	
	$("input[name='passwordControl']").bind({
		keyup: function(){
			if ($(this).next().get(0).tagName.toLowerCase() == "img"){
				$(this).next().remove();
			}		
			var vp = $("input[name='password']").val();
			var vpc = $(this).val();
			if(vp !== vpc){
				$(this).after("<img src=\"../img/led_red_24.png\" alt=\"\" />");
			}else{
				$(this).after("<img src=\"../img/led_green_24.png\" alt=\"\" />");
			}
			return false;
		}
	});

	
	$("#demarrerChrono").bind({
		click: function(){
			Chrono.start("chrono");
		}
	});
	
	$("#arreterChrono").bind({
		click: function(){
			Chrono.stop();
		}
	});
	
	$("#effacerChrono").bind({
		click: function(){
			Chrono.raz();
		}
	});
	
	//Bouton Oui
	$("#question button:eq(0)").bind({
		mouseenter : function(){
			var l1 = $(this).offset();			
			var l2 = $("#question button:eq(0)").offset();
			$(this).offset({left: l2.left});
			$("#question button:eq(0)").offset({left: l1.left});
			
		},
		
		click : function(){
			$("#question h3:eq(0)").html("C'est bien ce que nous pensions");
		}
		
	});
	
	//Bouton Non
	$("#question button:eq(1)").bind({
		mouseenter : function(){
			var l1 = $("#question button:eq(0)").offset();
			var l2 = $(this).offset();
			$(this).offset({left: l1.left});
			$("#question button:eq(0)").offset({left: l2.left});;			
		},
	
		click : function(){
			$("#question h3:eq(0)").html("C'est dommage");
		}
	});
	
	//image sur souris	
	$("body").append($("<div id='souris' />"));	
	$(document).mousemove(function(e){		 
	      $('#souris').show().offset({left: (e.pageX + 5), top: (e.pageY + 5)});
	});
	$(document).mouseout(function(e){		 
	      $('#souris').hide();
	});
	
	//images survolées
	var div = $("<div />")
	$("body").append(div);
	div.css({float: "left"});
	div.append($("<img src='../img/img1.png' alt='' />"));
	div.append($("<img src='../img/img2.png' alt='' />"));
	div.append($("<img src='../img/img3.png' alt='' />"));
	div.append($("<img src='../img/img4.png' alt='' />"));
	
	div.children().each(function(){
		$(this).mouseover(function(){
			$(this).animate({width : "+= 50", height: "+=50"}, {duration: 500, easing: "easeOutElastic"});
		});
		$(this).mouseout(function(){
			$(this).animate({width : "-= 50", height: "-=50"}, {duration: 500, easing: "easeOutElastic"});
		});
	});
	 
	//Volet mobile
	Volet.init();
		
	
});


var Volet = new function(){
	
	this.init = function(){
		var v = $("<div class='volet' />"); 
		for (var i = 0; i < 10; i++){
			var b = $("<div />");
			b.html("Menu " + (i + 1));
			v.append(b);
			b.click(function(){
				alert($(this).text())
			});
		}
		var s =  $("<span />");
		v.append(s);
		s.click(function(){
			if(s.parent().offset().left < -200){
				s.parent().animate({left: "+=190"}, {duration: 1000, easing: "easeOutElastic"});
			}else{
				s.parent().animate({left: "-=190"}, {duration: 1000, easing: "easeOutElastic"});
			}
		});
		$("body").append(v);
		v.css({height: $(window).height()});
	};
}

$(window).scroll(function(){
	$(".volet").offset({top: this.scrollY})
})

var Chrono = new function(){
	
	_this = this;
	this.timer = undefined;	
	this.el = undefined;
	this.time = 0;
	
	this.convert = function(i){		
		var secondes = i;
		var d = new Date();
		d.setTime(this.time * 10);
		var h = ((d.getHours()-1) >= 10) ? (d.getHours()-1) : "0" + (d.getHours()-1);
		var m = ((d.getMinutes()) >= 10) ? (d.getMinutes()) : "0" + (d.getMinutes());
		var s = ((d.getSeconds()) >= 10) ? (d.getSeconds()) : "0" + (d.getSeconds());
		var ms = ((d.getMilliseconds()) >= 10) ? (d.getMilliseconds().toString().substr(0, 2)) : "0" + (d.getMilliseconds().toString().substr(0, 2));
		$("#chrono").html(h + ":" + m + ":" + s + "." + ms);
	}
	
	this.increment = function(){
		_this.time++;
		_this.convert(_this.time);
	}
	
	this.start = function(id){
		_this.el = $("#"+ id);
		_this.timer = window.setInterval(_this.increment, 10);
	};
	
	this.stop = function(){
		window.clearInterval(_this.timer);
		_this.timer = undefined;
	};
	
	this.raz = function(){
		_this.stop();
		_this.time = 0;
		this.convert(_this.time);
	};
}

function setPassword(mdp){
	var sFort = "[A-Z]" + //commence par une majuscule
		"(?=(.*[a-z]){2,})" + //contient au moins deux minuscule
		"(?=(.*[0-9]){2,})" , //contient au moins deux chiffres

	sMoyen ="(?=(.*[a-z]){2,})" + //contient au moins deux minuscule
		"(?=(.*[0-9]){2,})", //contient au moins deux chiffres
		
	regFort = new RegExp(sFort),
	regMoyen = new RegExp(sMoyen);

	if ((mdp.match(regFort)) && (mdp.length>=8)) {
		return "fort";
	}

	if ((mdp.match(regMoyen)) && (mdp.length>=8)) {
		return "moyen";
	}

	return "faible";

}
