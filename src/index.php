<?php
	session_start();
	if(!isset($_SESSION['cart']))
	$_SESSION['cart'] = [];
?>

<!DOCTYPE html>
<html>
<head>
	<title>
		Products
	</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link href="./CSS/style.css" type="text/css" rel="stylesheet">
</head>
<style>
	<?php
	include './CSS/style.css';
	?>
</style>
<body>
	
	<div id="main">
		<div id="products">
			<!-- products displayed here -->
		</div>
	</div>
	<div id="cart">
		<table id="cartDisplay">

		</table>
	</div>
	
</body>

<script src="./JS/script.js"></script>
</html>