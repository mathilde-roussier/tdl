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
        <span><a href='index.php?deco'> Déconnexion</a></span>
    </header>

    <main>

        <div class="liste">
            <div class="taches">
            </div>
        </div>

    </main>

</body>

</html>