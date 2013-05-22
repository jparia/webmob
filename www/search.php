<?php 

?>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title></title>
  <meta charset="UTF-8" />
  <meta name="author" content="Jean-Pierre ARIA" lang="fr" xml:lang="fr" />
  <link href="jss/style.css" rel="stylesheet" type="text/css" />
  <link rel="shortcut icon" href="img/favicon.ico" />  
</head>
<body>	
	<div class="wrapper">
		<a  id="header" href="index.php">
			<img src="img/logo-72.png" alt="" />			
			<div class="titre">
				<h1>MyBd.fr</h1>
				<h2>plein d'infos sur les BD</h2>
			</div>
		</a>
		<br class="clear" />
		<div id="menu">			
			<ul>
				<li><a href="search.php">Search</a></li>
				<li><a href="last.php">Last</a></li>
				<li><a href="random.php">Random</a></li>
				<li><a href="legal.php">Legal</a></li>
			</ul>
		</div>
		<br class="clear" />
		<form class="form" name="" method="get" action="">
			<label for="auteur">Auteur</label><input type="text" name="auteur" value="" /><br />
			<label for="nationalite">Nationalité</label><input type="text" name="nationalite" value="" /><br />
			<label for="titre">Titre</label><input type="text" name="titre" value="" /><br />
			<label for="annee">Année</label><input type="text" name="annee" value="" /><br />
			<label for="prix">Prix</label><input type="text" name="prix" value="" /><br />
			<label for="disponibilite">Disponibilité</label><input type="text" name="disponibilite" value="" /><br />
			<label for="submit">&nbsp;</label><input type="submit" name="submit" value="Rechercher" />
		</form>
		<br class="clear" />	
		<div id="footer">			
			<ul>
				<li><a href="search.php">Search</a></li>
				<li><a href="last.php">Last</a></li>
				<li><a href="random.php">Random</a></li>
				<li><a href="legal.php">Legal</a></li>
			</ul>
		</div>
	</div>
</body>
</html>