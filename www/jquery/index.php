<?php 

	$Personnes = [];

	Class Vars {
		function get($Name, $Defaut) {
			if( isset($_GET[$Name]) ){
				return trim($_GET[$Name]);
			}
			return $Defaut;
		}
	}
		
	Class Personne {
	
		var $nom = "";
		var $prenom = "";
		var $adresses = [];
	}
	
	Class Adresse {
		var $rue = "";
		var $ville = "";
		var $cp = "";
	}
	
	$Vars = new Vars;
	$Action = $Vars->get("action", "");
	
	if($Action == "obtenirPersonnes"){
	
		//Personne 1
		//**********
		
		$Personne = new Personne;
		$Personne->nom = "ARIA";
		$Personne->prenom = "Jean-Pierre";
		
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