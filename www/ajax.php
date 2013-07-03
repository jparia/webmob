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
	
	$v1 = Get("nom", "");
	$v2 = Get("prenom", "");
	$v3 = Get("format", "");
	
	if($v1 == ""){
		$v1 = Post("nom", "");
	}
	if($v2 == ""){
		$v2 = Post("prenom", "");
	}
	if($v3 == ""){
		$v3 = Post("format", "");
	}
	
	switch($v3){
		case  "XML" :
			header("Content-Type: text/xml;");
			echo "<personne><nom>$v1</nom><prenom>$v2</prenom></personne>";
			break;
		case "JSON" :
			echo "{\"nom\": \"$v1\", \"prenom\": \"$v2\"}";
			break;			
		default:
			echo "'" . $v1 . "'  et '" . $v2 . "'  et '" . $v3 . "'";
	}

?>