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
					
				$(".liste[id$="+id_liste+"]").append("<button class='add_tache'>+</button>");
			}
		});
}

function display_task(task)
{
	tache = "<div class='tache' id='"+task["id_tache"]+"'><span class='top-tache'><p class='task_title'>"+
	task["nom_tache"]+"</p><u>"+task["createur"]+"</span></div>";
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

                        target.css('height','70px');
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
                    target.css('height','70px');
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
        console.log(nom,id_liste);
        $.ajax({
                url:'bdd_handler.php',
                type:'post',
                data:{'function':'add_task', 'id_liste':id_liste,
                       'titre':nom},
                success:function(data)
                {
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
                        data = JSON.parse(data);
			console.log(data);
                        infos = "<div id='task-infos'><span><p id='deadline'>"+data["deadline"]+"</p><div id='states"+data["finit"]+"'></span></div>";
                        target.append(infos);
                }
        });
}
