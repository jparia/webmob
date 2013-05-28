var Nav = new function(){
	
	this.scrollX = 0;
	this.scrollY = 0;
	this.name = "";
	
	var a = navigator.userAgent.toLowerCase();
	if( a.indexOf("chrome") != -1 ){
		this.name = "chrome";
	}
	else if( a.indexOf("safari") != -1 ){
		this.name = "safari";
	}
	else if( a.indexOf("firefox") != -1 ){
		this.name = "firefox";
	}
	else if( a.indexOf("opera") != -1 ){
		this.name = "opera";
	}
	else if( a.indexOf("konqueror") != -1 ){
		this.name = "konqueror";
	}
	else if( a.indexOf("msie") != -1 ){
		this.name = "msie";
	}
	else if( a.indexOf("gecko") != -1 ){
		this.name = "gecko";
	}
	else if(a.indexOf("@") != -1 || a.indexOf("www") != -1 || a.indexOf("http:") != -1 ){
		this.name = "robot";
	}
	else{
		this.name = "other";
	};
	
	this.scroll = function(){
	
		if( this.name == "msie" || this.name == "opera" ){
			this.scrollX = document.documentElement.scrollLeft;
			this.scrollY = document.documentElement.scrollTop;
		}
		else{
			this.scrollX = window.scrollX;
			this.scrollY = window.scrollY;
		}
	};
	
	this.popup = new function(){
		
		var _this = this;
		this.count = 0;
		this.delai = 3;
		this.timer = undefined;
		this.popup = undefined;
		
		this.wait = function(){
			_this.count ++;
			_this.show("La fenêtre popup s'ouvrira dans " + (_this.delai - _this.count) + " s", "#333");
			if (_this.count == _this.delai) {
				_this.open();			
			}
		};
		
		this.show = function(text, color){
			var el = El.get("wait");
			var span = El.create("span");		
			El.removeAll(el);		
			span.style.fontWeight = "bold";
			span.style.color = color;
			El.addtext(span, text);
			el.appendChild(span);
		};
		
		this.open = function(){		
			window.clearInterval(_this.timer);
			_this.count = 0;
			_this.timer = undefined;
			_this.popup = window.open("popup.html", "popup", "width=250,height=250");
			_this.popup.focus();
			if(_this.popup.name == undefined){
				_this.show("Impossible d'ouvrir la fenêtre popup !", "#c00");
			}else{
				_this.show("Fenêtre popup ouverte", "#060");
				_this.timer = window.setInterval(_this.verify, 10);
			}
			
		};
		
		this.verify = function(){
			if(_this.popup.name == ""){
				window.clearInterval(_this.timer);
				_this.timer = undefined;
				_this.popup = undefined; 
				_this.show("Fenêtre popup fermée", "#333")
			}
		};
	}
}


var El = new function(){
	this.get = function(id){
		if(document.getElementById(id)){
			return document.getElementById(id);			
		}
		return undefined;
	};
	this.test = function(id){
		if(document.getElementById(id)){
			return true;			
		}
		return false;
	};
	this.create = function(name){
		return document.createElement(name);
	};
	
	this.text = function(txt){
		return document.createTextNode(txt);
	};
	
	this.addtext = function(el, txt){
		el.appendChild(this.text(txt));
	};
	
	this.removeAll = function(el){
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}
	};
	
	this.getSelection = function(){
		if(window.getSelections){
			return window.getSelection().toString();
		}
		else if(document.getSelection){
			return document.getSelection().toString();
		}
		else if(document.selection){
			return document.selection.createRange().text;
		}
		return "";
	};
	
	this.drag = function(){
		
		var _this = this;
		this.el = undefined;
		this.onDrag = false;
		this.startDrag = false;
		this.posX = 0;
		this.posY = 0;
		
		this.init = function(id){
			if(!El.test(id)){
				return false;
			}
			this.el = El.get(id);
			this.el.style.position = "absolute";
			this.el.style.zIndex = "1";
			this.el.style.left = _this.el.offsetLeft + "px";
			this.el.style.top = _this.el.offsetTop + "px";
			this.el.style.cursor = "move";
			this.el.onmousedown = this.start;
			this.el.onmouseup = this.stop;
			this.el.onmousemove = this.move;
		};
		
		this.move = function(evt){
			if (!_this.startDrag){
				return false;
			}
			if (!evt){
				evt = window.event;
			}
			if (!_this.onDrag){
				_this.posX = evt.clientX - _this.el.offsetLeft;
				_this.posY = evt.clientY - _this.el.offsetTop;
			}
			_this.onDrag = true;
			_this.el.style.zIndex = "2";
			_this.el.style.opacity = "0.8";
			var le = _this.el.offsetLeft;
			var te = _this.el.offsetTop;
			var we = _this.el.offsetWidth;
			var he = _this.el.offsetHeight;
			var ls = evt.clientX;
			var ts = evt.clientY;
			var ld = _this.posX;
			var td = _this.posY;
			
			_this.el.style.left = (parseInt(ls) - parseInt(ld)).toString() + "px";
			_this.el.style.top = (parseInt(ts) - parseInt(td)).toString() + "px";
		};
		
		this.start = function(){
			_this.startDrag = true;
		};
		
		this.stop = function(){
			_this.startDrag = false;
			_this.onDrag = false;
			_this.el.style.zIndex = "1";
			_this.el.style.opacity = "1";
		};
	}
		
}


