var Search = new function(){
	
	this.submit = function(){
		Storage.set("auteur", El.get("auteur").value);
		Storage.set("nationalite", El.get("nationalite").value);
		Storage.set("titre", El.get("titre").value);
		Storage.set("annee", El.get("annee").value);
		Storage.set("prix", El.get("prix").value);
		Storage.set("disponibilite", El.get("disponibilite").value);
		Storage.set("color", El.get("color").value);	
	};
	
	this.reset = function(){
		Storage.clear();
	};
	
	this.load = function(){
		El.get("auteur").value = Storage.get("auteur");
		El.get("nationalite").value = Storage.get("nationalite");
		El.get("titre").value = Storage.get("titre");
		El.get("annee").value = Storage.get("annee");
		El.get("prix").value = Storage.get("prix");
		El.get("disponibilite").value = Storage.get("disponibilite");
		El.get("color").value = Storage.get("color");
		
		El.get("submit").onclick = function(){
			Search.submit();
		};
		El.get("reset").onclick = function(){
			Search.reset();
		};
	};
	
}

window.onload = function(){
	Search.load();
}