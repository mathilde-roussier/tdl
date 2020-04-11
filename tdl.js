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
                var tab = '<div class="tableau" id=' + tableau[i]["id"] + '><p class="tab">' + tableau[i]["nom"] + '</p><span title="supprimer le tableau" class="suppr_tab">X</span></div>';
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

                $(".nom_tableau_actuel").append($(this).html());

                $(".retour_tableau").show();

                $('.nom_tableau_actuel').show();

                add_liste();

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
            })

        }
        $('#addliste').css({
            'display': 'none',
        })
        $('#addnewliste').val('');
        get_liste();
    })

}

/* Modifier le nom d'une liste */

function modif_nomliste(id, value) {
    $.ajax({
        method: "POST",
        url: "bdd_handler.php",
        data: { 'function': 'update', 'id': id, 'table': 'listes', 'column': 'nom', 'value': value },
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
                var list = '<div class="liste" id=' + liste[i]["id"] + '><div class="titre_liste"><input id=nom' + liste[i]["id"] + ' name="nom_liste" type="text" value="'+liste[i]["nom"]+'"><span title="supprimer la liste" class="suppr_liste">X</span></div></div>';
                $('.tableau_actuel').append(list);
                $('input[name=nom_liste]').css({
                    'border': 'none',
                    'resize': 'none',
                    'cursor': 'pointer',
                    'outline': 'none',
                });
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
        var id_liste = $(this).parent().attr('id');
        $.ajax({
            method: "POST",
            url: "bdd_handler.php",
            data: { 'function': 'del', 'id': id_liste, 'type': '1' },
            datatype: "json",
        })
        get_liste();
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