$(document).ready(function () {

    $.ajax({
        method: "POST",
        url: "bdd_handler.php",
        data: { 'function': 'get_listes', 'id_tableau': '1' }, // modifier 1 par $_GET['id_tableau];
        datatype: "json",
        success: function (datatype) {

            var liste = JSON.parse(datatype);
            console.log(liste[0]['id']);

            for (var i = 0; i < liste.length; i++) {

                $('.tableau').append('<div class=liste id=' + liste[i]['id'] + '><textarea id=nom' + liste[i]['id'] + '>' + liste[i]['nom'] + '</textarea></div>');
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
                modif_nomliste(value);
            })
        }

    })

})


function modif_nomliste(value) {
    $.ajax({
        method: "POST",
        url: "bdd_handler.php",
        data: { 'function': 'update', 'table': 'listes', 'column': 'nom', 'value': value },
        datatype: "json",
    })
}