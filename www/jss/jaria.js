var Jaria = {
		
	version: "20130704",
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
		};
		
		//Ajoute la méthode indexOf d'un tableau pour les anciens navigateurs
		if (!Array.prototype.indexOf){ 
		    Array.prototype.indexOf = function(o, n) {
		         for (var i = (n || 0), j = this.length; i < j; i++) {
		             if (this[i] === o) { return i; }
		         }
		         return -1;
		    }
		}
		
		$.nav.type();
		
		//Ajoute les fonctions du navigateur au évènements
		$.nav.addevent("onscroll", $.nav.scroll);			//Au déplacement des ascenseurs de la fenêtre du navigateur
		$.nav.addevent("onresize", $.nav.size);				//Au redimentonnement de la fenêtre du navigateur
		$.nav.addevent("onmousemove", $.nav.mouse.move);	//Au déplacement de la souris
		$.nav.addevent("onkeydown", $.nav.keydown);			//Sur touche du clavier
		window.onload = $.nav.load;							//Après le chargement du DOM (compatible IE7)
		
		//Intances des fonctions pouvant être réinstanciées
		Jaria.box = new Jaria.Box();
		
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
		$.upper = function(s){
			return ( $.test(s) ) ? s.toString().toUpperCase() : "";
		};
		
		//Tout en minuscule
		$.lower = function(s){
			return ( $.test(s) ) ? s.toString().toLowerCase() : "";
		};
		
		//Première lettre en majuscule et le reste en minuscule
		$.firstUp = function(s){
			return ( $.test(s) ) ? s.toString().substr(0, 1).toUpperCase() + s.toString().substr(1, s.length).toLowerCase() : "";
		};
		
		//Complète n zéro à gauche
		$.digit = function(s, n){
			s = ( $.test(s) || !isNaN(s) ) ? s : "";
			n = ( !isNaN(n) ) ? n : 0;
			var z = "";
			for( var i = 0; i < (parseInt(n) - s.length); i++ ){
				z += "0";
			}
			return ( s.length < n ) ? z + s : s;
		};
		
		//Retourne la partie gauche
		$.left = function(s, n){
			if (parseFloat(n) <= 0){
			    return "";
			}
			var t = (s).toString();
			if (n > t.length){
			    return t;
			}
			return t.substring(0, n);
		};
		
		//Retourne la partie droite
		$.right = function(s, n){
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
	
		//Active ou désactive la sélection du texte
		$.select = function(b, p){
			
			/*
				b: boolean				obligatoire
				p: élement parent		facultatif
			*/

			if( typeof(b) != "boolean"){
				return false;
			}
			var e = ( Jaria.el.test(p) ) ? Jaria.el.get(p) : document;
			if( typeof(e.onselectstart) != "undefined" ){				
				e.onselectstart = function(){
					return b;
				}
			}
			else{
				e.onmousedown = function(){
					return b;
				}
			}
		}
		
		// retourne la valeur en pixels
		$.toPx = function(n){
			var v = parseFloat(n);
			if( isNaN(n) || n <= 0 ){
				return "0px";
			}
			return (parseInt(v)).toString() + "px";
		};
		
		//Répète n fois un texte 
		$.repeat = function(t, n){
			return new Array(n + 1).join(t);
		};
		
		$.pluriel = function(t, n){
			if (n <= 1){
				return t;	
			}
			var c = "s";
			t = $.trim(t);
			if (t == ""){
				return "";
			}
			l = $.lower(t);
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
	
		//Concatène une chaine à l'aide d'un tableau
		$.build = new function(){
			
			var $ = this;
			$.t = new Array("");
			
			$.append = function(s){
				this.t.push(s);
			};
			
			$.clear = function(){
				 this.t.length = 1;
			};
			
			$.tostring = function(){
				return $.t.join("");				
			};			
		};
		
		//Contrôle le format email
		$.isemail = function(t){
			return ( $.test(t) && t.search(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+([\.][a-z]+)+$/) != -1 ) ? true : false;
		};
		
		//Contrôle le format téléphone	
		$.isphone = function(t, s){
			var e = "";
			switch(s){
				case null :								// accepte tous les séparateurs ou aucun
					e = /^0[1-68]([-. ]?[0-9]{2}){4}$/;
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
		
		$.isnumss = function(s){
			return ( $.test(s) && s.search(/^[12][ \.\-]?[0-9]{2}[ \.\-]?(0[1-9]|[1][0-2])[ \.\-]?([0-9]{2}|2A|2B)[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{2}$/) != -1 ) ? true : false;
		};
	
		//Retourne les partie d'une chemin de fichier
		$.file = new function(){
			
			var $ = this;

			$.name = function(s){				// retourne le nom du fichier à partir de son chemin complet
				s = $.fullname(s);
				var n = s.lastIndexOf(".");
				return ( n == -1 ) ? s : s.substr(0 , n)
			};
		
			this.fullname = function(s){		// retourne le nom du fichier avec son extension à partir de son chemin complet
				if(typeof(s) != "string") {
					return "";
				}	
				var n = p.toString().lastIndexOf("/");
				return ( n == -1 ) ? s : s.substr(n + 1, s.length)
			};

			$.path = function(s){				// retourne le nom du chemin à partir du chemin complet d'un fichier
				if(typeof(s) != "string") {
					return "";
				}
				var n = s.toString().lastIndexOf("/");
				return ( n == -1 ) ? s : s.substr(0, n + 1);
			}
		}
		
	},
	
	//Fonctions du navigateur
	nav: new function(){		
		
		var $ = this;
		$.agent = navigator.userAgent.toLowerCase();
		$.version = ($.agent.match( /.+(?:firefox|version|pera|chrome|onqueror|msie)[\/: ]([\d.]+)/ ) || [])[1];
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
		$.marginLeft = 0;
		$.marginRight = 0;
		$.marginTop = 0;
		$.marginBottom = 0;
		$.location = null;
		$.ready = false;					// chargement document terminée
		$.readyfull = false;				// chargement document terminée y compris le préchargement des images
		$.inload = false;					// lot d'images en cours de chargement
		$.timer = null;
		
		//Type de navigateur
		$.type = function(){
			
			var a = $.agent;
			
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
			
		};
				
		//Propriétés à obtenir après le chargement du DOM
		$.load = function(){
			$.body = window.document.body;
			$.location = window.document.location;			
			$.size();
			$.marge();
			$.ready = true;
		};
				
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
				$.screenY = document.documentElement.clientHeight;
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
		
		//Obtient les marges du document	
		$.marge = function(){						
			$.marginLeft = ($.body.style.marginLeft == "") ? 0 : parseFloat($.body.style.marginLeft);
			$.marginRight = ($.body.style.marginRight == "") ? 0 : parseFloat($.body.style.marginRight);
			$.marginTop = ($.body.style.marginTop == "") ? 0 : parseFloat($.body.style.marginTop);
			$.marginBottom = ($.body.style.marginBottom == "") ? 0 : parseFloat($.body.style.marginBottom);
			if($.msie){
				$.marginLeft = (parseFloat($.marginLeft) == 0) ? (isNaN($.body.leftMargin)) ? 0 : parseFloat($.body.leftMargin) : $.marginLeft;
				$.marginRight = (parseFloat($.marginRight) == 0) ? (isNaN($.body.rightMargin)) ? 0 : parseFloat($.body.rightMargin) : $.marginRight;
				$.marginTop = (parseFloat($.marginTop) == 0) ? (isNaN($.body.bottomMargin)) ? 0 : parseFloat($.body.topMargin) : $.marginTop;
				$.marginBottom = (parseFloat($.marginBottom) == 0) ? (isNaN($.body.bottomMargin)) ? 0 : parseFloat($.body.bottomMargin) : $.marginBottom;
			}
		};
		
		//Obtient la position des ascenseurs du navigateur
		$.scroll = function(){
			
			if( $.msie || $.opera ){
				// ! la balise doctype doit être présente dans le document html 
				$.scrollX = (parseFloat(oNav.version) < 6 ) ? document.body.scrollLeft : document.documentElement.scrollLeft;
				$.scrollY = (parseFloat(oNav.version) < 6 ) ? document.body.scrollTop : document.documentElement.scrollTop;
			}
			else{
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
		$.keydown = function(e){
			$.keyb.esc(e);
			$.keyb.enter(e);
		};
		
		//Fonctions sur évènement clavier
		$.keyb = new function(e){
			
			var $ = this;
			
			// sur la touche échape [escape]
			$.esc = function(e){						
				e = e || window.event;
				// cache l'éventuelle boîte de dialogue
				if( e.keyCode == 27 ){
					Jaria.nav.hideallbox(true);
				}
			};
			
			// sur la touche entrer [enter]
			$.enter = function(v){		
				
				var e = Jaria.el.getbyevent(v);
				var f = e.getAttribute("data-enter");	
				// execute un traitement sur la touche Enter et sur l'élément ayant l'attribut data-enter
				if(e != undefined && v.keyCode == 13 && f != null && typeof(eval(f)) == "function"){					
					eval(f + "(e)");
				}

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
		
		$.getparentevent = function(s, e){
			if(!Jaria.el.test(e)){
				e = (["onscroll", "onload", "onresize"].indexOf(s) != -1) ? window : document;
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
			
			e = $.getparentevent(s, e);
			
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
			
			e = $.getparentevent(s, e);
			
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
	
		$.cleartimer = function(t){
			try{
				window.clearInterval(t);
			}catch(e){
				try{
					window.clearTimeout(t);
				}catch(E){}
			}
		};
		
		//Active ou désactive le menu contextuel du clic droit de la souris
		$.contextmenu = function(a, e){
			if(a){
				$.cleartimer($.timer);
				$.timer = null;
			}
			if(Jaria.el.test(e)){
				e.oncontextmenu = function(){
					return a;
				}
			}
			else{
				document.oncontextmenu = function(){
					return a;
				}
			}
		};
	
		$.hideallbox = function(b){
			if(Jaria.nav.lock.escape && b){
				Jaria.nav.lock.hide();
			}
			alert("escape")
			//Jaria.el.title.hide();
		};
		
		$.loadimg = function(){
			var a = arguments
			if( a.length == 0 ){
				return false;
			}			
			var s = "";
			for( var i = 0; i < a.length; i++ ){
				s += (i == a.length -1) ? a[i] : a[i] + ",";
			}
			if( !$.readyfull || $.inload){
				window.setTimeout("Jaria.nav.loadimg('" + s + "')", 100);				
				return false;
			}
			$.inload = true;
			$.loadimage.start(s);
		};	
		
		$.lock = new function(){
			
			var $ = this;
			$.exist = false;			
			$.escape = true;
			
			$.hide = function(){
				return false;
			};
		
		};
		
		$.loadimage = new function(){
			
			var $ = this;
			var nav = nav;
			
			$.el = undefined;						// fenêtre de chargement
			$.images = [];								// images à charger
			$.lastimage = 0;							// dernière image chargée	
			$.timer = null;
			$.showloading = false;				// afficher le préchargement des images
			
			$.start = function(){
				if(arguments.length > 0){
					$.images = (arguments.length == 1 && arguments[0].toString().split(",").length > 1) ? arguments[0].toString().split(",") : arguments;		
				}
				var i = $.lastimage;
				var img = "";
				if( nav.ready && $.images.length > 0 ){
					if( !oEl.isobject($.images[i]) ){
						img = $.images[i];
						$.images[i] = new Image();
						$.images[i].src = oText.trim(img);
						$.show("Préchargement des images : " + (i+1).toString() + " / " +	$.images.length);
						$.images[i].onerror = function(){
							$.show("Impossible de charger l'image " + oText.trim(img) + "!");
							i++;
							$.lastimage = i;	
						};
					}
					if( $.images[i].complete ){
						i++;				
						if( i >= $.images.length ){			// dernière image chargée												
							$.clear();
							return false;
						}					
						$.lastimage = i;			
					}			
				}			
				$.timer = window.setTimeout(nav.loadimage.start, 5);				
			};	
					
			$.clear = function(){
				$.lastimage = 0;
				$.images = [];
				nav.init_timer($.timer);
				nav.timer = null;
				nav.readyfull = true;	
				nav.inload = false;
				$.hide();
			};
						
			$.show = function(txt){
				if(!$.showloading){
					return false;
				}
				$.hide();
				nav.lock.anim = false;
				$.el = oEl.create("div");
				$.el.className = "jaria_loadimage";
				$.el.appendChild(oEl.text(txt));
				Jaria.el.opacity($.el, 60);
				nav.body.appendChild($.el);
				$.el.style.left = oText.toPx(5  + nav.scrollX);
				$.el.style.top = oText.toPx(5 + nav.scrollY);				
			};
			
			this.hide  = function(){
				try{
					nav.body.removeChild($.el);
					$.el = undefined;
				}
				catch(e){}		
			};
						
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
				//Hors élément non conteneur
				if(["br", "hr", "img"].indexOf(e.tagName.toLowerCase()) == -1){
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
				Jaria.box.show("L'élément HTML " + (typeof(e) == "string") ? e : typeof(e) + " n'existe pas !");
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
		
		$.getbyevent = function(e){
			if( $.test(e) ){
				return e;
			}
			if( e.type != undefined){
				return ( !oNav.msie ) ? e.target : window.event.srcElement;
			}
			return undefined;
		};
		
	},
	
	//*********************
	//fonction à instancier
	//*********************
	
	//Boite de dialogue personnalisée
	Box: function(){
		
		var $ = this;
		$.txt = "";
		
		$.show = function(){
			
			if(Jaria.txt.test($.txt)){
				alert($.txt);
			}
			
		}
		
	},
	
	//Fonction Ajax
	Ajax: function(){
	
		var $ = this;
		var txt = Jaria.txt;
		var box = new Jaria.Box();
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
var oBox = new Jaria.Box();
var oAjax = new Jaria.Ajax();
