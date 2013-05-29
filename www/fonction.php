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

?>	