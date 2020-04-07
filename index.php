<?php include 'class/user.php';
session_start();

$user = new user();

if (isset($_POST['inscription'])) {
    $user->inscription($_POST['login'], $_POST['mdp'], $_POST['conf_mdp']);
}

if (isset($_POST['connexion'])) {
    $user->connexion($_POST['login'], $_POST['mdp']);
}

?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <link rel='stylesheet' href='css/tdl.css'>
    <title> Accueil </title>
</head>

<body class=accueil>

    <header>
        <aside>
            <h3> Connexion </h3>

            <div>
                <form action='' method='POST'>
                    <label> Login </label>
                    <input type='text' name='login' required>
                    <label> Mot de passe </label>
                    <input type='password' name='mdp' required>
                    <input type='submit' name='connexion' value='connexion'>
                </form>

                <?php if(isset($_POST['connexion'])){echo $user->getlastmessage();} ?>

            </div>

        </aside>

    </header>

    <main>

        <h1> Inscription </h1>

        <form action='' method='POST'>
            <label> Login </label>
            <input type='text' name='login' required>
            <label> Mot de passe </label>
            <input type='password' name='mdp' required>
            <label> Confirmation mot de passe </label>
            <input type='password' name='conf_mdp' required>
            <input type='submit' name='inscription' value='inscription'>

            <?php if(isset($_POST['inscription'])){echo $user->getlastmessage();} ?>

        </form>

    </main>

</body>

</html>