	/*	Librairie JS JARIA
		Copyright (c) 2008 Jean-Pierre ARIA (jaria.free.fr)
		sources développeur */
		
	var jaria = new function(){					// paramètres globaux à la bilbiothèque
		this.version = "20130306";				// Date au format AAAAMMJJ de la version de la bibliothèque
		this.images = "jaria/images/";			// Chemin des images
	};
	
	var oText = new function(){								// Gestion des textes
	
		this.test = function(){
			// argument 0: string		facultatif
			if( arguments.length == 0 ){
				return false;	
			}
			if( typeof(arguments[0]) != "string" || arguments[0] == "" ){
				return false;
			}
			return true;
		};
		
		this.select = function(){
			/*
				argument 0: boolean		obligatoire
				argument 1: object		facultatif
			*/
			if( arguments.length == 0 ){
				return false;	
			}
			var state = arguments[0];
			if( typeof(state) != "boolean"){
				return false;
			}
			var el = ( arguments.length == 2 ) ? arguments[1] : undefined;			
			if( !oEl.isobject(el) ){
				if ( oEl.test(el) ) {
					el = oEl.get(el);
				}else{
					el = document;
				}
			}
			if( typeof(el.onselectstart) != "undefined" ){				
				el.onselectstart = function(){
					return state;
				}
			}else{
				el.onmousedown = function(){
					return state;
				}
			}			
		};
		
		this.left = function(s, n){			
			if (parseFloat(n) <= 0){
			    return "";
			}
			var t = (s).toString();
			if (n > t.length){
			    return t;
			}
			return t.substring(0, n);
		};
		
		this.right = function(s, n){			
		    if (parseFloat(n) <= 0){
		       return "";
		    }
		    var t = (s).toString();
		    if (n > t.length){
		       return t;
		    }
		    var l = (t).length;
		    return (t).substring(l, l - n);
		};
		
		this.upper = function(s){				// tout en majuscule
			return ( this.test(s) ) ? s.toString().toUpperCase() : "";
		};
		
		this.lower = function(s){				// tout en minuscule
			return ( this.test(s) ) ? s.toString().toLowerCase() : "";
		};
		
		this.firstUp = function(s){				// première lettre en majuscule et le reste en minuscule
			return ( this.test(s) ) ? s.toString().substr(0, 1).toUpperCase() + s.toString().substr(1, s.length).toLowerCase() : "";
		};
		
		this.trim = function(s){					// supprime ldes espaces à gauche et à droite de la chaine de caractères
			return ( this.test(s) ) ? s.toString().replace(/(^\s*)|(\s*$)/g,'') : "";
		};
		
		this.digit = function(){			// complète le nombre de x zéro à gauche
			/*
				argument 0: obligatoire		texte ou number
				argument 1: obligatoire		number
			*/
			var text = ( this.test(arguments[0]) || !isNaN(arguments[0]) ) ? arguments[0].toString() : "";
			var nb = ( !isNaN(arguments[1]) ) ? arguments[1] : 0;
			var zero = "";
			for( var i = 0; i < (parseInt(nb) - text.length); i++ ){
				zero += "0";
			}
			return ( text.length < nb ) ? zero + text : text;
		};
		
		this.round = function(){
			/*
				argument 0: decimal obligatoire		numérique
				argument 1: integer obligatoire		numérique
			*/
			if( arguments.length < 2 ){
				return "0";
			}
			var num = arguments[0];
			var p = arguments[1];
			if( isNaN(num) || isNaN(p) ){
				return "0";
			}
			var m = Math.pow(10, parseFloat(p));
			num = parseFloat(num) * m;
			num = ( Math.round(parseFloat(num)) == Math.ceil(parseFloat(num)) ) ? Math.ceil(parseFloat(num)) : Math.ceil(parseFloat(num)) - 1;
			num = parseFloat(num) / m;
			if( isNaN(num) ){
				return "0";
			}			
			return (num).toString();
		};
			
		this.daymonth = function(number){				// retourne le jour ou le mois sur 2 caractères en complètant par un zéro
			return ( number.toString().length == 1 ) ? "0" + number.toString() : number.toString();
		};
		
		this.isemail = function(text){					// contrôle le format email
			var e = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+([\.][a-z]+)+$/;
			return ( this.test(text) && text.search(e) != -1 ) ? true : false;
		};
		
		this.isphone = function(text, sep){				// contrôle le format téléphone
			switch( sep ){
				case null :								// accepte tous les séparateurs ou aucun
					var e = /^0[1-68]([-. ]?[0-9]{2}){4}$/;				//var e = /^([+][0-9]{1,3}|0)[1-68][-. ]?(?:[0-9]{2,3}[-. ]?){3,4}$/;
					break;
				case "." :								// oblige le séparateur [.]
					var e = /^0[1-68](\.[0-9]{2}){4}$/;
					break;					
				case "-" :								// oblige le séparateur [-]
					var e = /^0[1-68]([-][0-9]{2}){4}$/;
					break;
				case " " :								// oblige le séparateur  espace
					var e = /^0[1-68]([ ][0-9]{2}){4}$/;
					break;
				default :								// n'accepte aucun séparateur
					var e = /^0[1-68][0-9]{8}$/;
			}
			return ( text.search(e) != -1 ) ? true : false;
		};
		
		this.isnumss = function(s){
			var e = /^[12][ \.\-]?[0-9]{2}[ \.\-]?(0[1-9]|[1][0-2])[ \.\-]?([0-9]{2}|2A|2B)[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{2}$/;
			return ( this.test(s) && s.search(e) != -1 ) ? true : false;
		};
		
		this.isjson = function(s){
			if(!this.test(s)){
				return false;
			}
			return (!(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(s.replace(/"(\\.|[^"\\])*"/g,'')))) ? true : false;
		};
		
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
		
		this.toPx = function(){							// retourne la valeur en pixels
			var value = parseFloat(arguments[0]);
			if( isNaN(value) || value <= 0 ){
				return "0px";
			}
			return (parseInt(value)).toString() + "px";
		};
		
		this.repeat = function(t, n){					// répète un texte x fois
			return new Array( n + 1 ).join( t );
		};
		
		this.conjugue = function(t, n){
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
		
		this.ascii = new Array("\"", "%", "&&", " & ", "& ", "Â", "Ã", "Ä", "Æ", "È", "É", "Ê", "Ë", "Î", "Ï", "Ì", "Í", "Ô", "Õ", "Ò", "Ó", "Ö", "Û", "Ù", "Ú", "Ü", "Ý", "à", "â", "ã", "ä", "æ", "ç", "é", "è", "ê", "ë", "€", "î", "ï", "ì", "í", "ô", "õ", "ò", "ó", "ö", "ù", "û", "ù", "ú", "ü", "ÿ", "©", "®", "×", "œ", "¡", "¢", "¤", "¦", "§", "¨", "ª", "¬", "¯", "°", "±", "²", "³", "´", "µ", "¶", "·", "¸", "¹", "º", "¼", "½", "¾", "¿", "Þ", "ß", "Ð", "Ñ", "ñ", "÷", "Ø", "«", "»", "£");
		
		this.html =  new Array("&quot;", "&#37;", "&amp;&amp;", " &amp; ", "&amp; ", "&Acirc;", "&Atilde;", "&Auml;", "&AElig;", "&Egrave;", "&Eacute;", "&Ecric;", "&Euml;", "&Icirc;", "&Iuml;", "&Igrave;", "&Iacute;", "&Ocirc;", "&Otilde;", "&Ograve;", "&Oacute;", "&Ouml;", "&Ucirc;", "&Ugrave;", "&Uacute;", "&Uuml;", "&Yacute;", "&agrave;", "&acirc;", "&atilde;", "&auml;", "&aelig;", "&ccedil;", "&eacute;", "&egrave;", "&ecirc;", "&euml;", "&euro;", "&icirc;", "&iuml;", "&igrave;", "&iacute;", "&ocirc;",	"&otilde;",	"&ograve;", "&oacute;", "&ouml;", "&ugrave;", "&ucirc;", "&ugrave;", "&uacute;", "&uuml;", "&yuml;", "&copy;", "&reg;", "&times;", "&oelig;", "&iexcl;",	"&cent;", "&curren;", "&brvbar;", "&sect;", "&uml;", "&ordf;", "&not;", "&masr;", "&deg;", "&plusmn;", "&sup2;", "&sup3;", "&acute;", "&micro;", "&para;", "&middot;", "&cedil;", "&sup1;", "&ordm;", "&frac14;", "&frac12;", "&frac34;", "&iquest;", "&thorn;", "&szlig;", "&eth;", "&Ntilde;", "&ntilde;", "&divide;", "&oslash;", "&laquo;", "&raquo;", "&pound;");			
		
		this.xmlencode = function(text){
			if( !this.test(text) ) {
				return "";
			}
			var xml = "";
			var car = "";
			for ( var i = 127; i <= 255; i++ ){
				var car = String.fromCharCode(i).toString();
				var r = new RegExp(car, "g");
				xml = "&#" + (i).toString() + ";";
				text = text.replace(r, xml);
			}
			return text;					
		};
		
		this.xmldecode = function(xml){
			if( !this.test(xml) ) {
				return "";
			}
			var text = "";
			var car = "";
			for ( var i = 127; i <= 255; i++ ){
				var car = "&#" + (i).toString() + ";";
				var r = new RegExp(car, "g");
				text = String.fromCharCode(i).toString();
				xml = xml.replace(r, text);
			}
			return xml;			
		};
		
		this.encode = function(ch){					// encode les caractères spéciaux hors balises html
			if( !this.test(ch) ) {
				return "";
			}
			ch = ch.toString();
			for( var i = 0; i < this.ascii.length; i++ ){
				if( ch.indexOf(this.ascii[i]) != -1 ){
					var r = new RegExp(this.ascii[i], "g");
					ch = ch.replace(r, this.html[i]);
				}
			}
			return (ch).toString();			
		};

		this.decode  = function(ch){					// décode les caractères spéciaux hors balises html
			if( !this.test(ch) ) {
				return "";
			}
			ch = ch.toString();
			for( var i = 0; i < this.html.length; i++ ){
				if( ch.indexOf(this.html[i]) != -1 ){
					var r = new RegExp(this.html[i], "g");
					ch = ch.replace(r, this.ascii[i]);
				}
			}
			return (ch).toString();
		};

		this.htmlencode = function(html){				// encode les caractères spéciaux y compris les balises html
			if( !this.test(html) ) {
				return "";
			}
			html = this.encode(html.toString());
			html = html.replace(/</g,"&lt;");
			html = html.replace(/>/g,"&gt;");
			return html;
		};
		
		this.htmldecode = function(html){				// décode les caractères spéciaux y compris les balises html
			if( !this.test(html) ) {
				return "";
			}
			html = html.replace(/&lt;/g,"<");
			html = html.replace(/&gt;/g,">");
			html = this.decode(html.toString());
			return html;
		};
		
		this.filename = function(path){						// retourne le nom du fichier à partir de son chemin complet
			if( !this.test(path) ) {
				return "";
			}
			var fullname = this.filefullname(path);
			var pos = fullname.toString().lastIndexOf(".");
			if( pos == -1 ){
				return fullname;
			}
			return fullname.substr(0 , pos);
		};
		
		this.filefullname = function(path){					// retourne le nom du fichier avec son extension à partir de son chemin complet
			if( !this.test(path) ) {
				return "";
			}	
			var pos = path.toString().lastIndexOf("/");
			if( pos == -1 ){
				return path;
			}
			return path.substr(pos + 1, path.length);
		};

		this.filepath = function(path){						// retourne le nom du chemin à partir du chemin complet d'un fichier
			if( !this.test(path) ) {
				return "";
			}
			var pos = path.toString().lastIndexOf("/");
			if( pos == -1 ){
				return path;
			}
			return path.substr(0, pos + 1);
		};
		
		this.build = new function(){							//construction d'une chaine à l'aide d'un tableau
			
    	this.strings = new Array("");
			
			this.append = function(text){
				this.strings.push(text);
			};
			
			this.clear = function(){
				 this.strings.length = 1;
			};
			
			this.tostring = function(){
				return this.strings.join("");				
			};			
		};		
	};
		
	var oNav = new function(){										// fonctions de base du navigateur
	
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
		this.a = oText.lower(navigator.userAgent);
		this.host = oText.lower(window.location.host);
		this.version = (this.a.match( /.+(?:firefox|version|pera|chrome|onqueror|msie)[\/: ]([\d.]+)/ ) || [])[1];
		this.body = null;
		this.location = null;
		this.timer = null;
		this.ready = false;							// chargement document terminée
		this.readyfull = false;					// chargement document terminée y compris le préchargement des images
		this.inload = false;						// lot d'images en cours de chargement
		
		if( this.a.indexOf("chrome") != -1 ){
			this.chrome=true;
			this.name = "chrome";
		}
		else if( this.a.indexOf("safari") != -1 ){
			this.safari=true;
			this.name = "safari";
		}
		else if( this.a.indexOf("firefox") != -1 ){
			this.firefox = true;
			this.name = "firefox";
		}
		else if( this.a.indexOf("opera") != -1 ){
			this.opera = true;
			this.name = "opera";
		}
		else if( this.a.indexOf("konqueror") != -1 ){
			this.konqueror=true;
			this.name = "konqueror";
		}
		else if( this.a.indexOf("msie") != -1 ){
			this.msie = true;
			this.name = "msie";
		}
		else if( this.a.indexOf("gecko") != -1 ){
			this.gecko = true;
			this.name = "gecko";
		}
		else if(this.a.indexOf("@") != -1 || this.a.indexOf("www") != -1 || this.a.indexOf("http:") != -1 ){
			this.robot = true;
			this.name = "robot";
		}
		else{
			this.other = true;
			this.name = "other";
		}
		
		this.param = function(pos){						// retourne le paramètre passé dans l'url par sa position à partir de 0
			if( isNaN(pos) ){
				return "";
			}
			var p = (location.search).toString();
			if( p == "" || pos < 0 ){
				return "";
			}
			p = p.split("&");
			if( p[pos] == null ){
				return "";
			}
			p = new String(p[pos]);
			p = p.split("=");
			if( p[1] == null ){
				return "";
			}
			return unescape((p[1]).toString());			
		};
		
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
		
		this.loadimg = function(){
			if( arguments.length == 0 ){
				return false;
			}			
			var args = "";
			for( var i = 0; i < arguments.length; i++ ){
				args += (i == arguments.length -1) ? arguments[i] : arguments[i] + ",";
			}
			if( !oNav.readyfull || oNav.inload){
				window.setTimeout("oNav.loadimg('" + args + "')", 100);				
				return false;
			}
			oNav.inload = true;
			oNav.loadimage.start(args);
		};	
			
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
			if( oBox.exist ){ oEl.setinscreen(oBox.el); }
			if( oCal.datepicker.el != undefined ){ oEl.setinscreen(oCal.datepicker.el); }
			if( oCal.timepicker.el != undefined ){ oEl.setinscreen(oCal.timepicker.el); }
			if( oColor.picker.el != undefined ){ oEl.setinscreen(oColor.picker.el); }
		};
			
		this.scroll = function(){							// infos sur les ascenceurs [scroll] de la fenêtre du navigateur [browser]	
			if( oNav.msie || oNav.opera ){
				// ! la balise doctype doit être présente dans le document html 
				oNav.scrollX = (parseFloat(oNav.version) < 6 ) ? document.body.scrollLeft : document.documentElement.scrollLeft;
				oNav.scrollY = (parseFloat(oNav.version) < 6 ) ? document.body.scrollTop : document.documentElement.scrollTop;
			}else{
				oNav.scrollX = window.scrollX;
				oNav.scrollY = window.scrollY;
			}
			if( oBox.exist ){
				// position centrale de la box
				var x = parseInt( (oNav.screenX / 2) - (oBox.el.offsetWidth / 2) + oNav.scrollX + oBox.posX );
				var y = parseInt( (oNav.screenY / 2) - (oBox.el.offsetHeight / 2) + oNav.scrollY + oBox.posY );
				oBox.el.style.left = oText.toPx(x);
				oBox.el.style.top = oText.toPx(y);				
				oEl.setinscreen(oBox.el);
				oBox.setshadow();
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
		
		this.hideallbox = function(esc){
			if(oBox.el != undefined){
				
				oBox.hide();
			}
			if( oNav.lock.escape && esc ){
				oNav.lock.hide();
			}
			oEl.title.hide();
			oCal.datepicker.hide();
			oCal.timepicker.hide();
			oColor.picker.hide();
			oEl.list.hide();
			if(oEl.editor.emoticons != undefined){
				oEl.editor.emoticons.hide();
			}
		};
		
		this.init_timer = function(timer){
			if(timer != undefined && timer != null){
				try{
					window.clearInterval(timer);
				}catch(e){
					try{
						window.clearTimeout(timer);
					}catch(E){}
				}
			}			
		};
			
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
		
		this.keydown = function(event){					// appelle les fonctions sur évènements du clavier
			oNav.keyb.esc(event);
			oNav.keyb.enter(event);
			oNav.keyb.sel(event);
		};
		
		this.hideliste = function(event){					// referme les éventuelles listes ouvertes
			if( !oNav.ready ){
				return false;
			}
			var el = ( !oNav.msie ) ? event.target : window.event.srcElement;
			if( el.className.toString().indexOf("jaria_list") == -1 && el.className.toString().indexOf("jaria_slist") == -1 ){
				oEl.list.hide();
			}
		};
		
		this.annul = function(){
			// à effectuer lors de l'action d'annulation
		};
		
		this.valid = function(){						
			// à effectuer lors de l'action de validation
		};
		
		this.stopevent = function(event){		// limite la propagation de l'évènement
			if( event.stopPropagation ){
				event.stopPropagation();
			}
			else{
				event.cancelBubble = true;
			}
		};
		
		this.addevent = function(){				// Permet l'ajout de fonctions au chargement de la page [onload]
			/*
				argument 0 : obligatoire:			évènement
				argument 1 : obligatoire:			la fonction à ajouter
				argument 2 : facultatif:			l'élément
			*/
			
			if( arguments.length < 2 ) {
				return false;
			}
			
			var ev = arguments[0];
			var fc = arguments[1];
			var el = arguments[2];
			
			oNav.delevent(ev, fc, el);
			
			if( typeof(fc) != "function" ){
				return false;
			}
			if( oEl.isobject(el)){
				var obj = el;		 
			}else if( ev.indexOf("scroll") != -1 || ev.indexOf("load") != -1 || ev.indexOf("resize") != -1 ){
				var obj = window;
			}else{
				var obj = document;
			}
			try{
				obj.attachEvent(ev, fc);
			}catch(e){
				try{
					ev = ev.toString().replace("on", "");
					obj.addEventListener(ev , fc, false);
				}catch(E){
					return false;
				}
			}
			return true;
		};
		
		this.delevent = function(ev, fc){
			/*
				argument 0 : obligatoire		évènement
				argument 1 : obligatoire:		la fonction à ajouter
				argument 2 : facultatif:		l'élément
			*/

			if( arguments.length < 2 ) {
				return false;
			}
			
			var ev = arguments[0];
			var fc = arguments[1];
			var el = arguments[2];
			
			if( typeof(fc) != "function" ){
				return false;
			}			
			if( oEl.isobject(el)){
				var obj = el;		 
			}else if( ev.indexOf("scroll") != -1 || ev.indexOf("load") != -1 || ev.indexOf("resize") != -1 ){
				var obj = window;
			}else{
				var obj = document;
			}
			try{
				obj.detachEvent(ev, fc);
			}catch(e){
				try{
					ev = ev.toString().replace("on", "");
					obj.removeEventListener(ev , fc, false);
				}catch(e){
					return false;
				}
			}
			return true;
		};

		this.goto = function(url, target){				// Aller à l'url indiquée
			if( !oText.test(url) ){
				return false;
			}
			oNav.lock.show();
			if( !oText.test(target) ){
				target = "";
			}
			switch (target){
				case "_blank":
					window.open(url);
					oNav.lock.show();
					break;
				case "_parent":
					window.parent.location.href = url;
					break;
				default:
					window.location.href = url;
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
					var w = oEl.getoffset(_this.box.el, "offsetWidth");
					var h = oEl.getoffset(_this.box.el, "offsetHeight");
					switch (_this.position){
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
		
			this.add = function(text){					// ajout d'une ligne de trace de debug
				if( oText.test(text) && !_this.stop ){
					if( !_this.box.exist ){
						_this.show();
					}				
					var html = _this.debug.innerHTML;
					var text = oText.htmlencode(text);
					var d = new  Date();
					var t = ("<span class='jaria_tracehour'>" + oText.digit(d.getHours(), 2) + "h" + oText.digit(d.getMinutes(), 2) + "m" + oText.digit(d.getSeconds(), 2) + "s" + oText.digit(d.getMilliseconds(), 3) + "ms</span>" ).toString();
					html = t + "&nbsp;" + text.toString() + "<br>" + html;
					_this.debug.innerHTML = html;
					//oEl.getframe(_this.debug, "trace").scrollIntoView(true);
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
				_this.box.scroll = function(){};
				_this.box.show();
				_this.box.resizeX(300);
				_this.debug = oEl.create("div");
				_this.debug.className = "jaria_tracedebug";
				_this.debug.style.width = oText.toPx(oEl.getoffset(_this.box.el, "offsetWidth") -7);
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
		
		this.mouse = new function(){								// abscisse et ordonnée de la position de la souris
			this.X = 0;
			this.Y = 0;
			
			this.move = function(e){
				var e = e || window.event;
				oNav.mouse.X = e.clientX;
				oNav.mouse.Y = e.clientY;
			};
		};
		
		this.keyb = new function(e){
			
			this.esc = function(e){						// sur la touche échape [escape]
				var e = e || window.event;
				// cache l'éventuelle boîte de dialogue
				if( e.keyCode == 27 ){
					oNav.hideallbox(true);
				}
			};
			
			this.enter = function(e){					// sur la touche entrer [enter]
				var el = oEl.getevent(e);
				if(typeof(el.tagName) != "string"){
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
			
			this.sel = function(e){						// déploie la liste sur la touche flèche bas / haut
				var e = e || window.event;
				var el = ( window.event ) ? e.srcElement : e.target;
				if( (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13 ) && oText.lower(el.tagName) == "input" && el.className == "jaria_listlock" ){
					if( e.keyCode == 13 ){
						oEl.list.hide();
					}else{
						oEl.list.get(el, e);
					}
				}
				
			};

			this.valid = function(){					
				// action sur un évènement du clavier
			};
			
			this.annul = function(){					
				// annulation sur un évènement du clavier
			};
		};
		
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
					div.style.top = oText.toPx((oEl.getoffset(this.el, "offsetHeight") / 2) + 40);
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
					argument 3: N° page
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
	
	var oEl = new function(){									// Gestion des éléments du DOM
	
		_this = this;
	
		this.timer = null;		// timer pour le déplacement de l'élément
		
		this.editor = new function(){					// fonction externalisée redéfinie dans le fichier jaria_editor.js
			this.emoticones = new function(){
				this.hide = function(){};
			}
		};
		
		this.list = new function(){						// fonction externalisée redéfinie dans le fichier jaria_list.js
			this.hide = function(){};
			this.get = function(){};
		};
		
		this.chrono = new function(){	// fonction chronomètre
			this.timer = null;
			this.time = 0;
			this.el = undefined;
			
			this.set = function(){
				this.time++;
				var timeEc = (this.time / 10);
				this.el.value = timeEc.toString()
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
		
		this.inc = new function(){	// traitement des champs input de type text ayant la cla
			this.el = [];							// collection d'éléments incrémentables
			this.mini = [];						// valeurs mini des éléments
			this.maxi = [];						// valeurs maxi des éléments
			this.deft = [];						// valeur par défaut des éléments
			this.step = [];						// valeurs de l'incrément des éléments			
			this.cl = "jaria_inc";		// class utilisée pour les champs incrémentables
			
			this.get = function(el){		// retourne l'élement si déjà traité
				if( !oEl.isobject(el) ){
					if( !oEl.test(el) ){
						return undefined;
					}else{
						el = oEl.get(el);
					}
				}
				for( var i = 0; i < oEl.inc.el.length; i++ ){
					if( oEl.inc.el[i] == el ){
						return el;
					}
				}
				return undefined;
			};
			
			this.button = function(id, image, title, fc){
				var img = oEl.create("img");
				img.src = jaria.images + "button/button_" + image + ".png";
				img.style.cursor = "pointer";
				img.style.width = "12px";
				img.style.height = "12px";
				img.style.display = "block";
				img.alt = id;
				img.onclick = fc;
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
				if( !oEl.isobject(el) || isNaN(arguments[1]) || isNaN(arguments[2]) || isNaN(arguments[3]) ){
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
				var els = oEl.getclass(oEl.inc.cl, true);
				if( els.length > 0 ){
					for( var i = 0; i < els.length; i++ ){
						var el = oEl.inc.get(els[i]);
						if( !oEl.isobject(el) && els[i].tagName.toLowerCase() == "input" && els[i].type.toLowerCase() == "text" ){
							oEl.inc.make(els[i]);											
							var index = oEl.inc.el.length;
							oEl.inc.el[index] = els[i];
							oEl.inc.mini[index] = -999;
							oEl.inc.maxi[index] = 999;
							oEl.inc.deft[index] = 0;
							oEl.inc.step[index] = 1;							
							els[i].maxlength = "3";							
						}
					}
				}				
			};			
		};

		this.alert = function(id){					// élément introuvable
			if( !oText.test(id) ){
				id = "undefined";
			}
			oBox.error("l'objet: <kbd>" + id + "</kbd> n'est pas trouv&eacute; !<br><div id=" + id + " style='display:none'></div>");
			return document.getElementById(id);				
		};
		
		this.isobject = function(){
			/*
				argument 0: object obligatoire		élément
			*/
			if( arguments.length == 0 ){
				return false;
			}
			return ( typeof(arguments[0]) == "object" ) ? true : false;
		};
		
		this.istype = function() {					// teste le type de l'objet passé en paramètre			
			/*
				argument 0: object		objet à tester
				argument 1:	string 		type testé ( string, array... )
			*/
			if( arguments.length < 2 ){
				return false;
			}
			if( typeof(arguments[1]) != "string" ){
				return false;
			}
			
			var obj = arguments[0];
			var type = arguments[1];
			
			if (obj.constructor.toString().toLowerCase().indexOf(type) == -1){
				return false;
			}
			else{
				return true;
			}
		};
	
		this.get = function(id){					// retourne l'élément
			if( !oText.test(id) ){
				return oEl.alert(id);
			}
			if( !oEl.test(id) ){
				return oEl.alert(id);
			}			
			return document.getElementById(id);			
	
		};		
		
		
		this.test = function(id){					// test l'élément par l'id passé en paramètre
			if( !oText.test(id) ){
				return false;
			}
			if( oBox.html.substr(5, id.length+1) == id.toString() ){				
				oBox.hide();				
				return false;
			}
			if(document.getElementById(id)){return true;}
			else{return false;}			
		};
		
		this.create = function(tag){				// créé l'élément
			return document.createElement(tag);
		};
		
		this.del = function(el){					// suppression d'un élément
			if( !oEl.isobject(el) ){
				if( !oEl.test(el) ){
					return false;
				}
				el = oEl.get(el);
			}
			try{
				el.parentNode.removeChild(el);
				el = undefined;
			}
			catch(e){}
		};
		
		this.getevent = function(e){
			if( oEl.isobject(e) ){
				if( e.tagName != undefined ){
						return e;
				}
				if( e.type != undefined ){
						return ( !oNav.msie ) ? e.target : window.event.srcElement;
				}
			}
			return undefined;
		};
		
		this.gettags = function(){			// récupère une collection d'élements par leur nom [tagName]
			/*
				argument 0: obligatoire		nom du tag
				argument 1: facultatif		élément parent
			*/
			if( arguments.length == 0 ){
				return [];
			}
			var tag = arguments[0].toString();
			if( arguments.length > 1 ){
				var el = arguments[1];
				if( !oEl.isobject(el) ){
					if( oEl.test(el) ){
						el = oEl.get(el);
					}else{
						return [];
					}
				}
				return el.getElementsByTagName(tag);
			}else{
				return document.getElementsByTagName(tag);
			}
		};
		
		this.deltags = function(tag, parent){
			var p = ( parent == null ) ? document : parent;	
			while ( oEl.gettags(tag, p).length > 0 ){
				var elems = oEl.gettags(tag, p);
				for (var i = 0; i < elems.length; i++ ){
					try{
						p.removeChild(elems[i]);
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
		
		this.getframe = function(el, id){			// Retourne le document de l'iframe l'élément du document de l'iframe
			if( !oEl.isobject(el) ){
				el = oEl.get(el);
			}
			if( !oEl.isobject(el) ){
				oEl.alert(el);
			}
			el = el.contentWindow.document;
			id = ( typeof(id) != "string" ) ? "null" : id.toString();
			if( el.getElementById(id) ){
				return el.getElementById(id)
			}else{
				return el;
			}
		};

		this.getparent = function(el){
			if( !oEl.isobject(el) ){
				el = oEl.get(el);
			}
			if( parent.opener ){
				return parent.opener.document.getElementById(el.id);
			}
			return el.parentNode;			
		};
		
		this.text = function(text){					// créé le node texte
			return document.createTextNode(text);
		};
		
		this.opacity = function(el, value){			// transparence de l'élément de 0 à 100 [opacity]
			if( arguments.length < 2){
				return false;
			}
			if( !oEl.isobject(el) ){
				if( !oEl.test(el) ){
					return false;
				}
				el = oEl.get(el);
			}
			if( !isNaN(value) ){
				if( parseInt(value) < 0 ){
					value = 0;
				}
				if( parseInt(value) > 100 ){
					value = 100;
				}				
				if( oNav.msie && oNav.version < 9  ){
					el.style.filter = "alpha(opacity=" + parseInt(value) + ")";
				}
				else{
					el.style.opacity = Math.round((parseFloat(value)/100)*10)/10;
				}
			}
		};
		
		this.getopacity = function(el){				// retourne l'opacité d'un l'élément de 0 à 100 ou de 0 à 1 selon le navigateur  [opacity]
			if(!oEl.isobject(el)){
				return 0;
			}
			if( oNav.msie && oNav.version < 9 ){
				var op = el.style.filter.toString();
				
				op = op.split("=");
				if( op.length > 0 ){
					op =  parseFloat(op[op.length - 1]);
				}
				if( isNaN(op) ){
					el.style.filter = "alpha(opacity=100)";
					op = 100;
				}
			}else{
				var op = parseFloat(el.style.opacity) * 100;
				if( isNaN(op) ){
					el.style.opacity = 1;
					op = 100;
				}
			}
			return op;
		};
		
		this.getclass = function(){					// retourne un tableau d'élément(s) par la classe CSS passée en paramètre
			/*
				argument 0: obligatoire			nom de la classe CSS
				argument 1: facultatif			élément parent (document par défaut)
				argument 1 ou 2: facultatif		faux = classe seule (par défaut), vrai = parmi plusieurs classes affectées
			*/
			if( arguments.length == 0 ){
				return [];
			}
			if( !oText.test(arguments[0]) ){
				return [];
			}
			var mcl = false;
			var p = ( oEl.isobject(arguments[1]) ) ? arguments[1] : document;
			var mcl = ( typeof(arguments[1]) == "boolean" ) ? arguments[1] : false;
			mcl = ( typeof(arguments[2]) == "boolean" ) ? arguments[2] : mcl;
			var els = [];
			var cl = oText.trim(arguments[0]);
			var p = p.getElementsByTagName("*");
			for( var i = 0; i < p.length; i++ ){
				if ( mcl && p[i].className.indexOf(cl) != -1 ){		// si plusieurs classes et classe trouvée
					els.push(p[i]);
				}else{
					if( p[i].className == cl ){						// si classe identique
						els.push(p[i]);
					}
				}					
			}
			return els;			
		};
		
		this.addclass = function(){			// ajoute une class à l'élément [className]
			/*
				argument 0 : obligatoire		élément
				argument 1 : obligatoire		nom de la classe CSS
			*/			
			if( arguments.length == 2 && oEl.isobject(arguments[0]) && oText.test(arguments[1]) ){
				var el = arguments[0];
				var cl = oText.trim(arguments[1]);
				var c = el.className.toString();
				if( c.lastIndexOf(cl) == -1 ){
					c += " " + cl;
				}
				el.className = c;
			}
		};
		
		this.delclass = function(el, cl){			// supprime une class à l'élément [className]
			/*
				argument 0 : obligatoire		élément
				argument 1 : obligatoire		nom de la classe CSS
			*/	
			if( arguments.length == 2 && oEl.isobject(arguments[0]) && oText.test(arguments[1]) ){
				var el = arguments[0];
				var cl = oText.trim(arguments[1]);
				var c = el.className.toString();
				if( c.lastIndexOf(cl) != -1 ){
					c = c.replace(cl, "");
				}
				el.className = oText.trim(c);
			}
		};
		
		this.getoffset = function(el, prop){		// retourne la dimention ou la position réelle en pixels d'un élément par rapport au document
			/*
				argument 0 : obligatoire		élément
				argument 1 : obligatoire		propriété (offsetLeft, offsetTop, offsetHeight, offsetWidth)
				argument 1 : optionnel			parent
			*/
			if( !oEl.isobject(el) ){
				el = oEl.get(el);
			}
			if( !oEl.isobject(el) || !oText.test(prop) ){
				return 0;	
			}
			if( prop.indexOf("Height") != -1 || prop.indexOf("Width") != -1 ){
				return eval("el." + prop + ";");
			}
			var px = 0;
			var t = ( oBox.exist && el.className == "jaria_listlock"  ) ? "div" : "body";
			while (el && oText.lower(el.tagName) != t){
				eval("px += el." + prop + ";");
				el = el.offsetParent;
			}
			return px;		
		};

		
		this.getstyleclass = function(el, st){		// retourne la valeur du style de la class css d'un élément
			if ( !oEl.isobject(el)){
				if ( oEl.test(el) ) {
					el = oEl.get(el);
				}else{
					return "";
				}
			}
			if( !oNav.msie ){
				return eval("window.getComputedStyle(el, null)." + st);
			}else{
				return eval("el.currentStyle." + st);
			}
		};
		
		this.setinscreen = function(){		// repositionne progressivement l'élément dans la fenêtre du navigateur			
			// argument 0 : element à repositionner		obligatoire
			var el = arguments[0];
			if( !oEl.isobject(el) ){
				if( oEl.test(el) ){
					el = oEl.get(el);
				}else{
					return false;
				}
			}
			if( el.id == ""){		// attribut un id obligatoire
				el.id = "JARIA_SETINESCREEN";
			}
			
			function Stop(){
				if( el.id == "JARIA_SETINESCREEN"){
					el.id = "";
				}
				window.clearTimeout(oEl.timer);
				oEl.timer = null;
				oEl.isinscreen(el);			// repositionnement terminé
			}
			
			var left = parseFloat(el.offsetLeft);
			var top = parseFloat(el.offsetTop);
			var width = parseFloat(el.offsetWidth);
			var height = parseFloat(el.offsetHeight);
			var paddingW = 0; 
			var paddingH = 0;
			var marge = 60;
			
			// point droit et point bas de l'élément
			var right = left - oNav.scrollX + paddingW + width;
			var bottom = top - oNav.scrollY  + paddingH + height;		

			if( left < oNav.scrollX ){
				// repositionne la box à gauche
				el.style.left = oText.toPx(left + paddingW);
			}			
			if( top < oNav.scrollY ){
				// repositionne la box en haut
				el.style.top = oText.toPx(top + paddingH);
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
				el.style.left = oText.toPx(left - (paddingW + marge));
			}
			if( bottom > oNav.screenY ){
				el.style.top = oText.toPx(top - (paddingH + marge));
			}
			if( oBox.exist ){
				oBox.setshadow();
			}
			oEl.timer = window.setTimeout("oEl.setinscreen('" + el.id + "')", 20);		
		};
		
		// fonction à redéfinir  executée lorsque le repositionnement de l'élément déplacée par la fonction oEl.setinscreen est terminée 
		this.isinscreen = function(){
			return false;
		};
		
		this.isvisible = function(){
			// argument 0 : obligatoire		élément
			var el = arguments[0];
			if( !oEl.isobject(el) ){
				if( !oEl.test(el) ){
					return false;
				}else{
					el = oEl.get(el);
				}
			}			
			return ( oEl.getstyleclass(el, "display") != "none" ) ? true : false;
		};
		
		this.visible = function(){
			/* 
				argument 0 : obligatoire		élément
				argument 1 : obligatoire		état true ou false
			*/
			var el = arguments[0];
			if( !oEl.isobject(el) ){
				if( !oEl.test(el) ){
					return false;
				}else{
					el = oEl.get(el);
				}
			}
			var state = arguments[1];
			if ( typeof(state) != "boolean" ){
				return false;
			}
			var tag = oText.lower(el.tagName);
			if(state){
				if(oNav.msie && oNav.version < 8){
					el.style.display = "inline";
				}else{
					switch( tag ){
						case "thead":
						case "tfoot":
						case "tbody":
							el.style.display="table-row-group";
							break;
						case "table":
							el.style.display = "table";
							break;
						case "tr":
							el.style.display = "table-row";
							break;
						case "td":
							el.style.display = "table-cell";
							break;
						case "div":
						case "iframe":
							el.style.display = "block";
							break;
						default:
							el.style.display = "inline";
					}
				}
			}
			else{
				el.style.display = "none";
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
						var width = parseInt(text.substr( text.indexOf("=") + 1, text.indexOf(";")-text.indexOf("=") - 1 ));
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
					var cont = oEl.create("div");
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
					var width = this.bubble.offsetWidth;				// largeur de la bulle
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
		
		
		this.prev = new function(){		// prévisualistation au survol d'un lien façon Vista
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
				div.style.left =  oText.toPx(oEl.getoffset(el, "offsetLeft"));
				div.style.top = oText.toPx(oEl.getoffset(el, "offsetTop") + 30 + oNav.marginTop);
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
			
			this.inc = function(inc, i, t){			//incrémente l'opacité de l'élément				
				var el = this.el[i];	
				if( oEl.isobject(el) ){					
					oEl.opacity( el , (parseInt(oEl.getopacity(el)) + parseInt(inc)) );				
					if( (parseFloat(inc) > 0 && oEl.getopacity(el) >= 100) || (parseFloat(inc) < 0 && oEl.getopacity(el) <= 0) ){
						this.clear(i);
					}
				}
			};
			
			this.valid = function(){				//action à effectuer en fin de fading
				return false;
			};
			
			this.plus = function(el, t){			//Transition progressive positive de l'opacité de l'élément
			
				if( !oEl.isobject(el) ){			//test l'objet
					if( oEl.test(el) ){
						el = oEl.get(el);
					}else{
						return false;
					}
				}				
				var i = this.get(el);				//vérifie si l'objet est existant			
				if( i == -1 ){
					i = this.el.length;
					this.el[i] = el;
				}else{
					this.clear(i);					//arrête le timer
				}				
				el = this.el[i];
				if( oEl.getopacity(el) >= 100 ){
					oEl.opacity(el, 0);	
				}
				t = ( t == null || isNaN(t) ) ? 10 : parseInt(t);
				this.timer[i] = window.setInterval("oEl.fader.inc(10, " + i + ")", t);
			};
			
			this.moins = function(el, t){			//Transition progressive négative de l'opacité de l'élément
			
				if( !oEl.isobject(el) ){			//test l'objet
					if( oEl.test(el) ){
						el = oEl.get(el);
					}else{
						return false;
					}
				}				
				var i = oEl.fader.get(el);			//vérifie si l'objet est existant				
				if( i == -1 ){
					i = oEl.fader.el.length;
					this.el[i] = el;
				}else{
					this.clear(i);					//arrête le timer
				}
				el = this.el[i];
				if( oEl.getopacity(el) <= 0 ){
					oEl.opacity(el, 100);	
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
		
		this.drag = new function(sens){								// actions sur le déplacement d'élément par la souris [this and drop]
		
			this.el = undefined;							// élement déplaçable
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
			this.opacity = 100;								// opacité de l'élément déplaçable
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
			
			this.getstyleoffset = function(el, prop){
				if( oEl.getstyleclass(el, "position") == "absolute" ){
					return oEl.getstyleclass(el, prop);
				}else{
					return oText.toPx( oEl.getoffset(el, "offset" + oText.firstUp(prop)) );
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
						var margeLeft = 0;
						var margeTop = 0;
						if( oEl.getstyleclass(oEl.drag.el, "position") != "absolute" ){
							var margeLeft = oEl.getoffset(oEl.drag.el.parentNode, "offsetLeft");
							var margeTop = oEl.getoffset(oEl.drag.el.parentNode, "offsetTop");
						}
						oEl.drag.el.style.left = oText.toPx( oEl.getoffset(oEl.drag.receptor, "offsetLeft") - margeLeft );
						oEl.drag.el.style.top  = oText.toPx( oEl.getoffset(oEl.drag.receptor, "offsetTop") - margeTop );
						
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
				var evt = e || window.event;
				var Px, Py;
				var X = evt.clientX + oNav.scrollX;
				var Y = evt.clientY + oNav.scrollY;
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
					evt.preventDefault();
				}else{
					evt.cancelBubble = true;
					evt.returnValue = false;
				}
				if( oEl.drag.el.shadow != undefined){
					oEl.opacity(oBox.el.shadow, 10);
					oEl.drag.el.shadow.style.left = oText.toPx(oEl.getoffset(oEl.drag.el, "offsetLeft") + 8);
					oEl.drag.el.shadow.style.top = oText.toPx(oEl.getoffset(oEl.drag.el, "offsetTop") + 8);
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
		}
	};

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
		
		this.addbutton = function(lib, fc){
			if( !_this.exist || typeof(lib) != "string" || lib == "" || typeof(fc) != "function" ){
				return false;
			}
			var bt = oEl.create("button");
			var sp = oEl.create("span");
			bt.onclick = function(){
				fc();
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
				var c = (c == null) ? this.el.style.backgroundColor : c;
				var rgb = ( oColor.iscolor(c) ) ? oColor.hexa_rgb(c) : c;
				//var rgb = ( !oColor.navcolor(c) ) ? oColor.hexa_rgb(c) : c;
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
			this.el = oEl.create("div");
			this.el.id = "oBox";
			this.el.Head = oEl.create("div");
			this.el.Title = oEl.create("div");
			this.el.Quit = oEl.create("div");
			this.el.Body = oEl.create("div");
			this.el.Html = oEl.create("div");
			this.el.Bts = oEl.create("div");			
			this.el.className = "jaria_box";			
			if( this.borderColor != null ){
				this.el.style.backgroundColor = this.borderColor;
			}
			this.el.Title.style.color = this.setColorText();
			this.width = ( _this.width != null && !isNaN(_this.width) && _this.width > 400 && _this.width <= 2000 ) ? _this.width : 400;
			// décalages paramétrés x et y
			this.posX = ( !isNaN(this.posX) ) ? parseInt(this.posX) : 0;
			this.posY = ( !isNaN(this.posY) ) ? parseInt(this.posY) : 0;
			this.lineheight = ( !isNaN(_this.lineheight) && parseFloat(_this.lineheight) >= 15 && parseFloat(_this.lineheight) <= 100 ) ? parseInt(_this.lineheight) : 15;
			this.el.style.width = oText.toPx(this.width);										
			this.el.Head.onmousedown = function(event){
				_this.drag(event);
			};
			this.el.Head.className = "jaria_boxhead";
			this.el.Title.title = "Déplacer";
			this.el.Title.className = "jaria_boxtitre";
			this.el.Title.innerHTML = ( this.title != "" ) ? oText.encode(oText.firstUp(this.title)) : "&nbsp;";
			this.el.Html.className = "jaria_boxhtml";
			this.el.Body.className = "jaria_boxbody";
			if( this.radius ){
				this.el.style.borderRadius = "7px";
				if( !this.status ){
					this.el.Body.style.borderRadius = "0px 0px 7px 7px";				
				}	
			}
//			if( this.shadow ){
//				this.el.style.boxShadow = "4px 4px 8px #999";
//			}
			if( oColor.iscolor(this.color) ){
				this.el.Html.style.color = this.color;
			}
			if( oColor.iscolor(this.backColor) ){
				this.el.Body.style.backgroundColor = this.backColor;
			}
			if( this.backImage != null ){
				this.el.Body.style.backgroundImage = "url(" + this.backImage + ")";
			}
			if( this.lineheight != null ){
				this.el.Html.style.lineHeight = oText.toPx(this.lineheight);
			}
			this.el.Quit.className = "jaria_boxclose";
			this.el.Html.innerHTML = oText.encode(this.html);
			this.el.Head.appendChild(this.el.Title);
			if( this.quit ){
				var img = oEl.create("img");
				img.src = jaria.images + "box/btclose.png";
				img.alt = "";
				img.title = "Fermer [escape]";
				img.style.cursor = "pointer";
				img.style.marginTop = "3px";
				img.onmouseover = function(){
					this.src = jaria.images + "box/btclose_hover.png";
				};
				img.onmouseout = function(){
					this.src = jaria.images + "box/btclose.png";
				};
				img.onclick = function(){
					_this.annul();
				};
				this.el.Quit.appendChild(img);
				this.el.Head.appendChild(_this.el.Quit);
			}			
			this.el.appendChild(this.el.Head);			
			this.el.Body.appendChild(this.el.Html);			
			if( this.bts ){
				this.el.Bts.className = "jaria_boxboutons";				
				this.el.BtOk = oEl.create("button");
				this.el.BtOk.className = "jaria_button";
				this.el.BtOk.style.width = "50px";
				this.el.BtOk.innerHTML = "Ok";
				this.el.BtOk.onclick = function(){
					_this.hide();
				};
				this.el.Bts.appendChild(this.el.BtOk);
				this.el.Body.appendChild(this.el.Bts);
			}
			this.el.appendChild(this.el.Body);
			oNav.body.appendChild(this.el);
			this.exist = this.type;	
			if( this.fader ){
				oEl.opacity(this.el, 0);
				oEl.fader.plus(this.el);
			}		
			
			this.setTitleWidth();
			
			if( this.status ){
				this.el.status = oEl.create("div");
				this.el.status.className = "jaria_boxstatus";
				this.el.status.innerHTML = "&nbsp;";
				this.el.status.title = "Redimensionner";
				oEl.addclass(this.el.Html, "jaria_boxscroll");
				this.el.status.onmousedown = this.ResizeStart;
				this.el.status.onmouseup = this.ResizeStop;
				document.onmouseup = this.ResizeStop;
				oNav.lock.el.onmouseup = this.ResizeStop;
				this.el.Html.onmouseup =  this.ResizeStop;
				this.el.Bts.onmouseup =  this.ResizeStop;
				this.el.posStartX = null;
				this.el.posStartY = null;
				this.el.Html.startX = this.el.Body.offsetWidth;
				this.el.Html.startY = this.el.Body.offsetHeight;
				this.el.appendChild(this.el.status);
				this.el.Body.style.marginBottom = "0px";
				if( this.radius ){
					this.el.status.style.borderRadius = "0px 0px 7px 7px";
				}
			}					
			oNav.scroll();
			// pour le positionnement centrale de la box et la prise en compte de la hauteur réelle de la box			
			this.timer = window.setTimeout(_this.scroll, 100);						
			if( this.bts && this.focus ){
				this.el.BtOk.focus();	// focus sur le bouton Ok ou Oui
			}
		};
		
		this.setTitleWidth = function(){
			this.el.Title.style.width = oText.toPx(this.el.offsetWidth - this.el.Quit.offsetWidth - 6);			
		};
		
		this.setshadow = function(){
			if( _this.shadow && _this.exist ){
				oEl.del(_this.el.shadow);
				_this.el.shadow = oEl.create("div");
				_this.el.shadow.className = "jaria_boxshadow";				
				_this.el.shadow.style.width = oText.toPx(oEl.getoffset(_this.el, "offsetWidth"));
				_this.el.shadow.style.height = oText.toPx(oEl.getoffset(_this.el, "offsetHeight"));
				_this.el.shadow.style.top = oText.toPx(oEl.getoffset(_this.el, "offsetTop") + 8);
				_this.el.shadow.style.left = oText.toPx(oEl.getoffset(_this.el, "offsetLeft") + 8);
				if( this.radius ){
					_this.el.shadow.style.borderRadius = "7px";
				}
				oNav.body.appendChild(_this.el.shadow);
				oEl.opacity(_this.el.shadow, 20);
			}			
		};
		
		this.scroll = function(){
			window.scrollBy(0, 1);
			window.clearTimeout(_this.timer);
			oNav.scroll();
			_this.setshadow();
		};
		
		this.hide = function(){							// détruit la box
			if(_this.modal){
				oNav.lock.hide();
			}
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
		};
		
		this.drag = function(event){					// démarrage du déplacement de la box
			oEl.drag.opacity = 65;						// transparence de l'élément pendant le déplacement
			oEl.drag.start(_this.el, event);
		};
		
		this.resizeY = function(height){      			// redimentionne la hauteur de la box 
				_this.el.Html.style.height = oText.toPx(height);
				_this.el.style.height = oText.toPx(_this.el.Head.offsetHeight + _this.el.Html.offsetHeight + _this.el.Bts.offsetHeight + _this.el.status.offsetHeight + 3);
				_this.setshadow();

		};
	
		this.resizeX = function(width){      			// redimentionne la largeur de la box
				_this.el.Html.style.width = oText.toPx(width);
				_this.el.style.width = oText.toPx(_this.el.Html.offsetWidth);
				_this.setshadow();
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
						_this.el.shadow.style.height = oText.toPx(oEl.getoffset(_this.el, "offsetHeight"));
						_this.el.shadow.style.width = oText.toPx(oEl.getoffset(_this.el, "offsetWidth"));
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
			oNav.lock.el.onmousemove = function(){return false;};
			_this.el.Html.onmousemove = function(){return false;};			
		};	
		
	}
	
	function Cal(){
		
		var _this = this;
		
		this.datepicker = new function(){			// fonction externalisée redéfinie dans le fichier jaria_datepicker.js
			this.hide = function(){}
		};
		
		this.timepicker = new function(){			// fonction externalisée redéfinie dans le fichier jaria_timepicker.js
			this.hide = function(){}
		};
		
		this.daymonth = function(month, year){			// retourne le nombre de jours dans un mois de l'année
			var day = 28;
			if( _this.bissextile( parseInt(year) ) ){
				day = 29;
			};
			var tab = new Array(31, dayfeb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
			return parseInt( tab[parseInt(month)-1] );			
		};
		
		this.addday = function(date, inc){
			if( !_this.isdate(date) ){
				return "";
			}
			if( isNaN(inc) ){
				return date;
			}
			var tab = date.toString().split("/");
			var newdate = new Date( parseFloat(tab[2]), parseFloat(tab[1]) - 1, parseFloat(tab[0]) );	
			var date = new Date( newdate.getTime() + (1000 * 60 * 60 * 24 * parseInt(inc)) );
			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();
			date = ((day < 10) ? "0" + day : day) + "/" + ((month < 10) ? "0" + month : month) + "/" + ((year < 1900) ? 1900 : year);
			return date;
		};
		
		this.addmonth = function(date, inc){
			if( !_this.isdate(date) ){
				return "";
			}
			if( isNaN(inc) ){
				return date;
			}
			var tab = date.toString().split("/");
			var newdate = new Date( parseFloat(tab[2]), parseFloat(tab[1]) + inc - 1, parseFloat(tab[0]) );
			var year = newdate.getFullYear();
			var month = newdate.getMonth() + 1;
			var day = newdate.getDate();
			date = ((day < 10) ? "0" + day : day) + "/" + ((month < 10) ? "0" + month : month) + "/" + ((year < 1900) ? 1900 : year);
			return date;
		};
		
		this.addyear = function(date, inc){
			if( !_this.isdate(date) ){
				return "";
			}
			var tab = date.toString().split("/");
			var newdate = new Date( parseFloat(tab[2]) + inc, parseFloat(tab[1]) - 1, parseFloat(tab[0]) );
			var year = newdate.getFullYear();
			var month = newdate.getMonth() + 1;
			var day = newdate.getDate();			
			date = ((day < 10) ? "0" + day : day) + "/" + ((month < 10) ? "0" + month : month) + "/" + ((year < 1900) ? 1900 : year);
			return date;
		};
		
		this.datediff = function(du, au){				// retourne le nombre de jours entre 2 dates
			if( arguments.length < 2 ){
				return 0;
			}
			if( !_this.isdate(du) || !_this.isdate(au) ){
				return 0;
			}
			var tabdu = du.split("/");
			var tabau = au.split("/");
			var jours = 1000 * 60 * 60 * 24;
			var datedu = new Date();
			var dateau = new Date();
			datedu.setDate( parseFloat(tabdu[0]) );
			datedu.setMonth(parseFloat(tabdu[1]) - 1 );
			datedu.setFullYear(parseFloat(tabdu[2]) );			
			dateau.setDate( parseFloat(tabau[0]) );
			dateau.setMonth( parseFloat(tabau[1]) - 1 );
			dateau.setFullYear( parseFloat(tabau[2]) );
			return ( parseInt(dateau.getTime() / jours) - parseInt(datedu.getTime() / jours) );		
		};
		
		this.bissextile = function(year){				// année bissextile
			if( isNaN(year) ){
				return false;
			}
			if( year%100 == 0 ){
				if( year%400 == 0 ){
					return true;
				}else{
					return false;
				}
			}else{
				if( year%4 == 0 ){
					return true;
				}else{
					return false;
				}
			}
		};
				
		this.isdate = function(date, format){					// contrôle la date
			
				/* 
				argument 0 obligatoire : string date
				argument 1 facultatif : format					ex: [AA]AAMMJJ, JJ/MM/[AA]AA, MM-JJ-[AA]AA... par défaut: JJ/MM/AAAA
			*/		
		
			if( !oText.test(date) ){
				return false;
			}			
			if( oText.test(format) ){
				var day, month, year;
				if( date.length != format.length ){
					return false;
				}
				if( date.length > 10 ){
					return false;
				}
				if ( format.indexOf("AAAA") != -1 ) {
					year = date.substr( format.indexOf("AAAA"), 4);					
				}
				else if( format.indexOf("AA") != -1 ) {
					year = "20" + date.substr( format.indexOf("AA"), 2);				
				}
				if ( format.indexOf("MM") != -1 ) {
					month = date.substr( format.indexOf("MM"), 2);
				}
				if ( format.indexOf("JJ") != -1 ) {
					day = date.substr( format.indexOf("JJ"), 2);
				}
				if ( day == "" || month == "" || year == "" ){
					return false;
				}
				date =  day + "/" + month + "/" + year;	
			}
			
			if( !(date.search(/^(\d\d)(\/)(\d\d)(\/)(\d\d\d\d)$/) != -1) ){
				return false;
			}		

			var tab = date.split("/");
			if( tab.length != 3 ){
				return false;
			}
			
			for( var i = 0; i < 3; i++ ){
				if( isNaN(tab[i]) ){
					return false;
				}
				if( i == 0 && (parseFloat(tab[i]) < 1 || parseFloat(tab[i]) > 31) ){
					return false;
				}
				if( i == 1 && (parseFloat(tab[i]) < 1 || parseFloat(tab[i]) > 12) ){
					return false;
				}
				if( i == 2 && (parseFloat(tab[i]) < 1900 || tab[i].length > 4) ){
					return false;
				}
			}
			if( (parseFloat(tab[0]) > 30) && (parseFloat(tab[1]) == 4 || parseFloat(tab[1]) == 6 || parseFloat(tab[1]) == 9 || parseFloat(tab[1]) == 11) ){
				return false;
			}
			var day = 28;
			if( _this.bissextile(parseFloat(tab[2])) ){
				day = 29;
			}
			if( parseFloat(tab[0]) > day && parseFloat(tab[1]) == 2 ){
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
			var date = arguments[0].toString();
			var format = arguments[1].toString().toUpperCase();
			if( !_this.isdate(date) && ( !isNaN(date) && date.length != 8 ) ){
				oBox.error("Le format de date <kbd>" + date + "</kbd> passé à la fonction Cal.format() est incorrecte!");
				return "";				
			}
			if( _this.isdate(date) ){
				var tab = date.split("/");
				var day = tab[0];
				var month = tab[1];
				var year = tab[2];				
			}else if( !isNaN(date) && date.length == 8 ){
				var day = date.substr(6, 2);
				var month = date.substr(4, 2);
				var year = date.substr(0, 4);
			}
			format = ( format.indexOf("AAAA") != -1 ) ? format.replace("AAAA", year) : format.replace("AA", year.substr(2, 2));
			format = format.replace("MM", month);
			format = format.replace("JJ", day);
			return format;			
		};
		
	}
	
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
			var y = 0;
			var tab = new Array();
			for ( var i = 0; i < 7; i++ ){
				tab[i] = c.charAt(i);
				var car = tab[i];
				if( car == "#" ){
					y++;
				}
				if( car == "A" ){
					tab[i] = 10;
				}
				if( car == "B" ){
					tab[i] = 11;
				}
				if( car == "C" ){
					tab[i] = 12;
				}
				if( car == "D" ){
					tab[i] = 13;
				}
				if( car == "E" ){
					tab[i] = 14;
				}
				if( car == "F" ){
					tab[i] = 15;
				}
			}
			var rgb = ( (tab[0+y] * 16) - - tab[1+y]);
			rgb += "," + ( (tab[2 + y] * 16) - - tab[3+y] );
			rgb += "," + ( (tab[4 + y] * 16) - - tab[5+y] );
			return rgb;
		};
	}

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
			if ( !oEl.isobject(oAjax.el) ){
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
				if( oEl.isobject(oAjax.el) && arguments.length == 2 ){				
					if( _this.data != "" ){
						_this.data += "&";
					}
					_this.data += oText.trim(arguments[0].toString()) + "=" + oText.trim(arguments[1].toString());
				}
			}
		};

		this.init = function(){
			if ( !oEl.isobject(oAjax.el) ){
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
		
		this.xmltostring = function(){
			var s = (oNav.msie) ? arguments[0].xml : (new XMLSerializer()).serializeToString(arguments[0]);
			return s;			
		}

	}
	
	// fonctions pouvant être réinstenciées

	var oBox = new Box();							// Boîtes de dialogues personnalisées
	var oCal = new Cal();							// Gestion des dates
	var oColor = new Color();						// Objet sélecteur de couleurs et fonctions couleurs
	var oAjax = new Ajax();							// Objet d'accès au host par Ajax
	
	// actions sur évènement
	window.onscroll = oNav.scroll;					// au déplacement des ascenseurs de la fenêtre du navigateur	
	window.onload = oNav.load;						// après chargement du document	
	window.onresize = oNav.size;					// au redimentonnement de la fenêtre du navigateur	
	document.onmousemove = oNav.mouse.move;			// au déplacement de la souris	
	document.onkeydown = oNav.keydown;				// lors d'une action sur les touches du clavier
	document.onclick = oNav.hideliste;				// referme les éventuelles listes ouvertes
	
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
	