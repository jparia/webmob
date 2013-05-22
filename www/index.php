<?php 

function Post($Name, $Defaut){
	if( isset($_POST[$Name]) ){
		return $_POST[$Name];
	}
	return $Defaut;
}

$param1 = Post("Param1", "");



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
		<a id="header" href="index.php">
			<img src="img/logo-72.png" alt="" />			
			<div class="titre">
				<h1>MyBd.fr</h1>
				<h2>plein d'infos sur les BD</h2>
			</div>
		</a>
	</div>
	
	<div class="wrapper">
		<br class="clear" />
		<div id="menu">			
			<ul>
				<li><a href="search.php">Search</a></li>
				<li><a href="last.php">Last</a></li>
				<li><a href="random.php">Random</a></li>
				<li><a href="legal.php">Legal</a></li>
			</ul>
		</div>		
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