 var Mobile = new function(){
	 
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
	
	this.showSession = function(){
		El.get("session").innerHTML = "Latitude : " + Storage.get("latitude");
		El.get("session").innerHTML += "<br />";
		El.get("session").innerHTML += "Longitude : " +  Storage.get("longitude");
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
			Mobile.submit();
		};
		El.get("reset").onclick = function(){
			Mobile.reset();
		};
		
		Geolocation.finaly = function(){
			/**
			 @author jp.aria			 
			*/
			
			if(El.test("geo")){		
				var el = El.get("geo");
				var div = El.create("div");
				div.style.styleFloat = "left";
				div.style.width = "300px";
				div.style.height = "300px";
				div.style.textAlign = "right";
				div.style.padding = "20px";
				div.innerHTML = "Latitude : " +  Geolocation.latitude;
				div.innerHTML += "<br />Longitude : " + Geolocation.longitude;	
				el.appendChild(div);
				var location =  Geolocation.latitude + "," + Geolocation.longitude;
				var img = El.create("img");		
				img.style.styleFloat = "left";
				img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" +	location + "&zoom=14&size=400x300&sensor=false";
				el.appendChild(img);
		
				if( El.test("session") ){
					Storage.set("latitude", Geolocation.latitude);
					Storage.set("longitude", Geolocation.longitude);
					Mobile.showSession();
				}
			}
			
			if(El.test("geoMap")){
				$("#geoMap").gmap(
					"addMarker", {
						//address : "7 rue de l'église Berneville",
						//street : "7 rue de l'église",
						//"city" : "Berneville",
						//"country" : "France",
						//plz : "62123",
						"position": new google.maps.LatLng(50.26648, 2.66957),
						//"position": new google.maps.LatLng(Geolocation.latitude, Geolocation.longitude),
									//ou Geolocation.latitude + "," + Geolocation.longitude,
						"zoom": 6,
						"bounds": true
				});
			}
		};
		
		
		if( !Geolocation.init() ){
			if( El.test("geo") ){
				El.get("geo").innerHTML = "Géolocalisation incompatible !";
			}
			
		}
		
		else if(Geolocation.error != ""){
			if( El.test("geo") ){
				El.get("geo").innerHTML = Geolocation.error;
			}
			
		}
	};
	
};

window.onload = Mobile.load;