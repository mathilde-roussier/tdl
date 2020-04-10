<?php
session_start();

if (!isset($_SESSION['id'])) {
    header('location:index.php');
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <script src='https://code.jquery.com/jquery-3.4.1.js'></script>
    <link rel='stylesheet' href='css/tdl.css'>
    <script src='tdl.js'></script>
    <title> To Do List </title>
</head>

<body class='todolist'>

    <header>
        <p class="retour_tableau"> Retour tableaux </p>
        <div class="deco">
            <h3 class="nom_tableau_actuel"></h3>
            <span><a href='index.php?deco'> Déconnexion</a></span>
        </div>
    </header>

    <main>
        <section class="liste_tableaux">
            <div class='newtableau'>
                <input id='addnewtableau' placeholder='Ajouter un tableau' type='text'>
                <button id='addtableau'>Ajouter un tableau</button>
            </div>
        </section>

        <section class="tableau_actuel">
            <div class='newliste'>
                <input id='addnewliste' placeholder='Ajouter une liste' type='text'>
                <button id='addliste'>Ajouter une liste</button>
            </div>
            <div class="taches">
            </div>
        </section>

    </main>

</body>

</html>