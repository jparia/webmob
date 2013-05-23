<?php 

function Get($Name, $Defaut){
	if( isset($_GET[$Name]) ){
		return $_GET[$Name];
	}
	return $Defaut;
}

?>	