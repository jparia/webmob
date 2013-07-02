var Jaria = {
		
	version: "20130701",
	images: "jaria/images",
	
	
	//fonction instanciée
	nav: new function()	{
		
		var $ = this;
		$.version = (navigator.userAgent.match( /.+(?:firefox|version|pera|chrome|onqueror|msie)[\/: ]([\d.]+)/ ) || [])[1];
		
	},
	
	txt : new function(){
		
		var $ = this;
		$.test = function(s){
			if( typeof(s) != "string" || s == "" ){
				return false;
			}
			return true;
		}
	},
	
	//fonction à instancier
	box: function() {
		
		var $ = this;
		$.texte = "";
		
		$.show = function() {
			
			if(Jaria.txt.test($.texte)) {
				alert(Jaria.version + " " + $.texte);
			}
			
		}
		
	}
		
}

/*Jaria.prototype.Ajax = function(){
	
}*/

var oNav = Jaria.nav;
var oBox = new Jaria.box();
