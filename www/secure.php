<?php
	echo md5("LOGIN*MOTDEPASSE");
?>

<html>
<head>
  <title>Identification</title>
<script language="javascript" src="jss/secure_min.js"></script>
<script language="javascript">
<!--
  var s = new Secure();
  function doChallengeResponse() {
    str = document.identification.utilisateur.value+"*"+document.identification.mot_de_passe.value;
    document.identification.reponse.value = s.crypte(str);
    document.identification.mot_de_passe.value = "";

  }
// -->
</script>
</head>

<body>

<form name="identification">
Utilisateur:
<input type="text" name="utilisateur" size=32 maxlength=32 value="LOGIN"><br>
Mot de passe:
<input type="password" name="mot_de_passe" size=32 maxlength=32 value="MOTDEPASSE"><br>
<input onClick="doChallengeResponse(); return false;" type="submit" name="submitbtn" value="identification">
Réponse MD5: <input type="text" name="reponse"  value="" size=32>
</form>

</body>
</html>