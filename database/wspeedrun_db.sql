-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2026 at 05:57 PM
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
-- Database: `wspeedrun_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` varchar(36) NOT NULL,
  `run_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `run_id`, `user_id`, `comment`, `created_at`) VALUES
('ed8d8163-6400-40ba-ab0c-69afdc89297f', '5ffbbdc1-67f3-4949-9416-0b9a952abd59', 'b4a37c2c-a76f-4d10-87b1-e28ddd47536b', 'imo in 24 hours!?', '2026-06-05 15:52:46'),
('fcf7b570-da79-4c85-9616-a11294eee2da', '3653bfe3-f32e-41bd-b57b-9bafd0754af1', '7800a970-8a62-46cc-8242-56ce072f6b24', 'gacor king', '2026-06-01 18:14:25');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` varchar(36) NOT NULL,
  `game_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `game_name`, `description`) VALUES
('22a51741-88a2-465b-b2f3-498233d3da70', 'Minecraft', 'A sandbox game about placing blocks.'),
('38f58fc4-42fa-40fa-8efa-11c1ec8a47db', 'Mobile Legends', 'A game about reaching imo.'),
('7a2d6b69-7c25-46aa-b555-af0fb320e680', 'Dark Souls 3', 'A self torturing game about souls that is dark.'),
('de6d2d68-ea62-418c-bc8e-38d9f970a5f5', 'Elden Ring', 'A self torturing game but much more easier than a game about souls that is dark.'),
('f56c1889-6e78-4ff9-9513-d655a25eb294', 'Hollow Knight', 'A game about some bugs fighting other bugs.');

-- --------------------------------------------------------

--
-- Table structure for table `runs`
--

CREATE TABLE `runs` (
  `run_id` varchar(36) NOT NULL,
  `run_category_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `vod_url` varchar(255) NOT NULL,
  `run_duration` bigint(20) NOT NULL,
  `submitted_at` datetime NOT NULL,
  `verified_at` datetime DEFAULT NULL,
  `status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `runs`
--

INSERT INTO `runs` (`run_id`, `run_category_id`, `user_id`, `vod_url`, `run_duration`, `submitted_at`, `verified_at`, `status`) VALUES
('3653bfe3-f32e-41bd-b57b-9bafd0754af1', 'eda7f076-e04c-453c-affa-5d214aac6a25', '7800a970-8a62-46cc-8242-56ce072f6b24', 'https://youtube.com/watch?v=Speedrun123', 3665, '2026-06-01 18:13:01', '2026-06-01 18:14:54', 'ACCEPTED'),
('5ffbbdc1-67f3-4949-9416-0b9a952abd59', '31b95234-06db-440e-b5ec-7bee242c56bf', 'b4a37c2c-a76f-4d10-87b1-e28ddd47536b', 'https://youtube.com/watch?v=imo24jam', 86400, '2026-06-05 15:47:10', '2026-06-05 15:52:56', 'ACCEPTED');

-- --------------------------------------------------------

--
-- Table structure for table `run_categories`
--

CREATE TABLE `run_categories` (
  `run_category_id` varchar(36) NOT NULL,
  `game_id` varchar(36) NOT NULL,
  `run_category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `run_categories`
--

INSERT INTO `run_categories` (`run_category_id`, `game_id`, `run_category_name`) VALUES
('31b95234-06db-440e-b5ec-7bee242c56bf', '38f58fc4-42fa-40fa-8efa-11c1ec8a47db', 'Any% Glitchless'),
('eda7f076-e04c-453c-affa-5d214aac6a25', 'f56c1889-6e78-4ff9-9513-d655a25eb294', 'Any% Glitchless');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `username` varchar(55) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(55) NOT NULL,
  `role` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `country`, `role`) VALUES
('7800a970-8a62-46cc-8242-56ce072f6b24', 'testingthis23', 'utest@mail.com', 'VN5/YG8lI8uo76wXP6tC+39Z1Wzv+XTI/bc0LPLP40U=', 'Indonesia', 'ADMIN'),
('b4a37c2c-a76f-4d10-87b1-e28ddd47536b', 'bcryptTest', 'bcrypt@mail.com', '$2b$10$5BdjVYCVNjC382QP932MUuhYQ2EB0ZDOGrVgyHmRQjpal.KDq/BY.', 'Indonesia', 'ADMIN'),
('e1a4422c-6584-49ff-bfc3-a0e761efca4a', 'dearen123', 'dearen@mail.com', '$2b$10$samB18wQvCnse.9oHRlmT.H3oK9ezt52L8r6los273nQNvMe', 'Indonesia', 'USER');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `runs`
--
ALTER TABLE `runs`
  ADD PRIMARY KEY (`run_id`);

--
-- Indexes for table `run_categories`
--
ALTER TABLE `run_categories`
  ADD PRIMARY KEY (`run_category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
