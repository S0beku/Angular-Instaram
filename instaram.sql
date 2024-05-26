-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 26, 2024 at 08:16 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `instaram`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dane_uzytkownika`
--

CREATE TABLE `dane_uzytkownika` (
  `id_konta` int(11) NOT NULL,
  `Login` varchar(30) NOT NULL,
  `Haslo` varchar(30) NOT NULL,
  `Wiek` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dane_uzytkownika`
--

INSERT INTO `dane_uzytkownika` (`id_konta`, `Login`, `Haslo`, `Wiek`) VALUES
(3, 'Sobeku123', '$2y$10$ivi4Ey3B5G.TgcSLKosGR.z', 18);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tokeny`
--

CREATE TABLE `tokeny` (
  `Token` varchar(255) NOT NULL,
  `id_konta` int(11) NOT NULL,
  `Data` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokeny`
--

INSERT INTO `tokeny` (`Token`, `id_konta`, `Data`) VALUES
('240947235150c3fc39e0', 3, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zdjecia`
--

CREATE TABLE `zdjecia` (
  `id_zdjecia` int(11) NOT NULL,
  `id_konta` int(11) NOT NULL,
  `opis` text NOT NULL,
  `zdjecie` varchar(255) NOT NULL,
  `data` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `dane_uzytkownika`
--
ALTER TABLE `dane_uzytkownika`
  ADD PRIMARY KEY (`id_konta`);

--
-- Indeksy dla tabeli `zdjecia`
--
ALTER TABLE `zdjecia`
  ADD PRIMARY KEY (`id_zdjecia`),
  ADD KEY `id_konta` (`id_konta`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dane_uzytkownika`
--
ALTER TABLE `dane_uzytkownika`
  MODIFY `id_konta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `zdjecia`
--
ALTER TABLE `zdjecia`
  MODIFY `id_zdjecia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `zdjecia`
--
ALTER TABLE `zdjecia`
  ADD CONSTRAINT `zdjecia_ibfk_1` FOREIGN KEY (`id_konta`) REFERENCES `dane_uzytkownika` (`id_konta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
