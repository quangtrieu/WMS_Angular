-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th9 07, 2017 lúc 11:04 SA
-- Phiên bản máy phục vụ: 5.7.17-log
-- Phiên bản PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tceas_dev`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdpackagetypes`
--

CREATE TABLE `pdpackagetypes` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdpackagetypes`
--

INSERT INTO `pdpackagetypes` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'Service', 'Service', 1, '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `pdpackagetypes`
--
ALTER TABLE `pdpackagetypes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `pdpackagetypes`
--
ALTER TABLE `pdpackagetypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
