 var Random = new function(){
	
	this.showSession = function(){
		El.get("session").innerHTML = "Latitude : " + Storage.get("latitude");
		El.get("session").innerHTML += "<br />";
		El.get("session").innerHTML += "Longitude : " +  Storage.get("longitude");
	};
	
	this.load = function(){
		Geolocation.finaly = function(){
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
					Random.showSession();
				}
			}		
		}
		
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

window.onload = Random.load;