var Index = new function(){
	
	_this = this;
	this.count = 0;
	this.delai = 3;
	this.timer = undefined;
	this.popup = undefined;
		
	this.initTable = function(){
		var t = new Array();
		t[0] = new Array("Allemagne", "11");
		t[1] = new Array("Belgique", "12");
		t[2] = new Array("Espagne", "14");
		t[3] = new Array("France", "10");
		t[4] = new Array("Italie", "13");
		return t;
	};
	
	this.buildTable = function(id){	
		if (!El.test(id)){
			return false;
		}
		var parent = El.get(id);
		var table = El.create("table");		
		table.border = "1";
		table.cellPadding = "5";
		table.cellSpacing = "0";
		var thead = El.create("thead");	
		var tr = El.create("tr");
		var td = El.create("td");
		El.addtext(td, "Pays");
		tr.appendChild(td);
		td = El.create("td");
		El.addtext(td, "Frais");
		tr.appendChild(td);
		var tbody = El.create("tbody");		
		var t = this.initTable();
		var c, t;
		for(var i = 0; i < t.length; i++){
			c = (i % 2) ? "#ffc" : "#cff";
			tr = El.create("tr");
			tr.style.backgroundColor = c;
			td = El.create("td");
			El.addtext(td, t[i][0]);
			tr.appendChild(td);
			td = El.create("td");
			El.addtext(td, t[i][1]);
			tr.appendChild(td);
			tbody.appendChild(tr);
		}		
		table.appendChild(tbody);
		parent.appendChild(table);
	};
	
	this.buildSelect = function(id){	
		if (!El.test(id)){
			return false;
		}		
		var parent = El.get(id);
		var sel = El.create("select");
		var opt;
		var t = this.initTable();
		for(var i = 0; i < t.length; i++){
			opt = El.create("option");
			c = (i % 2) ? "#ffc" : "#cff";
			opt.value = t[i][1];
			opt.text = t[i][0];
			opt.style.backgroundColor = c;
			sel.appendChild(opt);
		}
		parent.appendChild(sel);
		
	};

	
	this.navigator = function(){
		var el = El.get("navigator");
		var nbPlugin = window.navigator.plugins.length; 
		var div = El.create("div");
		var name, color, txt, b; 
		El.removeAll(el);
		div.style.margin = "10px";
		div.style.fontWeight = "bold";
		El.addtext(div, "Nombre de plugins : " + nbPlugin);
		el.appendChild(div);
		for( var i = 0; i < nbPlugin; i++){
			name = window.navigator.plugins[i].filename;
			desc = window.navigator.plugins[i].description;
			div = El.create("div");
			div.style.MarginTop = "2px";
			color = (name.lastIndexOf("pdf") != -1) ? "#900" : "#333";
			El.addtext(div, "Nom du plugin n°" + (i+1) + " : ");
			b = El.create("b");
			b.style.color = color;
			El.addtext(b, name);
			div.appendChild(b);
			el.appendChild(div);
			div = El.create("div");
			div.style.paddingLeft = "20px";
			div.style.borderBottom = "1px solid #333";
			El.addtext(div, "Description du plugin : " + desc);
			el.appendChild(div);
		}
	};
	
}

window.onload = function(){
	
	Index.buildTable("tableau");	
	Index.buildSelect("select");
	Index.navigator();
	Editor.init("editor_text");
	
	El.get("div1").html("<b>html</b>");
	El.get("div2").text("<b>texte/b>");
	El.get("text1").val("valeur");
	
	var drag1 = new El.drag();
	drag1.init("drag1");
	var drag2 = new El.drag();
	drag2.init("drag2");
	
	El.get("popup").onclick = function(){
		Nav.popup.show("La fenêtre popup s'ouvrira dans " + (Nav.popup.delai - Nav.popup.count) + " s", "#333");
		Nav.popup.timer = window.setInterval(Nav.popup.wait, 1000);
		return false;
	};
	
}
