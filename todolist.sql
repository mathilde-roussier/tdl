-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 12 avr. 2020 à 07:14
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `todolist`
--
CREATE DATABASE IF NOT EXISTS `todolist` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `todolist`;

-- --------------------------------------------------------

--
-- Structure de la table `listes`
--

DROP TABLE IF EXISTS `listes`;
CREATE TABLE IF NOT EXISTS `listes` (
  `id_liste` int(11) NOT NULL AUTO_INCREMENT,
  `id_createur` int(11) NOT NULL,
  `id_tableau` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id_liste`),
  KEY `id_tableau` (`id_tableau`)
) ENGINE=InnoDB AUTO_INCREMENT=277 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `listes`
--

INSERT INTO `listes` (`id_liste`, `id_createur`, `id_tableau`, `nom`) VALUES
(273, 3, 40, 'Liste 1'),
(274, 3, 40, 'Liste 2'),
(275, 3, 41, 'Liste cool'),
(276, 3, 42, 'A faire VITE !');

-- --------------------------------------------------------

--
-- Structure de la table `tableaux`
--

DROP TABLE IF EXISTS `tableaux`;
CREATE TABLE IF NOT EXISTS `tableaux` (
  `id_tableau` int(11) NOT NULL AUTO_INCREMENT,
  `id_createur` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tableau`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `tableaux`
--

INSERT INTO `tableaux` (`id_tableau`, `id_createur`, `nom`) VALUES
(40, 3, 'Tableau 1'),
(41, 3, 'Tableau 2'),
(42, 3, 'Tableau 3');

-- --------------------------------------------------------

--
-- Structure de la table `taches`
--

DROP TABLE IF EXISTS `taches`;
CREATE TABLE IF NOT EXISTS `taches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_createur` int(11) NOT NULL,
  `id_liste` int(11) NOT NULL,
  `date_creation` date NOT NULL,
  `finit` tinyint(1) NOT NULL,
  `deadline` date DEFAULT NULL,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_liste` (`id_liste`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `taches`
--

INSERT INTO `taches` (`id`, `id_createur`, `id_liste`, `date_creation`, `finit`, `deadline`, `nom`) VALUES
(70, 3, 275, '2020-04-12', 0, NULL, 'PremiÃ¨re tÃ¢che'),
(71, 3, 275, '2020-04-12', 1, '2020-03-12', 'TÃ¢che de l\'autre'),
(74, 3, 274, '2020-04-12', 0, NULL, 'Page index.php'),
(75, 3, 276, '2020-04-12', 0, NULL, 'New tache'),
(76, 3, 276, '2020-04-12', 0, NULL, 'New tache 3'),
(77, 3, 276, '2020-04-12', 0, NULL, 'New tache 2');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `password`) VALUES
(3, 'admin', '$2y$12$Abt3lTBiL0L5HzkerflIPeXdwT7WgsbZvrMlw64TWr44FnCpANlp6');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `listes`
--
ALTER TABLE `listes`
  ADD CONSTRAINT `listes_suppr_tab` FOREIGN KEY (`id_tableau`) REFERENCES `tableaux` (`id_tableau`) ON DELETE CASCADE;

--
-- Contraintes pour la table `taches`
--
ALTER TABLE `taches`
  ADD CONSTRAINT `taches_suppr_liste_tab` FOREIGN KEY (`id_liste`) REFERENCES `listes` (`id_liste`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
