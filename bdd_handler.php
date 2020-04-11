<?php
include("class/bdd.php");

session_start();

if(!isset($bdd))
{
	$bdd = new bdd();
}

if(isset($_POST["function"])||isset($_GET["function"]))
{
	$function = $_POST["function"] ?? $_GET["function"];

	switch($function)
	{
		case "add_list":
			$id_createur = $_SESSION["id"];
			$id_tableau = $_POST["id_tableau"];
			$titre = htmlspecialchars($_POST["titre"]);
			$bdd->add_list($id_createur, $id_tableau, $titre);
		break;
		
		case "add_task":
			$id_createur = $_SESSION["id"];
			$id_liste = $_POST["id_liste"];
			$titre = htmlspecialchars($_POST["titre"]);
			$bdd->add_task($id_createur, $id_liste, $titre);
		break;
		
		case "add_tableau":
			$id_createur = $_SESSION["id"];
			$titre = htmlspecialchars($_POST["titre"]);
			$bdd->add_tableau($id_createur, $titre);
		break;

		case "del":
			$bdd->del($_POST["type"], $_POST["id"]);
		break;

		case "update":
			$id = $_POST["id"];
			$table = $_POST["table"];
			$column = $_POST["column"];
			$value = $_POST["value"];
			$type = $_POST["type"];
			$bdd->update($type, $id,$table,$column,$value);
		break;

		case "get_tableau":
			$id_createur = $_SESSION["id"];
			$bdd->get_tableaux($id_createur);
		break;

		case "get_listes":
			$id_createur = $_SESSION["id"];
			$id_tableau = $_POST["id_tableau"];
			$bdd->get_listes($id_createur, $id_tableau);
		break;

		case "get_taches":
			$id_createur = $_SESSION["id"];
			$id_liste = $_POST["id_liste"];
			$id_tableau = $_POST["id_tableau"];
			$bdd->get_taches($id_createur, $id_liste, $id_tableau);
		break;
		
		default:
			echo "error function ".$function." not found!";
		break;
	}
}

?>
