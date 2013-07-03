var Jaria = {
		
	version: "20130701",
	images: "jaria/images",
	
	//*********************
	//fonctions instanciées
	//*********************
	
	init: new function(){
		
		//Gestion supplémentaires des tableaux (Array)
		Array.prototype.unset = function(v){			
			var i = this.indexOf(v);					//Supprime un élèment d'un tableau par sa valeur	
			if(i > -1){
				this.splice(i, 1);
			}
		}

	},
	
	nav: new function(){
		
		var $ = this;
		var a = navigator.userAgent;
		$.version = (a.match( /.+(?:firefox|version|pera|chrome|onqueror|msie)[\/: ]([\d.]+)/ ) || [])[1];
		$.msie = false;
		$.firefox = false;
		$.opera = false;
		$.safari = false;
		$.chrome = false;
		$.konqueror = false;	
		$.gecko = false;
		$.robot = false;
		$.other = false;
		
		if(a.indexOf("chrome") != -1){
			$.chrome=true;
			$.name = "chrome";
		}
		else if(a.indexOf("safari") != -1){
			$.safari = true;
			$.name = "safari";
		}
		else if(a.indexOf("firefox") != -1){
			$.firefox = true;
			$.name = "firefox";
		}
		else if(a.indexOf("opera") != -1){
			$.opera = true;
			$.name = "opera";
		}
		else if(a.indexOf("konqueror") != -1){
			$.konqueror = true;
			$.name = "konqueror";
		}
		else if(a.indexOf("msie") != -1){
			$.msie = true;
			$.name = "msie";
		}
		else if(a.indexOf("gecko") != -1){
			$.gecko = true;
			$.name = "gecko";
		}
		else if(a.indexOf("@") != -1 || a.indexOf("www") != -1 || a.indexOf("http:") != -1){
			$.robot = true;
			$.name = "robot";
		}
		else{
			$.other = true;
			$.name = "other";
		}
		
	},
	
	txt : new function(){
		
		var $ = this;
		
		$.isjson = function(s){					//Test le parsing JSON sur une chaine
			try{
				JSON.parse(s);					
				return true;
			}
			catch(e){
				return false;
			}			
		};
		
		$.isxml = function(o){
			try{
				(Jaria.nav.msie) ? o.xml : (new XMLSerializer()).serializeToString(o);
				return true;
			}
			catch(e){
				return false;
			}
		}
				
		$.test = function(s){
			if( typeof(s) != "string" || s == "" ){
				return false;
			}
			return true;
		};
		
		$.trim = function(s){					// supprime les espaces à gauche et à droite de la chaine de caractères
			return ( $.test(s) ) ? s.toString().replace(/(^\s*)|(\s*$)/g,'') : "";
		}
		
	},
	
	el : new function(){
		
		var $ = this;
		
		$.css = function(e, o){						//Ajoute un ou plusieurs style CSS à l'élèment par le biais d'un objet JSON
			
			for (var d in o){
				
				n = d.toString();					//nom
				v = o[d].toString();				//valeur
				v = v.toLowerCase();
				
				if(n == "float"){
					n = "cssFloat";
				}				
				if(d.indexOf("-")!=-1){					
					n = n.replace(n.substr(n.indexOf("-"), 2), n.substr(n.indexOf("-")+1, 1).toUpperCase()); 
				}				
				eval("e.style." + n + "=\"" + v + "\"");				
			}
		};
		
		$.fn = function(e){
			
			if($.gettag(e) == "input"){
				
				//Pour les champs de formulaire
				
				el.val = function(t){							//affecte et retourne la valeur
					if(typeof(t) == "string"){
						this.value = t;
					}
					return this.value;
				};
			}
			else{
				
				//Pour les autres élèment du DOM
				
				el.html = function(t){
					this.innerHTML = t.toString();
				};
				el.txt = function(t){							//ajoute un node de texte
					Jaria.el.delallchilds(this);
					Jaria.el.addtext(this, t.toString());
				};
				var b = new Array("br", "hr", "img");			//élément non conteneur
				if(b.indexOf(el.tagName.toLowerCase()) == -1){
					el.appendFirst = function(e){				//ajoute un élément en premier
						var f = this.firstChild;
						if(f){
							f.parentNode.insertBefore(e, f);
						}
						else{
							this.appendChild(e);
						}						
					};
					el.AppendBefore = function(e){				//ajoute un élèment avant
						this.parentNode.insertBefore(e, this);
					};
					el.AppendAfter = function(e){				//ajoute un élément après
						 this.parentNode.insertBefore(e, this.nextSibling);
					};					
				}
				el.remove = function(){
					this.parentNode.removeChild(this);
				};
			}
			el.css = function(o){								//affecte un ou plusieurs styles CSS par des valeurs sous forme d'objet JSON
				if($.isobject(o)){							
					Jaria.el.addcss(el, o);
				}
				else if(typeof(o) == "string" && Jaria.txt.isjson(o)){
					Jaria.el.addcss(el, JSON.parse(o));
				}
			}
		};
		
		$.isobject = function(o){
			return ( typeof(o) == "object" ) ? true : false;
		};
		
		$.test = function(e){
			if(typeof(e) == "object"){
				if(e.tagName && e.className){
					return true;
				}
			}
			if(typeof(e) == "string"){
				if(document.getElementById(e)){
					return true;
				}
			}
		};
		
		$.get = function(e){
			if(!$.test(e)){
				jaria.box.show("L'élément HTML " + (typeof(e) == "string") ? e : typeof(e) + " n'existe pas !");
				return undefined;
			}
			return (typeof(e) == "string") ? document.getElementById(e) : e;
		};
		
		$.gettag = function(e){
			return el.tagName.toString().toLowerCase();
		};
		
	},
	
	//*********************
	//fonction à instancier
	//*********************
	
	box: function(){
		
		var $ = this;
		$.txt = "";
		
		$.show = function(){
			
			if(Jaria.txt.test($.txt)){
				alert($.txt);
			}
			
		}
		
	}
	
		
};

