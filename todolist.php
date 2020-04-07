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
    <link rel='stylesheet' href='css/tdl.css'>
    <title> To Do List </title>
</head>

<body>

    <header>
        <span> Déconnexion </span>
    </header>

    <main>

        <div class="liste">
            <div class="taches">
            </div>
        </div>

    </main>

</body>

</html>