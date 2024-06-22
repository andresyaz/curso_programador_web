-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2024 at 03:31 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proyectojornadas`
--

-- --------------------------------------------------------

--
-- Table structure for table `inscriptos`
--

CREATE TABLE `inscriptos` (
  `idInscripto` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inscriptos`
--

INSERT INTO `inscriptos` (`idInscripto`, `nombre`, `email`, `tipo`, `fecha`) VALUES
(1, 'andres', 'andresyaz@frbb.utn.edu.ar', 'Organizador', '2024-06-21 17:01:09'),
(2, 'mariana', 'mari@gmail.com', 'Expositor', '2024-06-21 17:01:09'),
(3, 'mariana', 'mari@gmail.com', 'Participante', '2024-06-21 17:01:09'),
(6, 'Rosario', 'ro@gmail.com', 'Expositor', '2024-06-21 17:01:09'),
(7, 'Martin', 'Lopez', 'Participante', '2024-06-21 17:01:09'),
(8, 'Martin', 'mari@gmail.com', 'Expositor', '2024-06-21 18:59:43');

-- --------------------------------------------------------

--
-- Table structure for table `suscriptores`
--

CREATE TABLE `suscriptores` (
  `idSuscriptor` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suscriptores`
--

INSERT INTO `suscriptores` (`idSuscriptor`, `Email`) VALUES
(1, 'andresyaz@gmail.com'),
(5, 'juan@generico.com'),
(6, 'ana@generico.com'),
(7, 'a1@gmail.com'),
(8, 'andresyaz@gmail.com'),
(10, 'alicia@yahoo.com.ar'),
(11, 'pepe@gmail.com'),
(12, 'juan@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `user` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `user`, `password`, `level`) VALUES
(1, 'admin', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(2, 'andres', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(12, 'nouz8', '2e99bf4e42962410038bc6fa4ce40d97', 0),
(13, 'Juan', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(14, 'AndresYaz', 'd9b1d7db4cd6e70935368a1efb10e377', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inscriptos`
--
ALTER TABLE `inscriptos`
  ADD PRIMARY KEY (`idInscripto`);

--
-- Indexes for table `suscriptores`
--
ALTER TABLE `suscriptores`
  ADD PRIMARY KEY (`idSuscriptor`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inscriptos`
--
ALTER TABLE `inscriptos`
  MODIFY `idInscripto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `suscriptores`
--
ALTER TABLE `suscriptores`
  MODIFY `idSuscriptor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
