$(document).ready(function () {

    $('#addliste').css({
        'display': 'none',
    })

    $('#addnewliste').focus(function () {
        $('#addliste').css({
            'display': 'block',
        })
    })

    add_liste();

    get_liste();

})


// Function_LISTE 

function add_liste() {

    $('#addnewliste').keydown(function (event) {
        if (event.keyCode == 13) {
            $('#addliste').click();
        }
    });

    $('#addliste').click(function () {
        var titre = $('#addnewliste').val();
        if (titre != '') {
            $.ajax({
                method: "POST",
                url: "bdd_handler.php",
                data: { 'function': 'add_list', 'id_tableau': '1', 'titre': titre }, //modifier 1 par $_GET['id_tableau];
                datatype: "json",
            })

        }
        $('#addliste').css({
            'display': 'none',
        })
        $('#addnewliste').val('');
        $('.liste').remove();
        get_liste();
    })
}

function modif_nomliste(id, value) {
    $.ajax({
        method: "POST",
        url: "bdd_handler.php",
        data: { 'function': 'update', 'id': id, 'table': 'listes', 'column': 'nom', 'value': value },
        datatype: "json",
    })
}

function get_liste() {

    $.ajax({
        method: "POST",
        url: "bdd_handler.php",
        data: { 'function': 'get_listes', 'id_tableau': '1' }, // modifier 1 par $_GET['id_tableau];
        datatype: "json",
        success: function (datatype) {

            var liste = JSON.parse(datatype);

            for (var i = 0; i < liste.length; i++) {
                $('.tableau').append('<div class="liste" id=' + liste[i]['id'] + '><textarea id=nom' + liste[i]['id'] + '>' + liste[i]['nom'] + '</textarea></div>');
                $('textarea').css({
                    'border': 'none',
                    'resize': 'none',
                    'cursor': 'pointer',
                    'outline': 'none',
                });
            }

            $('textarea').focus(function () {
                $(this).css({
                    'border': '1px solid black',
                    'background': 'silver',
                });
            })

            $('textarea').focusout(function () {
                $(this).css({
                    'border': 'none',
                    'background': 'none',
                });
            })

            $('textarea').keyup(function () {
                var value = $(this).val();
                var id = $(this).parent().attr('id');
                modif_nomliste(id, value);
            })
        }

    })
}