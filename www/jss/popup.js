var Popup = new function(){
		
	var _this = this;
	var timer = undefined;
	var count = 5;
		
	this.close = function(){
		_this.show();
		timer = window.setInterval(_this.onclose, 1000);	
	};

	this.onclose = function(){
		count--;
		if (count <= 0){			
			window.clearInterval(timer);
			_this.final();
			return false;
		}
		_this.show();		
	};
	
	this.show = function(){
		El.get("info").innerHTML =  "La popup se fermera dans : " + count + "s";
	};
	
	this.final = function(){
		window.close();
	};
	
}