var Editor = new function(){
	
	var _this = this;
	this.el = undefined;
	this.html = undefined;
	
	this.addButton = function(txt, func){
		var a = El.create("a");
		a.href = "#";
		a.style.styleFloat = "left";
		a.style.margin = "5px";
		El.addtext(a, txt);
		a.onclick = func;
		this.el.parentNode.insertBefore(a, this.el);
	};
	
	this.addBalise = function(balise){
		var deb = _this.el.selectionStart;
		var end = _this.el.selectionEnd;
		var t = _this.el.value.substring(0, deb);
		t += "<" + balise + ">"
		t +=  _this.el.value.substring(deb, end);
		t += "</" + balise + ">";
		t +=  _this.el.value.substring(end, _this.el.value.length);
		_this.el.value = t;	
		_this.show();
	};
	
	this.style = function(el){
		el.style.width = "500px";
		el.style.height = "200px";
		el.style.border = "1px solid #333";
		el.style.padding = "3px";
		el.style.margin = "10px";
		if(Nav.name == "msie" || Nav.name == "opera" ){
			el.style.styleFloat = "left";
		}else{
			el.style.float = "left";
		}		
		el.style.borderRadius = "5px";
	};
	
	this.init = function(id){
		if(! El.test(id)){
			return false;
		}
		this.el = El.get(id);
		this.style(this.el);
		this.html = El.create("div");
		this.html.style.backgroundColor = "#f1f1f1";
		this.style(this.html);		
		this.el.parentNode.insertBefore(this.html, this.el.nextSibling);
		this.addButton("Bold", function(){
			_this.addBalise("b");
			return false;
		});
		this.addButton("Italic", function(){
			_this.addBalise("i");
			return false;
		});
		this.addButton("Underline", function(){
			_this.addBalise("u");
			return false;
		});
		
		var br = El.create("br");
		br.style.clear = "both";
		this.el.parentNode.insertBefore(br, this.el);
		
		this.show = function(){
			_this.html.innerHTML =  this.el.value.replace(/\n/g, "<br />");
		};
		
		this.el.onkeyup = function(){			
			_this.show();				
		}		
	}
}

var Storage = new function(){
	
	this.get = function(key){
		return localStorage.getItem(key);
	};
	this.set = function(key, value){
		localStorage.setItem(key, value);
	};
	this.clear = function(){
		localStorage.clear();
	};
	this.reset = function(key){
		localStorage.removeItem(key);
	};
	
}

var Geolocation = new function(){
	
	_this = this;
	this.position = undefined;
	this.latitude = "";
	this.longitude = "";
	this.error = "";
	
	this.init = function(){
		if(!navigator.geolocation){
			return false;
		}
		navigator.geolocation.getCurrentPosition(_this.onSuccess, _this.onError);
		return true;
	};
	
	this.finaly = function(){
		//A redéfinir avant initialisation pour executer un traitement local
	};
	
	this.onSuccess = function(p){
		_this.latitude = p.coords.latitude;
		_this.longitude = p.coords.longitude;
		_this.finaly();
	};	
	
	this.onError = function(e){
		switch(e){
			case e.PERMISSION_DENIED:
				_this.error = "User denied the request for Geolocation !";
				break;
			case e.POSITION_UNAVAILABLE:
				_this.error = "Location information is unavailable !";
				break;
			case e.TIMEOUT:
				_this.error = "The request to get user location timed out !";
				break;
			case e.UNKNOWN_ERROR:
				_this.error = "An unknown error occurred !";
				break;			
			default :
				_this.error = "";
		}
	};
	
}

window.onscroll = function(){
	Nav.scroll();
}