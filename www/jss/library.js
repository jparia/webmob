var Storage = new function(){
	
	this.get = function(key,){
		return localStorage[key];
	};
	this.set = function(key, value){
		localStorage[key] = value;
	};
	this.clear = function(){
		localStorage.clear();
	};
	this.reset = function(key){
		localStorage.removeItem(key);
	};
	
}

var Geolocation = function(){
	
	_this = this;
	this.el = undefined;
	
	this.init = function(id){
		if( !document.getElementById(id) ){
			return;
		}
		_this.el = document.getElementById(id);
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(showPosition, showError);
		}else{
			_this.el.innerHTML = "Géolocalisation incompatible !"
		}
	};
	
	this.show = function(p){
		if(typeof(_this.el) != "object"){
			return;
		}
		_this.el.innerHTML = "Latitude : " + position.coords.latitude;
		_this.el.innerHTML += "<br />Longitude : " + position.coords.longitude;
		var location = position.coords.latitude+","+position.coords.longitude;
		
		var img = document.createElement("img");		
		img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" +
			latlon + "&zoom=14&size=400x300&sensor=false";
		_this.el.appendChild(img);
	};
	
	this.error = function(e){
		if(typeof(_this.el) != "object"){
			return;
		}
		switch(e){
			case e.PERMISSION_DENIED:
				_this.el.innerHTML = "User denied the request for Geolocation !";
				break;
			case e.POSITION_UNAVAILABLE:
				_this.el.innerHTML = "Location information is unavailable !";
				break;
			case e.TIMEOUT:
				_this.el.innerHTML = "The request to get user location timed out !";
				break;
			case e.UNKNOWN_ERROR:
				_this.el.innerHTML = "An unknown error occurred !";
				break;			
			default :
				_this.el.innerHTML = "Erreur inconnue !";
		}
	}
	
}