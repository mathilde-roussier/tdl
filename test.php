<!DOCTYPE html>
<html lang="fr">

	<head>
	    <meta charset="UTF-8">
	    <script src='https://code.jquery.com/jquery-3.4.1.js'></script>
	    <title> To Do List </title>
	</head>

	<body>
		<span>
		<div class='tache' id='1'>
		</div></span>
		<span>
		<div class='tache' id='2'>
		</div></span>
	</body>
</html>

<style>
	body
	{
		display:flex;
		height:100vh;
	}
	
	div
	{
		width:20em;
		height:10em;

		background:green;
		margin:1em;
	}	

	span
	{
		width:30em;
		height:15em;
		background:orange;
		margin:2em;
		display:flex;
		justify-content:center;
	}
</style>


<script>
	var x1=0,y1=0,x2=0,y2=0;
	var id_task = 0;
	
	$(document).mousedown(function(e){
		e.preventDefault();
		target = $(e.target);

		if(target.attr("class") == 'tache')
		{
			x1 = e.clientX;
			y1 = e.clientY;
			
			console.log(e.clientX,e.clientY);
			console.log("click");
			
			id_task = target.attr("id");

			document.onmousedown = move;
		}
	});

	function move(e)
	{
		e.preventDefault();

		x2 = e.clientX;
		y2 = e.clientY;
	
		document.onmousemove = drag;
	}
	
	function drag(e)
	{
		target = $(".tache[id$="+id_task+"]");
		target.css("position","relative");
		console.log(target.offsetTop);
		target.css.top = e.clientX - target.offsetTop;
		
		console.log('move');
	}

	$(document).mouseup(function(e){
		document.onmousemove = null;
		console.log('release');
	});

	
</script>
