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
		$test = $this->connexion->query("SELECT * FROM listes WHERE id_createur=".$id_createur." AND id_tableau=".$id_tableau." AND nom='".$titre."'")->fetch();
		if(empty($test))
		{
			if($this->connexion->query("INSERT INTO `listes` (`id`, `id_createur`, `id_tableau`, `nom`) VALUES (NULL, '".$id_createur."', '".$id_tableau."', '".$titre."' )" ) )
			{
				$id = $this->connexion->query("SELECT id FROM listes WHERE id_createur=".$id_createur." AND id_tableau=".$id_tableau." AND nom='".$titre."'")->fetch()["id"];
				echo json_encode(["titre"=>$titre, "id_tableau"=>$id_tableau, "id_createur"=>$id_createur, "id"=>$id]);
			}
		}
	}

	public function add_task($id_createur, $id_liste, $titre)
	{
		$test = $this->connexion->query("SELECT * FROM taches WHERE id_createur=".$id_createur." AND id_liste=".$id_liste." AND nom='".$titre."'")->fetch();
		if(empty($test))
		{
			if($this->connexion->query("INSERT INTO `taches`(`id`, `id_createur`, `id_liste`, `date_creation`, `finit`, `deadline`, `nom`)
						   VALUES  (NULL, '".$id_createur."','".$id_liste."', CURRENT_DATE(), 0, CURRENT_TIMESTAMP, '".$titre."')" ) )
			{
				$id = $this->connexion->query("SELECT id FROM `taches` WHERE id_createur=".$id_createur." AND id_liste=".$id_liste." AND nom='".$titre."'")->fetch()["id"];
				echo json_encode(["titre"=>$titre, "id_liste"=>$id_liste, "id_createur"=>$id_createur, "id"=>$id]);
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
	}

	public function update_list($id, $table, $column, $value)
	{
		$this->connexion->query("UPDATE ".$table." SET ".$column."=".$value." WHERE id=".$id);
	}
}

?>
