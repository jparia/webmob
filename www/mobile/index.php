<?php 

?>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Plein d'infos sur les BD</title>
  <meta charset="utf-8" />
  <meta name="author" content="Jean-Pierre ARIA" lang="fr" xml:lang="fr" />
  <link href="../jss/style.css" rel="stylesheet" type="text/css" />
  <link rel="shortcut icon" href="../img/favicon.ico" />
  <link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.css" />
  <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
  <script src="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js"></script>
  <script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
  <script src="http://jquery-ui-map.googlecode.com/svn/trunk/ui/min/jquery.ui.map.full.min.js" type="text/javascript"></script>
  <script src="../jss/library.js" type="text/javascript"></script>
  <script src="../jss/mobile.js" type="text/javascript"></script>
</head>
<body>
	<div id="index" data-role="page">
		<div data-role="header">
			<h1>Plein d'infos sur MyBD.fr</h1>
		</div>
		<div data-role="content">
			
			<video width="320" height="240" controls poster="../img/video.png">
				<!-- 
			   <source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4">
			   <source src="http://clips.vorwaerts-gmbh.de/VfE.ogv" type="video/ogg">
			   <source src="http://clips.vorwaerts-gmbh.de/VfE.webm" type="video/webm">
			    -->
			 	Votre navigateur ne supporte pas la balise video !
			 </video>
			 
		</div>
		<div data-role="footer" data-position="fixed">
			<ul data-role="navbar">
				<li><a href="#index" data-theme="b">Index</a></li>
				<li><a href="#search" data-rel="dialog" data-transition="flip">Search</a></li>
				<li><a href="#random">Random</a></li>
				<li><a href="#legal">Legal</a></li>
			</ul>			
		</div>
	</div>
	
	<div id="search" data-role="page" data-add-back-btn="true">
		<div data-role="header">
			<h1>Rechercher sur MyBD.fr</h1>
		</div>
		<div data-role="content">
			<form class="form" name="" method="get" action="bd.php">
				<label for="auteur">Auteur</label><input type="text" name="auteur" id="auteur" value="" /><br />
				<label for="nationalite">Nationalité</label><input type="text" list="nations" name="nationalite" id="nationalite" value="" /><br />
				<label for="titre">Titre</label><input type="text" name="titre" value="" id="titre" /><br />
				<label for="annee">Année</label><input type="text" name="annee" id="annee" value="" /><br />
				<label for="prix">Prix</label><input type="number" name="prix" id="prix" pattern="[0-9]" required="true" value="" />&nbsp;€<br />
				<label for="disponibilite">Disponibilité</label><input type="text" name="disponibilite" id="disponibilite" value="" /><br />
				<label for="color">Couleur</label><input type="color" name="color" id="color"  value="#ffffff" /><br />
			</form>			
		</div>
		<div data-role="footer" data-position="fixed" class="ui-bar">
			<ul data-role="navbar">
				<li><a href="#" id="submit" data-role="button" data-icon="search">Rechercher</a></li>
				<li><a href="#" id="reset" data-role="button" data-icon="refresh">Effacer Formulaire</a></li>
			</ul>			
		</div>
	</div>
	
	<div id="random" data-role="page" data-add-back-btn="true">
		<div data-role="header">
			<h1>Random sur MyBD.fr</h1>
		</div>
		<div data-role="content">
			<div class="info">
				<h3>Géolocation</h3><br/>
				<div id="geo">&nbsp;</div>
				<br class="clear" />
				<h3>LocalStorage</h3><br/>
			<div id="session">&nbsp;</div>
			<div id="geoMap" class="map rounded" style="width:300px;height:300px">&nbsp;</div>
		</div>
		</div>
		<div data-role="footer" data-position="fixed">
			<ul data-role="navbar">
				<li><a href="#index">Index</a></li>
				<li><a href="#search" data-rel="dialog" data-transition="flip">Search</a></li>
				<li><a href="#random" data-theme="b">Random</a></li>
				<li><a href="#legal">Legal</a></li>
			</ul>			
		</div>
	</div>
	
	<div id="legal" data-role="page" data-add-back-btn="true">
		<div data-role="header">
			<h1>Infos légales sur MyBD.fr</h1>
		</div>
		<div data-role="content">
			<div class="info">
				Propriété Intellectuelle<br /><br /> 
				La structure générale ainsi que les logiciels, textes, images, sons, graphismes… 
				et tout autre élément composant le site sont la propriété exclusive de LexisNexis SA, 
				ou bien sont régulièrement exploités sous licence. Toute représentation totale ou 
				partielle de ce site par quelque procédé que ce soit, sans l'autorisation expresse de 
				LexisNexis SA, est interdite et constituerait une contrefaçon sanctionnée par les 
				articles L. 335-2 et suivants du Code de la propriété intellectuelle.<br />
				L'ensemble des fonds documentaires, textes, ouvrages et illustrations mis en ligne par 
				l'Editeur sont protégés par le droit d'auteur et par le droit protégeant les bases de 
				données dont l'Editeur est producteur au sens des articles L. 341-1 et suivants du Code 
				de la propriété intellectuelle.
			</div>
		</div>
		<div data-role="footer" data-position="fixed">
			<ul data-role="navbar">
				<li><a href="#index">Index</a></li>
				<li><a href="#search" data-rel="dialog" data-transition="flip">Search</a></li>
				<li><a href="#random">Random</a></li>
				<li><a href="#legal" data-theme="b">Legal</a></li>
			</ul>
		</div>
	</div>
</body>
</html>