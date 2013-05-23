<?php 

	require_once("fonction.php");	
	
	$auteur = Get("auteur", "");
	$nationalite = Get("nationalite", "");
	$titre = Get("titre", "");
	$annee = Get("annee", "");
	$prix = Get("prix", "");
	$disponibilite = Get("disponibilite", "");
	$couleur = Get("couleur", "");
	$submit = Get("submit", "");
	
	
	//Validation du formulaire
	//echo "submit : " . $submit;	
	if($submit != ""){
		//Champs obligatoires
		if($auteur == ""){
			$auteur = "<mark>Le champ Auteur est obligatoire !</mark>";					
		}
		if($nationalite == ""){
			$nationalite = "<mark>Le champ Nationalité est obligatoire !</mark>";
		}
		if($titre == ""){
			$titre = "<mark>Le champ Titre est obligatoire !</mark>";
		}
		if($annee == ""){
			$annee = "<mark>Le champ Année est obligatoire !</mark>";
		}
		if($prix == ""){
			$prix = "<mark>Le champ Prix est obligatoire !</mark>";
		}
		if($disponibilite == ""){
			$disponibilite = "<mark>Le champ Disponibilité est obligatoire !</mark>";
		}
		if($couleur == ""){
			$couleur = "<mark>Le champ Couleur est obligatoire !</mark>";
		}
	
	}

?>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Résultat de la recherche sur MyBD.fr</title>
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
				<h2>Résultat de la recherche sur MyBD.fr</h2>
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
		<div class="info">
			<div>Auteur : <?php echo($auteur);?></div>
			<div>Nationalité : <?php echo($nationalite);?></div>
			<div>Titre : <?php echo($titre);?></div>
			<div>Prix : <?php echo($prix);?> €</div>
			<div>Disponibilité : <?php echo($disponibilite);?></div>
			<div>Couleur : <?php echo($couleur);?></div>
		</div>
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
</body>
</html>