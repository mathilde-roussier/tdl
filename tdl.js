$(document).ready(function () {

    $.ajax({
        method: "POST",
        url: "bdd_handler.php",
        data: { 'function': 'get_listes', 'id_tableau': '1' },
        datatype: "json",
        success: function (datatype) {

            var liste = JSON.parse(datatype);
            console.log(liste[0]['id']);

            for (var i = 0; i < liste.length; i++) {
                console.log(liste[i]['id']);

                $('main').append('<textarea id=' + liste[i]['id'] + '>' + liste[i]['nom'] + '</textarea>');
                $('textarea').css({
                    'border': 'none',
                    'resize': 'none',
                    'cursor': 'pointer',
                    'outline': 'none',
                })
            }
        }
    })
})
