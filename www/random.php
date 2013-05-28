<?php 

?>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Random sur MyBD.fr</title>
  <meta charset="UTF-8" />
  <meta name="author" content="Jean-Pierre ARIA" lang="fr" xml:lang="fr" />
  <link href="jss/style.css" rel="stylesheet" type="text/css" />
  <link rel="shortcut icon" href="img/favicon.ico" />  
  <script src="jss/library.js" type="text/javascript"></script>
  <script src="jss/random.js" type="text/javascript"></script>
</head>
<body>	
	<header>
		<a href="index.php">
			<img src="img/logo-72.png" alt="" />			
			<hgroup>
				<h1>MyBd.fr</h1>
				<h2>Random sur MyBD.fr</h2>
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
			<h3>Géolocation</h3><br/>
			<div id="geo">&nbsp;</div>
			<br class="clear" />
			<h3>LocalStorage</h3><br/>
			<div id="session">tioto&nbsp;</div>
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