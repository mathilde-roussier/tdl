<?php

class user
{

    private $bdd;

    private $id;
    private $login;
    private $lastmessage;

    public function __construct()
    {
        $this->bdd = new bdd();
        $this->bdd = $this->bdd->getco();
    }

    public function inscription($nom, $mdp, $confmdp)
    {
        if ($nom != NULL && $mdp != NULL && $confmdp != NULL) {
            if ($mdp == $confmdp) {
                $recup = $this->bdd->prepare("SELECT nom FROM user WHERE nom = :nom");
                $recup->execute(array(':nom' => $nom));
                $resultat = $recup->fetchAll(PDO::FETCH_ASSOC);
                if (empty($resultat)) {
                    $mdp = password_hash($mdp, PASSWORD_BCRYPT, array('cost' => 12));
                    $requete = $this->bdd->prepare("INSERT INTO user (nom, password) VALUES (:nom,:mdp)");
                    $requete->execute(array(':nom' => $nom,':mdp' => $mdp));
                    $resultat = $requete->fetchAll(PDO::FETCH_ASSOC);
                } else {
                    $this->lastmessage = 'Ce login / mail est déjà utilisé';
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
        $requete = $this->bdd->prepare("SELECT * FROM user WHERE nom = :nom");
        $requete->execute(array(':nom' => $nom));
        $resultat = $requete->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($resultat)) {
            if (password_verify($mdp, $resultat["password"])) {
                $this->id = $resultat["id"];
                $this->login = $resultat["login"];
                header('location:todolist.php');
            } else {
                $this->lastmessage = 'Erreur de mot de passe';
            }
        } else {
            $this->lastmessage = 'Ce login n\' existe pas';
        }
    }

    public function disconnect()
    {
        session_destroy();
    }

    public function getlastmessage()
    {
        return $this->lastmessage;
    }

    public function getlogin()
    {
        return $this->login;
    }

    public function getmail()
    {
        return $this->mail;
    }

    public function getid()
    {
        return $this->id;
    }
}