Jaria.Ajax = function(){
	
	var $ = this;
	var txt = Jaria.txt;
	var box = new Jaria.box();
	var count = 0;
	var func = null;
	var timer = null;
	$.el = undefined;
	$.data = "";
	$.ready = false;
	$.timeout = 10000;							// timout, 10s par défaut
	$.delai = 50;								// délai de répétition du timer
	$.fc = null;								// fonction passée en paramètre
	$.format = "";								// format de retour
	$.asynchrone = true;						// transfert asynchrone
	
	$.del = function(){							// détruit l'objet Ajax
		$.el = undefined;
		$.data = "";
		$.timer = null;
		$.ready = false;		
		$.format = "text";
		func = null;
		count = 0;
	};
	
	$.isobject = function(o){
		if( typeof(o) == "object" ){
			return true;
		}
		try{
			if( typeof(eval("(" + o + ")")) == "object" ){
				return true;
			}
		}
		catch(e){
		}
		return false;
	};
	
	$.init = function(){
		if (!$.isobject($.el)){
			try{
				$.el = new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){
				try{
					$.el = new ActiveXObject("Microsoft.XMLHTTP");
				}catch(E){
					$.el = new XMLHttpRequest();
				}
			}
		}
		$.data = "";
		$.ready = false;		
	};
	
	$.todata = function(v){
		var s = "";
		if( $.isobject(v) ){
			var o = v;
			if(typeof(v) == "string"){
				o = eval("(" + v + ")");
			}
			for (var d in o){
				if( s != "" ){
					s += "&";
				}
				s += txt.trim(d) + "=" + txt.trim(o[d].toString());
			}
		}				
		return s;
	};
	
	//Ajoute les paramètres à envoyer par Ajax au serveur 
	$.adddata = function(){
		if (!$.isobject($.el)){
			$.init();
		}
		var a = arguments;
		if(a.length == 0){
			return false;
		}
		//Objet à convertir en chaine avec JSON
		if(a.length == 1){									
			$.data = $.todata(a[0]);
		}
		else{
			//Chaines à envoyées ( nom du champ, valeur du champ )
			if(a.length == 2 && !txt.test(a[0]) && !txt.test(a[1])){
				return false;
			}				
			if( Jaria.el.isobject($.el) && a.length == 2 ){				
				if( $.data != "" ){
					$.data += "&";
				}
				$.data += txt.trim(a[0].toString()) + "=" + txt.trim(a[1].toString());
			}
		}
	};

	// envoi des données par Ajax ( nom du fichier de données, méthode: post [défaut] ou get )
	$.send = function(s, m, f, t){			
		if ( !$.el || $.data == null || !txt.test(s) || $.ready == true){
			return false;
		}
		if(!txt.test(m)){
			m = "POST";
		}
		if(!txt.test(t)){
			m = "POST";
		}
		try{
			$.el.open( m.toString().toUpperCase(), s.toString(), $.asynchrone);
			$.el.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
			$.el.send($.data);
			if(typeof(f) == "function"){
				$.onready(f, t);
			}
		}
		catch(e){
			$.onerror(err.message);
		}
	};
	
	$.onready = function(){			// execute une fonction passée en paramètre si le traitement des données par Ajax est terminée
		
		if ( !$.isobject($.el) ){
			return false;
		}
		
		// arguments
		var a = arguments;
		for( var i = 0; i < a.length; i++ ){
			if( typeof(a[i]) == "function" ){
				func = a[i];
			}
			if( typeof(a[i]) == "string" && (a[i] == "text" || a[i] == "xml" || a[i] == "json") ){
				 $.format = a[i];
			}
		}			
		
		count += $.delai;
		if( count >= $.timeout ){
			// délai défini dépassé
			$.ontimeout();
			return false;
		}
		if( $.el.readyState == 4 && !$.ready ){
			if( $.el.status == 200 ){
				$.ready = true;
				window.clearTimeout(timer);
				timer = null;
				var t = $.el.responseText.toString();
				var d;
				switch($.format.toLowerCase()){
					case "json":
						d = (!txt.isjson(t)) ? "" : JSON.parse(t);
						break;
					case "xml":
						d = $.el.responseXML;
						break;
					default:
						d = t;
				}
				// appelle la fonction passé en paramètre avec le format de retour texte, xml ou json
				( typeof(func) == "function" ) ? func(d) : $.onsuccess(d);
				$.del();
			}
		}				
		timer = window.setTimeout($.onready, $.delai);			
	};
	
	// fonction de réception du traitement des données retournées par Ajax
	$.onsuccess = function(o){				
		return false;
	};
	
	// fonction appelée lors d'une erreur Ajax
	$.onerror = function(e){				
		box.error(e);
		return false;
	};	
	
	// fonction appelée en cas de dépassement du délai définie
	$.ontimeout = function(){				
		box.hide();
		box.alert("Le délai d'attente maximum de réponse du serveur évalué à " + ($.timeout / 1000).toString() + "s . est dépassé.<br><br>Veuillez réessayer.", "Délai dépassé!"); 
		// ajoute une fonction de remise à zéro du compteur du timeout de l'objet Ajax sur le bouton de la boîte de dialogue
		Jaria.nav.addevent("onclick", 
			function(){
				count = 0; 
			}, 
			box.el.BtOk
		)
		$.del();
	};
			
	//retourne le XML sou sforme de chaine
	$.xmltostring = function(o){
		var s = (Jaria.nav.msie) ? o.xml : (new XMLSerializer()).serializeToString(o);
		return s;			
	}
		
};

var oNav = Jaria.nav;
var oBox = new Jaria.box();
