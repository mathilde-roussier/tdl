$(document).ready(function(){
	get_tasks(1,1,1);
	get_tasks(2,1,1);
	get_finished_tasks(1);
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
					
				$(".liste[id$="+id_liste+"]").append("<button class='add_tache'>+</button>");
			}
		});
}

function display_task(task)
{
	tache = "<div class='tache' id='"+task["id_tache"]+"'><span class='top-tache'><p class='task_title'>"+
	task["nom_tache"]+"</p><u>"+task["date_creation"]+"</u></span></div>";
	$(".liste[id$="+task["id_liste"]+"]").prepend(tache);
}

var on_title = false;
var on_create = false;
var on_task = 0;
var task_nom;
$(document).click(function(e)
{
	target = $(e.target);

	if(on_title == true)
	{
                if(target.attr("id") != 'task_name_input')
                {
                    nom =  ($("#task_name_input").val().length > 0) ? $("#task_name_input").val() :task_nom;  
                    
                    $("#task_name_input").parent().prepend("<p class='task_title'>"+nom+"</p>");
                    id_task = $("#task_name_input").parent().attr("id");

                    $("#task_name_input").remove();
                    
                    change_task_title(nom,id_task);
                    on_title = false;
                }
	}
        if(on_create == true)
	{
                if(target.attr("id") != 'new_task_name')
                {
                    nom =  ($("#new_task_name").val().length > 0) ? $("#new_task_name").val() :"";  
                    id_liste = $("#new_task_name").parent().attr("id");
                    $("#new_task_name").remove();
                   
                    if(nom != "")
                    {
                        add_task(nom,id_liste);
                    }
                    $(".liste[id$="+id_liste+"]").append("<button class='add_tache'>+</button>");
                    on_create = false;
                }
	}
	
	if(target.attr("class") == 'task_title')
	{
		tache = target.parent();
		task_nom = target.text();
		target.remove();
		
		input = $("<input type='text' placeholder='"+task_nom+"' id='task_name_input'/>");
		tache.prepend(input);
		
		id_task = input.parent().attr("id");
		input.focus();

		on_title = true;

		input.keypress(function(e){
			if(e.keyCode == 13)
			{
				nom =  ($(this).val().length > 0) ? $(this).val() :task_nom;  
				
				$(this).parent().prepend("<p class='task_title'>"+nom+"</p>");
				id_task = $("#task_name_input").parent().attr("id");

				$(this).remove();
				
				change_task_title(nom,id_task);
				on_title = false;
			}
		});
	}
        else if(target.attr("class") == "add_tache")
        {
            liste = target.parent();
            id_liste = liste.attr("id");
            
            create_input = $("<input type='text' id='new_task_name' placeholder='Nouvelle tache'/>"); 
            liste.append(create_input);
            target.remove();
            create_input.focus();
            on_create = true;
            create_input.keypress(function(e)
            {
                if(e.keyCode == 13)
                {
                    nom =  ($(this).val().length > 0) ? $(this).val() :"";  
                    $(".liste[id$="+id_liste+"]").append("<button class='add_tache'>+</button>");

                    if(nom != "")
                    {
                            add_task(nom,id_liste);
                    }
                    $(this).remove();
                    on_create = false;
                }
           });
        }
        else if(target.attr("class") == "tache" ||target.parent().attr("class") == "tache" ||target.parent().parent().attr("class") == "tache")
	{
                target = (target.attr("class") == "tache") ? target : ((target.parent().attr('class') == 'tache') ? target.parent() : target.parent().parent());
                id_parent = target.attr('id');

                if(on_task != 0)
                {
                    if(id_parent != on_task)
                    {
                        $('.tache[id$='+on_task+']').css('height','fit-content');
			$('#task-infos').remove();

                        on_task = id_parent;
                        show_task_infos(on_task, target);
                    }
                    else
                    {
                        target.css('height','fit-content');
			$('#task-infos').remove();
                        on_task = 0;
                    }
                }
                else
                {
                    on_task = target.attr('id');
		    show_task_infos(on_task, target);
                }
                on_create = false;
	}
});

function change_task_title(title, task_id)
{
	$.ajax({
		type:"post",
		url:"bdd_handler.php",
		data:{	"function":"update",
			"table":"taches",
			"column":"nom",
			"value":title,
			"id":task_id
			}
	});
}

function add_task(nom,id_liste)
{
        $.ajax({
                url:'bdd_handler.php',
                type:'post',
                data:{'function':'add_task', 'id_liste':id_liste,
                       'titre':nom},
                success:function(data)
                {
			console.log(data);
                        data = JSON.parse(data);
                        display_task(data);
                }
        });
}


function show_task_infos(id_task, task)
{
        $.ajax({
                url:'bdd_handler.php',
                type:'post',
                data:{"function":'get_tache',
                      'id':id_task},
                success: function(data){
			console.log(data);
                        data = JSON.parse(data);
			if(data["deadline"] == null)
			{
				data["deadline"] = "Set alarm";
			}

                        infos = "<div id='task-infos'><span><p id='deadline'>"+data["deadline"]+"</p><div ><img id='valider' src='terminer.png'/></div><div ><img id='turnoff' src='annuler.png'/></div></span></div>";
                        task.append(infos);
			task.css('height','70px');

			$('#turnoff').click(function(e){
				delete_task(id_task);
			});

			$('#valider').click(function(e){
				validate_task(id_task);
			});

			$("#deadline").click(function(e){
				task_id = id_task;
				$("#deadline").remove();
				$($("#task-infos").children()[0]).prepend("<aside id='div-deadline'><input type='date' id='task-deadline'/><button id='deadline-input'>Sauvegarder</button></aside>");

				$("#deadline-input").click(function(e){
					console.log($("#task-deadline").val());
				});
			})
                }
        });
}

function delete_task(id_task)
{
	$.ajax({
		type:"post",
		url:"bdd_handler",
		data:{"function":"del", "type":"2", "id":id_task},
		success: function(data){
			$(".tache[id$="+id_task+"]").remove();
		}
	});
}

function get_finished_tasks(id_tableau)
{
	$.ajax({
		url:"bdd_handler.php",
		type:"post",
		data:{"function":"get_finished_taches", "id_tableau":id_tableau},
		success:function(data){
			data = JSON.parse(data);
			console.log(data);
			for(i=0;i<data.length;i++)
			{
				$("#liste_tachefinit").prepend("<div class='tache_finit'>"+data[i]["nom"]+" finit le:"+data[i]["deadline"]+"</div>");	
			}
		}
	});
}

function validate_task(id_task)
{
	$.ajax({
		type:"post",
		url:"bdd_handler",
		data:{"function":"update", "table":"taches","column":"finit", "value":"1", "id":id_task},
		success: function(data){
			$(".tache[id$="+id_task+"]").remove();
		}
	});
	cur = new Date()
	date = cur.getFullYear() + "-" +  cur.getMonth() + "-" +cur.getDate() ;
	$.ajax({
		type:"post",
		url:"bdd_handler",
		data:{"function":"update", "table":"taches","column":"deadline", "value":date, "id":id_task},
	});
	$.ajax({
		type:"post",
		url:"bdd_handler.php",
		data:{"function":"get_tache", "id":id_task},
		success:function(data){
			data = JSON.parse(data);
			$("#liste_tachefinit").prepend("<div class='tache_finit'>"+data["nom"]+" finit le:"+data["deadline"]+"</div>");	
		}
	});
}
