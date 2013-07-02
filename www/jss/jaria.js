var Jaria = {
		
	version: "20130701",
	images: "jaria/images",
	
	
	//fonction instanciée
	nav: new function()	{
		
		var $ = this;
		$.version = (navigator.userAgent.match( /.+(?:firefox|version|pera|chrome|onqueror|msie)[\/: ]([\d.]+)/ ) || [])[1];
		
	},
	
	//fonction à instancier
	box: function() {
		
		var $ = this;
		$.texte = "";
		
		$.show = function() {
			if($.texte != "") {
				alert($.__proto__.__proto__.images);
				alert(Jaria.version + " " + $.texte);
			}
		}
		
	}
		
}

/*Jaria.prototype.Ajax = function(){
	
}*/

var oNav = Jaria.nav;
var oBox = new Jaria.box();
