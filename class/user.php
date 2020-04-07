<?php

class user
{

    private $bdd;

    private $id;
    private $login;
    private $lastmessage;

    public function __construct()
    {
        // Recup connexion bdd
        try {
            $this->bdd = new PDO('mysql:host=localhost;dbname=todolist;charset=utf8', 'root', '');
        } catch (PDOException $e) {
            die('Erreur : ' . $e->getMessage());
        }
    }

    public function inscription($nom, $mdp, $confmdp)
    {
        if ($nom != NULL && $mdp != NULL && $confmdp != NULL) {
            if ($mdp == $confmdp) {
                $recup = $this->bdd->prepare("SELECT nom FROM utilisateurs WHERE nom = :nom");
                $recup->execute(array(':nom' => $nom));
                $resultat = $recup->fetchAll(PDO::FETCH_ASSOC);
                if (empty($resultat)) {
                    $mdp = password_hash($mdp, PASSWORD_BCRYPT, array('cost' => 12));
                    $requete = $this->bdd->prepare("INSERT INTO utilisateurs (nom, password) VALUES (:nom,:mdp)");
                    $requete->execute(array(':nom' => $nom,':mdp' => $mdp));
                    $resultat = $requete->fetchAll(PDO::FETCH_ASSOC);
                } else {
                    $this->lastmessage = 'Ce login est déjà utilisé';
                }
            } else {
                $this->lastmessage = 'Les deux mots de passe sont différents';
            }
        } else {
            $this->lastmessage = 'Veuillez remplir tous les champs';
        }
    }

    public function connexion($nom, $mdp)
    {
        $requete = $this->bdd->prepare("SELECT * FROM utilisateurs WHERE nom = :nom");
        $requete->execute(array(':nom' => $nom));
        $resultat = $requete->fetchAll();
        if (!empty($resultat)) {
            foreach($resultat as $infos)
            {
                if (password_verify($mdp, $infos["password"])) {
                    $this->id = $infos["id"];
                    $this->login = $infos["nom"];
                    $_SESSION['id'] = $this->id;
                    header('location:todolist.php');
                } else {
                    $this->lastmessage = 'Erreur de mot de passe';
                }
            }
            
        } else {
            $this->lastmessage = 'Ce login n\' existe pas';
        }
    }

    public function disconnect()
    {
        session_destroy();
        header('location:index.php');
    }

    public function getlastmessage()
    {
        return $this->lastmessage;
    }

    public function getlogin()
    {
        return $this->login;
    }

    public function getid()
    {
        return $this->id;
    }
}