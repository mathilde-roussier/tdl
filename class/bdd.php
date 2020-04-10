<?php

class bdd
{
	private $connexion;

	public function __construct()
	{
		try {
			$this->connexion = new PDO("mysql:host=localhost;dbname=todolist","root","");
		}
		catch (PDOException $e) {
			echo $e->getMessage();
		}
	}

	public function getco()
	{
		return $this->connexion;
	}

	public function close()
	{
		$this->connexion = null;
	}

	public function add_list($id_createur, $id_tableau, $titre)
	{
		$query = "SELECT * FROM listes WHERE id_createur=".$id_createur." AND id_tableau=".$id_tableau." AND nom='".$titre."'";
		$test = $this->connexion->query($query)->fetch();
		if(empty($test))
		{
			if($this->connexion->query("INSERT INTO `listes` (`id`, `id_createur`, `id_tableau`, `nom`) VALUES (NULL, '".$id_createur."', '".$id_tableau."', '".$titre."' )" ) )
			{
				$id = $this->connexion->query($query)->fetch()["id"];
				echo json_encode(["titre"=>$titre, "id_tableau"=>$id_tableau, "id_createur"=>$id_createur, "id"=>$id]);
			}
		}
	}

	public function add_task($id_createur, $id_liste, $titre)
	{
		$query = "SELECT  taches.id as id_tache,
                utilisateurs.nom as nom_createur FROM taches 
                INNER JOIN utilisateurs ON taches.id_createur = utilisateurs.id 
                WHERE taches.id_createur=".$id_createur." AND 
                taches.id_liste=".$id_liste."
                AND taches.nom='".$titre."'";
		$test = $this->connexion->query($query)->fetch(PDO::FETCH_ASSOC);
		if(empty($test))
		{
			if($this->connexion->query("INSERT INTO `taches`(`id`, `id_createur`, `id_liste`, `date_creation`, `finit`, `deadline`, `nom`)
						   VALUES  (NULL, '".$id_createur."','".$id_liste."', CURRENT_DATE(), 0, CURRENT_TIMESTAMP, '".$titre."')" ) )
			{
				$data = $this->connexion->query($query)->fetch();
				echo json_encode(["nom_tache"=>$titre, "id_liste"=>$id_liste, "id_createur"=>$id_createur, "createur"=>$data["nom_createur"], "id_tache"=>$data["id_tache"]]);
			}
		}
	}

	public function add_tableau($id_createur, $titre)
	{
		$query = "SELECT * FROM taches WHERE id_createur=".$id_createur." AND nom='".$titre."'";
		$test = $this->connexion->query($query)->fetch();
		if(empty($test))
		{
			if($this->connexion->query("INSERT INTO `tableaux`(`id`, `id_createur`, `nom`)
						   VALUES  (NULL, '".$id_createur."', '".$titre."')" ) )
			{
				$id = $this->connexion->query($query)->fetch()["id"];
				echo json_encode(["titre"=>$titre, "id_createur"=>$id_createur, "id"=>$id]);
			}
			else
			{
				echo "query fail";
			}
		}
	}

	public function del($type, $id)
	{
		if($type == 1)
		{
			$this->connexion->query("DELETE FROM listes WHERE id=".$id);
		}
		else if($type == 2)
		{
			$this->connexion->query("DELETE FROM taches WHERE id=".$id);
		}
		else if($type == 3)
		{
			$this->connexion->query("DELETE FROM tableaux WHERE id=".$id);
		}
	}

	public function update($id, $table, $column, $value)
	{
		$this->connexion->query("UPDATE ".$table." SET ".$column."='".$value."' WHERE id=".$id);
	}

	public function get_tableaux($id_createur)
	{
		$query = "SELECT * FROM tableaux WHERE id_createur=".$id_createur;
		$res = $this->connexion->query($query)->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($res);
		return $res;
	}

	public function get_listes($id_createur, $id_tableau)
	{
		$query = "SELECT * FROM listes WHERE id_createur=".$id_createur." AND id_tableau=".$id_tableau;
		$res = $this->connexion->query($query)->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($res);
		return $res;
	}

	public function get_taches($id_createur, $id_liste, $id_tableau)
	{
		$query = "SELECT taches.nom AS nom_tache, taches.id AS id_tache, taches.id_liste AS id_liste,
		utilisateurs.nom AS createur
		FROM taches 
		INNER JOIN listes ON taches.id_liste = listes.id 
		INNER JOIN tableaux ON listes.id_tableau = tableaux.id 
		LEFT JOIN utilisateurs ON taches.id_createur = utilisateurs.id
		WHERE taches.id_createur=".$id_createur." AND taches.id_liste=".$id_liste." AND  listes.id_tableau=".$id_tableau;
		$res = $this->connexion->query($query)->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($res);
		return $res;
	}

        public function get_tache($id)
        {
                $query = "SELECT * FROM taches WHERE id = ".$id;
                echo json_encode($this->connexion->query($query)->fetch(PDO::FETCH_ASSOC));
        }
}

?>
