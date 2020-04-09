$(document).ready(function(){
	get_tasks(1,1,1);
	get_tasks(2,1,1);
})


function get_tasks(id_liste, id_tableau, id_createur)
{
		$.ajax({
			url:'bdd_handler.php',
			type:"post",
			data:{ "function":"get_taches",
				"id_liste":id_liste,
				"id_tableau":id_tableau,
				"id_createur":id_createur},
			success:function(data)
			{
				data = JSON.parse(data);
					
				for(var i=0;i<data.length;i++)
				{
					display_task(data[i]);
				}
				
			}
		});

}

function display_task(task)
{
	tache = "<div class='tache' id='"+task["id_tache"]+"'><p class='task_title'>"+
	task["nom_tache"]+"</p><u>"+task["createur"]+"</div>";
	$(".liste[id$="+task["id_liste"]+"]").append(tache);
}

var on_title = false;
var task_nom;
$(document).click(function(e){
	target = $(e.target);

	if(on_title == true)
	{
		console.log(task_nom);
		nom =  ($("#task_name_input").val().length > 0) ? $("#task_name_input").val() :task_nom  ;  
		console.log($("#task_name_input").val().length, nom);
		$("#task_name_input").parent().prepend("<p class='task_title'>"+nom+"</p>");
		$("#task_name_input").remove();
		change_task_title(nom,$($("#task_name_input").parent()).attr("id"));
		on_title = false;
	}
	
	if(target.attr("class") == "tache")
	{
		console.log("tache clicked");
		on_title = false;
	}
	else if(target.attr("class") == 'task_title')
	{
		tache = target.parent();
		task_nom = target.text();
		input = $("<input type='text' placeholder='"+target.text()+"' id='task_name_input'/>");
		tache.prepend(input);
		target.remove();
		input.focus();

		on_title = true;
	}
});

function change_task_title(title, task_id)
{
console.log(title, task_id);
	$.ajax({
		type:"post",
		url:"bdd_handler.php",
		data:{	"function":"update",
			"table":"taches",
			"column":"nom",
			"value":title,
			"id":task_id},
		success:function(data)
		{
			console.log("win");
		}
	});
}
