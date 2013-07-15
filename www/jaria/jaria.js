	/*	Librairie JS JARIA
		Copyright (c) 2008 Jean-Pierre ARIA (jaria.free.fr)
		sources développeur */
		
	var jaria = new function(){					// paramètres globaux à la bilbiothèque
		
		//OK
		this.version = "20130629";				// Date au format AAAAMMJJ de la version de la bibliothèque
		
		//OK remplacé par path
		this.images = "jaria/images/";			// Chemin des images
	};
	
	var oText = new function(){								// Gestion des textes (string)
	
		//OK
		this.test = function(s){
			// argument 0: string		facultatif
			return ( typeof(s) == "string" && s != "" ) ? true : false;
		};
		
		//OK
		this.select = function(b, o){
			/*
				argument 0: boolean		obligatoire
				argument 1: object		facultatif
			*/
			if( typeof(b) != "boolean"){
				return false;
			}
			el = ( oEl.test(o) ) ? oEl.get(o) : document;
			if( typeof(el.onselectstart) != "undefined" ){				
				el.onselectstart = function(){
					return b;
				};
			}
			else{
				el.onmousedown = function(){
					return b;
				};
			}			
		};
		
		//OK
		this.left = function(s, n){			
			if (parseFloat(n) <= 0){
			    return "";
			}
			var t = (s).toString();
			return (n > t.length) ? t : t.substring(0, n);
		};
		
		//OK
		this.right = function(s, n){			
		    if (parseFloat(n) <= 0){
		       return "";
		    }
		    var t = (s).toString();
				var l = t.length;
		    return (n > t.length) ? t : (t).substring(l, l - n);
		};
		
		//OK
		this.upper = function(s){				// tout en majuscule
			return ( this.test(s) ) ? s.toString().toUpperCase() : "";
		};
		
		//OK
		this.lower = function(s){				// tout en minuscule
			return ( this.test(s) ) ? s.toString().toLowerCase() : "";
		};
		
		//OK
		this.firstUp = function(s){				// première lettre en majuscule et le reste en minuscule
			return ( this.test(s) ) ? s.toString().substr(0, 1).toUpperCase() + s.toString().substr(1, s.length).toLowerCase() : "";
		};
		
		//OK
		this.trim = function(s){					// supprime ldes espaces à gauche et à droite de la chaine de caractères
			return ( this.test(s) ) ? s.toString().replace(/(^\s*)|(\s*$)/g,'') : "";
		};
		
		//OK
		this.digit = function(){			// complète le nombre de x zéro à gauche
			/*
				argument 0: obligatoire		texte ou number
				argument 1: obligatoire		number
			*/
			var t = ( this.test(arguments[0]) || !isNaN(arguments[0]) ) ? arguments[0].toString() : "";
			var nb = ( !isNaN(arguments[1]) ) ? arguments[1] : 0;
			var zero = "";
			for( var i = 0; i < (parseInt(nb) - t.length); i++ ){
				zero += "0";
			}
			return ( t.length < nb ) ? zero + t : t;
		};
		
		this.round = function(n, p){
			if( isNaN(n) || isNaN(p) ){
				return "0";
			}
			var m = Math.pow(10, parseFloat(p));
			n = parseFloat(n) * m;
			n = ( Math.round(parseFloat(n)) == Math.ceil(parseFloat(n)) ) ? Math.ceil(parseFloat(n)) : Math.ceil(parseFloat(n)) - 1;
			n = parseFloat(n) / m;
			if( isNaN(n) ){
				return "0";
			}			
			return (n).toString();
		};
			
		this.daymonth = function(n){				// retourne le jour ou le mois sur 2 caractères en complètant par un zéro
			return ( n.toString().length == 1 ) ? "0" + n.toString() : n.toString();
		};
		
		//OK
		this.isemail = function(t){					// contrÃ´le le format email
			var e = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+([\.][a-z]+)+$/;
			return ( this.test(t) && t.search(e) != -1 ) ? true : false;
		};
		
		//OK
		this.isphone = function(t, s){				// contrÃ´le le format téléphone
			var e = "";
			switch(s){
				case null :								// accepte tous les séparateurs ou aucun
					e = /^0[1-68]([-. ]?[0-9]{2}){4}$/;				//var e = /^([+][0-9]{1,3}|0)[1-68][-. ]?(?:[0-9]{2,3}[-. ]?){3,4}$/;
					break;
				case "." :								// oblige le séparateur [.]
					e = /^0[1-68](\.[0-9]{2}){4}$/;
					break;					
				case "-" :								// oblige le séparateur [-]
					e = /^0[1-68]([-][0-9]{2}){4}$/;
					break;
				case " " :								// oblige le séparateur  espace
					e = /^0[1-68]([ ][0-9]{2}){4}$/;
					break;
				default :								// n'accepte aucun séparateur
					e = /^0[1-68][0-9]{8}$/;
			}
			return ( t.search(e) != -1 ) ? true : false;
		};
		
		//OK
		this.isnumss = function(s){
			var e = /^[12][ \.\-]?[0-9]{2}[ \.\-]?(0[1-9]|[1][0-2])[ \.\-]?([0-9]{2}|2A|2B)[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{2}$/;
			return ( this.test(s) && s.search(e) != -1 ) ? true : false;
		};
		
		//OK
		this.isjson = function(s){					//Test le parsing JSON sur une chaine
			try{
				JSON.parse(s);					
				return true;
			}
			catch(e){
				return false;
			}			
		};
		
		//OK
		this.nocarspec = function(s){				// return vrai si le texte ne contient pas de caractères spéciaux
			if( !this.test(s) ) {
				return "";
			}
			if( this.trim(s) != "" ){
				var reg = /^[@.,éèëàîïùôç'()_ a-zA-Z0-9-]+$/;
				if(s.search(reg) == 0){
					return true;
				}else{
					return false;
				}
			}
		};
		
		//OK
		this.toPx = function(){							// retourne la valeur en pixels
			var value = parseFloat(arguments[0]);
			if( isNaN(value) || value <= 0 ){
				return "0px";
			}
			return (parseInt(value)).toString() + "px";
		};
		
		//OK
		this.repeat = function(t, n){					// répète un texte x fois
			return new Array( n + 1 ).join( t );
		};
		
		//OK
		this.pluriel = function(t, n){
			if (n <= 1){
				return t;	
			}
			var c = "s";
			t = oText.trim(t);
			if (t == ""){
				return "";
			}
			l = oText.lower(t);
			if (l.slice(-2) == "ou" && (l == "genou" || l == "caillou" || l == "bijou" || l == "chou" || l == "pou" || l == "hibou" || l == "joujou")){
				c = "x";
			}
			if (l.slice(-3) == "ail" && (l == "bail" || l == "corail" || l == "soupirail" || l == "travail" || l == "vantail" || l == "vitrail")){
				t = t.substr(0, t.length - 3) + "aux";
				c = "";
			}
			if (l.slice(-2) == "al"){
				if (l != "bal" && l != "cal" && l != "carnaval" && l != "cérémonial" && l != "chacal" && l != "festival" && l != "récital" && l != "régal"){
					t = t.substr(0, t.length - 2) + "aux";
					c = "";
				}
			}
			if (l.slice(-2) == "eu" && l != "bleu" && l != "pneu" && l != "émeu"){
				c = "x";
			}
			if (l.slice(-2) == "au" && l != "landau" && l != "sarrau"){
				c = "x";
			}
			return t + c;
		};
		
		this.ascii = new Array("\"","%","&&"," & ","& ","Â","Ã","Ä","Æ","È","É","Ê","Ë","Î","Ï","Ì","Í","Ô","Õ","Ò","Ó","Ö","Û","Ù","Ú","Ü","Ý","à","â","ã","ä","æ","ç","é","è","ê","ë","€","î","ï","ì","í","ô","õ","ò","ó","ö","ù","û","ù","ú","ü","ÿ","©","®","×","œ","¡","¢","¤","¦","§","¨","ª","¬","¯","°","±","²","³","´","µ","¶","·","¸","¹","º","¼","½","¾","¿","Þ","ß","Ð","Ñ","ñ","÷","Ø","«","»","£");
		
		this.html =  new Array("&quot;","&#37;","&amp;&amp;"," &amp; ","&amp; ","&Acirc;","&Atilde;","&Auml;","&AElig;","&Egrave;","&Eacute;","&Ecric;","&Euml;","&Icirc;","&Iuml;","&Igrave;","&Iacute;","&Ocirc;","&Otilde;","&Ograve;","&Oacute;","&Ouml;","&Ucirc;","&Ugrave;","&Uacute;","&Uuml;","&Yacute;","&agrave;","&acirc;","&atilde;","&auml;","&aelig;","&ccedil;","&eacute;","&egrave;","&ecirc;","&euml;","&euro;","&icirc;","&iuml;","&igrave;","&iacute;","&ocirc;",	"&otilde;",	"&ograve;","&oacute;","&ouml;","&ugrave;","&ucirc;","&ugrave;","&uacute;","&uuml;","&yuml;","&copy;","&reg;","&times;","&oelig;","&iexcl;",	"&cent;","&curren;","&brvbar;","&sect;","&uml;","&ordf;","&not;","&masr;","&deg;","&plusmn;","&sup2;","&sup3;","&acute;","&micro;","&para;","&middot;","&cedil;","&sup1;","&ordm;","&frac14;","&frac12;","&frac34;","&iquest;","&thorn;","&szlig;","&eth;","&Ntilde;","&ntilde;","&divide;","&oslash;","&laquo;","&raquo;","&pound;");			
		
		this.xmlencode = function(t){
			if( !this.test(t) ) {
				return "";
			}
			var c, r, x;
			for ( var i = 127; i <= 255; i++ ){
				c = String.fromCharCode(i).toString();
				r = new RegExp(c, "g");
				x = "&#" + (i).toString() + ";";
				t = t.replace(r, x);
			}
			return t;					
		};
		
		this.xmldecode = function(x){
			if( !this.test(x) ) {
				return "";
			}
			var c, r, t;
			for ( var i = 127; i <= 255; i++ ){
				c = "&#" + (i).toString() + ";";
				r = new RegExp(c, "g");
				t = String.fromCharCode(i).toString();
				x = x.replace(r, t);
			}
			return x;			
		};
		
		this.encode = function(s){					// encode les caractères spéciaux hors balises html
			if( !this.test(s) ) {
				return "";
			}
			s = s.toString();
			for( var i = 0; i < this.ascii.length; i++ ){
				if( s.indexOf(this.ascii[i]) != -1 ){
					var r = new RegExp(this.ascii[i], "g");
					s = s.replace(r, this.html[i]);
				}
			}
			return (s).toString();			
		};

		this.decode  = function(s){					// décode les caractères spéciaux hors balises html
			if( !this.test(s) ) {
				return "";
			}
			s = s.toString();
			for( var i = 0; i < this.html.length; i++ ){
				if( s.indexOf(this.html[i]) != -1 ){
					var r = new RegExp(this.html[i], "g");
					s = s.replace(r, this.ascii[i]);
				}
			}
			return (s).toString();
		};

		this.htmlencode = function(s){				// encode les caractères spéciaux y compris les balises html
			if( !this.test(s) ) {
				return "";
			}
			s = this.encode(s.toString());
			s = s.replace(/</g,"&lt;");
			s = s.replace(/>/g,"&gt;");
			return s;
		};
		
		this.htmldecode = function(s){				// décode les caractères spéciaux y compris les balises html
			if( !this.test(s) ) {
				return "";
			}
			s = s.replace(/&lt;/g,"<");
			s = s.replace(/&gt;/g,">");
			s = this.decode(s.toString());
			return s;
		};
		
		//OK
		this.filename = function(p){				// retourne le nom du fichier à partir de son chemin complet
			if( !this.test(p) ) {
				return "";
			}
			var n = this.filefullname(p);
			var pos = n.toString().lastIndexOf(".");
			if( pos == -1 ){
				return n;
			}
			return n.substr(0 , pos);
		};
		
		//OK
		this.filefullname = function(p){			// retourne le nom du fichier avec son extension à partir de son chemin complet
			if( !this.test(p) ) {
				return "";
			}	
			var n = p.toString().lastIndexOf("/");
			if( n == -1 ){
				return p;
			}
			return p.substr(n + 1, p.length);
		};

		//OK
		this.filepath = function(p){				// retourne le nom du chemin à partir du chemin complet d'un fichier
			if( !this.test(p) ) {
				return "";
			}
			var n = p.toString().lastIndexOf("/");
			if( n == -1 ){
				return p;
			}
			return p.substr(0, n + 1);
		};
		
		//OK
		this.build = new function(){				//construction d'une chaine à l'aide d'un tableau
			
			this.strings = new Array("");
			
			this.append = function(t){
				this.strings.push(t);
			};
			
			this.clear = function(){
				 this.strings.length = 1;
			};
			
			this.tostring = function(){
				return this.strings.join("");				
			};			
		};
		
	};
	
	//OK
	if(!Array.indexOf){									//Redéfinie la methode indexOf pour les anciens IE
		Array.prototype.indexOf = function(o){
			for(var i = 0; i < this.length; i++){
				if(this[i] == o){
				return i;
				}
			}
			return -1;
		}
	}
	
	var oNav = new function(){						// fonctions de base du navigateur
	
		this.screenX = 0;
		this.screenY = 0;
		this.scrollX = 0;	
		this.scrollY = 0;
		this.marginLeft = 0;
		this.marginRight = 0;
		this.marginTop = 0;
		this.marginBottom = 0;
		this.msie = false;
		this.firefox = false;
		this.opera = false;
		this.safari = false;
		this.chrome = false;
		this.konqueror = false;	
		this.gecko = false;
		this.robot = false;
		this.other = false;	
		this.host = oText.lower(window.location.host);
		this.version = "";
		this.body = null;
		this.location = null;
		this.timer = null;
		this.ready = false;						// chargement document terminée
		this.readyfull = false;				// chargement document terminée y compris le préchargement des images
		this.inload = false;					// lot d'images en cours de chargement
		
		//OK
		this.type = function(){
			var n = oNav;
			var s = oText.lower(navigator.userAgent);
			n.version = (s.match( /.+(?:firefox|version|pera|chrome|onqueror|msie)[\/: ]([\d.]+)/ ) || [])[1];
			if( s.indexOf("chrome") != -1 ){
				n.chrome = true;
				n.name = "chrome";
			}
			else if( s.indexOf("safari") != -1 ){
				n.safari = true;
				n.name = "safari";
			}
			else if( s.indexOf("firefox") != -1 ){
				n.firefox = true;
				n.name = "firefox";
			}
			else if( s.indexOf("opera") != -1 ){
				n.opera = true;
				n.name = "opera";
			}
			else if( s.indexOf("konqueror") != -1 ){
				n.konqueror = true;
				n.name = "konqueror";
			}
			else if( s.indexOf("msie") != -1 ){
				n.msie = true;
				n.name = "msie";
			}
			else if( s.indexOf("gecko") != -1 ){
				n.gecko = true;
				n.name = "gecko";
			}
			else if(s.indexOf("@") != -1 || s.indexOf("www") != -1 || s.indexOf("http:") != -1 ){
				n.robot = true;
				n.name = "robot";
			}
			else{
				n.other = true;
				n.name = "other";
			}
		};
		
		//OK
		this.param = function(n){						// retourne le paramètre passé dans l'url par sa position à partir de 0
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
			p = p.split("=");
			if( p[1] == null ){
				return "";
			}
			return unescape((p[1]).toString());			
		};
		
		//OK
		this.loadimage = new function(){
			
			var _this = this;
			
			this.el = undefined;						// fenêtre de chargement
			this.images = [];								// images à charger
			this.lastimage = 0;							// dernière image chargée	
			this.timer = null;
			this.showloading = false;				// afficher le préchargement des images
			
			this.start = function(){
				if(arguments.length > 0){
					_this.images = (arguments.length == 1 && arguments[0].toString().split(",").length > 1) ? arguments[0].toString().split(",") : arguments;		
				}
				var i = _this.lastimage;
				var img = "";
				if( oNav.ready && _this.images.length > 0 ){
					if( !oEl.isobject(_this.images[i]) ){
						img = _this.images[i];
						_this.images[i] = new Image();
						_this.images[i].src = oText.trim(img);
						_this.show("Préchargement des images : " + (i+1).toString() + " / " +	_this.images.length);
						_this.images[i].onerror = function(){
							_this.show("Impossible de charger l'image " + oText.trim(img) + "!");
							i++;
							_this.lastimage = i;	
						};
					}
					if( _this.images[i].complete ){
						i++;				
						if( i >= _this.images.length ){			// dernière image chargée												
							_this.clear();
							return false;
						}					
						_this.lastimage = i;			
					}			
				}			
				_this.timer = window.setTimeout(oNav.loadimage.start, 5);				
			};	
					
			this.clear = function(){
				_this.lastimage = 0;
				_this.images = [];
				oNav.init_timer(_this.timer);
				oNav.timer = null;
				oNav.readyfull = true;	
				oNav.inload = false;
				_this.hide();
			};
						
			this.show = function(txt){
				if(!this.showloading){
					return false;
				}
				_this.hide();
				oNav.lock.anim = false;
				_this.el = oEl.create("div");
				_this.el.className = "jaria_loadimage";
				_this.el.appendChild(oEl.text(txt));
				oEl.opacity(_this.el, 60);
				oNav.body.appendChild(_this.el);
				_this.el.style.left = oText.toPx(5  + oNav.scrollX);
				_this.el.style.top = oText.toPx(5 + oNav.scrollY);				
			};
			
			this.hide  = function(){
				try{
					oNav.body.removeChild(_this.el);
					_this.el = undefined;
				}
				catch(e){}		
			};
						
		};
		
		//OK
		this.loadimg = function(){
			if( arguments.length == 0 ){
				return false;
			}			
			var a = "";
			for( var i = 0; i < arguments.length; i++ ){
				a += (i == arguments.length -1) ? arguments[i] : arguments[i] + ",";
			}
			if( !oNav.readyfull || oNav.inload){
				window.setTimeout("oNav.loadimg('" + a + "')", 100);				
				return false;
			}
			oNav.inload = true;
			oNav.loadimage.start(a);
		};	
			
		//OK
		this.size = function(){							// dimensions de la fenêtre du navigateur [browser]
			if( typeof(window.innerHeight) == "number" ){
				oNav.screenY = window.innerHeight;
			}
			else if( document.documentElement && document.documentElement.clientHeight ){
				oNav.screenY=document.documentElement.clientHeight;
			}
			else if( oNav.body && oNav.body.clientHeight ){
				oNav.screenY = oNav.body.clientHeight;
			}
			if( typeof(window.innerWidth) == "number"){
				oNav.screenX = window.innerWidth;
			}
			else if( document.documentElement && document.documentElement.clientWidth ){
				oNav.screenX = document.documentElement.clientWidth;
			}
			else if( oNav.body && oNav.body.clientWidth ){
				oNav.screenX = oNav.body.clientWidth;
			}
			if(oNav.lock.exist){
				oNav.lock.el.style.width = oText.toPx(oNav.screenX);
				oNav.lock.el.style.height = oText.toPx(oNav.screenY );		
				oNav.lock.setText();	
			}
		};
			
		//OK
		this.scroll = function(){							// infos sur les ascenceurs [scroll] de la fenêtre du navigateur [browser]	
			if( oNav.msie || oNav.opera ){
				// ! la balise doctype doit être présente dans le document html 
				oNav.scrollX = (parseFloat(oNav.version) < 6 ) ? document.body.scrollLeft : document.documentElement.scrollLeft;
				oNav.scrollY = (parseFloat(oNav.version) < 6 ) ? document.body.scrollTop : document.documentElement.scrollTop;
			}else{
				oNav.scrollX = window.scrollX;
				oNav.scrollY = window.scrollY;
			}
			if( oNav.trace.box.exist ){
				oNav.trace.pos();
			}
			if( oNav.lock.exist ){
				// positionnement du lock
				oNav.lock.el.style.left = oText.toPx(oNav.scrollX);
				oNav.lock.el.style.top = oText.toPx(oNav.scrollY);			
			}			
		};
		
		//OK
		this.hideallbox = function(esc){
			if( oNav.lock.escape && esc ){
				oNav.lock.hide();
			}
			oEl.title.hide();
		};
		
		//OK cleartimer
		this.init_timer = function(t){
			if(t != undefined && t != null){
				try{
					window.clearInterval(t);
				}catch(e){
					try{
						window.clearTimeout(t);
					}catch(E){}
				}
			}			
		};
		
		//OK
		this.contextmenu = function(a, el){					// activer ou désactiver le menu contextuel du clic droit de la souris
			if( a ){
				oNav.init_timer(oNav.timer);
				oNav.timer = null;
			}
			if ( oEl.isobject(el) ){				
				el.oncontextmenu = function(){
					return a;
				};
			}else{
				document.oncontextmenu = function(){
					return a;
				};						
			}
		};
		
		//OK
		this.load = function(){							// actions à effectuer au chargement de la page [onload]
			oNav.body = window.document.body;
			oNav.location = window.document.location;
			// marge du document
			oNav.marginLeft = oNav.body.style.marginLeft;
			oNav.marginRight = oNav.body.style.marginRight;
			oNav.marginTop = oNav.body.style.marginTop;
			oNav.marginBottom = oNav.body.style.marginBottom;
			if( oNav.marginLeft == "" ){
				if( oNav.msie ){ oNav.marginLeft = ( isNaN(oNav.body.leftMargin) ) ? 0 : parseFloat(oNav.body.leftMargin); }else{ oNav.marginLeft = 0; }
			}else{ oNav.marginLeft = parseFloat(oNav.marginLeft); }
			if( oNav.marginRight == "" ){
				if( oNav.msie ){ oNav.marginRight = ( isNaN(oNav.body.rightMargin) ) ? 0 : parseFloat(oNav.body.rightMargin); }else{ oNav.marginLeft = 0; }
			}else{ oNav.marginRight = parseFloat(oNav.marginRight); }
			if( oNav.marginTop == "" ){
				if( oNav.msie ){ oNav.marginTop = ( isNaN(oNav.body.bottomMargin) ) ? 0 : parseFloat(oNav.body.topMargin); }else{ oNav.marginTop = 0; }
			}else{ oNav.marginTop = parseFloat(oNav.marginTop); }
			if( oNav.marginBottom == "" ){
				if( oNav.msie ){ oNav.marginBottom = ( isNaN(oNav.body.bottomMargin) ) ? 0 : parseFloat(oNav.body.bottomMargin); }else{ oNav.marginBottom = 0; }
			}else{ oNav.marginBottom = parseFloat(oNav.marginBottom); }
			oNav.size();
			oNav.ready = true;
		};
		
		//OK
		this.keydown = function(event){					// appelle les fonctions sur évènements du clavier
			oNav.keyb.esc(event);
			oNav.keyb.enter(event);
		};
		
		//Déprécié
		this.annul = function(){
			// à effectuer lors de l'action d'annulation
		};
		
		//Déprécié
		this.valid = function(){						
			// à effectuer lors de l'action de validation
		};
		
		//OK
		this.stopevent = function(event){		// limite la propagation de l'évènement à l'élèment
			if( event.stopPropagation ){
				event.stopPropagation();
			}
			else{
				event.cancelBubble = true;
			}
		};
		
		//OK
		this.addevent = function(){				// Permet l'ajout de fonctions au chargement de la page [onload]
			/*
				argument 0 : obligatoire:			évènement
				argument 1 : obligatoire:			la fonction à ajouter
				argument 2 : facultatif:			l'élément
			*/
			
			if( arguments.length < 2 ) {
				return false;
			}
			
			var v = arguments[0];
			var f = arguments[1];
			var el = arguments[2];
			var o;
			
			oNav.delevent(v, f, el);
			
			if( typeof(f) != "function" ){
				return false;
			}
			if( oEl.isobject(el)){
				o = el;		 
			}else if( v.indexOf("scroll") != -1 || v.indexOf("load") != -1 || v.indexOf("resize") != -1 ){
				o = window;
			}else{
				o = document;
			}
			try{
				o.attachEvent(v, f);
			}catch(e){
				try{
					v = v.toString().replace("on", "");
					o.addEventListener(v , f, false);
				}catch(E){
					return false;
				}
			}
			return true;
		};
		
		//OK
		this.delevent = function(v, f){
			/*
				argument 0 : obligatoire		évènement
				argument 1 : obligatoire:		la fonction à ajouter
				argument 2 : facultatif:		l'élément
			*/

			if( arguments.length < 2 ) {
				return false;
			}
			
			var e = arguments[2];
			var o;
			
			if( typeof(f) != "function" ){
				return false;
			}			
			if( oEl.isobject(e)){
				o = e;		 
			}else if( v.indexOf("scroll") != -1 || v.indexOf("load") != -1 || v.indexOf("resize") != -1 ){
				o = window;
			}else{
				o = document;
			}
			try{
				o.detachEvent(v, f);
			}catch(e){
				try{
					v = v.toString().replace("on", "");
					o.removeEventListener(v , f, false);
				}catch(e){
					return false;
				}
			}
			return true;
		};

		this.gotourl = function(u, t){				// Aller à l'url indiquée
			if( !oText.test(u) ){
				return false;
			}
			oNav.lock.show();
			if( !oText.test(t) ){
				t = "";
			}
			switch (t){
				case "_blank":
					window.open(u);
					oNav.lock.show();
					break;
				case "_parent":
					window.parent.location.href = u;
					break;
				default:
					window.location.href = u;
			}			
		};
		
		this.trace = new function(){								// boîte des traces de debug	
		
			var _this = this;
		
			this.box = new Box();
			this.debug = undefined;
			this.position = "";
			this.stop = false;
			this.marge = 20;
			
			this.pos = function(){						// position de la boîte des traces de debug
				if( _this.box.exist ){
					var w = oEl.getoffset(_this.box.el, "width");
					var h = oEl.getoffset(_this.box.el, "height");
					switch( _this.position ){
						case "right bottom":
							_this.box.el.style.left = oText.toPx(oNav.screenX - w - _this.marge + oNav.scrollX);
							_this.box.el.style.top = oText.toPx(oNav.screenY - h - _this.marge + oNav.scrollY);
							break;
						case "right":
							_this.box.el.style.left = oText.toPx(oNav.screenX - w - _this.marge + oNav.scrollX);
							_this.box.el.style.top = oText.toPx(10 + oNav.scrollY);
							break;
						case "bottom":
						case "left bottom":
							_this.box.el.style.left = oText.toPx(10 + oNav.scrollX);
							_this.box.el.style.top = oText.toPx(oNav.screenY - h - _this.marge + oNav.scrollY);
							break;
						default:
							_this.box.el.style.left = oText.toPx(10 + oNav.scrollX);	
							_this.box.el.style.top = oText.toPx(10 + oNav.scrollY);
					}
				}
			};
		
			this.add = function(s){					// ajout d'une ligne de trace de debug
				if( oText.test(s) && !_this.stop ){
					if( !_this.box.exist ){
						_this.show();
					}				
					var h = _this.debug.innerHTML;
					var d = new  Date();
					var t = ("<span class='jaria_tracehour'>" + oText.digit(d.getHours(), 2) + "h" + oText.digit(d.getMinutes(), 2) + "m" + oText.digit(d.getSeconds(), 2) + "s" + oText.digit(d.getMilliseconds(), 3) + "ms</span>" ).toString();
					_this.debug.innerHTML += t + "&nbsp;" + oText.htmlencode(s) + "<br>" + h;
				}
			};

			this.clear = function(){
				if( oEl.isobject(_this.box) ){
					_this.debug.innerHTML = "";
				}
			};
			
			this.pause = function(){
				_this.stop = (_this.stop) ? false : true;
				this.className = (_this.stop) ? "jaria_tracebutton jaria_tracebuttonplay" : "jaria_tracebutton jaria_tracebuttonpause";
			};
			
			this.show = function(){					// affichage de la boîte des traces de debug avec la position en paramètre optionnel
				/*
					argument 1: string = position
				*/
			
				_this.position = ( arguments.length > 0 ) ? arguments[0] : "";
				if( _this.box.exist ){
					return false;
				}				
				_this.box.bts = 0;
				_this.box.title = "Traces debug";
				_this.box.html = "&nbsp;";
				_this.box.borderColor = "#c6b01e";
				_this.box.backColor = "#ffffff";
				_this.box.shadow = false;
				_this.box.show();
				_this.box.resizeX(300);
				_this.debug = oEl.create("div");
				_this.debug.className = "jaria_tracedebug";
				_this.debug.style.width = oText.toPx(oEl.getoffset(_this.box.el, "width") -7);
				_this.box.el.Html.innerHTML = "";
				_this.box.el.Html.appendChild(_this.debug);
				_this.box.el.Html.style.padding = "0px";
				_this.box.el.style.boxShadow = "4px 4px 8px #666";
				_this.box.el.Bts = oEl.create("div");
				_this.box.el.Bts.style.textAlign = "right";
				_this.box.el.appendChild(_this.box.el.Bts);
				_this.box.el.Title.style.width = "200px";
				_this.pos();
				var bt = oEl.create("button");
				bt.className = "jaria_tracebutton jaria_tracebuttonpause";
				bt.innerHTML = "&nbsp;";
				bt.title = "Pause";
				bt.onclick = _this.pause;
				_this.box.el.Bts.appendChild(bt);
				var bt = oEl.create("button");
				bt.className = "jaria_tracebutton jaria_tracebuttonclear";
				bt.innerHTML = "&nbsp;";
				bt.title = "Effacer";
				bt.onclick = _this.clear;
				_this.box.el.Bts.appendChild(bt);
			};
			
			this.hide = function(){						// détruit la boîte des traces de debug
				_this.box.hide();
			};			
		};
		
		this.popup = new function(){								//  abscisse et ordonnée de la position de la souris
			this.el = undefined;
			this.modal = false;
			this.params = "";
			this.url = "";
			this.timer = null;
			this.focus = function(){					// garde le focus en mode modal
				if (this.el.closed){
					oNav.lock.hide();
					oNav.popup.hide();
					window.clearInterval(this.timer);
					return false;					
				}
				if( this.modal ){
					this.el.focus();
				}
			};			
			this.init = function(){
				this.el = undefined;
				this.modal = false;
				this.params = "";
			};			
			this.hide = function(){						// ferme la popup existante
				oNav.lock.hide();				
				try{
					this.el.close();
					this.init();
					window.focus();									
				}
				catch(e){}
			};
			this.show = function(){					// ouvre une popup en mode non modal[défaut] ou modal sans[défaut] ou avec paramètre(s)
				this.hide();				
				this.el = ( this.modal ) ? window.open(this.url, "modal", this.params) : window.open(this.url, "popup", this.params);				
				if( this.modal ){
					oNav.lock.escape = false;
					oNav.lock.show();
					oNav.lock.el.onclick = function(){
						oNav.popup.focus();
					};
					this.timer = window.setInterval("oNav.popup.focus()", 100);					
				}
			};
		};
		
		//OK
		this.mouse = new function(){								// abscisse et ordonnée de la position de la souris
			this.X = 0;
			this.Y = 0;
			
			this.move = function(e){
				e = e || window.event;
				oNav.mouse.X = parseInt(e.clientX);
				oNav.mouse.Y = parseInt(e.clientY);
			};
		};
		
		//OK		
		this.keyb = new function(e){
			
			this.esc = function(e){						// sur la touche échape [escape]
				e = e || window.event;
				// cache l'éventuelle boîte de dialogue
				if( e.keyCode == 27 ){
					oNav.hideallbox(true);
				}
			};
			
			this.enter = function(e){					// sur la touche entrer [enter]
				var el = oEl.getevent(e);
				if(el == undefined){
					return false;
				}
				// execute un traitement sur la touche Enter et si l'élément à la classe jaria_enter
				if( e.keyCode == 13 && el.className.indexOf("jaria_enter") != -1 ){
					if( oText.lower(el.tagName) == "input" &&  oText.trim(el.value) == ""){						
						oNav.keyb.annul(el);
						return false;
					}														
					oNav.keyb.valid(el);
				}
			};
			
			this.valid = function(){			
				// action sur un évènement du clavier
			};
			
			this.annul = function(){		
				// annulation sur un évènement du clavier
			};
		};
		
		//OK
		this.lock = new function(){								// grise la fenêtre du navigateur pour empêcher toute action 
			this.el = undefined;
			this.exist = false;
			this.opacity = 60;							// opacité
			this.anim = true;							// animation au centre
			this.color = "";							// couleur
			this.image = 1;								// image de chargement
			this.texte = "";							// texte à afficher
			this.textecolor = "#000000";				// couleur du texte
			this.escape = true;							// unlock sur la touche escape
			
			this.show = function(){						// grise  [lock]
				if( !oNav.ready ){
					return false;
				}
				if( !this.exist ){
					if( isNaN(this.opacity) || parseInt(this.opacity) < 10 || parseInt(this.opacity) > 100 ){
						this.opacity = 60;
					}
					oEl.title.hide();					// cache les éventuelles info-bulles
					this.el = oEl.create("div");
					this.el.className = ( this.anim ) ? "jaria_lock jaria_lock_" + this.image.toString() : "jaria_lock";
					if( oColor.iscolor(this.color) ){
						this.el.style.backgroundColor = this.color;
					}
					this.el.innerHTML = "&nbsp;";				
					this.el.style.top = oText.toPx(oNav.scrollY);
					this.el.style.left = oText.toPx(oNav.scrollX);
					this.el.style.width = oText.toPx(oNav.screenX);
					this.el.style.height = oText.toPx(oNav.screenY);
					oNav.body.appendChild(this.el);
					this.setText();		
					this.exist = true;
					oEl.opacity(this.el, this.opacity);
					oCal.datepicker.hide();	
					oCal.timepicker.hide();	
				}
			};
			
			this.setText = function(){
				if( this.texte != ""){	
					this.el.innerHTML = "";
					div = oEl.create("div");
					div.className = "jaria_lock_texte";
					if( oColor.iscolor(this.textecolor) ){
						div.style.color = this.textecolor;
					}
					div.innerHTML = this.texte;						
					this.el.appendChild(div);
					div.style.top = oText.toPx((oEl.getoffset(this.el, "height") / 2) + 40);
				}			
			};
			this.hide = function(){						// dégrise  [unlock]
				this.exist = false;
				this.anim = true;
				this.opacity = 60;
				this.color = "";
				this.texte = "";
				this.image = 1;
				oEl.del(this.el);
				this.el = undefined;
				this.escape = true;
			};
		};
		
		this.bar = new function(){						// Création d'une barre de pagination de pages selon le nombre de lignes affichées
		
			this.el = undefined;
			this.nblig = 0;
			this.nbligtot = 0;
			this.nbligec = 0;
			this.nbliglim = 0;
			this.html = "";
			this.nbpage = 0;
			this.page = 0;
			this.exist = false;
			this.classover = "";
			
			this.go = function(p){		// fonction pour l'accès aux pages par la barre de pagination
				p = ( p <= 1 ) ? p = 0 : (p -1) * oNav.bar.nblig;
				oNav.bar.page = p;
				oNav.bar.valid();
			};
			
			this.valid = function(){
				// action de validation à définir
			};
			
			this.add = function(){			// ajoute un élément à la barre de pagination	
			
				/*
					argument 0: class
					argument 1: title
					argument 2: texte
					argument 3: NÂ° page
				*/	
				
				var span = oEl.create("span");
				if( arguments.length >= 3 ){
					span.className = arguments[0];					
					if(arguments[1] != ""){
						span.title = arguments[1];
					}
					span.appendChild(oEl.text(arguments[2]));
					if( arguments.length == 4 ){
						oNav.bar.classover = arguments[0];
						var i = arguments[3];
						span.onclick = function(){ oNav.bar.go(i); };	
						span.onmouseover = function(){							
							this.className = "jaria_barr_lienov";
						};
						span.onmouseout = function(){
							this.className = oNav.bar.classover;
						};
					}					
					oNav.bar.el.appendChild(span);
				}								
			};
					
			this.show = function(){			// affiche la barre de pagination
			
				/*
					argument 0 obligatoire: élément parent recevant la barre
					argument 1 obligatoire: nombre de lignes visibles 
					argument 2 obligatoire: nombre de lignes totales
					argument 3 obligatoire: nombre de lignes en cours			
					argument 4 facultatif:  nombre limite de pages accessibles directement dans la barre
					argument 5 facultatif:  libellé traduit "Premier"
					argument 6 facultatif:  libellé traduit "Précédent"
					argument 7 facultatif:  libellé traduit "Suivant"
					argument 8 facultatif:  libellé traduit "Dernier"
					argument 9 facultatif:  libellé traduit "Aller à"
				*/
			
				var prem = "Premier";
				var prec = "Précédent";
				var suiv = "Suivant";
				var dern = "Dernier";
				var alle = "Aller à";
				
				if( oNav.bar.exist == true){		// evite la création de 2 barres
					return true;	
				}				
				if( arguments.length < 4 ){
					return false;
				}				
				
				for ( var i = 0; i < arguments.length; i++ ){
					switch(i){
					case 0:
						if( oEl.isobject(arguments[i]) ){
							oNav.bar.el = arguments[i];
						}else{
							if( oEl.test(arguments[i]) ){
								oNav.bar.el = oEl.get(arguments[i]);
							}else{
								return false;
							}
						}
						oNav.bar.el.innerHTML = "";
						break;
					case 1:
						if( isNaN(arguments[i]) ){return false;}
						oNav.bar.nblig = parseInt(arguments[i]);
						break;
					case 2:
						if( isNaN(arguments[i]) ){return false;}
						oNav.bar.nbligtot = parseInt(arguments[i]);				
						break;
					case 3:
						if( isNaN(arguments[i]) ){return false;}
						oNav.bar.nbligec = parseInt(arguments[i]);
						break;
					case 4:
						if( isNaN(arguments[i]) ){return false;}
						oNav.bar.nbliglim = parseInt(arguments[i]);
						break;				
					case 5:					
						if( oText.trim(arguments[i]) != "" ){ prem = oText.trim(arguments[i]); }
						break;
					case 6:
						if( oText.trim(arguments[i]) != "" ){ prec = oText.trim(arguments[i]); }
						break;
					case 7:
						if( oText.trim(arguments[i]) != "" ){ suiv = oText.trim(arguments[i]); }
						break;
					case 8:
						if( oText.trim(arguments[i]) != "" ){ dern = oText.trim(arguments[i]); }
						break;	
					case 9:
						if( oText.trim(arguments[i]) != "" ){ alle = oText.trim(arguments[i]); }
						break;
					default:
						// cas non géré
					}
				}
				
				oNav.bar.nbpage = parseInt(-Math.floor(-oNav.bar.nbligtot / oNav.bar.nblig));
				oNav.bar.page = parseInt(-Math.floor(-oNav.bar.nbligec / oNav.bar.nblig) + 1);
				
				for( var i = 0; i < oNav.bar.nbpage; i++ ){					
					if( i == oNav.bar.nbliglim && oNav.bar.page <= oNav.bar.nbliglim){
						break;
					}
					if( i == 0 ){
						if( oNav.bar.page > 1 ){
							// liens actifs des retours à la première page et au précédent
							oNav.bar.add("jaria_barr_lien", prem, "<<", 1);
							oNav.bar.add("jaria_barr_lien", prec, "<", (oNav.bar.page - 1));
						}else{
							// liens inactifs des retours à la première page et au précédent
							oNav.bar.add("jaria_barr_nolien", "", "<<");
							oNav.bar.add("jaria_barr_nolien", "", "<");
						}
					}
					if( (oNav.bar.page - 1) == i ){
						// lien de la page en cours						
						oNav.bar.add("jaria_barr_nolien", "Page " + (i + 1).toString(), (i + 1).toString());
					}else{
						if( 
						   (oNav.bar.page > oNav.bar.nbliglim && (i + 1) > (oNav.bar.page - oNav.bar.nbliglim) && (i + 1) < oNav.bar.page)
						   ||
						   (oNav.bar.page <= oNav.bar.nbliglim )
						){
							// si pages suivantes en dehors et page en cours supérieur à la limite admise
							oNav.bar.add("jaria_barr_lien", alle + " " + (i + 1).toString(), (i + 1).toString(), (i + 1));
						}
					}
				}
				if( oNav.bar.nbpage > oNav.bar.nbliglim && oNav.bar.page < oNav.bar.nbpage ){
					// si pages suivantes en dehors de la limite admise
					oNav.bar.el.appendChild(oEl.text("..."));
				}
				if( oNav.bar.nbpage > 1 && oNav.bar.page < oNav.bar.nbpage ){
					// liens actifs de la page suivante et de la dernière page
					oNav.bar.add("jaria_barr_lien", suiv, ">", (oNav.bar.page + 1));
					oNav.bar.add("jaria_barr_lien", dern, ">>", (oNav.bar.nbpage));					
				}else{
					// liens inactifs de la page suivante et de la dernière page
					if( oNav.bar.nbpage > 0 ){
						oNav.bar.add("jaria_barr_nolien", "", ">");
						oNav.bar.add("jaria_barr_nolien", "", ">>");
					}
				}
				// si une seule page, pas de pagination
				if( i == 1 ){oNav.bar.el.innerHTML = "";}
				oNav.bar.exist = true;
				return true;
			};
		};
		
		this.cookie = new function(){
			
			this.set = function(name, value, days){			
				var d = new Date();
				d.setDate(d.getDate() + days);
				value = escape(value) + ((days == null) ? "" : "; expires=" + d.toUTCString());
				document.cookie = name + "=" + value;
			};
			
			this.get = function(name){				
				var x, y; 
				var t = document.cookie.split(";");
				for (var i = 0; i < t.length; i++){
					x = t[i].substr(0,t[i].indexOf("="));
					y = t[i].substr(t[i].indexOf("=") + 1);
					x = x.replace(/^\s+|\s+$/g, "");
					if (x == name){
						return unescape(y);
					}
				}
				return "";
			};
			
			this.clear = function(name){				
				this.set(name, " ", -1);
			};
		};
	};
	
	oNav.type();
	
	var oEl = new function(){									// Gestion des éléments du DOM
	
		_this = this;
	
		this.timer = null;											// timer pour le déplacement de l'élément
		
		//OK
		this.fn = function(e){									//Ajoute des fonctions à un élément
			if(!oEl.test(e)){
				return false;
			}
			if(e.tagName.toLowerCase() == "input"){	//Pour les champs de formulaire		
				e.val = function(t){
					if(typeof(t)=="string"){this.value = t;}
					return this.value;
				};
				e.change = function(fn){
						this.onchange = fn;
				};
			}
			else{																		//Pour les autres élèment
				e.html = function(t){									//affecte ou/et retourne du HTML
					if(typeof(t)=="string"){this.innerHTML = t.toString();}
					return this.innerHTML;
				};
				e.txt = function(t){									//ajoute un node de texte
					oEl.delallchilds(this);
					oEl.addtext(this, t.toString());
				};		
				var b = new Array("br", "hr", "img");	//élément non conteneur
				if(b.indexOf(e.tagName.toLowerCase()) == -1){
					e.first = function(e){					//ajoute un élément en premier
						var f = this.firstChild;
						if(f){
							f.parentNode.insertBefore(e, f);
						}
						else{
							this.appendChild(e);
						}						
					};
				}
			}
			//Tous les types d'éléments
			e.tag = function(){											//retourne le nom du tag de l'élèment ou "" si pas du DOM
					if(!this.tagName){
						return "";
					}
					return this.tagName.toLowerCase();
			};
			e.parent = function(){									//parent de l'élèment ou lui-même si pas de parent
					if(!this.parentNode.tagName){
						return this;
					}
					oEl.fn(this.parentNode);
					return this.parentNode;
			};
			e.before = function(e){					//ajoute un élèment avant
				this.parentNode.insertBefore(e, this);
			};
			e.after = function(e){						//ajoute un élément après
				 this.parentNode.insertBefore(e, this.nextSibling);
			};					
			e.del = function(){									//supprime l'élément
				this.parentNode.removeChild(this);
			};		
			e.css = function(o){											//affecte un ou plusierus styles CSS
				if(oEl.isobject(o)){										//Valeurs sous forme d'objet JSON
					oEl.css(this, o);
				}
				else if(typeof(o) == "string" && oText.isjson(o)){
					oEl.css(this, JSON.parse(o));
				}
			};
			e.top = function(){
				return oEl.getoffset(this, "top");
			};
			e.left = function(){
				return oEl.getoffset(this, "left");
			};
			e.sizeX = function(){
				return oEl.getoffset(this, "width");
			};	
			e.sizeY = function(){
				return oEl.getoffset(this, "height");
			};	
		};
		
		this.alert = function(id){									// élément introuvable par son id ou par lui-même
			if( !oText.test(id) ){id = "undefined";}
			oBox.error("l'objet: <kbd>" + id + "</kbd> n'est pas trouvé !<br id=\"" + id + "\" />");
			return document.getElementById(id);				
		};
		
		//OK
		this.isobject = function(o){								// test un objet (élément DOM ou XML)
			/*
				argument 0: object obligatoire		élément
			*/
			if( arguments.length == 0 ){
				return false;
			}
			return ( typeof(o) == "object" ) ? true : false;
		};
		
		//OK
		this.test = function(e){					// test l'élément par l'objet ou par l'id passé en paramètre
			if(oEl.isobject(e) && e.tagName && e.style){
				return true;
			}
			if( !oText.test(e) ){
				return false;
			}
			if( oBox.exist && oBox.html.indexOf("<kbd>" + e + "</kbd>") != -1 ){				
				oBox.hide();				
				return false;
			}
			return (document.getElementById(e)) ? true : false;			
		};
	
		//OK
		this.get = function(e){					//retourne l'élément DOM par l'objet ou l'id
			if( oText.test(e) && oEl.test(e) ){
				e = document.getElementById(e);
			}
			if( !oEl.test(e) ){
				return this.alert(e);
			}
			this.fn(e);
			return e;	
		};
	
		//OK	
		this.gettags = function(s, e){			//récupère une collection d'élements du DOM ou XML par leur nom du tag
			var s = s.toString();
			var t = ( oEl.isobject(e) ) ? e.getElementsByTagName(s) : document.getElementsByTagName(s);
			if( oEl.test(e) ){
				for( var i = 0; i < t.length; i++){
						this.fn(t[i]);
				}
			}
			return t;
		};
		
		this.gettag = function(s, n, p){			// résupère l'élément par le nom du tag selon la position à partir de 1
			var t = oEl.gettags(s, p);
			return (t[n-1]) ? t[n-1] : t[0];
		};
		
		//OK
		this.create = function(t){				// créé l'élément
			var e = document.createElement(t);
			this.fn(e);
			return e;
		};
		
		//OK
		this.del = function(e){					// suppression d'un élément
			if( !oEl.isobject(e) ){
				if( !oEl.test(e) ){
					return false;
				}
				e = oEl.get(e);
			}
			try{
				e.parentNode.removeChild(e);
				e = undefined;
			}
			catch(e){}
		};
		
		//OK remplacé par getbyevent
		this.getevent = function(e){
			if( oEl.test(e) ){
				return e;
			}
			if( oEl.isobject(e) && e.type != undefined ){
				return ( !oNav.msie ) ? e.target : window.event.srcElement;
			}
			return undefined;
		};

		this.deltags = function(t, p){					// supprime tous les balises nommées du parent ou du document
			var e = ( p == null ) ? document : p;	
			while ( oEl.gettags(t, e).length > 0 ){
				var elems = oEl.gettags(t, e);
				for (var i = 0; i < elems.length; i++ ){
					try{
						e.removeChild(elems[i]);
					}catch(e){}
				}
			}
		};
		
		this.delallchilds = function(){					// supprime tous les enfant du parent
			/*
				argument 0: obligatoire		élément parent
			*/			
			var p = arguments[0];
			var c = p.childNodes;
			if ( c.length > 0 ){
				for ( var i = c.length; i > 0; i-- ){
					p.removeChild(c[i-1]);
				}
			}
		};
		
		this.delfirst = function(e){				//Suppression du premier élément fils
			e.removeChild(e.firstChild);
		};
		
		this.getframe = function(e, id){			// Retourne le document de l'iframe l'élément du document de l'iframe
			if( !oEl.isobject(e) ){
				e = oEl.get(e);
			}
			if( !oEl.isobject(e) ){
				oEl.alert(e);
			}
			e = e.contentWindow.document;
			id = ( typeof(id) != "string" ) ? "null" : id.toString();
			return ( e.getElementById(id) ) ? e.getElementById(id) : e;
		};

		this.getparent = function(e){
			if( !oEl.test(e) ){
				e = oEl.get(e);
			}
			return ( parent.opener ) ? parent.opener.document.getElementById(e.id) : e.parent();			
		};
		
		//OK
		this.text = function(t){					// créé le node texte
			return document.createTextNode(t);
		};
		
		//OK
		this.addtext = function(e, t){				//Ajoute un node texte à un élément
			e.appendChild(this.text(t));
		};
		
		//OK
		this.opacity = function(e, v){			// transparence de l'élément de 0 à 100 [opacity]
			if( arguments.length < 2){
				return false;
			}
			if( !oEl.test(e) ){
					return false;
			}
			e = oEl.get(e);
			if( !isNaN(v) ){
				if( parseInt(v) < 0 ){
					v = 0;
				}
				if( parseInt(v) > 100 ){
					v = 100;
				}				
				if( oNav.msie && oNav.version < 9  ){
					e.style.filter = "alpha(opacity=" + parseInt(v) + ")";
				}
				else{
					e.style.opacity = Math.round((parseFloat(v)/100)*10)/10;
				}
			}
		};
		
		//OK
		this.getopacity = function(e){				// retourne l'opacité d'un l'élément de 0 à 100 ou de 0 à 1 selon le navigateur  [opacity]
			if(!oEl.test(e)){
				return 0;
			}
			var v = 100;
			if( oNav.msie && oNav.version < 9 ){
				v = e.style.filter.toString();				
				v = v.split("=");
				if( v.length > 0 ){
					v = parseFloat(v[v.length - 1]);
				}
				if( isNaN(v) ){
					e.style.filter = "alpha(opacity=100)";
					v = 100;
				}
			}else{
				v = parseFloat(e.style.opacity) * 100;
				if( isNaN(v) ){
					e.style.opacity = 1;
					v = 100;
				}
			}
			return v;
		};
		
		//OK
		this.css = function(e, o){								//Ajoute un ou plusieurs style CSS à l'élèment à partir d'un objet JSON
			for (var d in o){
				n = d.toString();					//nom
				v = o[d].toString();			//valeur
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
		
		this.getclass = function(s, p, b){					// retourne un tableau d'élément(s) par la classe CSS passée en paramètre
			/*
				argument 0: obligatoire				nom de la classe CSS
				argument 1: facultatif				élément parent (document par défaut)
				argument 1 ou 2: facultatif		faux = classe seule (par défaut), vrai = parmi plusieurs classes affectées
			*/
			
			if( !oText.test(s) ){
				return [];
			}
			
			var p = ( oEl.test(p) ) ? p : document;

			var m = ( typeof(p) == "boolean" ) ? p : false;
			m = (  typeof(p) != "boolean" && typeof(b) == "boolean" ) ? b : m;
			var e = [];
			var s = oText.trim(s);
			p = p.getElementsByTagName("*");			
			for( var i = 0; i < p.length; i++ ){
				if ( m && p[i].className.indexOf(s) != -1 ){		// si plusieurs classes et classe trouvée
					e.push(p[i]);					
				}else	if( p[i].className == s ){						// si classe identique
						e.push(p[i]);
				}					
			}
			return e;			
		};
		
		//OK
		this.addclass = function(e, s){			// ajoute une class à l'élément [className]
			/*
				argument 0 : obligatoire		élément
				argument 1 : obligatoire		nom de la classe CSS
			*/			
			if(oEl.test(e) && oText.test(s) ){
				s = oText.trim(s);
				var c = e.className.toString();
				if( c.lastIndexOf(s) == -1 ){
					c += " " + s;
				}
				e.className = c;
			}
		};
		
		//OK
		this.delclass = function(e, s){			// supprime une class à l'élément [className]
			/*
				argument 0 : obligatoire		élément
				argument 1 : obligatoire		nom de la classe CSS
			*/	
			if( oEl.isobject(e) && oText.test(s) ){
				var s = oText.trim(s);
				var c = e.className.toString();
				if( c.lastIndexOf(s) != -1 ){
					c = c.replace(s, "");
				}
				e.className = oText.trim(c);
			}
		};
		
		//OK
		this.getoffset = function(e, s){		// retourne la dimention ou la position réelle en pixels d'un élément par rapport au document
			/*
				argument 0 : obligatoire		élément
				argument 1 : obligatoire		propriété (left, top, height, width)
				argument 1 : optionnel			parent
			*/
			if( !oEl.test(e) || !oText.test(s) ){
				return 0;
			}
			e = oEl.get(e);
			s = s.replace("offset", "");
			s = "offset" + oText.firstUp(s);
			if( s.indexOf("Height") != -1 || s.indexOf("Width") != -1 ){
				return eval("e." + s + ";");
			}
			var a = 0;
			var t = ( oBox.exist && e.className == "jaria_listlock"  ) ? "div" : "body";
			while (e && oText.lower(e.tagName) != t){
				eval("a += e." + s + ";");
				e = e.offsetParent;
			}
			return a;		
		};

		
		this.getstyleclass = function(e, st){		// retourne la valeur du style de la class css d'un élément
			if ( oEl.test(e) ) {
				e = oEl.get(e);
			}else{
				return "";
			}
			if( !oNav.msie ){
				return eval("window.getComputedStyle(e, null)." + st);
			}else{
				return eval("e.currentStyle." + st);
			}
		};
		
		//OK
		this.setinscreen = function(){		// repositionne progressivement l'élément dans la fenêtre du navigateur			
			// argument 0 : element à repositionner		obligatoire
			var e = arguments[0];
			if( oEl.test(e) ){
				e = oEl.get(e);
			}else{
				return false;
			}
			if( e.id == ""){		// attribut un id obligatoire
				e.id = "JARIA_SETINESCREEN";
			}			
			function Stop(){
				if( e.id == "JARIA_SETINESCREEN"){
					e.id = "";
				}
				window.clearTimeout(oEl.timer);
				oEl.timer = null;
				oEl.isinscreen(e);			// repositionnement terminé
			}			
			var left = parseFloat(e.offsetLeft);
			var top = parseFloat(e.offsetTop);
			var width = parseFloat(e.offsetWidth);
			var height = parseFloat(e.offsetHeight);
			var paddingW = 0; 
			var paddingH = 0;
			var marge = 60;
			
			// point droit et point bas de l'élément
			var right = left - oNav.scrollX + paddingW + width;
			var bottom = top - oNav.scrollY  + paddingH + height;		

			if( left < oNav.scrollX ){
				// repositionne la box à gauche
				e.style.left = oText.toPx(left + paddingW);
			}			
			if( top < oNav.scrollY ){
				// repositionne la box en haut
				e.style.top = oText.toPx(top + paddingH);
			}
			// fenêtre plus petite que l'élément
			if (  ( left <= 0 && right >= oNav.screenX ) || ( top <= 0 && bottom >= oNav.screenY )  ){
				Stop();
				return false;
			}
			// élément dans la fenêtre
			if (  ( left >= 0 && right <= oNav.screenX ) && ( top >= 0 && bottom <= oNav.screenY )  ){
				Stop();
				return false;
			}
			// coin haut - gauche de l'élément dans le coin de la fenêtre
			if (  ( left == 0 && right >= oNav.screenX && top >= 0 && bottom <= oNav.screenY ) || ( top == 0 && bottom >= oNav.screenX && left >= 0 && right <= oNav.screenY )  ){
				Stop();
				return false;				
			}
			if( right > oNav.screenX ){
				e.style.left = oText.toPx(left - (paddingW + marge));
			}
			if( bottom > oNav.screenY ){
				e.style.top = oText.toPx(top - (paddingH + marge));
			}
			if( oBox.exist ){
				oBox.setshadow();
			}
			oEl.timer = window.setTimeout("oEl.setinscreen('" + e.id + "')", 20);		
		};
		
		//OK
		// fonction à redéfinir  executée lorsque le repositionnement de l'élément déplacée par la fonction oEl.setinscreen est terminée 
		this.isinscreen = function(){
			return false;
		};
		
		this.isvisible = function(){
			// argument 0 : obligatoire		élément
			var e = arguments[0];
			if( !oEl.isobject(e) ){
				if( !oEl.test(e) ){
					return false;
				}else{
					e = oEl.get(e);
				}
			}			
			return ( oEl.getstyleclass(e, "display") != "none" ) ? true : false;
		};
		
		this.visible = function(){
			/* 
				argument 0 : obligatoire		élément
				argument 1 : obligatoire		état true ou false
			*/
			var e = arguments[0];
			if( !oEl.isobject(e) ){
				if( !oEl.test(e) ){
					return false;
				}else{
					e = oEl.get(e);
				}
			}
			var state = arguments[1];
			if ( typeof(state) != "boolean" ){
				return false;
			}
			var tag = oText.lower(e.tagName);
			if(state){
				if(oNav.msie && oNav.version < 8){
					e.style.display = "inline";
				}else{
					switch( tag ){
						case "thead":
						case "tfoot":
						case "tbody":
							e.style.display="table-row-group";
							break;
						case "table":
							e.style.display = "table";
							break;
						case "tr":
							e.style.display = "table-row";
							break;
						case "td":
							e.style.display = "table-cell";
							break;
						case "div":
						case "iframe":
							e.style.display = "block";
							break;
						default:
							e.style.display = "inline";
					}
				}
			}
			else{
				e.style.display = "none";
			}
		};
		
		this.title = new function(){						// remplace l'infobulle de l'attribut title par une infobulle html	
			
			this.el = [];								// collection d'élément(s) recevant l'infobulle
			this.titre = [];						// collection des titles des éléments
			this.actif = [];						// évite la création si même élément
			this.bubble = undefined;		// élément de l'infobulle
			this.text = "";							// texte [html] de l'infobulle	
			this.file = "host/infobulle.php";		// fichier host pour le retour du texte par Ajax
			this.pathImg = "images/";		// chemin des images pour la prévisu
			this.search = false;				// état de recherche des données par Ajax
			this.exist = false;
			
			this.get = function(el){				// recherche l'élément dans la collection
				for( var i = 0; i < oEl.title.el.length; i++ ){
					if( el == oEl.title.el[i] ){
						return i;
					}
				}
				return -1;
			};
			
			this.go = function(event){					// fonction à appeler sur l'évènement onmousemove du document
				var el = oEl.getevent(event);		
				if( oEl.isobject(el) ){								
					try{	
						if( el.className.indexOf("liste") == -1 ){	
							if( el.getAttribute("title") != "" ){
								var t = el.title;
								try{
									oEl.title.el[i].removeAttribute("title");
								}catch(e){
									el.title = "";
								}
								if( oEl.title.get(el) == -1 ){
									var i = oEl.title.el.length;
									oEl.title.el[i] = el;
									oEl.title.titre[i] = t;
									oEl.title.actif[i] = 0;
									oNav.addevent("onmouseover", function(){
											oEl.title.show(i);
										}, el
									);
									oNav.addevent("onmouseout", function(){
											oEl.title.actif[i] = 0;
											if(oEl.isobject(oEl.prev.el)){
												oEl.prev.hide();
											}else{
												oEl.title.hide();
											}
										}, el
									);
								}
							}
							else{
								var i = oEl.title.get(el);
								oEl.title.show(i);
							}
						}
					}catch(e){}
				}
			};
			
			this.show = function(){					// affiche l'infobulle
			
				// argument 0: identifiant de la collection d'élément
				if( arguments.length == 0 ){ return false; }
				var posX = oNav.mouse.X + oNav.scrollX;
				var posY = oNav.mouse.Y + oNav.scrollY;
				var dimArrow = 0;					// largeur et hauteur de la flèche et du scroll de la fenêtre du navigateur
				var width = 150;
				var cont = undefined;
				var i = parseInt(arguments[0]);
				if( this.actif[i] == 0 ){					
					var text = oText.trim(this.titre[i]);
					if( text == ""){
						return false;
					}			
					if( text.substr(0, 13) == "this.previsu=" && (text.substr(text.indexOf("=") + 1, text.indexOf(";")-text.indexOf("=") - 1 )) != ""){						
						var src = text.substr( text.indexOf("=") + 1, text.indexOf(";")-text.indexOf("=") - 1 );
						oEl.prev.show(this.el[i], src);
						if( !oEl.isobject(oEl.prev.text) ){
							text = text.substr(text.indexOf(";") + 1, text.length);
							text = text.replace("", "&nbsp;");
							text = text.replace("\r", "<br/>");
							var div = oEl.create("div");
							div.className = "jaria_previsu_text";
							div.style.top = oText.toPx(oEl.prev.el.offsetHeight);
							var divg = oEl.create("div");
							divg.className = "jaria_previsu_text_g";
							div.appendChild(divg);
							var divc = oEl.create("div");
							divc.className = "jaria_previsu_text_c";
							div.appendChild(divc);		
							divc.innerHTML = oText.encode(text);	
							var divd = oEl.create("div");
							divd.className = "jaria_previsu_text_d";
							div.appendChild(divd);							
							oEl.opacity(div, 90);
							oEl.prev.el.appendChild(div);							
							oEl.prev.text = div;
							this.actif[i] = 1;
							return false;
						}
					}
					oEl.title.hide();			
					if( text.substr(0, 11) == "this.width=" && !isNaN(text.substr(text.indexOf("=") + 1, text.indexOf(";")-text.indexOf("=") - 1 )) ){
						width = parseInt(text.substr( text.indexOf("=") + 1, text.indexOf(";")-text.indexOf("=") - 1 ));
						width = ( width < 25 ) ? 25 : width;
						width = ( width > 1000 ) ? 1000 : width;
						text = text.substr(text.indexOf(";") + 1, text.length);
					}
					if(text.substr(0,10)=="this.ajax="&&!isNaN(text.substr(text.indexOf("=")+1,text.indexOf(";")-text.indexOf("=")-1))){
						if(this.search){
							return false;
						}
						id = text.substr(text.indexOf("=")+1,text.indexOf(";")-text.indexOf("=")-1);
						this.search = true;
						oAjax.init();
						oAjax.adddata("ID", id);
						oAjax.send(this.file, "post");
						oAjax.recept = function(){
							oEl.title.search = false;
							oEl.title.hide();
							if(!oText.test(arguments[0])){
								return false;
							}
							oEl.title.titre[i]=arguments[0];
							oEl.title.actif[i]=0;
							oEl.title.show(i);
							return false;
						};
						oAjax.onready();
						text="<img src='"+jaria.images+"loadimg.gif' />";
					}
					
					text = text.replace("", "&nbsp;");
					text = text.replace("\r", "<br/>");
					this.bubble = oEl.create("div");
					var e=this.bubble;e.className = "jaria_bubble";
					e.style.width = oText.toPx(width);
					this.arrow = oEl.create("div");
					cont = oEl.create("div");
					cont.className = "jaria_bubblecont";
					this.arrow.className = "jaria_bubblearrowhaut";
					e.appendChild(this.arrow);
					var c = oEl.create("div");
					c.innerHTML = oText.encode(text);
					cont.appendChild(c);
					e.appendChild(cont);
					document.body.appendChild(e);
					oEl.fader.plus(e, 30);
					this.actif[i] = 1;			
				}
				
				if( oEl.isobject(this.bubble) ){
					var screenX = oNav.screenX + oNav.scrollX;
					var screenY = oNav.screenY + oNav.scrollY;
					width = this.bubble.offsetWidth;					// largeur de la bulle
					var height = this.bubble.offsetHeight;				// hauteur de la bulle
					
					dimArrow = parseFloat(oEl.getstyleclass(this.arrow, "height")) - oNav.marginLeft;
					
					// positionne la bulle par rapport à la souris
					this.bubble.style.top = oText.toPx(posY + dimArrow);
					this.bubble.style.left = oText.toPx(posX);
					// repositionne la bulle si en dehors de l'écran
					if( (posX + width + dimArrow) >= (screenX) ){					
						posX = posX - (posX + width - screenX) - dimArrow;
						var posArrow = (oNav.mouse.X + oNav.scrollX) - posX ;					
						this.bubble.style.left = oText.toPx(posX);
						this.arrow.style.backgroundPosition = oText.toPx(posArrow);
					}
					if( (posY + height + dimArrow) > (screenY) ){						  
						this.bubble.style.top = oText.toPx(posY - height - dimArrow);
						this.arrow.className = "jaria_bubblearrowbas"; 	// flèche en bas
						this.bubble.appendChild(this.arrow);
					}
					else{
						this.arrow.className = "jaria_bubblearrowhaut";	// flèche en haut
						try{
							this.bubble.appendChild(cont);
						}catch(e){}
					}
				}
				
				this.search = false;
				return true;
			};
			
			this.hide = function(){					// détruit l'infobulle l'infobulle
				try{
					document.body.removeChild(this.bubble);
				}catch(e){}
				if(arguments.length == 0){
					oEl.prev.hide();
				}
				this.bubble = undefined;
			};
		};
		
		
		this.prev = new function(){		// prévisualistation au survol d'un lien faÃ§on Vista
			this.el = undefined;
			this.text = undefined;
			this.show = function(){
				/*
					argument 0: élément du survol
					argument 1: image de la prévisu
				*/
				if( arguments.length < 2 || oEl.isobject(oEl.prev.el) || !oNav.ready  ){
					return false;
				}
				oEl.prev.hide();
				var el = arguments[0];
				var src = arguments[1];
				// création du conteneur
				var div = oEl.create("div");
				div.className = "jaria_previsu";
				div.style.left =  oText.toPx(oEl.getoffset(el, "left"));
				div.style.top = oText.toPx(oEl.getoffset(el, "top") + 30 + oNav.marginTop);
				// création du cadre
				var divc = oEl.create("div");
				divc.className = "jaria_previsu_cadre";
				divc.style.left = "5px";
				divc.style.top = "5px";
				// création de l'ombre
				var divo = oEl.create("div");
				divo.className = "jaria_previsu_ombre";
				oEl.opacity(divo, 30);
				// création de l'image de prévisualisation
				var img = oEl.create("img");
				img.className = "jaria_previsu_img";
				img.src = src;
				img.alt = "";
				divc.appendChild(img);
				div.appendChild(divc);
				div.appendChild(divo);
				document.body.appendChild(div);
				if(!oNav.msie){
					oEl.fader.plus(div, 50);
				}
				oEl.prev.el = div;				
			};
			
			this.hide = function(){
				oEl.del(oEl.prev.el);
				oEl.prev.el = undefined;
				oEl.prev.text = undefined;
			};
		};
		
		this.fader = new function(){							//Transition progressive de l'opacité d'un élément
			this.el = [];
			this.timer = [];
			
			this.clear = function(i){
				oNav.init_timer(this.timer[i]);	
				this.timer[i] = null;
				this.valid(this.el[i]);
				return false;
			};
			
			this.get = function(el){				//recherche l'élément dans la collection
				for( var i = 0; i < oEl.title.el.length; i++ ){
					if( el == oEl.title.el[i] ){
						return i;
					}
				}
				return -1;
			};
			
			this.inc = function(c, i, t){			//incrémente l'opacité de l'élément				
				var e = this.el[i];	
				if( oEl.test(e) ){					
					oEl.opacity( e , (parseInt(oEl.getopacity(e)) + parseInt(c)) );				
					if( (parseFloat(c) > 0 && oEl.getopacity(e) >= 100) || (parseFloat(c) < 0 && oEl.getopacity(e) <= 0) ){
						this.clear(i);
					}
				}
			};
			
			this.valid = function(){				//action à effectuer en fin de fading
				return false;
			};
			
			this.plus = function(e, t){			//Transition progressive positive de l'opacité de l'élément
			
				if( oEl.test(e) ){
					e = oEl.get(e);
				}else{
					return false;
				}
				var i = this.get(e);				//vérifie si l'objet est existant			
				if( i == -1 ){
					i = this.el.length;
					this.el[i] = e;
				}else{
					this.clear(i);					//arrête le timer
				}				
				e = this.el[i];
				if( oEl.getopacity(e) >= 100 ){
					oEl.opacity(e, 0);	
				}
				t = ( t == null || isNaN(t) ) ? 10 : parseInt(t);
				this.timer[i] = window.setInterval("oEl.fader.inc(10, " + i + ")", t);
			};
			
			this.moins = function(e, t){			//Transition progressive négative de l'opacité de l'élément
			
				if( oEl.test(e) ){
					e = oEl.get(e);
				}else{
					return false;
				}
				var i = oEl.fader.get(e);			//vérifie si l'objet est existant				
				if( i == -1 ){
					i = oEl.fader.el.length;
					this.el[i] = e;
				}else{
					this.clear(i);					//arrête le timer
				}
				e = this.el[i];
				if( oEl.getopacity(e) <= 0 ){
					oEl.opacity(e, 100);	
				}
				t = ( t == null || isNaN(t) ) ? 10 : parseInt(t);	
				this.timer[i] = window.setInterval("oEl.fader.inc(-10, " + i + ")", t);
			};			
		};	
		
		this.sound = new function(){							// créé un objet son			
			this.el = undefined;
			this.autostart = true;	
			this.loop = true;
			this.play = function(file){				// joue le son
				oEl.sound.stop();
				oEl.sound.el = oEl.create("embed");
				oEl.sound.el.src = file;
				oEl.visible(oEl.sound.el, false);
				oEl.sound.el.autostart = oEl.sound.autostart;
				oEl.sound.el.loop = oEl.sound.loop;
				oNav.body.appendChild(oEl.sound.el);
			};			
			this.stop = function(){					// détruit l'objet son
				if( oEl.isobject(oEl.sound.el) ){
					oEl.del(oEl.sound.el);
				}
				oEl.sound.el = undefined;
			};
		};
		
		this.drag = new function(sens){								// actions sur le déplacement d'élément par la souris (drag and drop)
		
			this.el = undefined;							// élement déplaÃ§able
			this.left = 0;									// position left en déplacement
			this.top = 0;									// position top en déplacement
			this.X = 0;										// position X de la souris en déplacement
			this.Y = 0;										// position Y de la souris en déplacement
			this.startX = 0;								// position X de départ de la souris en déplacement
			this.startY = 0;								// position Y de départ de la souris en déplacement
			this.startLeft = null;							// position left de départ de l'élément
			this.StartTop = null;							// position top de départ de l'élément
			this.sens = null;								// sens X, Y du déplacement, par défaut tous les sens
			this.receptor = undefined;						// élément récepteur
			this.elex = undefined;							// élément précedent positionné dans le récepteur
			this.elp = [];									// tableau d'élément(s) pour le déplacement progressif
			this.onreceptor = false;						// éléments en collision
			this.opacity = 100;								// opacité de l'élément déplaÃ§able
			this.hlight = new Hlight();						// élément avertisseur de collision de className highlight
			
			function Hlight(){
				this.show = function(){
					oEl.drag.hlight.el = oEl.create("div");
					oEl.drag.hlight.el.className = "jaria_highlight";
					oEl.drag.hlight.el.style.left = oText.toPx(oEl.drag.receptor.offsetLeft - 6);
					oEl.drag.hlight.el.style.top = oText.toPx(oEl.drag.receptor.offsetTop - 6);
					oEl.drag.hlight.el.style.width = oText.toPx(oEl.drag.receptor.offsetWidth);
					oEl.drag.hlight.el.style.height = oText.toPx(oEl.drag.receptor.offsetHeight);
					document.body.appendChild(oEl.drag.hlight.el);
				};
				this.hide = function(){
					oEl.del(oEl.drag.hlight.el);
					oEl.drag.hlight.el = undefined;
				};
			}
			
			this.getstyleoffset = function(el, p){
				if( oEl.getstyleclass(el, "position") == "absolute" ){
					return oEl.getstyleclass(el, p);
				}else{
					return oText.toPx( oEl.getoffset(el, "offset" + oText.firstUp(p)) );
				}
			};
			
			this.stop = function(){							// arrêt du déplacement
				document.onmousemove = oNav.mouse.move;
				document.onmouseup = null;
				if( oEl.isobject(oEl.drag.receptor) ){
					if( oEl.drag.onreceptor ){
						
						// repositionne l'éventuel élément déjà présent dans le récepteur à sa position d'origine
						if( oEl.isobject(oEl.drag.elex) ){
							oEl.drag.progress(oEl.drag.elex, parseFloat(oEl.drag.elex.startLeft), parseFloat( oEl.drag.elex.startTop));
							oEl.drag.elex = undefined;
						}
						
						// positionne l'élément dans le récepteur
						var mLeft = 0;
						var mTop = 0;
						if( oEl.getstyleclass(oEl.drag.el, "position") != "absolute" ){
							mLeft = oEl.getoffset(oEl.drag.el.parentNode, "left");
							mTop = oEl.getoffset(oEl.drag.el.parentNode, "top");
						}
						oEl.drag.el.style.left = oText.toPx( oEl.getoffset(oEl.drag.receptor, "left") - mLeft );
						oEl.drag.el.style.top  = oText.toPx( oEl.getoffset(oEl.drag.receptor, "top") - mTop );
						
						// supprime l'avertisseur de collision
						oEl.drag.hlight.hide();
						
						// action éventuelle du client
						oEl.drag.inreceptor();
						
					}else{
						// repositionne l'élément à l'origine
						oEl.drag.progress(oEl.drag.el, parseFloat(oEl.drag.startLeft), parseFloat(oEl.drag.startTop));
					}
				}
				oEl.drag.receptor = undefined;
				oEl.drag.sens = null;			
				oEl.drag.opacity = 100;
				oEl.opacity(oEl.drag.el, 100);
				if( oEl.drag.el.shadow != undefined){
					oEl.opacity(oBox.el.shadow, 20);
				}
				oText.select(true);
			};
			
			this.go = function(e){						// déplacement en cours...
				e = e || window.event;
				var Px = 0, Py = 0;
				var X = e.clientX + oNav.scrollX;
				var Y = e.clientY + oNav.scrollY;
				if( (X > 0) && (Y > 0) ){
					if ( oEl.drag.sens != null && (oEl.drag.sens == "x" || oEl.drag.sens == "y" ) ){
						Py = eval("P" +  oEl.drag.sens);
						Py = (oEl.drag.left +  eval( oEl.drag.sens.toUpperCase()) ) - eval( "oEl.drag.start" + oEl.drag.sens.toUpperCase() );
					}else{
						Px = (oEl.drag.left + X - oEl.drag.startX);
						Py = (oEl.drag.top + Y - oEl.drag.startY);
	
					}
					if( Px > 0 ){
						oEl.drag.el.style.left = oText.toPx(Px);
					}
					if( Py > 0 ){
						oEl.drag.el.style.top = oText.toPx(Py);
					}
					if( oEl.drag.receptor != undefined ){
						
						function collision(x, y){						
							if(			
								x >= parseFloat(oEl.getstyleclass(oEl.drag.receptor, "left")) &&
								x <= parseFloat(oEl.getstyleclass(oEl.drag.receptor, "left")) + parseFloat(oEl.getstyleclass(oEl.drag.receptor, "width")) &&
								y >= parseFloat(oEl.getstyleclass(oEl.drag.receptor, "top")) &&
								y <= parseFloat(oEl.getstyleclass(oEl.drag.receptor, "top")) + parseFloat(oEl.getstyleclass(oEl.drag.receptor, "height"))
							){
								return true;
							}
							return false;
						}
						
						oEl.drag.hlight.hide();
						oEl.drag.onreceptor = false;
							
						if(
							collision( parseFloat(oEl.getstyleclass(oEl.drag.el, "left")), parseFloat(oEl.getstyleclass(oEl.drag.el, "top")) ) ||
							collision( parseFloat(oEl.getstyleclass(oEl.drag.el, "left")) + parseFloat(oEl.getstyleclass(oEl.drag.el, "width")), parseFloat(oEl.getstyleclass(oEl.drag.el, "top")) ) ||
							collision( parseFloat(oEl.getstyleclass(oEl.drag.el, "left")), parseFloat(oEl.getstyleclass(oEl.drag.el, "top")) + parseFloat(oEl.getstyleclass(oEl.drag.el, "height")) ) ||
							collision( parseFloat(oEl.getstyleclass(oEl.drag.el, "left")) + parseFloat(oEl.getstyleclass(oEl.drag.el, "width")), parseFloat(oEl.getstyleclass(oEl.drag.el, "top")) + parseFloat(oEl.getstyleclass(oEl.drag.el, "height")) )
						){
							// collision						
							oEl.drag.onreceptor = true;
							oEl.drag.hlight.show();
						}					
					}
				} 
				if( !oNav.msie && !oNav.opera ){
					e.preventDefault();
				}else{
					e.cancelBubble = true;
					e.returnValue = false;
				}
				if( oEl.drag.el.shadow != undefined){
					oEl.opacity(oBox.el.shadow, 10);
					oEl.drag.el.shadow.style.left = oText.toPx(oEl.getoffset(oEl.drag.el, "left") + 8);
					oEl.drag.el.shadow.style.top = oText.toPx(oEl.getoffset(oEl.drag.el, "top") + 8);
				}
			};		
			
			this.inreceptor = function(){
				// code à implémenter par le client
			};
			
			this.start = function(el, e, elr){				// démarrage du déplacement
				oEl.drag.startX = 0;
				oEl.drag.startY = 0;
				oEl.drag.elex = undefined;
				e = e || window.event;
				if( e != null ){				
					oEl.drag.X = e.clientX + oNav.scrollX;
					oEl.drag.Y = e.clientY + oNav.scrollY;
					oEl.drag.startX = oEl.drag.X;
					oEl.drag.startY = oEl.drag.Y;
					if( elr != null ){
						if( oEl.isobject(elr) ){						
							oEl.drag.receptor = elr;
						}else if( oEl.test(elr) ){						
							oEl.drag.receptor = oEl.get(elr);						
						}else{
							oEl.drag.receptor = undefined;
						}
					}
				}
				if( oEl.drag.el != el){
					
					// position initial d'un éventuel élément déjà présent dans le récepteur
					if( oEl.isobject(oEl.drag.el) && oEl.drag.onreceptor ){					
						oEl.drag.elex = oEl.drag.el;
						oEl.drag.elex.startLeft = oEl.drag.startLeft;
						oEl.drag.elex.startTop = oEl.drag.startTop;
					}
					
					if( oEl.isobject(el) ){
						oEl.drag.el = el;
					}else if( oEl.test(el) ){
						oEl.drag.el = oEl.get(el);
					}else{
						return false;
					}
					if( oEl.drag.el.nodeType == 3 ){
						// parent d'un noeud intermédiaire
						oEl.drag.el = oEl.drag.el.parentNode;
					}
					
					// position relative initiale de l'élément
					oEl.drag.el.style.left =  oEl.getstyleclass(oEl.drag.el, "left");
					oEl.drag.el.style.top =  oEl.getstyleclass(oEl.drag.el, "top");
					
					// mémorise la position de départ
					oEl.drag.startLeft = oEl.drag.el.style.left;
					oEl.drag.startTop = oEl.drag.el.style.top;				
					
					// dimension de l'élément
					oEl.drag.el.style.width = oEl.getstyleclass(oEl.drag.el, "width");
					oEl.drag.el.style.height = oEl.getstyleclass(oEl.drag.el, "height");
				}
				
				// opacité au déplacement de l'élément
				oEl.drag.opacity = ( isNaN(oEl.drag.opacity) ) ? 100 : oEl.drag.opacity;
				oEl.opacity(oEl.drag.el, oEl.drag.opacity);
				
				// position réelle de l'élément
				oEl.drag.left = ( e != null ) ? parseFloat(oEl.drag.el.style.left) : parseFloat(oEl.drag.startLeft);
				oEl.drag.top = ( e != null ) ? parseFloat(oEl.drag.el.style.top) : parseFloat(oEl.drag.startTop);
				oEl.drag.left = ( oEl.drag.left == null ) ? 0 : oEl.drag.left;
				oEl.drag.top = ( oEl.drag.top == null ) ? 0 : oEl.drag.top;
				
				// dimension et position de l'élément récepteur
				if( oEl.isobject(oEl.drag.receptor) ){				
					oEl.drag.receptor.style.left = oEl.getstyleclass(oEl.drag.receptor, "left");
					oEl.drag.receptor.style.top = oEl.getstyleclass(oEl.drag.receptor, "top");
					oEl.drag.receptor.style.width =  oEl.getstyleclass(oEl.drag.receptor, "width");
					oEl.drag.receptor.style.height =  oEl.getstyleclass(oEl.drag.receptor, "height");
				}
				
				// empêche la sélection du texte du document pendant le déplacement
				oText.select(false);
				
				if( e != null ){
					// déplacement suivant la souris
					document.onmousemove = oEl.drag.go;
					document.onmouseup = oEl.drag.stop;				
				}else{
					// déplacement paramétré de l'élément 
					oEl.drag.el.style.left = oText.toPx( oEl.drag.startX + oEl.drag.X );
					oEl.drag.el.style.top = oText.toPx( oEl.drag.startY + oEl.drag.Y );
				}			
			};
			
			this.progress = function(el, x, y){				// Déplacement progressif de l'élément [this]	
				// nouvel élément
				if( el != undefined && el != null && typeof(el) != "number" ){
					// initialisation de l'élément progressif
					el = ( oEl.test(el) ) ?  oEl.get(el) : el;					
					if( !oEl.isobject(el) ){
						oBox.error("Aucun objet passé à la fonction <kbd>oEl.drag.progress</kbd>");
						return Stop();						
					}
					
					// vérifie l'existence de l'élément
					var inc = 0;
					for( var i = 0; i < oEl.drag.elp.length; i++){
						if( oEl.drag.elp[i].id == el.id){
							inc++;
							break;
						}
					}											
					if( inc == 0 ){
						// Ajoute l'élement
						inc = oEl.drag.elp.length;
						oEl.drag.elp[inc] = el;
						oEl.drag.elp[inc].id = el.id;
						oEl.drag.elp[inc].stopX = x;
						oEl.drag.elp[inc].stopY = y;
						oEl.drag.elp[inc].incX = 0;
						oEl.drag.elp[inc].incY = 0;
						oEl.drag.elp[inc].dX = 0;
						oEl.drag.elp[inc].dY = 0;
						oEl.drag.elp[inc].coef = 1;
						oEl.drag.elp[inc].start = false;
					}

					//Vérifie si un autre élément est en cours de déplacement
					for( var i = 0; i <  oEl.drag.elp.length; i++){
						if( oEl.drag.elp[i].start == true ){
							return false;
						}
					}
					
					// destination non renseigné à l'origine
					if( isNaN(el.stopX) || isNaN(el.stopY) ){						
						oBox.error("Aucune destination  passé à la fonction <kbd>oEl.drag.progress</kbd>");
						return Stop();
					}
				}
				
				// réassigne le premier élément
				el = oEl.drag.elp[0];
				
				if( !oEl.isobject(el) ){
					oBox.error("Aucun objet passé à la fonction <kbd>oEl.drag.progress</kbd>");
					return Stop();						
				}
				
				// arrêt du déplacement progressif de l'élément en cours
				function Stop(){					
					oEl.drag.elp.shift();	// supprime le premier élément du tableau					
					if(oEl.drag.elp.length > 0){
						oEl.drag.elp[0].start = false;					
						Start();
					}
					return false;
				}
				
				// démarrage du déplacement progressif du premier premier élément
				function Start(){
					window.setTimeout(oEl.drag.progress, 1);					
				}				
				
				// récupère la position actuelle de l'élément
				var left = ( el.style.left ) ? parseFloat(el.style.left) : parseFloat(oEl.getstyleclass(el, "left"));
				var top = ( el.style.top ) ? parseFloat(el.style.top) : parseFloat(oEl.getstyleclass(el, "top"));
				
				// position de l'élément inconnue
				if ( isNaN(left) || isNaN(top) ){
					oBox.error("Impossible de récupérer la position de l'élément <kbd>" + el.id + "</kbd> passé dans la fonction <kbd>oEl.drag.progress</kbd>");
					return Stop();
				}	
				
				// déplacement linéaire de l'élément
				if( el.start == false ){
					// applique la position à l'élément au cas ou
					el.style.left = oText.toPx(left);
					el.style.top = oText.toPx(top);
					// distances à parcourir
					el.dX = parseInt(el.stopX - left);
					el.dY = parseInt(el.stopY - top);
					el.dX = ( el.dX < 0 ) ? -el.dX : el.dX;
					el.dY = ( el.dY < 0 ) ? -el.dY : el.dY;
					// le pas positif ou négatif
					el.incX = ( left < el.stopX ) ? 10 : -10;
					el.incY = ( top < el.stopY ) ? 10 : -10;
					// coéficient et compteur pour le déplacement linéaire
					el.coef = 1;
					el.count = 0;
					if( el.dX < el.dY && el.dX != 0 ){
						el.coef = Math.round( el.dY / el.dX );
					}
					if( el.dX > el.dY && el.dY != 0 ){
						el.coef = Math.round( x / el.dY );
					}					
					if( el.coef < 0 ) el.coef = -el.coef;
					if( el.coef == 0 ) el.coef = 1;					
					el.start = true;					
				}
				el.count++;				
				
				// déplacement X de l'élément si pas à destination
				if( ( el.incX > 0 && left < el.stopX ) || ( el.incX < 0 && left > el.stopX ) ){
					if( el.dX < el.dY ){
						if ( el.count == el.coef ){
							el.style.left = oText.toPx( parseFloat(el.style.left) + el.incX  );
							el.count = 0;
						}
					}else{
						el.style.left = oText.toPx( parseFloat(el.style.left) + el.incX  );
					}
				}else{
					// position de destination
					el.style.left = oText.toPx(el.stopX);
				}				
				// déplacement Y de l'élément si pas à destination
				if( ( el.incY > 0 && top < el.stopY ) || ( el.incY < 0 && top > el.stopY ) ){
					if( el.dY < el.dX ){
						if( el.count == el.coef ){
							el.style.top = oText.toPx( parseFloat(el.style.top) + el.incY );	
							el.count = 0;
						}
					}else{
						el.style.top = oText.toPx( parseFloat(el.style.top) + el.incY );
					}
				}else{
					// position de destination
					el.style.top = oText.toPx(el.stopY);
				}								
				// arrêt du déplacement si X et Y ont atteind la destination
				if( parseFloat(el.style.left) == el.stopX && parseFloat(el.style.top) == el.stopY ){
					return Stop();
				}				
				
				// relance la fonction jusqu'a la position
				Start();
			};		
		};
		
		this.inc = new function(){	// traitement des champs input de type text ayant la cla
			this.el = [];						// collection d'éléments incrémentables
			this.mini = [];						// valeurs mini des éléments
			this.maxi = [];						// valeurs maxi des éléments
			this.deft = [];						// valeur par défaut des éléments
			this.step = [];						// valeurs de l'incrément des éléments			
			this.cl = "jaria_inc";		// class utilisée pour les champs incrémentables
			
			this.get = function(el){		// retourne l'élement si déjà traité
				if( oEl.test(el) ){
					el = oEl.get(el);
					for( var i = 0; i < oEl.inc.el.length; i++ ){
						if( oEl.inc.el[i] == el ){
							return el;
						}
					}
				}
				return undefined;
			};
			
			this.button = function(id, image, title, f){
				var img = oEl.create("img");
				img.src = jaria.images + "button/button_" + image + ".png";
				img.style.cursor = "pointer";
				img.style.width = "12px";
				img.style.height = "12px";
				img.style.display = "block";
				img.alt = id;
				img.onclick = f;
				img.title = title;
				img.onmouseover = function(){
					this.src = jaria.images + "button/button_" + image + "_hover.png";
				};
				img.onmouseout = function(){
					this.src = jaria.images + "button/button_" + image + ".png";
				};
				return img;
			};
			
			this.getindex = function(el){			// retourne  l'index de l'élement si déjà traité
				if( !oEl.isobject(el) ){
					if( !oEl.test(el) ){
						return -1;
					}else{
						el = oEl.get(el);
					}
				}
				for( var i = 0; i < oEl.inc.el.length; i++ ){
					if( oEl.inc.el[i].id == el.id ){
						return i;
					}
				}
				return -1;			
			};
			
			this.params = function(){
				/*
					argument 0 obligatoire: élément ou identifiant de l'élément
					argument 1 obligatoire: valeur mini (numérique)
					argument 2 obligatoire: valeur maxi (numérique)
					argument 3 obligatoire: valeur incr	 (numérique)
					argument 4 facultatif:  valeur par défaut (numérique)
				*/
				if( arguments.length < 4 ){
					return false;	
				}
				var el = arguments[0];				
				if( !oEl.isobject(el) ){
					if( oEl.test(el) ){
						el = oEl.get(el);						
					}
				}
				if( !oEl.test(el) || isNaN(arguments[1]) || isNaN(arguments[2]) || isNaN(arguments[3]) ){
					return false;
				}
				var index = oEl.inc.getindex(el);
				if( index == -1 ){
					return false;
				}
				oEl.inc.mini[index] = parseFloat(arguments[1]);
				oEl.inc.maxi[index] = parseFloat(arguments[2]);
				oEl.inc.step[index] = parseFloat(arguments[3]);
				oEl.inc.deft[index] = ( arguments.length > 4 ) ? parseFloat(arguments[4]) : "0";
				el.maxLength = (oEl.inc.mini[index] > oEl.inc.maxi[index]) ? (oEl.inc.mini[index]).toString().length : (oEl.inc.maxi[index]).toString().length;	
				el.value = oEl.inc.deft[index];
			};
			
			this.make = function(el){				// contruit l'élément incrémentable
				el.readOnly = "readonly";
				var parent = el.parentNode;
				parent.style.overflow = "hidden";
				var divd = oEl.create("div");
				if( oNav.msie ){
					divd.style.styleFloat = "left";
				}else{
					divd.style.cssFloat = "left";
				}				
				divd.style.width = "11px";
				divd.style.height = oText.toPx(el.offsetHeight);
				divd.style.marginRight = "10px";
				var divg = oEl.create("div");				
				if( oNav.msie ){
					divg.style.styleFloat = "left";
				}else{
					divg.style.cssFloat = "left";
				}				
				divg.style.width = oText.toPx(el.offsetWidth);												
				parent.insertBefore(divd, el);
				parent.insertBefore(divg, divd);
				var newel = el.cloneNode(false);
				divg.appendChild(newel);
				parent.removeChild(el);
				divd.appendChild(this.button(el.id, "more", "+", function(){
					var el = oEl.get(this.alt);
					var index = oEl.inc.getindex(el);
					if( isNaN(el.value) ){
						el.value = oEl.inc.deft[index];
					}
					var value = parseFloat(el.value) + parseFloat(oEl.inc.step[index]);
					value = Math.round(value * 10000) / 10000;
					if( value > oEl.inc.maxi[index] ){
						value = oEl.inc.maxi[index] ;
					}
					el.value = (value).toString();
					if( typeof(el.onchange) == "function" ){
						 el.onchange();	
					}
				}));	
				divd.appendChild(this.button(el.id, "less", "-", function(){
					var el = oEl.get(this.alt);
					var index = oEl.inc.getindex(el);
					if( isNaN(el.value) ){
						el.value = oEl.inc.deft[index];
					}
					var value = parseFloat(el.value) - parseFloat(oEl.inc.step[index]);
					value = Math.round(value * 10000) / 10000;
					if( value < oEl.inc.mini[index] ){
						value = oEl.inc.mini[index] ;
					}
					el.value = (value).toString();
					if( typeof(el.onchange) == "function" ){
						 el.onchange();
					}
				}));				
			};
			
			this.init = function(){				// initilise les champs incrémentables
				var a = oEl.getclass(oEl.inc.cl, "", true);
				if( a.length > 0 ){
					for( var i = 0; i < a.length; i++ ){
						var e = oEl.inc.get(a[i]);					 
						if( e == undefined && a[i].tagName.toLowerCase() == "input" && a[i].type.toLowerCase() == "text" ){
							oEl.inc.make(a[i]);											
							var index = oEl.inc.el.length;
							oEl.inc.el[index] = a[i];
							oEl.inc.mini[index] = -999;
							oEl.inc.maxi[index] = 999;
							oEl.inc.deft[index] = 0;
							oEl.inc.step[index] = 1;							
							a[i].maxlength = "3";							
						}
					}
				}				
			};			
		};
		
		this.chrono = new function(){	// fonction chronomètre
			this.timer = null;
			this.time = 0;			
			this.el = undefined;
			
			this.set = function(){
				this.time++;
				var t = (this.time / 10);
				this.el.value = t.toString();
			};
			
			this.start = function(){
				if( arguments.length == 0 || this.timer != null ){
					return false;
				}
				var id = arguments[0].toString();
				if( oEl.test(id) ){
					this.el = oEl.get(id);
					this.timer = window.setInterval("oEl.chrono.set()", 100);
				}				
			};
			
			this.pause = function(){
				if( this.timer != null ){
					window.clearInterval(this.timer);
					this.timer = null;
				}
			};
			
			this.stop = function(raz){
				this.pause();				
				if(raz && this.el != undefined)
				{
					this.el.value = "0";
				}
				this.init();
			};
			
			this.init = function(){
				this.time = 0;
				this.el = undefined;
			};
		};
	};

	//OK
	function Box(){										// boîtes de dialogues personalisées [box]		
	
		var _this = this;
	
		this.type = 1;								// 1: information | 2: confirmation | 3: alerte | 4: erreur
		this.ico = 1;								// plus utilisé depuis le 05/11/2011
		this.bts = 1;								// affiche le(s) bouton(s)
		this.quit = 1;								// affiche le bouton quitter dans la barre de titre de la box
		this.title = "";							// tire dans la barre de titre de la box
		this.html = "";								// html du message de la box
		this.focus = 1;								// focus sur le bouton de la box
		this.el = undefined;						// élement Box
		this.posX = 0;								// décalage horizontal par rapport au centre
		this.posY = 0;								// décalage vertical par rapport au centre
		this.width = null;							// redéfini la largeur de la box (400px par défaut)
		this.exist = 0;								// box affichée
		this.lineheight = null;						// hauteur des interlignes du texte HTML
		this.status = false;						// affichage de la barre de status
		this.borderColor = null;					// couleur du contour de la box
		this.color = null;							// couleur du texte de la box
		this.backColor = null;						// couleur de fond de la box
		this.backImage = null;						// image de fond de la box
		this.fader = true;							// affichage progressif de la box
		this.shadow = true;							// ombre de la boîte de dialogue
		this.radius = true;							// bords arrondis
		this.timer = null;
		this.modal = true;							//boîte de dialogue rendu modal par le locking
		
		this.info = function(text, title, width){							// affiche la box d'info
			this.borderColor = "#06b68f";
			this.html = text;
			this.type = 1;
			this.title = (oText.test(title)) ? title : "Information";
			this.width = width;
			this.show();
		};

		this.confirm = function(text, title, width){							// affiche la box de confirmation
			this.html = text;
			this.type = 2;
			this.borderColor = "#0661b6";
			this.title = (oText.test(title)) ? title : "Confirmation";
			this.width = width;
			this.show();
			this.el.BtNo = oEl.create("button");
			this.el.Spa = oEl.create("span");
			this.el.BtOk.innerHTML = "Oui";
			this.el.BtNo.className = "jaria_button";
			this.el.BtNo.style.width = "50px";
			this.el.BtNo.innerHTML = "Non";
			this.el.BtNo.onclick = function(){
				_this.el.Bts.innerHTML = "<img src='" + jaria.images + "loadimg.gif' />";
				_this.annul();
			};
			this.el.BtOk.onclick = function(){
				_this.el.Bts.innerHTML = "<img src='" + jaria.images + "loadimg.gif' />";
				_this.valid();
			};
			this.el.Spa.innerHTML = oText.repeat("&nbsp;", 4);
			this.el.Bts.appendChild(this.el.Spa);
			this.el.Bts.appendChild(this.el.BtNo);			
		};
		
		this.alert = function(text, title, width){							// affiche la box d'alerte
			this.borderColor = "#c6b01e";
			this.html = text;
			this.type = 3;
			this.title = (oText.test(title)) ? title : "Alerte!";
			this.width = width;
			this.show();
		};

		
		this.error = function(text, title, width){							// affiche la box d'erreur
			this.borderColor = "#ea5247";
			this.html = text;
			this.type = 4;
			this.title = (oText.test(title)) ? title : "Erreur interne!";
			this.width = width;
			this.show();
		};
		
		this.wait = function(){							// affiche la box d'attente
			this.html = "<div style='text-align:center'><img src='" + jaria.images + "loadimg.gif' /></div>";
			this.show();
		};
		
		this.annul = function(){
			_this.hide();
			// annulation de la confirmation de la box
		};
		
		this.valid = function(){
			_this.hide();
			// validation de la confirmation de la box
		};
		
		this.addbutton = function(lib, f){
			if( !_this.exist || typeof(lib) != "string" || lib == "" || typeof(f) != "function" ){
				return false;
			}
			var bt = oEl.create("button");
			var sp = oEl.create("span");
			bt.onclick = function(){
				f();
			};
			bt.innerHTML = lib;
			bt.className = "jaria_button";
			bt.style.width = oText.toPx(10 * lib.length);
			sp.innerHTML = oText.repeat("&nbsp;", 4);;
			_this.el.Bts.appendChild(sp);
			_this.el.Bts.appendChild(bt);
		};
		
		this.setColorText = function(c){
			try{
				c = (c == null) ? this.el.style.backgroundColor : c;
				var rgb = ( oColor.iscolor(c) ) ? oColor.hexa_rgb(c) : c;
				var t = rgb.toString().split(/,/g);
				var r = parseFloat(t[0].replace("rgb(", ""));
				var g = parseFloat(t[1]);
				var b = parseFloat(t[2].replace(")", ""));
				c = ( (0.3 * (r)) + (0.59 * (g)) + (0.11 * (b)) <= 128)  ? "#FFFFFF" : "#333333";
				return c;
			}
			catch(e){
				return "#FFFFFC";
			}
		};
		
		this.show = function(){							// affiche la box [show]
			if( !oNav.ready ){
				return false;
			}	
			if( !oText.test(_this.html) ){
				this.error("le texte html de boite de dialogue est obligatoire!");
			}
			if( _this.type < _this.exist ){	// on priorise les boites de dialogue				
				return false;
			}
			oEl.del(_this.el);
			if(_this.modal){
				oNav.lock.show();
			}
			oText.select(false);
			_this.el = oEl.create("div");
			_this.el.id = "oBox";
			_this.el.Head = oEl.create("div");
			_this.el.Title = oEl.create("div");
			_this.el.Quit = oEl.create("div");
			_this.el.Body = oEl.create("div");
			_this.el.Html = oEl.create("div");
			_this.el.Bts = oEl.create("div");			
			_this.el.className = "jaria_box";			
			if( _this.borderColor != null ){
				_this.el.style.backgroundColor = _this.borderColor;
			}
			_this.el.Title.style.color = _this.setColorText();
			_this.width = ( _this.width != null && !isNaN(_this.width) && _this.width > 400 && _this.width <= 2000 ) ? _this.width : 400;
			// décalages paramétrés x et y
			_this.posX = ( !isNaN(_this.posX) ) ? parseInt(_this.posX) : 0;
			_this.posY = ( !isNaN(_this.posY) ) ? parseInt(_this.posY) : 0;
			_this.lineheight = ( !isNaN(_this.lineheight) && parseFloat(_this.lineheight) >= 15 && parseFloat(_this.lineheight) <= 100 ) ? parseInt(_this.lineheight) : 15;
			_this.el.style.width = oText.toPx(_this.width);										
			_this.el.Head.onmousedown = function(event){
				_this.drag(event);
			};
			_this.el.Head.className = "jaria_boxhead";
			_this.el.Title.title = "Déplacer";
			_this.el.Title.className = "jaria_boxtitre";
			_this.el.Title.innerHTML = ( _this.title != "" ) ? oText.encode(oText.firstUp(_this.title)) : "&nbsp;";
			_this.el.Html.className = "jaria_boxhtml";
			_this.el.Body.className = "jaria_boxbody";
			if( _this.radius ){
				_this.el.style.borderRadius = "7px";
				if( !_this.status ){
					_this.el.Body.style.borderRadius = "0px 0px 7px 7px";				
				}	
			}
			if( oColor.iscolor(_this.color) ){
				_this.el.Html.style.color = _this.color;
			}
			if( oColor.iscolor(_this.backColor) ){
				_this.el.Body.style.backgroundColor = _this.backColor;
			}
			if( _this.backImage != null ){
				_this.el.Body.style.backgroundImage = "url(" + _this.backImage + ")";
			}
			if( _this.lineheight != null ){
				_this.el.Html.style.lineHeight = oText.toPx(_this.lineheight);
			}
			_this.el.Quit.className = "jaria_boxclose";
			_this.el.Html.innerHTML = oText.encode(_this.html);
			_this.el.Head.appendChild(_this.el.Title);
			if( _this.quit ){
				var img = oEl.create("img");
				img.src = jaria.images + "box/btclose.png";
				img.alt = "";
				img.title = "Fermer [escape]";
				img.style.cursor = "pointer";
				img.style.marginTop = "3px";
				img.onmouseover = function(){
					_this.src = jaria.images + "box/btclose_hover.png";
				};
				img.onmouseout = function(){
					_this.src = jaria.images + "box/btclose.png";
				};
				img.onclick = function(){
					_this.annul();
				};
				_this.el.Quit.appendChild(img);
				_this.el.Head.appendChild(_this.el.Quit);
			}			
			_this.el.appendChild(_this.el.Head);			
			_this.el.Body.appendChild(_this.el.Html);			
			if( _this.bts ){
				_this.el.Bts.className = "jaria_boxboutons";				
				_this.el.BtOk = oEl.create("button");
				_this.el.BtOk.className = "jaria_button";
				_this.el.BtOk.style.width = "50px";
				_this.el.BtOk.innerHTML = "Ok";
				_this.el.BtOk.onclick = function(){
					_this.hide();
				};
				_this.el.Bts.appendChild(_this.el.BtOk);
				_this.el.Body.appendChild(_this.el.Bts);
			}
			_this.el.appendChild(_this.el.Body);
			oNav.body.appendChild(_this.el);
			_this.exist = _this.type;	
			if( _this.fader ){
				oEl.opacity(_this.el, 0);
				oEl.fader.plus(_this.el);
			}		
			
			_this.setTitleWidth();
			
			if( _this.status ){
				_this.el.status = oEl.create("div");
				_this.el.status.className = "jaria_boxstatus";
				_this.el.status.innerHTML = "&nbsp;";
				_this.el.status.title = "Redimensionner";
				oEl.addclass(_this.el.Html, "jaria_boxscroll");
				_this.el.status.onmousedown = _this.ResizeStart;
				_this.el.status.onmouseup = _this.ResizeStop;
				document.onmouseup = _this.ResizeStop;
				oNav.lock.el.onmouseup = _this.ResizeStop;
				_this.el.Html.onmouseup =  _this.ResizeStop;
				_this.el.Bts.onmouseup =  _this.ResizeStop;
				_this.el.posStartX = null;
				_this.el.posStartY = null;
				_this.el.Html.startX = _this.el.Body.offsetWidth;
				_this.el.Html.startY = _this.el.Body.offsetHeight;
				_this.el.appendChild(_this.el.status);
				_this.el.Body.style.marginBottom = "0px";
				if( _this.radius ){
					_this.el.status.style.borderRadius = "0px 0px 7px 7px";
				}
			}					
			_this.center();						//centre la box

			if( _this.bts && _this.focus ){
				_this.el.BtOk.focus();	// focus sur le bouton Ok ou Oui
			}
			
			/* redéfini la fonction oNav.hideallbox pour prendre en compte la box dans l'événement de la touche ESCAPE */
			var fn = oNav.hideallbox;
			oNav.hideallbox = function(){
				fn();
				_this.hide();
			};
			
			oNav.addevent("onresize", _this.center);
			oNav.addevent("onscroll", _this.center);
			
		};
		
		this.setTitleWidth = function(){
			this.el.Title.style.width = oText.toPx(this.el.offsetWidth - this.el.Quit.offsetWidth - 6);			
		};
		
		this.setshadow = function(){
			if( _this.el && _this.shadow && _this.exist ){
				oEl.del(_this.el.shadow);
				_this.el.shadow = oEl.create("div");
				_this.el.shadow.className = "jaria_boxshadow";				
				_this.el.shadow.style.width = oText.toPx(oEl.getoffset(_this.el, "width"));
				_this.el.shadow.style.height = oText.toPx(oEl.getoffset(_this.el, "height"));
				_this.el.shadow.style.top = oText.toPx(oEl.getoffset(_this.el, "top") + 8);
				_this.el.shadow.style.left = oText.toPx(oEl.getoffset(_this.el, "left") + 8);
				if( this.radius ){
					_this.el.shadow.style.borderRadius = "7px";
				}
				oNav.body.appendChild(_this.el.shadow);
				oEl.opacity(_this.el.shadow, 20);
				//CSS3//_this.el.style.boxShadow = "4px 4px 8px #999";
			}			
		};
		
		this.hide = function(){							// détruit la box
			if(_this.el){
				if(_this.modal){
					oNav.lock.hide();
				}
				oNav.delevent("onresize", _this.center);
				oNav.delevent("onscroll", _this.center);	
				_this.type = 1;
				_this.exist = 0;
				_this.html = "";
				_this.title = "";
				_this.posX = 0;
				_this.posY = 0;
				_this.width = null;
				_this.bts = 1;
				_this.quit = 1;
				_this.status = false;
				_this.focus = 1;
				_this.lineheight = 15;
				_this.color = null;
				_this.borderColor = null;
				_this.backColor = null;
				_this.backImage = null;
				oText.select(true);	
				oEl.title.hide();							// détruit l'éventuelle infobulle
				oEl.del(_this.el);
				try{
					oEl.del(_this.el.shadow);
				}catch(e){}
				_this.el = undefined;
				_this.fader = true;
				_this.shadow = true;

			}
		};
		
		this.drag = function(event){					// démarrage du déplacement de la box
			oEl.drag.opacity = 65;						// transparence de l'élément pendant le déplacement
			oEl.drag.start(_this.el, event);
		};
		
		this.center = function(){						//Centre la box et son ombre dans la fenêtre du navigateur
			if(_this.el == undefined){
				return false;
			}
			oNav.scroll();
			// position centrale de la box
			var x = parseInt( (oNav.screenX / 2) - (_this.el.offsetWidth / 2) + oNav.scrollX + oBox.posX );
			var y = parseInt( (oNav.screenY / 2) - (_this.el.offsetHeight / 2) + oNav.scrollY + oBox.posY );
			_this.el.style.left = oText.toPx(x);
			_this.el.style.top = oText.toPx(y);				
			oEl.setinscreen(_this.el);
			_this.setshadow();		
		};
		
		this.resizeY = function(height){      			// redimentionne la hauteur de la box 
				if(_this.el){
					_this.el.Html.style.height = oText.toPx(height);
					_this.el.style.height = oText.toPx(_this.el.Head.offsetHeight + _this.el.Html.offsetHeight + _this.el.Bts.offsetHeight + _this.el.status.offsetHeight + 3);
					_this.setshadow();
				}
		};
	
		this.resizeX = function(width){      			// redimentionne la largeur de la box
				if(_this.el){
					_this.el.Html.style.width = oText.toPx(width);
					_this.el.style.width = oText.toPx(_this.el.Html.offsetWidth);
					_this.setshadow();
				}
		};
		
		this.onResize = function(){
			//Fonction appelée lors du redimentionnement de la box pouvant être redéfinie
		};

		this.ResizeStart = function(){					// démarrage du redimensionnmeent de la box par la barre de status
			function move(){
				try{
					var height = parseInt(_this.el.Html.startY) + parseInt(oNav.mouse.Y) - oNav.scrollY - _this.el.posStartY;
					if( typeof( height ) == "number" && height >= 40 ){
						_this.el.Html.style.height = oText.toPx(height);
						_this.el.style.height = oText.toPx(_this.el.Head.offsetHeight + _this.el.Html.offsetHeight + _this.el.Bts.offsetHeight + _this.el.status.offsetHeight + 3);
					}
					var width = parseInt(_this.el.Html.startX) + parseInt(oNav.mouse.X) - oNav.scrollX - _this.el.posStartX;
					if( typeof( width ) == "number" && width >= _this.width ){
						_this.el.Html.style.width = oText.toPx(width);
						_this.el.style.width = oText.toPx(_this.el.Html.offsetWidth);
					}
					if( _this.shadow ){
						_this.el.shadow.style.height = oText.toPx(oEl.getoffset(_this.el, "height"));
						_this.el.shadow.style.width = oText.toPx(oEl.getoffset(_this.el, "width"));
					}
					_this.setTitleWidth();
					_this.onResize();
				}
				catch(e){
					_this.ResizeStop();
				}				
			}
			if( !_this.exist ){
				return false;
			}
			oEl.opacity(_this.el, 75);
			oEl.opacity(_this.el.shadow, 10);
			oText.select(false);
			if( _this.el.posStartY == null ){
				_this.el.posStartY = parseInt(oNav.mouse.Y) - oNav.scrollY;
				_this.el.posStartX = parseInt(oNav.mouse.X) - oNav.scrollX;
			}
			if( oEl.getstyleclass(_this.el.status, "cursor") != undefined ){
				oNav.lock.el.style.cursor = oEl.getstyleclass(_this.el.status, "cursor");
				_this.el.style.cursor = oEl.getstyleclass(_this.el.status, "cursor");
			}
			_this.el.status.onmousemove = move;
			oNav.lock.el.onmousemove = move;
			_this.el.Html.onmousemove = move;
		};
		
		this.ResizeStop = function(){					// arrêt du redimensionnmeent de la box
			if(_this.el){
				oEl.opacity(_this.el, 100);
				oEl.opacity(_this.el.shadow, 20);
				_this.el.posStartX = null;
				_this.el.posStartY = null;
				document.onmouseup = null;
				oNav.lock.el.style.cursor = "default";
				_this.el.style.cursor = "default";
				oText.select(true);
				_this.el.Html.startY = _this.el.Body.offsetHeight;
				_this.el.Html.startX = _this.el.Body.offsetWidth;
				_this.el.status.onmousemove = function(){return false;};
				oNav.lock.el.onmousemove = function(){};
				_this.el.Html.onmousemove = function(){};
			}
		};	
		
	}
	
	function Cal(){
		
		var _this = this;
		
		this.datepicker = new function(){			// fonction externalisée redéfinie dans le fichier jaria_datepicker.js
			this.hide = function(){};
		};
		
		this.timepicker = new function(){			// fonction externalisée redéfinie dans le fichier jaria_timepicker.js
			this.hide = function(){};
		};
		
		this.daymonth = function(m, y){				// retourne le nombre de jours dans un mois de l'année
			var d = ( _this.bissextile(parseInt(y)) ) ? 29 : 28;
			var t = new Array(31, d, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
			return parseInt( t[parseInt(m)-1] );			
		};
		
		this.addday = function(dt, inc){
			if( !_this.isdate(dt) ){
				return "";
			}
			if( isNaN(inc) ){
				return dt;
			}
			var t = dt.toString().split("/");
			var nd = new Date( parseFloat(t[2]), parseFloat(t[1]) - 1, parseFloat(t[0]) );	
			dt = new Date( nd.getTime() + (1000 * 60 * 60 * 24 * parseInt(inc)) );
			var d = dt.getDate();
			var m = dt.getMonth() + 1;
			var y = dt.getFullYear();
			dt = ((d < 10) ? "0" + d : d) + "/" + ((m < 10) ? "0" + m : m) + "/" + ((y < 1900) ? 1900 : y);
			return dt;
		};
		
		this.addmonth = function(dt, inc){
			if( !_this.isdate(dt) ){
				return "";
			}
			if( isNaN(inc) ){
				return dt;
			}
			var tab = dt.toString().split("/");
			var nd = new Date( parseFloat(tab[2]), parseFloat(tab[1]) + inc - 1, parseFloat(tab[0]) );
			var y = nd.getFullYear();
			var m = nd.getMonth() + 1;
			var d = nd.getDate();
			dt = ((d < 10) ? "0" + d : d) + "/" + ((m < 10) ? "0" + m : m) + "/" + ((y < 1900) ? 1900 : y);
			return dt;
		};
		
		this.addyear = function(dt, inc){
			if( !_this.isdate(dt) ){
				return "";
			}
			var tab = dt.toString().split("/");
			var nd = new Date( parseFloat(tab[2]) + inc, parseFloat(tab[1]) - 1, parseFloat(tab[0]) );
			var y = nd.getFullYear();
			var m = nd.getMonth() + 1;
			var day = nd.getDate();			
			dt = ((day < 10) ? "0" + day : day) + "/" + ((m < 10) ? "0" + m : m) + "/" + ((y < 1900) ? 1900 : y);
			return dt;
		};
		
		this.datediff = function(du, au){				// retourne le nombre de jours entre 2 dates
			if( arguments.length < 2 ){
				return 0;
			}
			if( !_this.isdate(du) || !_this.isdate(au) ){
				return 0;
			}
			var tdu = du.split("/");
			var tau = au.split("/");
			var j = 1000 * 60 * 60 * 24;
			du = new Date();
			au = new Date();
			du.setDate( parseFloat(tdu[0]) );
			du.setMonth(parseFloat(tdu[1]) - 1 );
			du.setFullYear(parseFloat(tdu[2]) );			
			au.setDate( parseFloat(tau[0]) );
			au.setMonth( parseFloat(tau[1]) - 1 );
			au.setFullYear( parseFloat(tau[2]) );
			return ( parseInt(au.getTime() / j) - parseInt(du.getTime() / j) );		
		};
		
		this.bissextile = function(y){				// année bissextile
			if( isNaN(y) ){
				return false;
			}
			if( y%100 == 0 ){
				return ( y%400 == 0 ) ? true : false;
			}else{
				return ( y%4 == 0 ) ? true : false;
			}
		};
				
		this.isdate = function(dt, f){					// contrÃ´le la date
			
				/* 
				argument 0 obligatoire : string date
				argument 1 facultatif : format					ex: [AA]AAMMJJ, JJ/MM/[AA]AA, MM-JJ-[AA]AA... par défaut: JJ/MM/AAAA
			*/		
		
			if( !oText.test(dt) ){
				return false;
			}
			var d, m, y;
			if( oText.test(f) ){				
				if( dt.length != f.length ){
					return false;
				}
				if( dt.length > 10 ){
					return false;
				}
				if ( f.indexOf("AAAA") != -1 ) {
					y = dt.substr(f.indexOf("AAAA"), 4);					
				}
				else if( f.indexOf("AA") != -1 ) {
					y = "20" + dt.substr(f.indexOf("AA"), 2);				
				}
				if ( f.indexOf("MM") != -1 ) {
					m = dt.substr(f.indexOf("MM"), 2);
				}
				if ( f.indexOf("JJ") != -1 ) {
					d = dt.substr(f.indexOf("JJ"), 2);
				}
				if ( d == "" || m == "" || y == "" ){
					return false;
				}
				dt =  d + "/" + m + "/" + y;	
			}
			
			if( !(dt.search(/^(\d\d)(\/)(\d\d)(\/)(\d\d\d\d)$/) != -1) ){
				return false;
			}		

			var t = dt.split("/");
			if( t.length != 3 ){
				return false;
			}
			
			for( var i = 0; i < 3; i++ ){
				if( isNaN(t[i]) ){
					return false;
				}
				if( i == 0 && (parseFloat(t[i]) < 1 || parseFloat(t[i]) > 31) ){
					return false;
				}
				if( i == 1 && (parseFloat(t[i]) < 1 || parseFloat(t[i]) > 12) ){
					return false;
				}
				if( i == 2 && (parseFloat(t[i]) < 1900 || t[i].length > 4) ){
					return false;
				}
			}
			if( (parseFloat(t[0]) > 30) && (parseFloat(t[1]) == 4 || parseFloat(t[1]) == 6 || parseFloat(t[1]) == 9 || parseFloat(t[1]) == 11) ){
				return false;
			}
			day = 28;
			if( _this.bissextile(parseFloat(t[2])) ){
				day = 29;
			}
			if( parseFloat(t[0]) > day && parseFloat(t[1]) == 2 ){
				return false;
			};
			return true;		
		};
		
		this.datetostring = function(){
			// argument 0 obligatoire : date
			if( arguments.lenth == 0 ){
				return "";
			}
			try{
				d = arguments[0];
				var j = d.getDate().toString();
				var m = (d.getMonth() + 1).toString();
				var y =  d.getFullYear().toString();
				j = (j.length > 1) ? j : "0" + j;
				m = (m.length > 1) ? m : "0" + m;				 
				return j + "/" + m + "/" + y;
			}
			catch(e){
				return "";
			}
		};
	
		this.format = function(){
			/* 
				argument 0 obligatoire : string date
				argument 1 obligatoire : format					ex: [AA]AAMMJJ, JJ/MM/[AA]AA, MM-JJ-[AA]AA...
			*/
			if( arguments.lenth < 2 ){
				oBox.error("Il manque des arguments à la function Cal.format()!");
				return "";
			}
			var dt = arguments[0].toString();
			var f = arguments[1].toString().toUpperCase();
			if( !_this.isdate(dt) && ( !isNaN(dt) && dt.length != 8 ) ){
				oBox.error("Le format de date <kbd>" + dt + "</kbd> passé à la fonction Cal.format() est incorrecte!");
				return "";				
			}
			if( _this.isdate(dt) ){
				var t = dt.split("/");
				var d = t[0];
				var m = t[1];
				var y = t[2];				
			}else if( !isNaN(dt) && dt.length == 8 ){
				var d = dt.substr(6, 2);
				var m = dt.substr(4, 2);
				var y = dt.substr(0, 4);
			}
			f = ( f.indexOf("AAAA") != -1 ) ? f.replace("AAAA", y) : f.replace("AA", y.substr(2, 2));
			f = f.replace("MM", m);
			f = f.replace("JJ", d);
			return f;			
		};
		
	}
	
	//OK
	function Color(){								// Gestion et affichage du panel de couleurs
	
		_this = this;
		
		this.picker = new function(){	// fonction externalisée redéfinie dans le fichier jaria_colorpicker.js
			this.hide = function(){};
		};
		
		this.shortvershexa = function(c){
			if( !oText.test(c) ){
				return false;
			}
			c = c.toUpperCase();
			if(c.toString().length == 4){				
				var h, r;
				var t = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
				for( var i = 0; i < t.length; i++){					
					h = t[i].toUpperCase();
					if(c.lastIndexOf(h) != -1){
						r = new RegExp(h, "g");
						c = c.replace(r, h + h);
					}
				}
			}
			return c;
		};
		
		this.iscolor = function(c){
			if( !oText.test(c) ){
				return false;
			}
			if(c.toString().length != 7){
				return false;
			}
			if(c.toString().substr(0, 1) != "#"){
				return false;
			}
			var car = c.toString().substr(1, 7).toUpperCase();
			for( var i = 0; i < car.length; i++ ){
				if( isNaN(car.substr(i, 1)) ){
					if( car.substr(i, 1) != "A" && car.substr(i, 1) != "B" && car.substr(i, 1) != "C" && car.substr(i,1) != "D" && car.substr(i,1) != "E" && car.substr(i,1) != "F" ){
						return false;
					}
				}
			}
			return true;
		};
		
		this.navcolor = function(c){
			c = _this.shortvershexa(c);
			return ( oNav.msie && parseFloat(oNav.version) < 9 ) ? c : _this.rgb_hexa(c);
		};	
			
		this.rgb_hexa = function(c){
			var cars = "0123456789ABCDEF";
			var hexa = "";
			var tab = c.split(",");
			var R = new String(tab[0]);
			R = R.split("(");
			tab[0] = R[1];
			var B = new String(tab[2]);
			tab[2] = B.replace(")", "");
			for( var i = 0; i < tab.length; i++ ){
				var N=parseInt(tab[i]);
				hexa += cars.charAt(N >> 4) + cars.charAt(N & 15);
			}
			hexa = oText.upper("#" + hexa);
			return hexa;			
		};		
		this.hexa_rgb = function(c){
			var s = (c.charAt(0)=="#") ? c.substring(1,7) : c;
			var r = parseInt(s.substring(0,2),16);
			var g = parseInt(s.substring(2,4),16);
			var b = parseInt(s.substring(4,6),16);
			return r + "," + g + "," + b		
		};
	}

	//OK
	function Ajax(){									// fonctions relatives à Ajax
	
		var _this = this;
				
		this.el = undefined;
		this.data = "";
		this.timer = null;
		this.ready = false;
		this.timeout = 10000;							// timout, 10s par défaut
		this.count = 0;									// nombre de tentative de récupération du host
		this.delai = 50;								// délai de répétition du timer
		this.fc = null;									// fonction passée en paramètre
		this.format = "text";							// format de retour
		this.asynchrone = true;							// transfert asynchrone

		this.create = function(){						// Création de l'objet Ajax
			if ( !oEl.isobject(_this.el) ){
				try{
					_this.el = new ActiveXObject("Msxml2.XMLHTTP");
				}catch(e){
					try{
						_this.el = new ActiveXObject("Microsoft.XMLHTTP");
					}catch(E){
						_this.el = new XMLHttpRequest();
					}
				}
			}			
		};
	
		this.del = function(){							// détruit l'objet Ajax
			_this.el = undefined;
			_this.data = "";
			_this.timer = null;
			_this.ready = false;
			_this.fc = null;
			_this.format = "text";
		};
		
		this.isobject = function(v){
			if( typeof(v) == "object" ){
				return true;
			}
			try{
				if( typeof(eval("(" + v + ")")) == "object" ){
					return true;
				}
			}
			catch(e){
			}
			return false;
		};
		
		this.toData = function(v){
			var s = "";
			if( _this.isobject(v) ){
				var o = v;
				if(typeof(v) == "string"){
					o = eval("(" + v + ")");
				}
				for (var d in o){
					if( s != "" ){
						s += "&";
					}
					s += oText.trim(d) + "=" + oText.trim(o[d].toString());
				}
			}				
			return s;
		};
		
		this.adddata = function(){
			if(arguments.length == 0){
				return false;
			}
			//Objet à convertir en chaine avec JSON
			if(arguments.length == 1){									
				_this.data = _this.toData(arguments[0]);
			}
			else{
				//Chaines à envoyées ( nom du champ, valeur du champ )
				if(arguments.length == 2 && !oText.test(arguments[0]) && !oText.test(arguments[1])){
					return false;
				}				
				if( oEl.isobject(_this.el) && arguments.length == 2 ){				
					if( _this.data != "" ){
						_this.data += "&";
					}
					_this.data += oText.trim(arguments[0].toString()) + "=" + oText.trim(arguments[1].toString());
				}
			}
		};

		this.init = function(){
			if ( !oEl.isobject(_this.el) ){
				_this.create();
			}
			_this.data = "";
			_this.ready = false;
		};
		
		this.send = function(file, methode){			// envoi des données à l'objet Ajax ( nom du fichier de données, méthode: post [défaut] ou get )
			if ( !_this.el || _this.data == null || arguments.length == 0 || _this.ready == true){
				return false;
			}
			_this.el.open( methode.toString().toUpperCase(), file.toString(), _this.asynchrone );
			_this.el.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
			_this.el.send(_this.data);
		};
		
		this.recept = function(){				// fonction de réception du traitement des données retournées par Ajax
			return false;
		};
		
		this.ontimeout = function(){				// fonction appelée en cas de dépassement du délai définie
			oBox.hide();
			oBox.alert("Le délai d'attente maximum de réponse du serveur évalué à " + (_this.timeout / 1000).toString() + "s . est dépassé.<br><br>Veuillez réessayer.", "Délai dépassé!"); 
			// ajoute une fonction de remise à zéro du compteur du timeout de l'objet Ajax sur le bouton de la boîte de dialogue
			oNav.addevent("onclick", function(){ _this.count = 0; }, oBox.el.BtOk);
		};
		
		this.onready = function(){			// execute une fonction passée en paramètre si le traitement des données par Ajax est terminée
			
			if ( !oEl.isobject(_this.el) ){
				return false;
			}
			
			// arguments
			for( var i = 0; i < arguments.length; i++ ){
				var a = arguments[i];
				if( typeof(a) == "function" ){
					_this.fc = a;
				}
				if( typeof(a) == "string" && (a == "text" || a == "xml" || a == "json") ){
					 _this.format = a;
				}
			}			
			
			_this.count += _this.delai;
			if( _this.count >= _this.timeout ){
				// délai défini dépassé
				_this.ontimeout();
				// initialise le compteur de délai au click du bouton de la box d'alerte				
				_this.del();
				_this.count = 0;
				return false;
			}
			if( _this.el.readyState == 4 && !_this.ready ){
				if( _this.el.status == 200 ){
					_this.ready = true;
					window.clearTimeout(_this.timer);
					_this.timer = null;	
					var t = _this.el.responseText.toString();
					var d;
					switch(_this.format){
						case "json":
							d = (!oText.isjson(t)) ? "" : JSON.parse(t);
							break;
						case "xml":
							d = _this.el.responseXML;
							break;
						default:
							d = t;
					}
					// appelle la fonction passé en paramètre avec le fomat de retour texte, xml ou json
					( typeof(_this.fc) == "function" ) ? _this.fc(d) : _this.recept(d);
					_this.del();
				}
			}				
			_this.timer = window.setTimeout(_this.onready, _this.delai);			
		};
		
		this.xmltostring = function(o){
			var s = (oNav.msie) ? o.xml : (new XMLSerializer()).serializeToString(o);
			return s;			
		};

	}
	
	//OK
	// fonctions pouvant être réinstenciées
	var oBox = new Box();								// Boîtes de dialogues personnalisées
	var oCal = new Cal();								// Gestion des dates
	var oColor = new Color();						// Objet sélecteur de couleurs et fonctions couleurs
	var oAjax = new Ajax();							// Objet d'accès au host par Ajax
	
	//OK
	// actions sur évènement
	window.onscroll = oNav.scroll;						// au déplacement des ascenseurs de la fenêtre du navigateur	
	window.onload = oNav.load;								// après chargement du document	
	window.onresize = oNav.size;							// au redimentonnement de la fenêtre du navigateur	
	document.onmousemove = oNav.mouse.move;		// au déplacement de la souris	
	document.onkeydown = oNav.keydown;				// lors d'une action sur les touches du clavier
	
	//OK
	// précharge toutes les images de la librairie jaria
	oNav.addevent("onload", function(){
		oNav.loadimage.start(
			jaria.images + "box/btresize.png",
			jaria.images + "box/btclose.png",
			jaria.images + "box/btclose_hover.png",	
			jaria.images + "bubble/bas.gif",
			jaria.images + "bubble/haut.gif",
			jaria.images + "button/button_blue.png",
			jaria.images + "button/button_gray.png",
			jaria.images + "button/button_yellow.png",
			jaria.images + "button/button_less_hover.png",
			jaria.images + "button/button_more_hover.png",
			jaria.images + "button/button_play.png",
			jaria.images + "button/button_stop.png",
			jaria.images + "button/button_select.png",
			jaria.images + "cal/date.gif",
			jaria.images + "cal/time.gif",
			jaria.images + "lock/1.gif",
			jaria.images + "lock/2.gif",
			jaria.images + "lock/3.gif",
			jaria.images + "lock/4.gif",
			jaria.images + "lock/5.gif",
			jaria.images + "lock/6.gif",
			jaria.images + "lock/7.gif",
			jaria.images + "lock/8.gif",
			jaria.images + "lock/9.gif",
			jaria.images + "lock/10.gif",
			jaria.images + "previsu/cadre.gif",
			jaria.images + "previsu/cadre_ombre.gif",
			jaria.images + "previsu/cadre_texte_c.gif",
			jaria.images + "previsu/cadre_texte_d.gif",
			jaria.images + "previsu/cadre_texte_g.gif",
			jaria.images + "trace/clear.png",
			jaria.images + "trace/pause.png",
			jaria.images + "trace/play.png",
			jaria.images + "enter.gif",
			jaria.images + "loadimg.gif",
			jaria.images + "loading.gif",
			jaria.images + "move.gif",
			jaria.images + "vide.gif"
		);
	});
	