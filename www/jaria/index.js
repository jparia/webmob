oNav.addevent("onload", function(){
	
	oEl.get("ObtenirPersonne").onclick = function(){
		var e = oEl.get("ObtenirPersonne");
		alert(e.tagName)
		var d = oEl.get(e);
		
		oAjax.init();
		oAjax.adddata({"action":"obtenirPersonnes", "type":"personne"});
		oAjax.send ("index.php", "post");
		oAjax.recept = function(personnes){
        	var html = "";
           	for( var i = 0; i < personnes.length; i++){
            	html += "<h2>" + personnes[i].type + " " + (i+1) + "</h2>";
            	html += "  Nom : " + personnes[i].nom;
            	html += "<br />  Prénom : " + personnes[i].prenom;		            	
            	for( var y = 0; y < personnes[i].adresses.length; y++){
            		html += "<br />    <b>Adresse " + (y+1) + "</b>";
            		html += "<br />      Rue : " + personnes[i].adresses[y].rue;
            		html += "<br />      Ville : " + personnes[i].adresses[y].ville;
            		html += "<br />      Code postal : " + personnes[i].adresses[y].cp;
            	}
           	}
        	oEl.get("ResultatPersonne").innerHTML = html;
		}	

		oAjax.onready("json");
 
	};
	
	oEl.get("testjson").onchange = function(){
		oEl.get("resultatjson").innerHTML = oText.isjson(this.value);
		//var j = JSON.parse(this.value)
		//oEl.get("resultatjson").innerHTML = JSON.stringify(j)
	};
	
});