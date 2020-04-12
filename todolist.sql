-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 12, 2020 at 07:00 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todolist`
--
CREATE DATABASE IF NOT EXISTS `todolist` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `todolist`;

-- --------------------------------------------------------

--
-- Table structure for table `listes`
--

DROP TABLE IF EXISTS `listes`;
CREATE TABLE IF NOT EXISTS `listes` (
  `id_liste` int(11) NOT NULL AUTO_INCREMENT,
  `id_createur` int(11) NOT NULL,
  `id_tableau` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id_liste`),
  KEY `id_tableau` (`id_tableau`)
) ENGINE=InnoDB AUTO_INCREMENT=270 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listes`
--

INSERT INTO `listes` (`id_liste`, `id_createur`, `id_tableau`, `nom`) VALUES
(204, 1, 25, 'Je bug plus du tout'),
(205, 1, 27, 'sadwfffff'),
(268, 3, 29, 'tout vas bien'),
(269, 3, 37, 'Liste tab 3');

-- --------------------------------------------------------

--
-- Table structure for table `tableaux`
--

DROP TABLE IF EXISTS `tableaux`;
CREATE TABLE IF NOT EXISTS `tableaux` (
  `id_tableau` int(11) NOT NULL AUTO_INCREMENT,
  `id_createur` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tableau`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tableaux`
--

INSERT INTO `tableaux` (`id_tableau`, `id_createur`, `nom`) VALUES
(25, 1, 'Je bug plus'),
(26, 1, 'Finit partout ?'),
(27, 1, 'sadfafffa'),
(29, 3, 'tableau 2'),
(37, 3, 'Tableau 3');

-- --------------------------------------------------------

--
-- Table structure for table `taches`
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `taches`
--

INSERT INTO `taches` (`id`, `id_createur`, `id_liste`, `date_creation`, `finit`, `deadline`, `nom`) VALUES
(24, 1, 204, '2020-04-11', 0, NULL, 'presque plus ?'),
(25, 1, 204, '2020-04-11', 1, '2020-03-11', 'Plus du tout de sur'),
(26, 1, 205, '2020-04-11', 1, '2020-03-11', 'asfgghh'),
(53, 3, 268, '2020-04-11', 1, '2020-03-12', 'chocolat'),
(56, 3, 268, '2020-04-11', 1, '2020-03-12', 'asfasfas'),
(57, 3, 268, '2020-04-12', 1, '2020-03-12', 'autre chose'),
(58, 3, 268, '2020-04-12', 0, NULL, 'adsdafa'),
(59, 3, 268, '2020-04-12', 0, NULL, 'a'),
(60, 3, 269, '2020-04-12', 0, NULL, 'Premiere tache');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `password`) VALUES
(1, 'test', '$2y$12$XHqJnuT8blVZroa14nUgBu8VJORXBvmWpf1Zn/AwFK/jGZpcldugS'),
(2, 'moi', '$2y$12$.6RgP2CfrJ068dx5RGZThO2domZoZei0blbwrI2.HMUWKNknvP9Ei'),
(3, 'admin', '$2y$12$Abt3lTBiL0L5HzkerflIPeXdwT7WgsbZvrMlw64TWr44FnCpANlp6');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `listes`
--
ALTER TABLE `listes`
  ADD CONSTRAINT `listes_suppr_tab` FOREIGN KEY (`id_tableau`) REFERENCES `tableaux` (`id_tableau`) ON DELETE CASCADE;

--
-- Constraints for table `taches`
--
ALTER TABLE `taches`
  ADD CONSTRAINT `taches_suppr_liste_tab` FOREIGN KEY (`id_liste`) REFERENCES `listes` (`id_liste`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
