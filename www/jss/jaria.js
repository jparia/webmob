var Jaria = {
		
	version: "20130715",
	path: "jaria/images/",
		
	//Retourne un tableau des images de la bibliothèque Jaria
	images: function(){
		var $ = this;
		return [
			$.path + "box/btresize.png",
			$.path + "box/btclose.png",
			$.path + "box/btclose_hover.png",	
			$.path + "bubble/bas.gif",
			$.path + "bubble/haut.gif",
			$.path + "button/button_blue.png",
			$.path + "button/button_gray.png",
			$.path + "button/button_yellow.png",
			$.path + "button/button_less_hover.png",
			$.path + "button/button_more_hover.png",
			$.path + "button/button_play.png",
			$.path + "button/button_stop.png",
			$.path + "cal/date.gif",
			$.path + "cal/time.gif",
			$.path + "lock/1.gif",
			$.path + "lock/2.gif",
			$.path + "lock/3.gif",
			$.path + "lock/4.gif",
			$.path + "lock/5.gif",
			$.path + "lock/6.gif",
			$.path + "lock/7.gif",
			$.path + "lock/8.gif",
			$.path + "lock/9.gif",
			$.path + "lock/10.gif",
			$.path + "previsu/cadre.gif",
			$.path + "previsu/cadre_ombre.gif",
			$.path + "previsu/cadre_texte_c.gif",
			$.path + "previsu/cadre_texte_d.gif",
			$.path + "previsu/cadre_texte_g.gif",
			$.path + "trace/clear.png",
			$.path + "trace/pause.png",
			$.path + "trace/play.png",
			$.path + "enter.gif",
			$.path + "loadimg.gif",
			$.path + "loading.gif",
			$.path + "move.gif",
			$.path + "vide.gif"
		]
	},
	
	//Fonctions diverses appelées avant le chargement du DOM
	ini: function($){
		
		$.nav.type();
		
		//Ajoute les fonctions du navigateur au évènements
		$.nav.addevent("onscroll", $.nav.scroll);			//Au déplacement des ascenseurs de la fenêtre du navigateur
		$.nav.addevent("onresize", $.nav.size);				//Au redimentonnement de la fenêtre du navigateur
		$.nav.addevent("onmousemove", $.nav.mouse.move);	//Au déplacement de la souris
		$.nav.addevent("onkeydown", $.nav.keydown);			//Sur touche du clavier
		window.onload = $.nav.load;							//Après le chargement du DOM (compatible IE7)
		
		//Intances des fonctions Jaria
		Jaria.box = new Jaria.Box();
		Jaria.color = new Jaria.Color();
		Jaria.loadimage = new Jaria.Loadimage();
	},
	
	//*********************
	//fonctions instanciées
	//*********************
	
	//Gestion des fonctions
	fn: new function(){
		
		var $ = this;
		$.tab = new Array();
		
		$.search = function(f){
			for(var i = 0; i < $.tab.length; i++){					
				if(Array.isArray($.tab[i])){
					if($.tab[i].indexOf(f) != -1){											
						return i;
					}
				}
			}
			return -1;
		};
		
		//Ajoute une fonction dans une fonction
		$.append = function(f, nf){
			var n = $.search(f);				
			if(n < 0){
				n =  $.tab.length;
				$.tab[n] = new Array();	
				$.tab[n].push(f);
			}			
			if($.tab[n].indexOf(nf) < 0){
				$.tab[n].push(nf);
			}
			return function(){				
				for(var i = 0; i < $.tab[n].length; i++){
					$.tab[n][i]();
				}
			}
		};
		
		$.remove = function(f, df){
			return function(){
					f();
			}
		}
		
	},	
	
	//Fonctions des tableaux
	tab : new function(){
		//Supprime un élèment d'un tableau par sa valeur
		Array.prototype.unset = function(v){
			var i = this.indexOf(v);			
			if(i > -1){
				this.splice(i, 1);
			}
		};
		
		//Ajoute la méthode indexOf d'un tableau pour les anciens navigateurs
		if (!Array.indexOf){ 
			Array.prototype.indexOf = function(o, n){
				for (var i = (n || 0), j = this.length; i < j; i++) {
					if (this[i] === o) {
						return i;
					}
				}
				return -1;
			}
		}
		
		//Ajoute la méthode isArray d'un tableau		
		if(!Array.isArray) {			
			Array.isArray = function(a) {
			  	return Object.prototype.toString.call(a) === "[object Array]";
			}
		}
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
			if (!$.test(s) || isNaN(n)){ 
				n = 0;
				s = "";
			}
			var z = "0";
			for(var i = 0; i < (parseInt(n) - s.length); i++){
				z += "0";
			}
			return ( s.length <= n ) ? z + s : s;
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
		
		//Retourne la valeur en pixels
		$.px = function(n){
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
		
		//Singulier ou pluirel selon n. Prend en compte les exceptions.
		$.pluriel = function(t, n){
			if (n <= 1){
				return t;	
			}
			if (!$.test(t)){
				return "";
			}
			l = $.lower(t);
			var c = (l.slice(-2) == "ou" && ["genou", "caillou", "bijou", "chou", "pou", "hibou", "joujou"].indexOf(l) != -1) ? "x" : "s";
			c = (l.slice(-2) == "eu" && ["bleu", "pneu", "émeu"].indexOf(l) == -1) ? "x" : c;
			c = (l.slice(-2) == "au" && ["landau" ,"sarrau"].indexOf(l) == -1) ? "x" : c;
			if (l.slice(-3) == "ail" && ["bail", "corail", "soupirail", "travail", "vantail", "vitrail"].indexOf(1) == -1){
				t = t.substr(0, t.length - 3) + "aux";
				c = "";
			}
			if (l.slice(-2) == "al"  && ["bal", "cal", "carnaval", "cérémonial", "chacal", "festival", "récital", "régal"].indexOf(l) == -1){
				t = t.substr(0, t.length - 2) + "aux";
				c = "";
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
		$.oldmsie = false;
		$.firefox = false;
		$.opera = false;
		$.safari = false;
		$.chrome = false;
		$.konqueror = false;	
		$.gecko = false;
		$.dolfin = false;
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
				if($.version < 9){
					$.oldmsie = true;
				}
			}
			else if(a.indexOf("gecko") != -1){
				$.gecko = true;
				$.name = "gecko";
			}
			else if(a.indexOf("dolfin") != -1){
				$.dolfin = true;
				$.name = "dolfin";
			}
			else if(a.indexOf("@") != -1 || a.indexOf("www") != -1 || a.indexOf("http:") != -1 || a.indexOf("ask") != -1){
				$.robot = true;
				$.name = "robot";
			}
			else{
				$.other = true;
				$.name = "other";
			}
			
		};
		
		//Vérifie le support du CSS
		$.support = function(p){
						
   			var d = Jaria.el.create("div"); 
      		var v = 'Khtml Ms O Moz Webkit'.split(" "); 
      		var l = v.length;
      		
    		if (p in d.style){
    			return true;
    		}  
  			p = p.replace(/^[a-z]/, function(v){  
         		return v.toUpperCase();  
     		});  
  
		    while(l--){  
		       if (v[l] + p in d.style ) {  
		          return true;  
		       }   
		    }  
		    return false;		     
 		};  
				
		//Propriétés à obtenir après le chargement du DOM
		$.load = function(){
			
			$.body = window.document.body;
			$.location = window.document.location;			
			$.size();
			$.marge();
			$.ready = true;
			
			Jaria.loadimage.start({
				show: true,
				url: Jaria.images()
			});			
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
			if($.lock.exist){
				$.lock.el.css({
					width: Jaria.txt.px($.screenX),
					height: Jaria.txt.px($.screenY)
				});
				$.lock.setText();	
			}
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
			
			//TODO
			/*
			 if( $.trace.box.exist ){
				$.trace.pos();
			}
			*/
			if($.lock.exist){
				// positionnement du lock
				$.lock.el.css({
					left: Jaria.txt.px($.scrollX),
					top: Jaria.txt.px($.scrollY)
				})			
			}			
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
				if( e.keyCode == 27 ){
					Jaria.nav.onescape();
				}
			};
			
			// sur la touche entrer [enter]
			$.enter = function(v){		
				
				var e = Jaria.el.byevent(v);
				var f = e.getAttribute("data-enter");	
				// execute un traitement sur la touche Enter et sur l'élément ayant l'attribut data-enter
				if(e != undefined && v.keyCode == 13 && f != null && typeof(eval(f)) == "function"){					
					eval(f + "(e)");
				}

			}					
		};
		
		//Fonction appelée sur lors de l'action sur la touche escape
		$.onescape = function(){
			//TODO
			//Jaria.el.title.hide();
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
					return false;
				}
			}
			return true;
		};
	
		//Limite la propagation de l'évènement à l'élèment
		$.stopevent = function(e){
			e = e || window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}
			else{
				e.cancelBubble = true;
			}
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
				
		//Préhargment des images externes
		$.loadimage = function(o){
			var s = (typeof(o) != "string") ? JSON.stringify(o) : o;
			if( !$.readyfull || $.inload){
				window.setTimeout("Jaria.nav.loadimage(" + s + ")", 100);				
				return false;
			}
			$.inload = true;
			Jaria.loadimage.start(s);
		};
		
		//Grise la fenêtre du navigateur pour empêcher toute action avec un message et une image animée
		$.lock = new function(){
			var $ = this;
			$.el = undefined;
			$.exist = false;
			$.opacity = 60;						// opacité
			$.anim = true;						// animation au centre
			$.color = "#fff";					// couleur
			$.image = 1;						// image de chargement
			$.text = "";						// texte à afficher
			$.textColor = "#000";				// couleur du texte
			$.escape = true;					// unlock sur la touche escape
			
			//Grise la page
			$.show = function(o){
				var txt = Jaria.txt;
				var el = Jaria.el;
				var nav = Jaria.nav;
				var color = Jaria.color;
				if(!Jaria.nav.ready){
					return false;
				}
				if(!$.exist){
					if(txt.isjson(o)){
						o = JSON.parse(o);
					}
					if(el.isjson(o)){
						for(d in o){
							if(d == "opacity" && !isNaN(o[d])){
								$.opacity = parseInt(o[d]);
							}
							if(d == "anim" && typeof(o[d]) == "boolean"){
								$.anim = o[d];
							}
							if(d == "color" && color.iscolor(o[d])){
								$.color = o[d];
							}
							if(d == "image" && !isNaN(o[d])){
								$.image = parseInt(o[d]);
							}
							if(d == "text" && txt.test(o[d])){
								$.text = o[d];
							}
							if(d == "textColor" && color.iscolor(o[d])){
								$.textColor = o[d];
							}
							if(d == "escape" && typeof(o[d]) == "boolean"){
								$.escape = o[d];
							}
						}
					}
					if( isNaN($.opacity) || parseInt($.opacity) < 10 || parseInt($.opacity) > 100 ){
						$.opacity = 60;
					}
					//TODO 
					//el.title.hide();					// cache les éventuelles info-bulles
					$.el = el.create("div");
					$.el.className = ($.anim) ? "jaria_lock jaria_lock_" + $.image : "jaria_lock";
					if(!color.iscolor($.color)){
						$.color = "#fff";
					}
					$.el.html("&nbsp;");
					$.el.css({
						top: txt.px(nav.scrollY),
						left: txt.px(nav.scrollX),
						width: txt.px(nav.screenX),
						height: txt.px(nav.screenY),
						backgroundColor: $.color
					});			
					nav.body.appendChild($.el);
					$.setText();		
					$.exist = true;
					el.opacity($.el, $.opacity);
					//TODO oCal.datepicker.hide();	
					//TODO oCal.timepicker.hide();
					if($.escape){
						//Ajoute la fonction hide() à la fonction Jaria.nav.onescape pour prendre en compte la fermeture du lock dans l'événement de la touche ESCAPE
						nav.onescape = Jaria.fn.append(nav.onescape, $.hide);
					}
				}					
			};
			
			//Applique un texte
			$.setText = function(){
				if( $.text != ""){	
					$.el.innerHTML = "";
					var d = Jaria.el.create("div");
					d.className = "jaria_lock_texte";
					if( Jaria.color.iscolor($.textColor) ){
						d.style.color = $.textColor;
					}
					d.html($.text);						
					$.el.appendChild(d);
					d.css({
						top: (Jaria.txt.px(($.el.sizeY() / 2) + 40)),
						color : $.textColor
					})
				}			
			};
			
			//Dégrise la page
			$.hide = function(){						// dégrise  [unlock]
				$.exist = false;
				$.anim = true;
				$.opacity = 60;
				$.color = "#fff";
				$.textColor = "#000";
				$.text = "";
				$.image = 1;
				$.el.del($.el);
				$.el = undefined;
				$.escape = true;
			}
		}
			
	},
	
	//Fonctions des éléments du DOM
	el: new function(){
		
		var $ = this;
		
		//Ajoute des fonctions au éléments
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
					if(Jaria.txt.test(t)){
						this.innerHTML = t.toString();
					}
					return this.innerHTML;
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
			};
			e.css = function(o){								//affecte un ou plusieurs styles CSS par des valeurs sous forme d'objet JSON
				if($.isobject(o)){							
					Jaria.el.css(this, o);
				}
				else if(Jaria.txt.isjson(o)){
					Jaria.el.css(el, JSON.parse(o));
				}
			};
			e.parent = function(){									//parent de l'élèment ou lui-même si pas de parent
				if(!this.parentNode.tagName){
					return this;
				}
				$.fn(this.parentNode);
				return this.parentNode;
			};
			e.tag = function(){											//retourne le nom du tag de l'élèment ou "" si pas du DOM
				if(!this.tagName){
					return "";
				}
				return this.tagName.toLowerCase();
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
			e.top = function(){
				return this.offsetTop;
				//Jaria.el.offset(this, "top");
			};
			e.left = function(){
				return this.offsetLeft;
				//Jaria.el.offset(this, "left");
			};
			e.sizeX = function(){
				return this.offsetWidth;
				//Jaria.el.offset(this, "width");
			};	
			e.sizeY = function(){
				return this.offsetHeight;
				//Jaria.el.offset(this, "height");
			};
			
			//Annule le déplacement sur un élément
			e.undrag = function(){
				var $ = this;
				$.onmousedown = null;
				$.onmousemove = null;
				$.onmouseup = null;
			};
			
			//Déplacement de l'élément par la souris (drag and drop)
			e.drag = function(o){
				
				var $ = this;
				var nav = Jaria.nav;
				var txt = Jaria.txt;
				var el = Jaria.el;
				var start = false
				var x = 0;
				var y = 0;
				var sx = 0;
				var sy = 0;
				var dx = 0;
				var dy = 0;
				var dop = 100;
				var op = 100;
				var z = 0;
				var p = "";
				
				function onStart(){};				
				function onMove(){};				
				function onStop(){};	
				
				if(txt.isjson(o)){				
					o = JSON.parse(o);
				}
				if(el.isjson(o)){
					for(d in o){
						if(d == "cursor" && txt.test(o[d])){
							$.style.cursor = o[d];
						}
						if(d == "opacity" && !isNaN(o[d])){
							op = parseFloat(o[d]);
						}
						if(d == "css" && el.isobject(o[d])){
							$.css(o);
						}						
						if(d == "onstart" && typeof(o[d]) == "function"){
							onStart = o[d];
						}
						if(d == "onmove" && typeof(o[d]) == "function"){
							onMove = o[d];
						}
						if(d == "onstop" && typeof(o[d]) == "function"){
							onStop = o[d];
						}

					}
				}

				$.onmousedown = function(){					
					e = event || window.event;					
					sx = $.offsetLeft;
					sy = $.offsetTop;					
					dx = e.clientX + nav.scrollX;
					dy = e.clientY + nav.scrollY;
					p = $.style.position;
					z = $.style.zIndex;
					dop = el.getopacity($);
					
					if(p != "absolute"){				
						$.style.position = "absolute";
					}					
					$.style.zIndex = (!isNaN(z)) ? z + 100 : 200;
					$.style.opacity = op;
					start = true;
					txt.select(false);
					onStart($);	
				};
				
				$.onmousemove = function(){
					if(start){
						e = event || window.event;						
						x = e.clientX + nav.scrollX;
						y = e.clientY + nav.scrollY;
						$.style.left = txt.px(sx + (x - dx));
						$.style.top = txt.px(sy + (y - dy));
						onMove($);
					}
				}
				
				$.onmouseup = function(){
					start = false
					txt.select(true);
					$.css({
						position: p,
						zIndex: z
					});
					el.opacity($, dop);
					onStop($);
				}
				
			};
			
			//Redimentionne l'élément par la souris
			e.resize = function(o){
	
				var $ = this;
				var nav = Jaria.nav;
				var txt = Jaria.txt;
				var el = Jaria.el;
				var start = false
				var x = 0;
				var y = 0;
				var sx = 0;
				var sy = 0;
				var dx = 0;
				var dy = 0;
				var dop = 100;
				var op = 100;
				var z = 0;
				var p = "";
				
				function onStart(){};				
				function onMove(){};				
				function onStop(){};	
				
				if(txt.isjson(o)){				
					o = JSON.parse(o);
				}
				if(el.isjson(o)){
					for(d in o){
						if(d == "cursor" && txt.test(o[d])){
							$.style.cursor = o[d];
						}
						if(d == "opacity" && !isNaN(o[d])){
							op = parseFloat(o[d]);
						}
						if(d == "opacity" && !isNaN(o[d])){
							op = parseFloat(o[d]);
						}						
						if(d == "onstart" && typeof(o[d]) == "function"){
							onStart = o[d];
						}
						if(d == "onmove" && typeof(o[d]) == "function"){
							onMove = o[d];
						}
						if(d == "onstop" && typeof(o[d]) == "function"){
							onStop = o[d];
						}

					}
				}	
	
				$.onmousedown = function(){					
					e = event || window.event;					
					sx = $.offsetLeft + $.offsetWidth;
					sy = $.offsetTop + $.offsetHeight;					
					dx = e.clientX + nav.scrollX;
					dy = e.clientY + nav.scrollY;
					dop = el.getopacity($);
					el.getopacity($, op);
					start = true;
					txt.select(false);
					onStart($);	
				};
				
				$.onmousemove = function(){
					if(start){
						e = event || window.event;						
						x = e.clientX + nav.scrollX;
						y = e.clientY + nav.scrollY;
						$.style.width = txt.px(sx + (x - dx));
						$.style.height = txt.px(sy + (y - dy));
						onMove($);
					}
				}
				
				$.onmouseup = function(){
					start = false
					txt.select(true);
					el.getopacity($, dop);
					onStop($);
				}
				
			};			
							
			//Animation de l'élément	
			e.anime = function(o){
				
				var txt = Jaria.txt;
				var $ = this;
				var t = 0;
				var l = 0;
				var w = 0;
				var h = 0
				var timer = null;	
				
				function onStart(){};				
				function onAnime(){};				
				function onStop(){};				
				
				if(txt.isjson(o)){				
					o = JSON.parse(o);
				}
				if(Jaria.el.isjson(o)){
					for(d in o){
						if(d == "top" && !isNaN(o[d])){
							t = parseInt(o[d]);
						}
						if(d == "left" && !isNaN(o[d])){
							l = parseInt(o[d]);
						}
						if(d == "width" && !isNaN(o[d])){
							w = parseInt(o[d]);
						}
						if(d == "height" && !isNaN(o[d])){
							h = parseInt(o[d]);
						}
						if(d == "onstart" && typeof(o[d]) == "function"){
							onStart = o[d];
						}
						if(d == "onanime" && typeof(o[d]) == "function"){
							onAnime = o[d];
						}
						if(d == "onstop" && typeof(o[d]) == "function"){
							onStop = o[d];
						}

					}
				}
				
				var dl = $.offsetLeft + l;
				var dt = $.offsetTop + t; 
				var dw = $.offsetWidth + w;
				var dh = $.offsetHeight + h;
				var pl = (l >= 0) ? 2 : -2;
				var pt = (t >= 0) ? 2 : -2;
				var pw = (w >= 0) ? 2 : -2;
				var ph = (h >= 0) ? 2 : -2;
				
				// arrêt du déplacement progressif de l'élément
				function Stop(){	
					window.clearInterval(timer);		
					timer = null;
					$.style.left = txt.px(dl);
					$.style.top = txt.px(dt);
					$.style.width = txt.px(dw);
					$.style.height = txt.px(dh);
					onStop($);
				}
				
				// démarrage du déplacement 
				function Start(){
					onStart($);
					timer = window.setInterval(Go, 4);					
				}	
				
				// animation de l'élément
				function Go(){
					if(l != 0 && $.offsetLeft < dl){
						$.style.left = txt.px($.offsetLeft + pl)
					}
					if(t != 0 && $.offsetTop < dt){
						$.style.top = txt.px($.offsetTop + pt)
					}
					if(w != 0 && $.offsetWidth < dw){
						$.style.width = txt.px($.offsetWidth + pw)
					}
					if(w != 0 && $.offsetHeight < dh){
						$.style.height = txt.px($.offsetHeight + ph)
					}
					if($.offsetLeft >= dl && $.offsetTop >= dt && $.offsetWidth >= dw && $.offsetHeight >= dh){
						Stop();
						return;
					}
					onAnime($);				
				}
						
				Start();		
				
			}
		};
		
		//Test un objet
		$.isobject = function(o){
			return ( typeof(o) == "object" ) ? true : false;
		};
		
		//Test un objet JSON
		$.isjson = function(o){
			try{
				JSON.stringify(o);								
				return true;
			}
			catch(e){}
			return false;							
		};
		
		//Test un élément		
		$.test = function(e){
			if(typeof(e) == "object"){
				if(typeof(e.tagName) == "string" && typeof(e.className) == "string"){
					return true;
				}
			}
			if(typeof(e) == "string"){
				if(document.getElementById(e)){
					return true;
				}
			}
			return false;
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
			return (!$.test(e)) ? "" : e.tagName.toString().toLowerCase();
		};
		
		//Retourne l'élèment par un évèment
		$.byevent = function(e){
			if( $.test(e) ){
				return $.get(e);
			}
			if( e.type != undefined){
				return e.target || window.event.srcElement;
			}
			return undefined;
		};
		
		//Retourne la dimention ou la position réelle en pixels d'un élément par rapport au document
		$.offset = function(e, s){
			/*
				argument 0 : obligatoire		élément
				argument 1 : obligatoire		propriété (left, top, height, width)
				argument 1 : optionnel			parent
			*/
			var txt = Jaria.txt;
			if( !txt.test(e) || !txt.test(s) ){
				return 0;
			}
			e = Jaria.el.get(e);
			s = s.replace("offset", "");
			s = "offset" + txt.firstUp(s);
			if( s.indexOf("Height") != -1 || s.indexOf("Width") != -1 ){
				return eval("e." + s + ";");
			}
			var a = 0;
			var t = ( oBox.exist && e.className == "jaria_listlock"  ) ? "div" : "body";
			while (e && txt.lower(e.tagName) != t){
				eval("a += e." + s + ";");
				e = e.offsetParent;
			}
			return a;		
		};
		
		//Créé un node texte
		$.text = function(t){
			return document.createTextNode(t);
		};
		
		//Ajoute un node texte à un élément
		$.addtext = function(e, t){
			e.appendChild($.text(t));
		};
		
		//Créé un élément
		$.create = function(t){	
			var e = document.createElement(t);
			$.fn(e);
			return e;
		};

		//Supprime un élément
		$.del = function(e){
			if( !$.isobject(e) ){
				if( !$.test(e) ){
					return false;
				}
				e = $.get(e);
			}
			try{
				e.parentNode.removeChild(e);
				e = undefined;
			}
			catch(e){}
		};
		
		//Applique une opacité à un élément de 0 à 100
		$.opacity = function(e, v){
			if(!$.test(e) || isNaN(v)){
				return false;
			}			
			e = $.get(e);
			if(parseInt(v) < 0){
				v = 0;
			}
			if(parseInt(v) > 100){
				v = 100;
			}			
			if(Jaria.nav.oldmsie){
				e.style.filter = "alpha(opacity=" + parseInt(v) + ")";
			}
			else{
				e.style.opacity = Math.round((parseFloat(v)/100)*10)/10;
			}
		};
		
		//Applique une opacité à un élémen
		$.getopacity = function(e){				// retourne l'opacité d'un l'élément de 0 à 100 ou de 0 à 1 selon le navigateur  [opacity]
			if(!$.test(e)){
				return 0;
			}
			e = $.get(e);
			var v = 100;
			if(Jaria.nav.oldmsie){
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
		
		//Retourne la valeur du style de la class css d'un élément
		$.styleclass = function(e, s){
			/*
				e : obligatoire		élément
				s : obligatoire		nom de la classe CSS
			*/	
			if (!$.test(e)){
				return "";
			}
			e = $.get(e);
			return (!Jaria.nav.msie) ? eval("window.getComputedStyle(e, null)." + s) : eval("e.currentStyle." + s);
		};
		
		//Ajoute une class à l'élément
		$.addclass = function(e, s){
			/*
				e : obligatoire		élément
				s : obligatoire		nom de la classe CSS
			*/			
			if($.test(e) && Jaria.txt.test(s) ){
				e = $.get(e);
				s = Jaria.txt.trim(s);
				var c = e.className.toString();
				if( c.lastIndexOf(s) == -1 ){
					c += " " + s;
				}
				e.className = c;
			}
		};
		
		$.delclass = function(e, s){			// supprime une class à l'élément [className]
			/*
				argument 0 : obligatoire		élément
				argument 1 : obligatoire		nom de la classe CSS
			*/
			var txt = Jaria.txt;
			if($.test(e) && txt.test(s)){
				e = $.get(e);
				var s = txt.trim(s);
				var c = e.className.toString();
				if( c.lastIndexOf(s) != -1 ){
					c = c.replace(s, "");
				}
				e.className = txt.trim(c);
			}
		};		
		
		
		//Repositionne progressivement l'élément dans la fenêtre du navigateur		
		$.setinscreen = function(e){
			
			var el = Jaria.el;
			var txt = Jaria.txt;
			var nav = Jaria.nav;
			function Stop(){
				if( e.id == "JARIA_SETINESCREEN"){
					e.id = "";
				}
				window.clearTimeout($.timer);
				$.timer = null;
				$.isinscreen();
			}
			
			if(!el.test(e)){
				return false;
			}
			e = el.get(e);
			if( e.id == ""){		// attribut un id obligatoire
				e.id = "JARIA_SETINESCREEN";
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

			if(left < oNav.scrollX){
				// repositionne la box à gauche
				e.style.left = txt.px(left + paddingW);
			}			
			if(top < oNav.scrollY){
				// repositionne la box en haut
				e.style.top = txt.px(top + paddingH);
			}
			// fenêtre plus petite que l'élément
			if((left <= 0 && right >= nav.screenX) || (top <= 0 && bottom >= nav.screenY)){
				Stop();
				return false;
			}
			// élément dans la fenêtre
			if((left >= 0 && right <= nav.screenX) && (top >= 0 && bottom <= nav.screenY)){
				Stop();
				return false;
			}
			// coin haut - gauche de l'élément dans le coin de la fenêtre
			if((left == 0 && right >= nav.screenX && top >= 0 && bottom <= nav.screenY) || (top == 0 && bottom >= nav.screenX && left >= 0 && right <= nav.screenY)){
				Stop();
				return false;				
			}
			if(right > nav.screenX){
				e.style.left = txt.px(left - (paddingW + marge));
			}
			if(bottom > nav.screenY){
				e.style.top = txt.px(top - (paddingH + marge));
			}
			//TODO à placer dans box !
			//if(Jaria.box.exist){
			//	oBox.setshadow();
			//}
			$.timer = window.setTimeout("Jaria.el.setinscreen('" + e.id + "')", 20);		
		};
		
		//Fonction à redéfinir executée lorsque le repositionnement de l'élément déplacée par la fonction Jaria.el.setinscreen est terminée 
		$.isinscreen = function(){
			return false;
		};
				
	},
	
	//*********************
	//fonction à instancier
	//*********************
		
	//Préchargement des images
	Loadimage: function(){
		
		var $ = this;
		var nav = Jaria.nav;
		var txt = Jaria.txt;
		var a = arguments;
		var t = null;
		var last = 0
		var url = [];						// tableau des URL d'images à charger
		var e = undefined;					// fenêtre de chargement			
		$.view = false;						// afficher le préchargement des images
		
		//Démarre le préchargement
		$.start = function(o){
			if(typeof(o) == "string"){
				o = JSON.parse(o);
			}
			if(Jaria.el.isobject(o)){
				for (var d in o){				
					if(d == "show" && typeof(o[d]) == "boolean"){
						$.view = o[d];						
					}
					if(d == "url" && Array.isArray(o[d]) ){						
						url = o[d];
					}
				}
			}
			var i = last;
			if(nav.ready && url.length > 0){
				if( !Jaria.el.isobject(url[i]) ){
					var u = txt.trim(url[i]);					
					url[i] = new Image();
					url[i].src = u;
					$.show("Préchargement des images : " + (i + 1).toString() + " / " +	url.length);
					url[i].onerror = function(){
						$.show("Impossible de charger l'image <b>" + u + "</b> !");
						i ++;
						last = i;	
					}
				}					
				if(url[i].complete){
					i ++;				
					if( i >= url.length ){			// dernière image chargée												
						$.clear();
						return false;
					}					
					last = i;			
				}	
			}			
			t = window.setTimeout(Jaria.loadimage.start, 10);				
		};	
		
		//Termine le préchargement
		$.clear = function(){
			last = 0;
			url = [];
			nav.cleartimer(t);
			nav.t = null;
			nav.readyfull = true;	
			nav.inload = false;
			$.hide();
		};
		
		//Affiche la progression du préchargement
		$.show = function(s){
			if(!$.view){
				return false;
			}
			$.hide();
			nav.lock.anim = false;
			e = Jaria.el.create("div");
			e.className = "jaria_loadimage";
			e.html(s);
			e.onclick = function(){
				$.hide();
				$.view = false;
			}
			nav.body.appendChild(e);
			e.style.left = txt.px(5  + nav.scrollX);
			e.style.top = txt.px(5 + nav.scrollY);				
		};
		
		//Cache la progression du préchargement
		$.hide  = function(){
			try{
				nav.body.removeChild(e);
				e = undefined;
			}
			catch(e){}		
		};
					
	},
	
	//Boite de dialogue personnalisée
	Box: function(){
		
		var $ = this;	
		$.type = 1;								// 1: information | 2: confirmation | 3: alerte | 4: erreur
		$.ico = 1;								// plus utilisé depuis le 05/11/2011
		$.bts = 1;								// affiche le(s) bouton(s)
		$.quit = 1;								// affiche le bouton quitter dans la barre de titre de la box
		$.title = "";							// tire dans la barre de titre de la box
		$.html = "";							// html du message de la box
		$.focus = 1;							// focus sur le bouton de la box
		$.el = undefined;						// élement Box
		$.posX = 0;								// décalage horizontal par rapport au centre
		$.posY = 0;							// décalage vertical par rapport au centre
		$.width = null;							// redéfini la largeur de la box (400px par défaut)
		$.exist = 0;							// box affichée
		$.lineheight = null;					// hauteur des interlignes du texte HTML
		$.status = false;						// affichage de la barre de status
		$.borderColor = null;					// couleur du contour de la box
		$.color = null;							// couleur du texte de la box
		$.backColor = null;						// couleur de fond de la box
		$.backImage = null;						// image de fond de la box
		$.fader = true;							// affichage progressif de la box
		$.shadow = true;						// ombre de la boîte de dialogue
		$.radius = true;						// bords arrondis
		$.timer = null;
		$.modal = true;							//boîte de dialogue rendu modal par le locking
		
		//Affiche la box d'information
		$.info = function(s, t, w){
			$.show({
				type: 1,
				html: s,
				title: ((Jaria.txt.test(t)) ? t : "Information"),
				width: w,
				borderColor: "#06b68f"
			});
		};

		//Affiche la box de confirmation
		$.confirm = function(s, t, w){
			$.show({
				type: 2,
				html: s,
				title: ((Jaria.txt.test(t)) ? t : "Confirmation"),
				width: w,
				borderColor: "#0661b6"
			});
			//Les boutons de confirmation
			$.el.BtNo = el.create("button");
			$.el.Spa = el.create("span");
			$.el.BtOk.html("Oui");
			$.el.BtNo.className = "jaria_button";
			$.el.BtNo.style.width = "50px";
			$.el.BtNo.html("Non");
			$.el.BtNo.onclick = function(){
				$.el.Bts.innerHTML = "<img src='" + Jaria.path + "loadimg.gif' />";
				$.annul();
			};
			$.el.BtOk.onclick = function(){
				$.el.Bts.innerHTML = "<img src='" + Jaria.path + "loadimg.gif' />";
				$.valid();
			};
			$.el.Spa.html(txt.repeat("&nbsp;", 4));
			$.el.Bts.appendChild($.el.Spa);
			$.el.Bts.appendChild($.el.BtNo);			
		};
		
		//Affiche la box d'alerte
		$.alert = function(s, t, w){
			$.show({
				type: 3,
				html: s,
				title: ((aria.txt.test(t)) ? t : "Alerte"),
				width: w,
				borderColor: "#c6b01e"
			});
		};
		
		//Affiche la box d'erreur
		$.error = function(s, t, w){
			$.show({
				type: 3,
				html: s,
				title: ((Jaria.txt.test(t)) ? t : "Erreur interne!"),
				width: w,
				borderColor: "#ea5247"
			});
		};
		
		//Affiche la box d'attente
		$.wait = function(){
			$.show({
				html: "<div style='text-align:center'><img src='" + Jaria.path + "loadimg.gif' /></div>"
			});
		};
		
		//Fonction appelée à l'annulation de la confirmation de la box
		$.annul = function(){
			$.hide();			
		};
		
		//Fonction appelée à la validation de la confirmation de la box
		$.valid = function(){
			$.hide();			
		};
		
		//Ajoute un bouton spécifique à la box
		$.addbutton = function(t, f){
			if( !$.exist || typeof(t) != "string" || t == "" || typeof(t) != "function" ){
				return false;
			}
			var b = Jaria.el.create("button");
			var s = Jaria.el.create("span");
			bt.onclick = f;
			b.html(t);
			b.className = "jaria_button";
			b.style.width = Jaria.txt.px(10 * t.length);
			s.html(Jaria.txt.repeat("&nbsp;", 4));
			$.el.Bts.appendChild(s);
			$.el.Bts.appendChild(b);
		};

		//Affiche la box
		$.show = function(o){
									
			var nav = Jaria.nav;
			var txt = Jaria.txt;
			var el = Jaria.el;
			var color = Jaria.color;
			
			if( !nav.ready ){
				return false;
			}			
			if(txt.isjson(o)){
				o = JSON.parse(o);
			}
			if(el.isjson(o)){
				for(d in o){
					if(d == "html" && txt.test(o[d])){
						$.html = o[d];
						
					}
					if(d == "title" && txt.test(o[d])){
						$.title = o[d];
					}
					if(d == "width" &&!isNaN(o[d])){
						$.width = o[d];
					}
					if(d == "borderColor" && color.iscolor(o[d])){
						$.borderColor = o[d];
					}
					if(d == "backColor" && color.iscolor(o[d])){
						$.backColor = o[d];
					}
					if(d == "backImage" && color.iscolor(o[d])){
						$.backImage = o[d];
					}
					if(d == "color" && color.iscolor(o[d])){
						$.color = o[d];
					}
					if(d == "fader" && typeof(o[d]) == "boolean"){
						$.fader = o[d];
					}
					if(d == "shadow" && typeof(o[d]) == "boolean"){
						$.shadow = o[d];
					}
					if(d == "radius" && typeof(o[d]) == "boolean"){
						$.radius = o[d];
					}
					if(d == "modal" && typeof(o[d]) == "boolean"){
						$.modal = o[d];
					}
					if(d == "status" && typeof(o[d]) == "boolean"){
						$.status = o[d];
					}
				}
			}			
			
			if( !txt.test($.html) ){
				$.error("le texte html de boite de dialogue est obligatoire!");
			}
			if( $.type < $.exist ){						//Priorités des boîtes de dialogue				
				return false;
			}
			el.del($.el);
			if($.modal){
				nav.lock.show();
			}
			txt.select(false);
			$.el = el.create("div");
			$.el.Head = el.create("div");
			$.el.Title = el.create("div");
			$.el.Quit = el.create("div");
			$.el.Body = el.create("div");
			$.el.Html = el.create("div");
			$.el.Bts = el.create("div");			
			$.el.className = "jaria_box";			
			if($.borderColor != null){
				$.el.style.backgroundColor = $.borderColor;
			}
			$.el.Title.style.color = color.colortext($.el.style.backgroundColor, "#fff", "#333");
			$.width = ( $.width != null && !isNaN($.width) && $.width > 400 && $.width <= (nav.screenX - 20) ) ? $.width : 400;
			// décalages paramétrés x et y
			$.posX = ( !isNaN($.posX) ) ? parseInt($.posX) : 0;
			$.posY = ( !isNaN($.posY) ) ? parseInt($.posY) : 0;
			$.lineheight = ( !isNaN($.lineheight) && parseFloat($.lineheight) >= 15 && parseFloat($.lineheight) <= 100 ) ? parseInt($.lineheight) : 15;
			$.el.style.width = txt.px($.width);										
			$.el.Head.onmousedown = function(){
				$.el.drag({
					opacity: 65
				});
			};
			$.el.Html.onmousedown = function(){
				$.el.undrag();
			};
			$.el.Head.className = "jaria_boxhead";
			$.el.Title.title = "Déplacer";
			$.el.Title.className = "jaria_boxtitre";
			$.el.Title.innerHTML = ( $.title != "" ) ? txt.firstUp($.title) : "&nbsp;";
			$.el.Html.className = "jaria_boxhtml";
			$.el.Body.className = "jaria_boxbody";
			if( $.radius ){
				$.el.style.borderRadius = "7px";
				if( !$.status ){
					$.el.Body.style.borderRadius = "0px 0px 7px 7px";				
				}
			}
			if(color.iscolor($.color)){
				$.el.Html.style.color = $.color;
			}
			if(color.iscolor($.backColor)){
				$.el.Body.style.backgroundColor = $.backColor;
			}			
			if( $.backImage != null ){
				$.el.Body.style.backgroundImage = "url(" + $.backImage + ")";
			}
			if( $.lineheight != null ){
				$.el.Html.style.lineHeight = txt.px($.lineheight);
			}
			$.el.Quit.className = "jaria_boxclose";
			$.el.Html.html($.html);
			$.el.Head.appendChild($.el.Title);
			if($.quit){
				var img = el.create("img");
				img.src = Jaria.path + "box/btclose.png";
				img.alt = "";
				img.title = "Fermer [escape]";
				img.css({
					cursor: "pointer",
					marginTop:"3px"
				})
				img.onmousedown = function(){
					$.el.undrag();
				};
				img.onmouseover = function(){					
					Jaria.el.opacity(this, 100);
				};
				img.onmouseout = function(){
					Jaria.el.opacity(this, 70);
				};
				img.onclick = $.annul;
				$.el.Quit.appendChild(img);
				el.opacity(img, 70);
				$.el.Head.appendChild($.el.Quit);
			}			
			$.el.appendChild($.el.Head);			
			$.el.Body.appendChild($.el.Html);			
			if($.bts){
				$.el.Bts.className = "jaria_boxboutons";				
				$.el.BtOk = el.create("button");
				$.el.BtOk.className = "jaria_button";
				$.el.BtOk.style.width = "50px";
				$.el.BtOk.innerHTML = "Ok";
				$.el.BtOk.onclick = $.hide;
				$.el.Bts.appendChild($.el.BtOk);
				$.el.Body.appendChild($.el.Bts);
			}
			$.el.appendChild($.el.Body);
			nav.body.appendChild($.el);
			$.exist = $.type;	
			if($.fader){
				//TODO
				//el.opacity($.el, 0);				
				//el.fader.plus($.el);
			}		
			
			$.settitle();
			
			//Barre de status en bas
			if($.status){
				$.el.status = el.create("div");
				$.el.status.className = "jaria_boxstatus";
				$.el.status.innerHTML = "&nbsp;";
				$.el.status.title = "Redimensionner";
				el.addclass($.el.Html, "jaria_boxscroll");
				$.el.status.onmousedown = function(){
					$.el.undrag();
					$.resizestart($);
				};
				$.el.status.onmouseup = $.resizestop;
				//nav.addevent("onmouseup", $.resizestop);
				nav.lock.el.onmouseup = $.resizestop;
				$.el.Html.onmouseup =  $.resizestop;
				$.el.Bts.onmouseup =  $.resizestop;
				$.el.posStartX = null;
				$.el.posStartY = null;
				$.el.Html.startX = $.el.Body.offsetWidth;
				$.el.Html.startY = $.el.Body.offsetHeight;
				$.el.appendChild($.el.status);
				$.el.Body.style.marginBottom = "0px";
				if( $.radius ){
					$.el.status.style.borderRadius = "0px 0px 7px 7px";
				}
			}	
							
			$.center();						//centre la box

			if( $.bts && $.focus ){
				$.el.BtOk.focus();	// focus sur le bouton Ok ou Oui
			}
			
			//Ajoute la fonction hide() à la fonction Jaria.nav.onescape pour prendre en compte la fermeture de la box dans l'événement de la touche ESCAPE
			Jaria.nav.onescape = Jaria.fn.append(Jaria.nav.onescape, $.hide);
			
			nav.addevent("onresize", $.center);
			nav.addevent("onscroll", $.center);
			
		};
		
		$.settitle = function(){
			$.el.Title.style.width = Jaria.txt.px($.el.sizeX() - $.el.Quit.sizeX() - 6);			
		};
		
		$.setradius = function(){
			if( $.radius && Jaria.nav.support("borderRadius") ){
				$.el.style.borderRadius = "7px";
				if( !$.status ){
					$.el.Body.style.borderRadius = "0px 0px 7px 7px";				
				}
			}
		};
			
		$.setshadow = function(){
			var el = Jaria.el;
			var txt = Jaria.txt;
			if( $.el && $.shadow && $.exist){
				if(Jaria.nav.support("boxShadow")){
					$.el.style.boxShadow = "4px 4px 8px #999";
				}
				else{
					el.del($.el.shadow);
					$.el.shadow = el.create("div");
					$.el.shadow.className = "jaria_boxshadow";				
					$.el.shadow.style.width = txt.px($.el.sizeX());
					$.el.shadow.style.height = txt.px($.el.sizeY());
					$.el.shadow.style.top = txt.px($.el.top() +  6);
					$.el.shadow.style.left = txt.px($.el.left() + 6);
					Jaria.nav.body.appendChild($.el.shadow);
					el.opacity($.el.shadow, 20);
				}
				$.setradius();
			}			
		};
		
		$.hide = function(){							// détruit la box
			var nav = Jaria.nav;
			var el = Jaria.el;
			if($.el){
				if($.modal){
					nav.lock.hide();
				}
				nav.delevent("onresize", $.center);
				nav.delevent("onscroll", $.center);	
				$.type = 1;
				$.exist = 0;
				$.html = "";
				$.title = "";
				$.posX = 0;
				$.posY = 0;
				$.width = null;
				$.bts = 1;
				$.quit = 1;
				$.status = false;
				$.focus = 1;
				$.lineheight = 15;
				$.color = null;
				$.borderColor = null;
				$.backColor = null;
				$.backImage = null;
				Jaria.txt.select(true);
				//TODO
				//el.title.hide();							// détruit l'éventuelle infobulle
				el.del($.el);
				el.del($.el.shadow);
				$.el = undefined;
				$.fader = true;
				$.shadow = true;
			}
		};
		
		//Centre la box dans la fenêtre du navigateur
		$.center = function(){
			if($.el == undefined){
				return false;
			}
			var nav = Jaria.nav;
			var txt = Jaria.txt;
			nav.scroll();			
			var x = parseInt( (nav.screenX / 2) - ($.el.sizeX() / 2) + nav.scrollX + $.posX );
			var y = parseInt( (nav.screenY / 2) - ($.el.sizeY() / 2) + nav.scrollY + $.posY );
			$.el.css({
				left: txt.px(x),
				top: txt.px(y)
			})		
			Jaria.el.setinscreen($.el);
			$.setshadow();		
		};
		
		//Redimentionne la hauteur de la box 
		$.resizeY = function(h){
			if($.el){
				$.el.Html.style.height = txt.px(h);
				$.el.style.height = txt.px($.el.Head.sizeY() + $.el.Html.sizeY() + $.el.Bts.sizeY() + $.el.status.sizeY() + 3);
				$.setshadow();
			}
		};
	
		//Redimentionne la largeur de la box
		$.resizeX = function(w){
			if($.el){
				$.el.Html.style.width = txt.px(w);
				$.el.style.width = txt.px($.el.Html.sizeX());
				$.setshadow();
			}
		};

		//Démarrage du redimensionnement de la box par la barre de status
		$.resizestart = function($){
			/*
				f : fonction appelée au redimentionnement de la box
			*/
			var el = Jaria.el;
			var nav = Jaria.nav;	
			var txt = Jaria.txt;
			function move(){
				try{
					var h = parseInt($.el.Html.startY) + parseInt(nav.mouse.Y) - nav.scrollY - $.el.posStartY;
					if(!isNaN(h) && h >= 40){
						$.el.Html.style.height = txt.px(h);
						$.el.style.height = txt.px($.el.Head.offsetHeight + $.el.Html.offsetHeight + $.el.Bts.offsetHeight + $.el.status.offsetHeight + 3);
					}
					var w = parseInt($.el.Html.startX) + parseInt(nav.mouse.X) - nav.scrollX - $.el.posStartX;
					if(!isNaN(w) && w >= $.width) {
						$.el.Html.style.width = txt.px(w);
						$.el.style.width = txt.px($.el.Html.offsetWidth);
					}
					if(el.test($.el.shadow)){
						$.el.shadow.style.height = txt.px(el.offset($.el, "height"));
						$.el.shadow.style.width = txt.px(el.offset($.el, "width"));
					}
					console.log($.el.shadow.style.height)
					$.settitle();
				}
				catch(e){
					$.resizestop();
				}				
			}
			if( !$.exist ){
				return false;
			}
			el.opacity($.el, 75);
			if(el.test($.el.shadow)){
				el.opacity($.el.shadow, 10);
			}			
			txt.select(false);
			if( $.el.posStartY == null ){
				$.el.posStartY = parseInt(nav.mouse.Y) - nav.scrollY;
				$.el.posStartX = parseInt(nav.mouse.X) - nav.scrollX;
			}
			if( el.styleclass($.el.status, "cursor") != undefined ){
				nav.lock.el.style.cursor = el.styleclass($.el.status, "cursor");
				$.el.style.cursor = el.styleclass($.el.status, "cursor");
			}			
			$.el.status.onmousemove = move;
			nav.lock.el.onmousemove = move;
			$.el.Html.onmousemove = move;			
		};
		
		//Arrêt du redimensionnmeent de la box
		$.resizestop = function(){
			var $ = this;
			var el = Jaria.el;
			var nav = Jaria.nav;
			if($.el){
				el.opacity($.el, 100);
				//el.opacity($.el.shadow, 20);
				$.el.posStartX = null;
				$.el.posStartY = null;				
				nav.lock.el.style.cursor = "default";
				$.el.style.cursor = "default";
				Jaria.txt.select(true);
				$.el.Html.startY = $.el.Body.offsetHeight;
				$.el.Html.startX = $.el.Body.offsetWidth;
				//document.onmouseup = null;
				$.el.status.onmousemove = null;
				nav.lock.el.onmousemove = null;
				$.el.Html.onmousemove = null;
			}
		};	
		
	},
	
	//Gestion des couleurs
	Color: function(){
	
		var $ = this;	
		
		//TODO à intégrer dans le picker	
		/*this.picker = new function(){	// fonction externalisée redéfinie dans le fichier jaria_colorpicker.js
			this.hide = function(){};
		};*/
		
		//Converti un hexa court en long
		$.shortvershexa = function(c){
			if( !Jaria.txt.test(c) ){
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
		
		//Test une couleur hexa
		$.iscolor = function(c){
			if( !Jaria.txt.test(c) ){
				return false;
			}
			c = $.shortvershexa(c);
			if(c.toString().length != 7){
				return false;
			}
			if(c.toString().substr(0, 1) != "#"){
				return false;
			}
			c = c.toString().substr(1, 7).toUpperCase();
			for( var i = 0; i < c.length; i++ ){
				if( isNaN(c.substr(i, 1)) ){
					if( c.substr(i, 1) != "A" && c.substr(i, 1) != "B" && c.substr(i, 1) != "C" && c.substr(i,1) != "D" && c.substr(i,1) != "E" && c.substr(i,1) != "F" ){
						return false;
					}
				}
			}
			return true;
		};
		
		//Converti la couleur selon le navigateur
		$.navcolor = function(c){
			c = $.shortvershexa(c);
			return (Jaria.nav.oldmsie) ? c : $.rgb_hexa(c);
		};	
			
		//Converti la couleur rgb en hexa
		$.rgb_hexa = function(s){
			var c = "0123456789ABCDEF";
			var h = "";
			var t = s.split(",");
			var R = new String(t[0]);
			R = R.split("(");
			t[0] = R[1];
			var B = new String(t[2]);
			t[2] = B.replace(")", "");
			for(var i = 0; i < t.length; i++){
				var N = parseInt(tab[i]);
				h += c.charAt(N >> 4) + c.charAt(N & 15);
			}
			h = Jaria.txt.upper("#" + h);
			return h;			
		};	
			
		//Converti la couleur hexa en rgb
		$.hexa_rgb = function(c){
			c = $.shortvershexa(c);
			var s = (c.charAt(0)=="#") ? c.substring(1,7) : c;
			var r = parseInt(s.substring(0,2),16);
			var g = parseInt(s.substring(2,4),16);
			var b = parseInt(s.substring(4,6),16);
			return r + "," + g + "," + b		
		};
		
		//Couleur du texte selon la couleur de fond
		$.colortext = function(c, cc, cf){
			try{
				var rgb = (Jaria.color.iscolor(c)) ? Jaria.color.hexa_rgb(c) : c;
				var t = rgb.toString().split(/,/g);
				var r = parseFloat(t[0].replace("rgb(", ""));
				var g = parseFloat(t[1]);
				var b = parseFloat(t[2].replace(")", ""));
				c = ( (0.3 * (r)) + (0.59 * (g)) + (0.11 * (b)) <= 128)  ? cc : cf;
				return c;
			}
			catch(e){
				return "#000";
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
		$.ini = function(){
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
				$.ini();
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
		$.onerror = function(s){
			box.error(s, "Erreur Ajax");
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

Jaria.ini(Jaria);

//Anciens objets dépréciés
var oNav = Jaria.nav;
var oBox = new Jaria.Box();
var oAjax = new Jaria.Ajax();
var oColor = new Jaria.Color();
