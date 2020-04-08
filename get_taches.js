$(document).ready(function(){
	get_tasks();
})


function get_tasks()
{
	id_tableau = $(".tableau").attr("id");
	listes = $(".liste");
	for(var l=0; l<listes.length; l++)
	{
		$.ajax({
			url:'bdd_handler.php',
			type:"post",
			data:{ "function":"get_taches",
				"id_liste":$(listes[l]).attr("id"),
				"id_tableau":id_tableau,
				"id_createur":0},
			success:function(data)
			{
				data = JSON.parse(data);
					
				for(var i=0;i<data.length;i++)
				{
					display_task(data[i]);
				}
				
				task_event();
			}
		});
	}

}

function display_task(task)
{
	tache = "<div class='tache' id='"+task["id_tache"]+"'><p>"+
	task["nom_tache"]+"</p></div>";
	$(".liste[id$="+task["id_liste"]+"]").append(tache);
}


function task_event()
{
	change_task_name();
	move_task();
}

function change_task_name()
{
	// Si on clique sur le nom de la tache
	$(".tache p").click(function(e){
		// On remplace le nom par un input text
		nom = $(this).text();
		$(this).parent().append("<input type='text' value='"+nom+"' id='tache-change-name'/>");
		$(this).remove();
		
		// Quand notre focus est sur l'input
		$("#tache-change-name").on("focus", function(){
			// Si on appuie sur <Enter>
			$("#tache-change-name").keypress(function(e){
				if(e.keyCode == 13)
				{
					new_name = $("#tache-change-name").val();
					id_parent = $("#tache-change-name").parent().attr("id");

					// On met a jout la bdd tache avec le nouveau nom
					$.ajax({
						url:"bdd_handler.php",
						type:'POST',
						data:{"function":"update",
						"table":"taches", "column":"nom", "value":new_name,
						"id":id_parent},
						success:function(data)
							{
								// On supprime l'input et on remet le nom
								$(".tache[id$="+id_parent+"]").append("<p>"+new_name+"</p>");
								$("#tache-change-name").remove();
							}
						});
					}		
				});
		});
	});
}


function move_task()
{
	$(".tache").on("mousedown", function(e){
		console.log(e.clientX);	
	});
}
