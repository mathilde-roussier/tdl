-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 11, 2020 at 05:27 PM
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_createur` int(11) NOT NULL,
  `id_tableau` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listes`
--

INSERT INTO `listes` (`id`, `id_createur`, `id_tableau`, `nom`) VALUES
(1, 1, 1, 'admin'),
(2, 1, 1, 'totest'),
(4, 1, 1, 'toewest'),
(5, 1, 1, 'toewast'),
(6, 1, 1, 'toewajt');

-- --------------------------------------------------------

--
-- Table structure for table `tableaux`
--

DROP TABLE IF EXISTS `tableaux`;
CREATE TABLE IF NOT EXISTS `tableaux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_createur` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tableaux`
--

INSERT INTO `tableaux` (`id`, `id_createur`, `nom`) VALUES
(1, 1, 'tabtest');

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `taches`
--

INSERT INTO `taches` (`id`, `id_createur`, `id_liste`, `date_creation`, `finit`, `deadline`, `nom`) VALUES
(1, 1, 1, '2020-04-07', 0, NULL, 'test'),
(2, 1, 1, '2020-04-07', 0, NULL, 'task1'),
(4, 1, 1, '2020-04-07', 1, NULL, 'task3'),
(5, 1, 1, '2020-04-11', 1, NULL, 'Je bug pas'),
(12, 1, 2, '2020-04-11', 1, NULL, 'Je bug plus'),
(7, 1, 1, '2020-04-11', 0, NULL, 'testache'),
(8, 1, 1, '2020-04-11', 1, NULL, 'chocotache'),
(9, 1, 1, '2020-04-11', 0, NULL, 'adwdawa'),
(10, 1, 1, '2020-04-11', 1, NULL, 'asdadawa'),
(11, 1, 1, '2020-04-11', 0, NULL, 'adawdwad'),
(13, 1, 2, '2020-04-11', 1, NULL, 'presque plus'),
(14, 1, 2, '2020-04-11', 1, NULL, 'Quasi plus'),
(15, 1, 2, '2020-04-11', 1, NULL, 'adwda'),
(16, 1, 2, '2020-04-11', 1, NULL, 'skdskdka'),
(17, 1, 2, '2020-04-11', 1, NULL, 'asdwadad'),
(18, 1, 2, '2020-04-11', 1, NULL, 'adwdasdawdas'),
(20, 1, 2, '2020-04-11', 0, NULL, 'Nouvelle tache bis');

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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `password`) VALUES
(1, 'admin', '$2y$12$MORUkKfMvIko/380Om6vWuQ3IYBIOCNyVUn0A8/twR8H4g49GVXka');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
