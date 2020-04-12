$(document).ready(function () {

    $('.tableau_actuel').hide();

    $('.retour_tableau').hide();

    $('.nom_tableau_actuel').hide();

    $('#addtableau').hide();
    $('#addliste').hide();

    $('#addnewtableau').focus(function () {
        $('#addtableau').css({
            'display': 'block',
        })
    })

    $('#addnewliste').focus(function () {
        $('#addliste').css({
            'display': 'block',
        })
    })

    add_tableau();

    get_tableau();

})

//Function_tableau

/* Ajouter un nouveau tableau */

function add_tableau() {
    $('#addnewtableau').keyup(function (event) {
        if (event.keyCode == 13) {
            $('#addtableau').click();
            $('#addnewtableau').blur();
        }
    });

    $('#addtableau').click(function () {
        var titre = $('#addnewtableau').val();
        if (titre != '') {
            $.ajax({
                method: "POST",
                url: "bdd_handler.php",
                data: { 'function': 'add_tableau', 'titre': titre },
                datatype: "json",
            })
        }
        $('#addtableau').css({
            'display': 'none',
        })
        $('#addnewtableau').val('');
        $('.tableau').remove();
        get_tableau();
    })
}

/* Afficher les tableaux de l'utilisateur inscrit */

function get_tableau() {
    $.ajax({
        method: "POST",
        url: "bdd_handler.php",
        data: { 'function': 'get_tableau' },
        datatype: "json",
        success: function (datatype) {

            $('.newtableau').css({
                'display': 'block',
            })

            $('.tableau').remove();

            var tableau = JSON.parse(datatype);

            for (var i = 0; i < tableau.length; i++) {
                var tab = '<div class="tableau" id=' + tableau[i]["id_tableau"] + '><p class="tab">' + tableau[i]["nom"] + '</p><span title="supprimer le tableau" class="suppr_tab">X</span></div>';
                $('.liste_tableaux').append(tab);
            }

            $('.tab').css({
                'cursor': 'pointer',
            })

            $('.tab').click(function () {
                $('.tableau_actuel').show();
                $('.liste_tableaux').hide();
                var id_tab = $(this).parent().attr('id');
                localStorage.setItem('id_tableau', id_tab);
		$(".tableau_actuel").attr("id", id_tab);

                $(".nom_tableau_actuel").append($(this).html());

                $(".retour_tableau").show();

                $('.nom_tableau_actuel').show();

                add_liste();
		get_finished_tasks();
                get_liste();

            })

            back_tab();

            del_tab();
        }
    });

}

/* supprimer un tableau */
function del_tab() {
    $('.suppr_tab').click(function () {
        var id_tableau = $(this).parent().attr('id');
        $.ajax({
            method: "POST",
            url: "bdd_handler.php",
            data: { 'function': 'del', 'id': id_tableau, 'type': '3' },
            datatype: "json",
        })
        get_tableau();
    })

}

//Function_LISTE 

/* Ajouter une nouvelle liste */

function add_liste() {
    $('#addnewliste').keyup(function (event) {
        if (event.keyCode == 13) {
            $('#addliste').click();
            $('#addnewliste').blur();
        }
    });

    $('#addliste').click(function () {
        var titre = $('#addnewliste').val();
        if (titre != '') {
            $.ajax({
                method: "POST",
                url: "bdd_handler.php",
                data: { 'function': 'add_list', 'id_tableau': localStorage.getItem('id_tableau'), 'titre': titre },
                datatype: "json",
		success:function(data) { get_liste(); }
            })

        }
        $('#addliste').css({
            'display': 'none',
        })
        $('#addnewliste').val('');
    })

}

/* Modifier le nom d'une liste */

function modif_nomliste(id, value) {
    $.ajax({
        method: "POST",
        url: "bdd_handler.php",
        data: { 'function': 'update', 'type': '1','id': id, 'table': 'listes', 'column': 'nom', 'value': value },
        datatype: "json",
    })
}

/* Afficher les listes du tableau en cours */

