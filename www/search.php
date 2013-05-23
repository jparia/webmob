<?php 

?>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Rechercher sur MyBD.fr</title>
  <meta charset="UTF-8" />
  <meta name="author" content="Jean-Pierre ARIA" lang="fr" xml:lang="fr" />
  <link href="jss/style.css" rel="stylesheet" type="text/css" />
  <link rel="shortcut icon" href="img/favicon.ico" />  
</head>
<body>
	<header>
		<a href="index.php">
			<img src="img/logo-72.png" alt="" />			
			<hgroup>
				<h1>MyBd.fr</h1>
				<h2>Rechercher sur MyBD.fr</h2>
			</hgroup>
		</a>
	</header>
	<br class="clear" />
	<section>		
		<nav>			
			<ul>
				<li><a href="search.php">Search</a></li>
				<li><a href="last.php">Last</a></li>
				<li><a href="random.php">Random</a></li>
				<li><a href="legal.php">Legal</a></li>
			</ul>
		</nav>
	</section>
	<br class="clear" />
	<article>
		<form class="form" name="" method="get" action="bd.php">
			<label for="auteur">Auteur</label><input type="text" name="auteur" value="" /><br />
			<label for="nationalite">Nationalité</label><input type="text" list="nations" name="nationalite" value="" /><br />
			<label for="titre">Titre</label><input type="text" name="titre" value="" /><br />
			<label for="annee">Année</label><input type="text" name="annee" value="" /><br />
			<label for="prix">Prix</label><input type="number" name="prix" pattern="[0-9]" required="true" value="" />&nbsp;€<br />
			<label for="disponibilite">Disponibilité</label><input type="text" name="disponibilite" value="" /><br />
			<label for="color">Couleur</label><input type="color" name="color" value="#ffffff" /><br />
			<label for="submit">&nbsp;</label><input type="submit" name="submit" value="Rechercher" /><br />
			<label for="reset">&nbsp;</label><input type="reset" name="reset" value="Réinitialiser" /><br />
		</form>
	</article>
	<br class="clear" />
	<footer>		
		<nav>			
			<ul>
				<li><a href="search.php">Search</a></li>
				<li><a href="last.php">Last</a></li>
				<li><a href="random.php">Random</a></li>
				<li><a href="legal.php">Legal</a></li>
			</ul>
		</nav>
	</footer>
	<datalist id="nations">
		<option value="Allemand">
		<option value="Anglais">
		<option value="Espagnol">
		<option value="Français">		
	</datalist>
</body>
</html>