var Jaria = {
		
	version: "20130701",
	images: "jaria/images",
	
	//*********************
	//fonctions instanciées
	//*********************
	
	//Fonctions diverses appelées avant le chargement du DOM
	init: function($){
		
		//Supprime un élèment d'un tableau par sa valeur
		Array.prototype.unset = function(v){
			var i = this.indexOf(v);			
			if(i > -1){
				this.splice(i, 1);
			}
		}
		
		$.nav.addevent("onscroll", $.nav.scroll);			//Au déplacement des ascenseurs de la fenêtre du navigateur
		$.nav.addevent("onresize", $.nav.size);				//Au redimentonnement de la fenêtre du navigateur
		$.nav.addevent("onmousemove", $.nav.mouse.move);	//Au déplacement de la souris
		$.nav.addevent("onkeydown", $.nav.keydown);	
		//window.onload = oNav.load;						// après chargement du document

	},
	
	//Fonctions des chaines de caractères
	txt: new function(){
		
		var $ = this;
		
		//Test le parsing JSON sur une chaine
		$.isjson = function(s){
			try{
				JSON.parse(s);					
				return true;
			}
			catch(e){
				return false;
			}			
		};
		
		//Test la chaine XML
		$.isxml = function(o){
			try{
				(Jaria.nav.msie) ? o.xml : (new XMLSerializer()).serializeToString(o);
				return true;
			}
			catch(e){
				return false;
			}
		}
		
		//Test la chaine		
		$.test = function(s){
			if( typeof(s) != "string" || s == "" ){
				return false;
			}
			return true;
		};
		
		//Supprime les espaces avant et après la chaine
		$.trim = function(s){
			return ( $.test(s) ) ? s.toString().replace(/(^\s*)|(\s*$)/g,'') : "";
		};
		
		//Tout en majuscule
		this.upper = function(s){				
			return ( this.test(s) ) ? s.toString().toUpperCase() : "";
		};
		
		//Tout en minuscule
		this.lower = function(s){				
			return ( this.test(s) ) ? s.toString().toLowerCase() : "";
		};
		
	},
	
	//Fonctions du navigateur
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
		$.screenX = 0;
		$.screenY = 0;
		$.scrollX = 0;
		$.scrollY = 0;
		$.mouseX = 0;
		$.mouseY = 0;
		
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
		
		//Retourne le paramètre passé dans l'url par sa position à partir de 0
		$.param = function(n){
			if( isNaN(n) ){
				return "";
			}
			var p = (location.search).toString();
			if( p == "" || n < 0 ){
				return "";
			}
			p = p.split("&");
			if( p[n] == null ){
				return "";
			}
			p = new String(p[n]);
			p = p.toString().split("=");
			if( p[1] == null ){
				return "";
			}
			return unescape((p[1]).toString());			
		};
		
		//Obtient les dimensions de la fenêtre du navigateur
		$.size = function(){
			
			if( typeof(window.innerHeight) == "number" ){
				$.screenY = window.innerHeight;
			}
			else if( document.documentElement && document.documentElement.clientHeight ){
				$.screenY=document.documentElement.clientHeight;
			}
			else if( oNav.body && oNav.body.clientHeight ){
				$.screenY = oNav.body.clientHeight;
			}
			if( typeof(window.innerWidth) == "number"){
				$.screenX = window.innerWidth;
			}
			else if( document.documentElement && document.documentElement.clientWidth ){
				$.screenX = document.documentElement.clientWidth;
			}
			else if( oNav.body && oNav.body.clientWidth ){
				$.screenX = oNav.body.clientWidth;
			}
			
			/*if($.lock.exist){
				$.lock.el.style.width = Jaria.txt.toPx(oNav.screenX);
				$.lock.el.style.height = Jaria.txt.toPx(oNav.screenY );		
				$.lock.setText();	
			}*/
		};
			
		//Obtient la position des ascenseurs du navigateur
		$.scroll = function(){
			if( $.msie || $.opera ){
				// ! la balise doctype doit être présente dans le document html 
				$.scrollX = (parseFloat(oNav.version) < 6 ) ? document.body.scrollLeft : document.documentElement.scrollLeft;
				$.scrollY = (parseFloat(oNav.version) < 6 ) ? document.body.scrollTop : document.documentElement.scrollTop;
			}else{
				$.scrollX = window.scrollX;
				$.scrollY = window.scrollY;
			}
			
			
			/*if( $.trace.box.exist ){
				$.trace.pos();
			}
			if( $.lock.exist ){
				// positionnement du lock
				$.lock.el.style.left = oText.toPx(oNav.scrollX);
				$.lock.el.style.top = oText.toPx(oNav.scrollY);			
			}*/
			
		};
		
		//Obtient l'abscisse et l'ordonnée de la position de la souris
		$.mouse = new function(){
			this.move = function(e){
				e = e || window.event;
				Jaria.nav.mouseX = parseInt(e.clientX);
				Jaria.nav.mouseY = parseInt(e.clientY);
			}
		};
		
		//Appelle les fonctions sur évènements du clavier
		this.keydown = function(event){					
			$.keyb.esc(event);
			$.keyb.enter(event);
		};
		
		//Fonctions sur évènement clavier
		$.keyb = new function(e){
			
			var $ = this;
			
			// sur la touche échape [escape]
			$.esc = function(e){						
				e = e || window.event;
				// cache l'éventuelle boîte de dialogue
				if( e.keyCode == 27 ){
					oNav.hideallbox(true);
				}
			};
			
			// sur la touche entrer [enter]
			$.enter = function(e){					
				var el = Jaria.el.getevent(e);
				if(!Jaria.el.test(el)){
					return false;
				}
				// execute un traitement sur la touche Enter et sur l'élément ayant la classe jaria_enter
				if(e.keyCode == 13 && el.className.indexOf("jaria_enter") != -1){
					if(el.value &&  Jaria.txt.trim(el.value) == ""){						
						Jaria.nav.keyb.annul(el);
						return false;
					}														
					Jaria.nav.keyb.valid(el);
				}
			};
			
			//Action de validation sur un évènement du clavier
			$.valid = function(){			
				return false;
			};
			
			//Action d'annulation sur un évènement du clavier
			$.annul = function(){		
				return false;
			};
		};
		
		//Limite la propagation de l'évènement à l'élèment
		$.stopevent = function(event){		
			if( event.stopPropagation ){
				event.stopPropagation();
			}
			else{
				event.cancelBubble = true;
			}
		};
		
		$.getevent = function(s, e){
			if(!Jaria.el.test(e)){
				e = (s.indexOf("scroll") != -1 || s.indexOf("load") != -1 || s.indexOf("resize") != -1) ? window : document;
			}
			return e;
		};
		
		//Permet l'ajout de fonctions sur un évènement
		$.addevent = function(s, f, e){
			
			/*
				s : obligatoire:			nom de l'évènement
				f : obligatoire:			la fonction à ajouter
				e : facultatif:				l'élément
			*/
			
			if(!Jaria.txt.test(s)) {
				return false;
			}
			
			$.delevent(s, f, e);
			
			if(typeof(f) != "function"){
				return false;
			}
			
			e = $.getevent(s, e);
			
			try{
				e.attachEvent(s, f);
			}catch(e){
				try{
					s = s.replace("on", "");
					e.addEventListener(s, f, false);
				}catch(E){
					return false;
				}
			}
			return true;
		};
		
		//Supprime une fonction d'un évènement		
		$.delevent = function(s, f, e){
			
			/*
				s : obligatoire		nom de l'évènement
				f : obligatoire:	la fonction à ajouter
				e : facultatif:		l'élément
			*/

			if(!Jaria.txt.test(s)) {
				return false;
			}
			
			if(typeof(f) != "function"){
				return false;
			}
			
			e = $.getevent(s, e);
			
			try{
				e.detachEvent(s, f);
			}catch(e){
				try{
					s = s.toString().replace("on", "");
					e.removeEventListener(s , f, false);
				}catch(e){
					alert(e.message);
					return false;
				}
			}
			return true;
		};
	
	},
	
	//Fonctions des éléments du DOM
	el: new function(){
		
		var $ = this;
		
		//Ajoute un ou plusieurs style CSS à l'élèment par le biais d'un objet JSON
		$.css = function(e, o){
			
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
				
				e.val = function(t){							//affecte et retourne la valeur
					if(typeof(t) == "string"){
						this.value = t;
					}
					return this.value;
				};
			}
			else{
				
				//Pour les autres élèment du DOM
				
				e.html = function(t){
					this.innerHTML = t.toString();
				};
				e.txt = function(t){							//ajoute un node de texte
					Jaria.el.delallchilds(this);
					Jaria.el.addtext(this, t.toString());
				};
				var b = new Array("br", "hr", "img");			//élément non conteneur
				if(b.indexOf(e.tagName.toLowerCase()) == -1){
					e.appendFirst = function(e){				//ajoute un élément en premier
						var f = this.firstChild;
						if(f){
							f.parentNode.insertBefore(e, f);
						}
						else{
							this.appendChild(e);
						}						
					};
					e.AppendBefore = function(e){				//ajoute un élèment avant
						this.parentNode.insertBefore(e, this);
					};
					e.AppendAfter = function(e){				//ajoute un élément après
						 this.parentNode.insertBefore(e, this.nextSibling);
					};					
				}
				e.remove = function(){
					this.parentNode.removeChild(this);
				};
			}
			e.css = function(o){								//affecte un ou plusieurs styles CSS par des valeurs sous forme d'objet JSON
				if($.isobject(o)){							
					Jaria.el.addcss(el, o);
				}
				else if(typeof(o) == "string" && Jaria.txt.isjson(o)){
					Jaria.el.addcss(el, JSON.parse(o));
				}
			}
		};
		
		//test l'objet
		$.isobject = function(o){
			return ( typeof(o) == "object" ) ? true : false;
		};
		
		//Test un élément		
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
		
		//Retourne l'élement
		$.get = function(e){
			if(!$.test(e)){
				jaria.box.show("L'élément HTML " + (typeof(e) == "string") ? e : typeof(e) + " n'existe pas !");
				return undefined;
			}
			e = (typeof(e) == "string") ? document.getElementById(e) : e;
			$.fn(e);
			return e;
		};
		
		//Retourne le nom de l'élément
		$.gettag = function(e){
			return e.tagName.toString().toLowerCase();
		};
		
		$.getevent = function(e){
			if( $.test(e) ){
				return e;
			}
			if( $.isobject(e) && e.type != undefined ){
				return e || window.event;
			}
			return undefined;
		};
		
	},
	
	//*********************
	//fonction à instancier
	//*********************
	
	//Boite de dialogue personnalisée
	box: function(){
		
		var $ = this;
		$.txt = "";
		
		$.show = function(){
			
			if(Jaria.txt.test($.txt)){
				alert($.txt);
			}
			
		}
		
	},
	
	//Fonction Ajax
	ajax: function(){
	
		var $ = this;
		var txt = Jaria.txt;
		var box = new Jaria.box();
		var count = 0;
		var func = null;
		var timer = null;
		var format = "";
		var data = "";
		$.el = undefined;		
		$.ready = false;
		$.timeout = 10000;							// timout, 10s par défaut
		$.delai = 50;								// délai de répétition du timer
		$.asynchrone = true;						// transfert asynchrone
		
		// détruit l'objet Ajax
		$.del = function(){
			$.el = undefined;
			data = "";
			$.timer = null;
			$.ready = false;		
			format = "";
			func = null;
			count = 0;
		};
		
		//Test l'objet ou la chaine représentant un objet
		$.isobject = function(o){
			if( typeof(o) == "object" ){
				return true;
			}
			try{
				if( typeof(eval("(" + o + ")")) == "object" ){
					return true;
				}
			}catch(e){}
			return false;
		};
		
		//Initialise l'objet Ajax
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
			data = "";
			$.ready = false;		
		};
		
		//Converti un objet JSON en url
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
			//Objet JSON à convertir en chaine
			if(a.length == 1){									
				data = $.todata(a[0]);
			}
			else{
				//Chaines à envoyées ( nom du champ, valeur du champ )
				if(a.length == 2 && !txt.test(a[0]) && !txt.test(a[1])){
					return false;
				}				
				if( Jaria.el.isobject($.el) && a.length == 2 ){				
					if( data != "" ){
						data += "&";
					}
					data += txt.trim(a[0].toString()) + "=" + txt.trim(a[1].toString());
				}
			}
		};
	
		//Envoi des données par Ajax ( nom du fichier de données, méthode: post [défaut] ou get )
		$.send = function(s, m, t, f){			
			if ( !$.el || data == null || !txt.test(s) || $.ready == true){
				return false;
			}
			if(!txt.test(m)){
				m = "POST";
			}
			if(!txt.test(t)){
				t = "TEXT";
			}
			if(m == "GET"){
				s = s + "?" + data;
			}
			try{
				$.el.open( m.toString().toUpperCase(), s, $.asynchrone);
				$.el.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
				$.el.send(data);
				if(typeof(f) == "function"){
					$.onready(f, t);
				}
			}
			catch(e){
				$.onerror(e.message);
			}
		};
		
		//Execute une fonction passée en paramètre lorsque le traitement Ajax est terminée
		$.onready = function(){
			
			if ( !$.isobject($.el) ){
				return false;
			}
			
			// arguments
			var a = arguments;
			for( var i = 0; i < a.length; i++ ){
				if( typeof(a[i]) == "function" ){
					func = a[i];
				}
				if( typeof(a[i]) == "string"){
				 	format = a[i].toUpperCase();
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
					switch(format.toUpperCase()){
						case "JSON":
							d = (!txt.isjson(t)) ? "" : JSON.parse(t);
							break;
						case "XML":
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
		
		//Fonction de réception du traitement des données retournées par Ajax
		$.onsuccess = function(o){
			return false;
		};
		
		//Fonction appelée lors d'une erreur Ajax
		$.onerror = function(e){
			box.txt = e;		
			box.show();
			return false;
		};	
		
		//Fonction appelée en cas de dépassement du délai d'attente définie
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
				
		//Retourne le XML sous forme de chaine
		$.xmltostring = function(o){
			var s = (Jaria.nav.msie) ? o.xml : (new XMLSerializer()).serializeToString(o);
			return s;			
		}
			
	}
	
};

//Fonctions externe
//Jaria.datepicker = function(){};

Jaria.init(Jaria);


//Ancien objets dépréciés
var oNav = Jaria.nav;
var oBox = new Jaria.box();
var oAjax = new Jaria.ajax();