function get_liste() {
    $.ajax({
        method: "POST",
        url: "bdd_handler.php",
        data: { 'function': 'get_listes', 'id_tableau': localStorage.getItem('id_tableau') },
        datatype: "json",
        success: function (datatype) {


            $('.liste').remove();

            var liste = JSON.parse(datatype);
            for (var i = 0; i < liste.length; i++) {
                var list = '<div class="liste" id=' + liste[i]["id_liste"] + '><div class="titre_liste"><input id=nom' + liste[i]["id_liste"] + ' name="nom_liste" type="text" value="'+liste[i]["nom"]+'"><span title="supprimer la liste" class="suppr_liste">X</span></div></div>';
                $('.tableau_actuel').append(list);
		get_tasks(liste[i]["id_liste"], localStorage.getItem('id_tableau'),liste[i]["id_createur"]);
            }

            $('input[name=nom_liste]').focus(function () {
                $(this).css({
                    'border': '1px solid black',
                    'background': 'silver',
                    'cursor': 'auto',
                });
            })

            $('input[name=nom_liste]').focusout(function () {
                $(this).css({
                    'border': 'none',
                    'background': 'none',
                    'cursor': 'pointer',
                });
            })

            $('input[name=nom_liste]').keyup(function () {
                var value = $(this).val();
                var id = $(this).parent().parent().attr('id');
                modif_nomliste(id, value);
            })

            del_liste();
        }

    })

}

/* Supprimer une liste */

function del_liste() {
    $('.suppr_liste').click(function () {
        var id_liste = $(this).parent().parent().attr('id');
        $.ajax({
            method: "POST",
            url: "bdd_handler.php",
            data: { 'function': 'del', 'id': id_liste, 'type': '1' },
            datatype: "json",
	    success:function(data){get_liste();}
        })
    })

}

// Function autres 

function back_tab() {
    $('.retour_tableau').click(function () {
        $('.tableau_actuel').hide();
        $('.liste_tableaux').show();
        $('.retour_tableau').hide();
        $('.nom_tableau_actuel').hide();
        $('.nom_tableau_actuel').html("");
    })
}


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
				$(".liste[id$="+id_liste+"] .titre_liste").after("<button class='add_tache'>+</button>");
			}
		});
}

function display_task(task)
{
	tache = "<div class='tache' id='"+task["id_tache"]+"'><span class='top-tache'><p class='task_title'>"+
	task["nom_tache"]+"</p><u>"+task["date_creation"]+"</u></span></div>";
	$(".liste[id$="+task["id_liste"]+"]").append(tache);
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
                    $(".liste[id$="+id_liste+"] .titre_liste").after("<button class='add_tache'>+</button>");
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
            $(".liste[id$="+id_liste+"] .titre_liste").after(create_input);
            target.remove();
            create_input.focus();
            on_create = true;
            create_input.keypress(function(e)
            {
                if(e.keyCode == 13)
                {
                    nom =  ($(this).val().length > 0) ? $(this).val() :"";  
                    $(".liste[id$="+id_liste+"] .titre_liste").after("<button class='add_tache'>+</button>");
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
			if(data["deadline"] == null)
			{
				data["deadline"] = "En cour";
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

function get_finished_tasks()
{
	$.ajax({
		url:"bdd_handler.php",
		type:"post",
		data:{"function":"get_finished_taches", "id_tableau":$(".tableau_actuel").attr("id")},
		success:function(data){
			data = JSON.parse(data);
			$("#liste_tachefinit").children("div").remove();
			for(i=0;i<data.length;i++)
			{
				$("#liste_tachefinit").append("<div class='tache_finit'>"+data[i]["nom"]+" finit le:"+data[i]["deadline"]+"</div>");	
			}
		}
	});
}

function validate_task(id_task)
{
	$.ajax({
		type:"post",
		url:"bdd_handler",
		data:{"function":"update","type":"2", "table":"taches","column":"finit", "value":"1", "id":id_task},
		success: function(data){
			$(".tache[id$="+id_task+"]").remove();
		}
	});
	cur = new Date()
	date = cur.getFullYear() + "-" +  cur.getMonth() + "-" +cur.getDate() ;
	$.ajax({
		type:"post",
		url:"bdd_handler",
		data:{"function":"update","type":"2", "table":"taches","column":"deadline", "value":date, "id":id_task},
	});
	$.ajax({
		type:"post",
		url:"bdd_handler.php",
		data:{"function":"get_tache", "id":id_task},
		success:function(data){
			data = JSON.parse(data);
			$("#liste_tachefinit").append("<div class='tache_finit'>"+data["nom"]+" finit le:"+data["deadline"]+"</div>");	
		}
	});
}
