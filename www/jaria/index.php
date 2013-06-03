<?php 

	$Personnes = [];

	Class Vars {
		function get($Name, $Defaut) {
			if( isset($_GET[$Name]) ){
				return trim($_GET[$Name]);
			}
			return $Defaut;
		}
		function post($Name, $Defaut) {
			if( isset($_POST[$Name]) ){
				return trim($_POST[$Name]);
			}
			return $Defaut;
		}
		function getpost($Name, $Defaut) {
			if( isset($_GET[$Name]) ){
				return trim($_GET[$Name]);
			}
			if( isset($_POST[$Name]) ){
				return trim($_POST[$Name]);
			}
			return $Defaut;
		}
	}
		
	Class Personne {
	
		var $nom = "";
		var $prenom = "";
		var $adresses = [];
		var $type = "";
	}
	
	Class Adresse {
		var $rue = "";
		var $ville = "";
		var $cp = "";
	}
	
	$Vars = new Vars;
	$Action = $Vars->getpost("action", "");
	$Type = $Vars->getpost("type", "");
	
	if($Action == "obtenirPersonnes"){
	
		//Personne 1
		//**********
		
		$Personne = new Personne;
		$Personne->nom = "ARIA";
		$Personne->prenom = "Jean-Pierre";
		$Personne->type = $Type;
		
		$Adresse = new Adresse;
		$Adresse->rue = "7 rue de l'église";
		$Adresse->ville = "Berneville";
		$Adresse->cp = "62123";
		
		array_push($Personne->adresses, $Adresse);
		
		$Adresse = new Adresse;
		$Adresse->rue = "4 rue des pinsons";
		$Adresse->ville = "Arras";
		$Adresse->cp = "62000";	
		
		array_push($Personne->adresses, $Adresse);	
	
		array_push($Personnes, $Personne);
		
		//Personne 2
		//**********
		
		$Personne = new Personne;
		$Personne->nom = "ARIA";
		$Personne->prenom = "Jean-Baptiste";
		$Personne->type = $Type;
		
		$Adresse = new Adresse;
		$Adresse->rue = "6 rue Emile Darras";
		$Adresse->ville = "ACHICOURT";
		$Adresse->cp = "62217";
		
		array_push($Personne->adresses, $Adresse);
		
		$Adresse = new Adresse;
		$Adresse->rue = "4 rue des pinsons";
		$Adresse->ville = "Arras";
		$Adresse->cp = "62000";
		
		array_push($Personne->adresses, $Adresse);
		
		array_push($Personnes, $Personne);
		
		$json = Json_encode($Personnes);
		
		//$Personnes = Json_decode($json);	
		//echo $Personnes[0]->nom . "<br />";		

		echo $json;
		exit();
		
	}
	
?>