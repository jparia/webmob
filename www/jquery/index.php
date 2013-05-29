<?php 

	function Get($Name, $Defaut){
		if( isset($_GET[$Name]) ){
			return trim($_GET[$Name]);
		}
		return $Defaut;
	}
	
	function Post($Name, $Defaut){
		if( isset($_POST[$Name]) ){
			return trim($_POST[$Name]);
		}
		return $Defaut;
	}

	
	$Action = Get("action", "");
	if($Action == "ok"){
		echo "{\"text\": \"Resultat retourne par le serveur\", \"id\": \"10\"}";
	}
	
?>