-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th9 15, 2017 lúc 10:40 SA
-- Phiên bản máy phục vụ: 5.7.17-log
-- Phiên bản PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tceas_new`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `appointmentNo` varchar(150) NOT NULL,
  `statusId` int(11) DEFAULT NULL,
  `timeSlotDetailId` int(11) DEFAULT NULL,
  `timeSlotDate` date DEFAULT NULL,
  `vehicleCustomerId` int(11) DEFAULT NULL,
  `previousMilleage` bigint(20) DEFAULT NULL,
  `currentMilleage` bigint(20) DEFAULT NULL,
  `remarks` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `serviceAdvisorId` int(11) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `appointments`
--

INSERT INTO `appointments` (`id`, `appointmentNo`, `statusId`, `timeSlotDetailId`, `timeSlotDate`, `vehicleCustomerId`, `previousMilleage`, `currentMilleage`, `remarks`, `serviceAdvisorId`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, '1', 1, 1, '2017-09-14', 2, 1, 1, '1', 1, '2017-09-14 00:00:00', '2017-09-14 00:00:00', '1', '1', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bayemployees`
--

CREATE TABLE `bayemployees` (
  `id` int(11) NOT NULL,
  `bayId` int(11) DEFAULT NULL,
  `employeeId` int(11) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bays`
--

CREATE TABLE `bays` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `pdJobTypeId` int(11) DEFAULT NULL,
  `pdHoistId` int(11) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `code` text NOT NULL,
  `name` text NOT NULL,
  `idNumber` text,
  `contact` text,
  `customerType` int(11) NOT NULL,
  `pdCountryId` int(11) DEFAULT NULL,
  `pdIdTypeId` int(11) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `pdRaceId` int(11) DEFAULT NULL,
  `pdSalutationId` int(11) DEFAULT NULL,
  `pdOccupationId` int(11) DEFAULT NULL,
  `pdEmploymentStatusId` int(11) DEFAULT NULL,
  `houseTelNo` text,
  `officeTelNo` text,
  `extension` text,
  `faxNumber` text,
  `email` varchar(100) DEFAULT NULL,
  `firstlanguageId` int(11) DEFAULT NULL,
  `secondLanguageId` int(11) DEFAULT NULL,
  `receiveVehicleCollectionSMS` int(11) DEFAULT NULL,
  `receiveVehicleReminderSMS` int(11) DEFAULT NULL,
  `receiveCampainSMS` int(11) DEFAULT NULL,
  `receiveProductInformation` int(11) DEFAULT NULL,
  `firstContactPreference` int(11) DEFAULT NULL,
  `secondContactPreference` int(11) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `addressCountry` text,
  `addressState` text,
  `addressCity` text,
  `addressPostalCode` text,
  `addressBilling` text,
  `addressBillingCountry` text,
  `addressBillingState` text,
  `addressBillingCity` text,
  `addressBillingPostalCode` text,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime DEFAULT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `modifiedBy` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`id`, `code`, `name`, `idNumber`, `contact`, `customerType`, `pdCountryId`, `pdIdTypeId`, `gender`, `pdRaceId`, `pdSalutationId`, `pdOccupationId`, `pdEmploymentStatusId`, `houseTelNo`, `officeTelNo`, `extension`, `faxNumber`, `email`, `firstlanguageId`, `secondLanguageId`, `receiveVehicleCollectionSMS`, `receiveVehicleReminderSMS`, `receiveCampainSMS`, `receiveProductInformation`, `firstContactPreference`, `secondContactPreference`, `address`, `addressCountry`, `addressState`, `addressCity`, `addressPostalCode`, `addressBilling`, `addressBillingCountry`, `addressBillingState`, `addressBillingCity`, `addressBillingPostalCode`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `modifiedBy`, `isDeleted`) VALUES
(5, 'J0001', 'Jindo', '100000', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2017-09-12 10:36:02', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employeeroles`
--

CREATE TABLE `employeeroles` (
  `id` int(11) NOT NULL,
  `employeeId` int(11) DEFAULT NULL,
  `pdEmployeeRoleId` int(11) DEFAULT NULL,
  `checked` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobfulfilmentitems`
--

CREATE TABLE `jobfulfilmentitems` (
  `id` int(11) NOT NULL,
  `jobFulfilmentId` int(11) NOT NULL,
  `bayId` int(11) NOT NULL,
  `repairOrderJobId` int(11) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `jobFulfilmentItemStatusId` int(11) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobfulfilments`
--

CREATE TABLE `jobfulfilments` (
  `id` int(11) NOT NULL,
  `repairOrderId` int(11) NOT NULL,
  `suggestedBayId` int(11) NOT NULL,
  `jobFulfilmentStatusId` int(11) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobgroups`
--

CREATE TABLE `jobgroups` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `jobgroups`
--

INSERT INTO `jobgroups` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'TOYOTA', 'TOYOTA', 1, '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0),
(2, 'A', 'ENGINE MECHANICAL', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(3, 'C', 'LUBRICATION, COOLING SYSTEM & TROUBLE DIAGNOSIS', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(4, 'D', 'ENGINE FUEL SYSTEM', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(5, 'E', 'EMISSION CONTROL SYSTEM', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(6, 'F', 'ENGINE CONTROL, FUEL & EXHAUST SYSTEM', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(7, 'G', 'ENGINE ELECTRICAL', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(8, 'H', 'CLUTCH, MANUAL TRANSMISSION TRANSAXLE', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(9, 'J', 'AUTOMATIC TRANMISSION, TRANSAXLE / EV & HEV', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(10, 'K', 'TRANSFER', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(11, 'L', 'PROPERLLET SHAFT (S) & DIFFERENTIAL', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(12, 'M', 'FRONT AXLE & SUSPENSION', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(13, 'N', 'REAR AXLE & SUSPENSION', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(14, 'P', 'BRAKE, WHEEL & TIRE', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(15, 'Q', 'STEERING', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(16, 'R', 'BODY ELECTRICAL', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(17, 'S', 'BODY II', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(18, 'T', 'HEATER & AIR COND', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(19, 'U', 'BODY', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(20, 'V', 'INTERIOR', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(21, 'W', 'MAINTENANCE & ADJUSTMENT', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(22, 'ACC', 'ACCESSORIES', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(23, 'BP', 'BODY & PAINT', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL),
(24, 'I', 'INSPECTION', NULL, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobmasters`
--

CREATE TABLE `jobmasters` (
  `id` int(11) NOT NULL,
  `jobGroupId` int(11) NOT NULL,
  `pdJobTypeId` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `jobmasters`
--

INSERT INTO `jobmasters` (`id`, `jobGroupId`, `pdJobTypeId`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 1, 1, 'JM1', 'Job Master 1', 1, '2017-09-08 00:00:00', '2017-09-08 00:00:00', 'Test', 'Test', 0),
(2, 1, 1, 'JM2', 'Job Master 2', 1, '2017-09-08 00:00:00', '2017-09-08 00:00:00', 'Test', 'Test', 0),
(3, 1, 1, 'J003', 'J003', 1, '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobpartitems`
--

CREATE TABLE `jobpartitems` (
  `id` int(11) NOT NULL,
  `jobPartId` int(11) NOT NULL,
  `partId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdDateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobpartmasters`
--

CREATE TABLE `jobpartmasters` (
  `id` int(11) NOT NULL,
  `vehicleVariantId` int(11) NOT NULL,
  `jobId` int(11) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobprices`
--

CREATE TABLE `jobprices` (
  `id` int(11) NOT NULL,
  `jobId` int(11) DEFAULT NULL,
  `variantId` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobsections`
--

CREATE TABLE `jobsections` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `jobGroupId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobtechnicianfulfilments`
--

CREATE TABLE `jobtechnicianfulfilments` (
  `id` int(11) NOT NULL,
  `jobFulfilmentItemId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobtimespentdetails`
--

CREATE TABLE `jobtimespentdetails` (
  `id` int(11) NOT NULL,
  `jobFulfilmentItemId` int(11) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime DEFAULT NULL,
  `jobTimeSpentDetailStatusId` int(11) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jpcbs`
--

CREATE TABLE `jpcbs` (
  `id` int(11) NOT NULL,
  `repairOrderId` int(11) NOT NULL,
  `bayId` int(11) NOT NULL,
  `serviceAdvisorId` int(11) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `jPCBStatusId` int(11) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `partmasters`
--

CREATE TABLE `partmasters` (
  `id` int(11) NOT NULL,
  `workShopId` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `partmasters`
--

INSERT INTO `partmasters` (`id`, `workShopId`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 1, 'PM1', 'Part Master 1', 1, '2017-09-07 00:00:00', '2017-09-07 00:00:00', 'Test', 'Test', 0),
(2, 1, 'PM2', 'Part Master 2', 1, '2017-09-07 00:00:00', '2017-09-07 00:00:00', 'Test', 'Test', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `partprices`
--

CREATE TABLE `partprices` (
  `id` int(11) NOT NULL,
  `partId` int(11) DEFAULT NULL,
  `variantId` int(11) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  `netPrice` decimal(10,2) DEFAULT NULL,
  `retailPrice` decimal(10,2) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdcities`
--

CREATE TABLE `pdcities` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdcities`
--

INSERT INTO `pdcities` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'code', 'description', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'createdBy', 'updatedBy', 0),
(2, 'HCM', 'Ho Chi Minh', 1, '2016-12-10 07:22:02', '0000-00-00 00:00:00', 'Admin', '', 0),
(3, 'SL', 'SELANGOR', 1, '2016-12-10 07:22:03', '0000-00-00 00:00:00', 'Admin', '', 0),
(4, 'TPHN', 'Ha Noi', 1, '2016-12-10 07:22:04', '0000-00-00 00:00:00', 'Admin', '', 0),
(5, 'TPHCM', 'Ho Chi Minh', 1, '2016-12-10 07:22:05', '0000-00-00 00:00:00', 'Admin', '', 0),
(6, 'AG', 'An Giang', 1, '2016-12-10 07:22:06', '0000-00-00 00:00:00', 'Admin', '', 0),
(7, 'BRVT', 'Ba Ria - Vung Tau', 1, '2016-12-10 07:22:07', '0000-00-00 00:00:00', 'Admin', '', 0),
(8, 'BL', 'Bac Lieu', 1, '2016-12-10 07:22:08', '0000-00-00 00:00:00', 'Admin', '', 0),
(9, 'BG', 'Bac Giang', 1, '2016-12-10 07:22:09', '0000-00-00 00:00:00', 'Admin', '', 0),
(10, 'BK', 'Bac Kan', 1, '2016-12-10 07:22:10', '0000-00-00 00:00:00', 'Admin', '', 0),
(11, 'BN', 'Bac Ninh', 1, '2016-12-10 07:22:11', '0000-00-00 00:00:00', 'Admin', '', 0),
(12, 'BT', 'Ben Tre', 1, '2016-12-10 07:22:12', '0000-00-00 00:00:00', 'Admin', '', 0),
(13, 'BD', 'Binh Duong', 1, '2016-12-10 07:22:13', '0000-00-00 00:00:00', 'Admin', '', 0),
(14, 'BDH', 'Binh Dinh', 1, '2016-12-10 07:22:14', '0000-00-00 00:00:00', 'Admin', '', 0),
(15, 'BP', 'Binh Phuoc', 1, '2016-12-10 07:22:15', '0000-00-00 00:00:00', 'Admin', '', 0),
(16, 'BTH', 'Binh Thuan', 1, '2016-12-10 07:22:16', '0000-00-00 00:00:00', 'Admin', '', 0),
(17, 'CB', 'Cao Bang', 1, '2016-12-10 07:22:17', '0000-00-00 00:00:00', 'Admin', '', 0),
(18, 'CM', 'Ca Mau', 1, '2016-12-10 07:22:18', '0000-00-00 00:00:00', 'Admin', '', 0),
(19, 'TPCT', 'Can Tho', 1, '2016-12-10 07:22:19', '0000-00-00 00:00:00', 'Admin', '', 0),
(20, 'TPHP', 'Hai Phong', 1, '2016-12-10 07:22:20', '0000-00-00 00:00:00', 'Admin', '', 0),
(21, 'TPDN', 'Da Nang', 1, '2016-12-10 07:22:21', '0000-00-00 00:00:00', 'Admin', '', 0),
(22, 'GL', 'Gia Lai', 1, '2016-12-10 07:22:22', '0000-00-00 00:00:00', 'Admin', '', 0),
(23, 'HB', 'Hoa Binh', 1, '2016-12-10 07:22:23', '0000-00-00 00:00:00', 'Admin', '', 0),
(24, 'HAG', 'Ha Giang', 1, '2016-12-10 07:22:24', '0000-00-00 00:00:00', 'Admin', '', 0),
(25, 'HN', 'Ha Nam', 1, '2016-12-10 07:22:25', '0000-00-00 00:00:00', 'Admin', '', 0),
(26, 'HT', 'Ha Tinh', 1, '2016-12-10 07:22:26', '0000-00-00 00:00:00', 'Admin', '', 0),
(27, 'HY', 'Hung Yen', 1, '2016-12-10 07:22:27', '0000-00-00 00:00:00', 'Admin', '', 0),
(28, 'HD', 'Hai Duong', 1, '2016-12-10 07:22:28', '0000-00-00 00:00:00', 'Admin', '', 0),
(29, 'HG', 'Hau Giang', 1, '2016-12-10 07:22:29', '0000-00-00 00:00:00', 'Admin', '', 0),
(30, 'DB', 'Dien Bien', 1, '2016-12-10 07:22:30', '0000-00-00 00:00:00', 'Admin', '', 0),
(31, 'DL', 'Dak Lak', 1, '2016-12-10 07:22:31', '0000-00-00 00:00:00', 'Admin', '', 0),
(32, 'DKN', 'Dak Nong', 1, '2016-12-10 07:22:32', '0000-00-00 00:00:00', 'Admin', '', 0),
(33, 'DN', 'Dong Nai', 1, '2016-12-10 07:22:33', '0000-00-00 00:00:00', 'Admin', '', 0),
(34, 'DT', 'Dong Thap', 1, '2016-12-10 07:22:34', '0000-00-00 00:00:00', 'Admin', '', 0),
(35, 'KH', 'Khanh Hoa', 1, '2016-12-10 07:22:35', '0000-00-00 00:00:00', 'Admin', '', 0),
(36, 'KG', 'Kien Giang', 1, '2016-12-10 07:22:36', '0000-00-00 00:00:00', 'Admin', '', 0),
(37, 'KT', 'Kon Tum', 1, '2016-12-10 07:22:37', '0000-00-00 00:00:00', 'Admin', '', 0),
(38, 'LCH', 'Lai Chau', 1, '2016-12-10 07:22:38', '0000-00-00 00:00:00', 'Admin', '', 0),
(39, 'LA', 'Long An', 1, '2016-12-10 07:22:39', '0000-00-00 00:00:00', 'Admin', '', 0),
(40, 'LC', 'Lao Cai', 1, '2016-12-10 07:22:40', '0000-00-00 00:00:00', 'Admin', '', 0),
(41, 'LD', 'Lam Dong', 1, '2016-12-10 07:22:41', '0000-00-00 00:00:00', 'Admin', '', 0),
(42, 'LS', 'Lang Son', 1, '2016-12-10 07:22:42', '0000-00-00 00:00:00', 'Admin', '', 0),
(43, 'ND', 'Nam Dinh', 1, '2016-12-10 07:22:43', '0000-00-00 00:00:00', 'Admin', '', 0),
(44, 'NA', 'Nghe An', 1, '2016-12-10 07:22:44', '0000-00-00 00:00:00', 'Admin', '', 0),
(45, 'NB', 'Ninh Binh', 1, '2016-12-10 07:22:45', '0000-00-00 00:00:00', 'Admin', '', 0),
(46, 'NT', 'Ninh Thuan', 1, '2016-12-10 07:22:46', '0000-00-00 00:00:00', 'Admin', '', 0),
(47, 'PT', 'Phu Tho', 1, '2016-12-10 07:22:47', '0000-00-00 00:00:00', 'Admin', '', 0),
(48, 'PY', 'Phu Yen', 1, '2016-12-10 07:22:48', '0000-00-00 00:00:00', 'Admin', '', 0),
(49, 'QB', 'Quang Binh', 1, '2016-12-10 07:22:49', '0000-00-00 00:00:00', 'Admin', '', 0),
(50, 'QN', 'Quang Nam', 1, '2016-12-10 07:22:50', '0000-00-00 00:00:00', 'Admin', '', 0),
(51, 'QNG', 'Quang Ngai', 1, '2016-12-10 07:22:51', '0000-00-00 00:00:00', 'Admin', '', 0),
(52, 'QNH', 'Quang Ninh', 1, '2016-12-10 07:22:52', '0000-00-00 00:00:00', 'Admin', '', 0),
(53, 'QT', 'Quang Tri', 1, '2016-12-10 07:22:53', '0000-00-00 00:00:00', 'Admin', '', 0),
(54, 'ST', 'Soc Trang', 1, '2016-12-10 07:22:54', '0000-00-00 00:00:00', 'Admin', '', 0),
(55, 'SL', 'Son La', 1, '2016-12-10 07:22:55', '0000-00-00 00:00:00', 'Admin', '', 0),
(56, 'TH', 'Thanh Hoa', 1, '2016-12-10 07:22:56', '0000-00-00 00:00:00', 'Admin', '', 0),
(57, 'TB', 'Thai Binh', 1, '2016-12-10 07:22:57', '0000-00-00 00:00:00', 'Admin', '', 0),
(58, 'TNG', 'Thai Nguyen', 1, '2016-12-10 07:22:58', '0000-00-00 00:00:00', 'Admin', '', 0),
(59, 'TTH', 'Thua Thien Hue', 1, '2016-12-10 07:22:59', '0000-00-00 00:00:00', 'Admin', '', 0),
(60, 'TG', 'Tien Giang', 1, '2016-12-10 07:23:01', '0000-00-00 00:00:00', 'Admin', '', 0),
(61, 'TV', 'Tra Vinh', 1, '2016-12-10 07:23:02', '0000-00-00 00:00:00', 'Admin', '', 0),
(62, 'TQ', 'Tuyen Quang', 1, '2016-12-10 07:23:03', '0000-00-00 00:00:00', 'Admin', '', 0),
(63, 'TN', 'Tay Ninh', 1, '2016-12-10 07:23:04', '0000-00-00 00:00:00', 'Admin', '', 0),
(64, 'VL', 'Vinh Long', 1, '2016-12-10 07:23:05', '0000-00-00 00:00:00', 'Admin', '', 0),
(65, 'VP', 'Vinh Phuc', 1, '2016-12-10 07:23:06', '0000-00-00 00:00:00', 'Admin', '', 0),
(66, 'YB', 'Yen Bai', 1, '2016-12-10 07:23:07', '0000-00-00 00:00:00', 'Admin', '', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdcomebackjobs`
--

CREATE TABLE `pdcomebackjobs` (
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
-- Đang đổ dữ liệu cho bảng `pdcomebackjobs`
--

INSERT INTO `pdcomebackjobs` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'NEW', 'NEW', 1, '2017-09-07 00:00:00', '2017-09-07 00:00:00', 'Test', 'Test', 0),
(2, 'ComeBack', 'ComeBack', 1, '2017-09-07 00:00:00', '2017-09-07 00:00:00', 'Test', 'Test', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdcountries`
--

CREATE TABLE `pdcountries` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdcountries`
--

INSERT INTO `pdcountries` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'VN', 'VN', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(2, 'MY', 'MALAYSIA', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(3, 'AD', 'Andorra', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(4, 'AE', 'United Arab Emirates', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(5, 'AF', 'Afghanistan', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(6, 'AG', 'Antigua and Barbuda', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(7, 'AI', 'Anguilla', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(8, 'AL', 'Albania', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(9, 'AM', 'Armenia', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(10, 'AN', 'Netherlands Antilles', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(11, 'AO', 'Angola', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(12, 'AQ', 'Antarctica', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(13, 'AR', 'Argentina', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(14, 'AS', 'American Samoa', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(15, 'AT', 'Austria', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(16, 'AU', 'Australia', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(17, 'AW', 'Aruba', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(18, 'AZ', 'Azerbaijan', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(19, 'BA', 'Bosnia and Herzegovina', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(20, 'BB', 'Barbados', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(21, 'BD', 'Bangladesh', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(22, 'BE', 'Belgium', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(23, 'BF', 'Burkina Faso', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(24, 'BG', 'Bulgaria', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(25, 'BH', 'Bahrain', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(26, 'BI', 'Burundi', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(27, 'BJ', 'Benin', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(28, 'BM', 'Bermuda', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(29, 'BN', 'Brunei Darussalam', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(30, 'BO', 'Bolivia', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(31, 'BR', 'Brazil', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(32, 'BS', 'Bahamas', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(33, 'BT', 'Bhutan', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(34, 'BV', 'Bouvet Island', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(35, 'BW', 'Botswana', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(36, 'BY', 'Belarus', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(37, 'BZ', 'Belize', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(38, 'CA', 'Canada', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(39, 'CC', 'Cocos (Keeling) Islands', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(40, 'CF', 'Central African Republic', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(41, 'CG', 'Congo', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0),
(42, 'CH', 'Switzerland', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdemployeeroles`
--

CREATE TABLE `pdemployeeroles` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdemployeestatuses`
--

CREATE TABLE `pdemployeestatuses` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdemployeestatuses`
--

INSERT INTO `pdemployeestatuses` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'F', 'FULL-TIME', 1, '2017-01-01 07:01:01', '0000-00-00 00:00:00', 'AdminA', '', 0),
(2, 'P', 'PART-TIME', 1, '2017-01-01 07:01:02', '0000-00-00 00:00:00', 'AdminA', '', 0),
(3, 'R', 'RETIRED', 1, '2017-01-01 07:01:03', '0000-00-00 00:00:00', 'AdminA', '', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdhoisttypes`
--

CREATE TABLE `pdhoisttypes` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdidtypes`
--

CREATE TABLE `pdidtypes` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdidtypes`
--

INSERT INTO `pdidtypes` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'code', 'description', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'createdBy', 'updatedBy', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdjobfulfilmentitemstatuses`
--

CREATE TABLE `pdjobfulfilmentitemstatuses` (
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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdjobfulfilmentstatuses`
--

CREATE TABLE `pdjobfulfilmentstatuses` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdjobsources`
--

CREATE TABLE `pdjobsources` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdjobsources`
--

INSERT INTO `pdjobsources` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'SPC', 'IN-HOUSE', 1, '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0),
(3, 'Sublet', 'Sublet', 1, '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdjobstatuses`
--

CREATE TABLE `pdjobstatuses` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdjobstatuses`
--

INSERT INTO `pdjobstatuses` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'NEW', 'NEW', 1, '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdjobtimespentdetailstatuses`
--

CREATE TABLE `pdjobtimespentdetailstatuses` (
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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdjobtypes`
--

CREATE TABLE `pdjobtypes` (
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
-- Đang đổ dữ liệu cho bảng `pdjobtypes`
--

INSERT INTO `pdjobtypes` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'code', 'description', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'createdBy', 'updatedBy', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdjpcbstatuses`
--

CREATE TABLE `pdjpcbstatuses` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdlanguages`
--

CREATE TABLE `pdlanguages` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdlanguages`
--

INSERT INTO `pdlanguages` (`id`, `code`, `description`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`, `status`) VALUES
(1, 'VN', 'Vietnamese', '2017-01-01 07:01:01', '0000-00-00 00:00:00', 'AdminA', '', 0, 1),
(2, 'EN', 'English', '2017-01-01 07:01:02', '0000-00-00 00:00:00', 'AdminA', '', 0, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdoccupations`
--

CREATE TABLE `pdoccupations` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdoccupations`
--

INSERT INTO `pdoccupations` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'M1', 'MANAGEMENT - TECHNICAL', 1, '2017-01-01 07:01:01', '0000-00-00 00:00:00', 'AdminA', '', 0),
(2, 'M2', 'MANAGEMENT - NON TECHNICAL', 1, '2017-01-01 07:01:02', '0000-00-00 00:00:00', 'AdminA', '', 0),
(3, 'E1', 'EXECUTIVE - TECHNICAL', 1, '2017-01-01 07:01:03', '0000-00-00 00:00:00', 'AdminA', '', 0),
(4, 'E2', 'EXECUTIVE - NON TECHNICAL', 1, '2017-01-01 07:01:04', '0000-00-00 00:00:00', 'AdminA', '', 0),
(5, 'P1', 'PROFESSIONAL - TECHNICAL', 1, '2017-01-01 07:01:05', '0000-00-00 00:00:00', 'AdminA', '', 0),
(6, 'P2', 'PROFESSIONAL - NON TECHNICAL', 1, '2017-01-01 07:01:06', '0000-00-00 00:00:00', 'AdminA', '', 0),
(7, 'H', 'HOUSEWIFE', 1, '2017-01-01 07:01:07', '0000-00-00 00:00:00', 'AdminA', '', 0),
(8, 'S1', 'STUDENT', 1, '2017-01-01 07:01:08', '0000-00-00 00:00:00', 'AdminA', '', 0),
(9, 'S2', 'SELF-EMPLOYMENT', 1, '2017-01-01 07:01:09', '0000-00-00 00:00:00', 'AdminA', '', 0),
(10, 'O', 'OTHERS', 1, '2017-01-01 07:01:10', '0000-00-00 00:00:00', 'AdminA', '', 0);

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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdparttypes`
--

CREATE TABLE `pdparttypes` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdparttypes`
--

INSERT INTO `pdparttypes` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'SPC', 'SPC', 1, '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdpaymenttypes`
--

CREATE TABLE `pdpaymenttypes` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdpaymenttypes`
--

INSERT INTO `pdpaymenttypes` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'CASH', 'CASH', 1, '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0),
(2, 'Warranty', 'Warranty', 0, '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0),
(3, 'GOODWILL', 'GOODWILL', 1, '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdraces`
--

CREATE TABLE `pdraces` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdraces`
--

INSERT INTO `pdraces` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'code', 'description', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'createdBy', 'updatedBy', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdregions`
--

CREATE TABLE `pdregions` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdrepairorderbaystatuses`
--

CREATE TABLE `pdrepairorderbaystatuses` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdrepairorderstatuses`
--

CREATE TABLE `pdrepairorderstatuses` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdrepairorderstatuses`
--

INSERT INTO `pdrepairorderstatuses` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'NEW', 'NEW', 1, '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdsalutations`
--

CREATE TABLE `pdsalutations` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdstates`
--

CREATE TABLE `pdstates` (
  `id` int(11) NOT NULL,
  `pdCountryId` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdtimeslotintervals`
--

CREATE TABLE `pdtimeslotintervals` (
  `id` int(11) NOT NULL,
  `value` int(11) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime DEFAULT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdtimeslotintervals`
--

INSERT INTO `pdtimeslotintervals` (`id`, `value`, `name`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 1, '1', 1, '2017-09-14 00:00:00', '2017-09-14 00:00:00', '1', '1', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdtimeslotspecialdaytypes`
--

CREATE TABLE `pdtimeslotspecialdaytypes` (
  `id` int(11) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime DEFAULT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pdworkshoptypes`
--

CREATE TABLE `pdworkshoptypes` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(250) DEFAULT NULL,
  `updatedBy` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `pdworkshoptypes`
--

INSERT INTO `pdworkshoptypes` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'code', 'description', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'createdBy', 'updatedBy', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `repairorderbays`
--

CREATE TABLE `repairorderbays` (
  `id` int(11) NOT NULL,
  `repairOrderId` int(11) NOT NULL,
  `bayId` int(11) NOT NULL,
  `jobId` int(11) NOT NULL,
  `expectedStartDate` datetime NOT NULL,
  `expectedEndDate` datetime NOT NULL,
  `repairOrderBayStatusId` int(11) NOT NULL,
  `registrationNo` varchar(45) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `repairorderjobs`
--

CREATE TABLE `repairorderjobs` (
  `id` int(11) NOT NULL,
  `repairOrderId` int(11) NOT NULL,
  `servicePackageJobId` int(11) DEFAULT NULL,
  `jobId` int(11) NOT NULL,
  `pdComeBackJobId` int(11) NOT NULL,
  `pdPaymentTypeId` int(11) NOT NULL,
  `pdJobSourceId` int(11) NOT NULL,
  `pdJobStatusId` int(11) NOT NULL,
  `flatRate` decimal(18,2) NOT NULL,
  `labourCharge` decimal(18,2) NOT NULL,
  `discountPercent` decimal(18,2) NOT NULL,
  `subTotal` decimal(18,2) NOT NULL,
  `goodWillPercent` decimal(18,2) NOT NULL,
  `goodWillAmt` decimal(18,2) NOT NULL,
  `netAmt` decimal(18,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `repairorderjobs`
--

INSERT INTO `repairorderjobs` (`id`, `repairOrderId`, `servicePackageJobId`, `jobId`, `pdComeBackJobId`, `pdPaymentTypeId`, `pdJobSourceId`, `pdJobStatusId`, `flatRate`, `labourCharge`, `discountPercent`, `subTotal`, `goodWillPercent`, `goodWillAmt`, `netAmt`) VALUES
(7, 4, NULL, 2, 0, 0, 0, 0, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(8, 4, NULL, 1, 0, 0, 0, 0, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(23, 12, NULL, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(24, 12, NULL, 1, 1, 1, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(25, 13, NULL, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(26, 13, NULL, 1, 1, 1, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(27, 14, NULL, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(28, 14, NULL, 1, 1, 1, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(29, 15, NULL, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(30, 15, NULL, 1, 1, 1, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(31, 16, NULL, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(32, 16, NULL, 1, 1, 1, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(33, 17, NULL, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(34, 17, NULL, 1, 1, 1, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(35, 18, NULL, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(36, 18, NULL, 1, 1, 1, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(37, 19, NULL, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(38, 19, NULL, 1, 1, 1, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(39, 20, NULL, 1, 2, 3, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(40, 20, NULL, 2, 1, 2, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(41, 21, NULL, 1, 2, 3, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(42, 21, NULL, 2, 1, 2, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(43, 22, NULL, 1, 2, 3, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(44, 22, NULL, 2, 1, 2, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(45, 23, NULL, 1, 2, 3, 3, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(46, 23, NULL, 2, 1, 1, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(47, 24, NULL, 1, 2, 3, 3, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(48, 24, NULL, 2, 1, 1, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(49, 25, NULL, 1, 2, 3, 3, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(50, 25, NULL, 2, 1, 1, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(51, 26, NULL, 1, 2, 3, 3, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(52, 26, NULL, 2, 1, 1, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(53, 27, NULL, 1, 2, 3, 3, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(54, 27, NULL, 2, 1, 1, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(55, 28, NULL, 1, 2, 3, 3, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(56, 28, NULL, 2, 1, 1, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(57, 29, NULL, 1, 2, 3, 3, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(58, 29, NULL, 2, 1, 1, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(59, 30, NULL, 1, 2, 3, 3, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(60, 30, NULL, 2, 1, 1, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(61, 31, NULL, 1, 2, 3, 3, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(62, 31, NULL, 2, 1, 1, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(63, 32, NULL, 1, 2, 3, 3, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(64, 32, NULL, 2, 1, 1, 1, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(66, 33, 2, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(69, 35, 3, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(70, 35, 2, 1, 2, 3, 3, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(71, 36, 3, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(72, 36, 2, 1, 1, 1, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(73, 37, 3, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(74, 37, 2, 1, 1, 1, 1, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(75, 38, 3, 2, 2, 3, 3, 1, '0.00', '50.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(76, 38, 2, 1, 2, 3, 3, 1, '0.00', '100.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(77, 38, NULL, 3, 1, 1, 1, 1, '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `repairordermasters`
--

CREATE TABLE `repairordermasters` (
  `id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `vehicleCustomerId` int(11) NOT NULL,
  `workShopId` int(11) NOT NULL,
  `appointmentId` int(11) DEFAULT NULL,
  `dateTimeIn` datetime NOT NULL,
  `expectedDeliveryDateTime` datetime DEFAULT NULL,
  `isCustomerWaiting` tinyint(1) DEFAULT NULL,
  `vinNo` varchar(20) DEFAULT NULL,
  `vehicleChassisNo` varchar(50) DEFAULT NULL,
  `mobilePhoneNo` varchar(50) DEFAULT NULL,
  `previousMilleage` bigint(20) DEFAULT NULL,
  `currentMilleage` bigint(20) DEFAULT NULL,
  `customerRequest` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `totalLabourCharge` decimal(18,2) NOT NULL,
  `totalPartAmt` decimal(18,2) NOT NULL,
  `partDiscount` decimal(18,2) NOT NULL,
  `additionalDiscount` decimal(18,2) NOT NULL,
  `totalGoodwillAmt` decimal(18,2) NOT NULL,
  `salesTaxAmt` decimal(18,2) NOT NULL,
  `totalAfterTaxAmt` decimal(18,2) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `statusId` int(11) NOT NULL,
  `serviceAdvisorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `repairordermasters`
--

INSERT INTO `repairordermasters` (`id`, `code`, `vehicleCustomerId`, `workShopId`, `appointmentId`, `dateTimeIn`, `expectedDeliveryDateTime`, `isCustomerWaiting`, `vinNo`, `vehicleChassisNo`, `mobilePhoneNo`, `previousMilleage`, `currentMilleage`, `customerRequest`, `totalLabourCharge`, `totalPartAmt`, `partDiscount`, `additionalDiscount`, `totalGoodwillAmt`, `salesTaxAmt`, `totalAfterTaxAmt`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`, `statusId`, `serviceAdvisorId`) VALUES
(1, 'RO00000001', 2, 1, 1, '2017-09-11 10:10:00', '2017-09-13 22:10:00', 1, '22222222222', '3333333333333333333333', '333333333', 333333333333, 33333333, '44444444444444', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-12 10:53:52', '2017-09-12 10:53:52', NULL, NULL, 0, 1, 0),
(2, 'RO00000002', 2, 1, NULL, '2017-09-03 10:10:00', '2017-09-13 20:00:00', 0, '22222222222', '222222222222222222222', '2222222', 2222222222222222222, 22222222222222, '33333333333333', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-12 11:00:52', '2017-09-12 11:00:52', NULL, NULL, 0, 1, 0),
(3, 'RO00000003', 2, 1, NULL, '2017-09-03 10:10:00', '2017-09-13 20:00:00', 0, '22222222222', '222222222222222222222', '2222222', 2222222222222222222, 22222222222222, '33333333333333', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-12 11:01:18', '2017-09-12 11:01:18', NULL, NULL, 0, 1, 0),
(4, 'RO00000004', 2, 1, NULL, '2017-09-03 10:10:00', '2017-09-13 20:00:00', 0, '22222222222', '222222222222222222222', '2222222', 2222222222222222222, 22222222222222, '33333333333333', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-12 11:02:01', '2017-09-12 11:02:01', NULL, NULL, 0, 1, 0),
(5, 'RO00000005', 2, 1, NULL, '2017-09-12 10:10:00', '2017-09-14 17:04:00', 0, '22222222222', '4444444444444', '444', 4444444444444, 4444444444444444444, '333333333333333', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 02:22:43', '2017-09-13 02:22:43', NULL, NULL, 0, 1, 0),
(6, 'RO00000006', 2, 1, NULL, '2017-09-12 10:10:00', '2017-09-14 17:04:00', 0, '22222222222', '4444444444444', '444', 4444444444444, 4444444444444444444, '333333333333333', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 02:26:27', '2017-09-13 02:26:27', NULL, NULL, 0, 1, 0),
(7, 'RO00000007', 2, 1, NULL, '2017-09-10 01:01:00', '2017-09-16 22:10:00', NULL, '22222222222', '44444444444444', '444444444444', 444444444444444444, 44444444444444, '666666666666666', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 02:37:12', '2017-09-13 02:37:12', NULL, NULL, 0, 1, 0),
(8, 'RO00000008', 2, 1, NULL, '2017-09-10 01:01:00', '2017-09-16 22:10:00', NULL, '22222222222', '44444444444444', '444444444444', 444444444444444444, 44444444444444, '666666666666666', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 02:38:58', '2017-09-13 02:38:58', NULL, NULL, 0, 1, 0),
(9, 'RO00000009', 2, 1, NULL, '2017-09-10 01:01:00', '2017-09-16 22:10:00', NULL, '22222222222', '44444444444444', '444444444444', 444444444444444444, 44444444444444, '666666666666666', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 02:41:38', '2017-09-13 02:41:38', NULL, NULL, 0, 1, 0),
(10, 'RO00000010', 2, 1, NULL, '2017-09-10 01:01:00', '2017-09-16 22:10:00', NULL, '22222222222', '44444444444444', '444444444444', 444444444444444444, 44444444444444, '666666666666666', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 02:42:43', '2017-09-13 02:42:43', NULL, NULL, 0, 1, 0),
(11, 'RO00000011', 2, 1, NULL, '2017-09-10 10:10:00', '2017-09-13 22:10:00', 0, '22222222222', '3333333', '333333333', 3333333333333333333, 33, '44444444444444', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 02:52:32', '2017-09-13 02:52:32', NULL, NULL, 0, 1, 0),
(12, 'RO00000012', 2, 1, NULL, '2017-09-10 10:10:00', '2017-09-13 22:10:00', 0, '22222222222', '3333333', '333333333', 3333333333333333333, 33, '44444444444444', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 02:59:51', '2017-09-13 02:59:51', NULL, NULL, 0, 1, 0),
(13, 'RO00000013', 2, 1, NULL, '2017-09-10 10:10:00', '2017-09-13 22:10:00', 0, '22222222222', '3333333', '333333333', 3333333333333333333, 33, '44444444444444', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 03:03:02', '2017-09-13 03:03:02', NULL, NULL, 0, 1, 0),
(14, 'RO00000014', 2, 1, NULL, '2017-09-10 10:10:00', '2017-09-13 22:10:00', 0, '22222222222', '3333333', '333333333', 3333333333333333333, 33, '44444444444444', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 03:24:26', '2017-09-13 03:24:26', NULL, NULL, 0, 1, 0),
(15, 'RO00000015', 2, 1, NULL, '2017-09-10 10:10:00', '2017-09-13 22:10:00', 0, '22222222222', '3333333', '333333333', 3333333333333333333, 33, '44444444444444', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 03:25:38', '2017-09-13 03:25:38', NULL, NULL, 0, 1, 0),
(16, 'RO00000016', 2, 1, NULL, '2017-09-10 10:10:00', '2017-09-13 22:10:00', 0, '22222222222', '3333333', '333333333', 3333333333333333333, 33, '44444444444444', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 03:33:56', '2017-09-13 03:33:56', NULL, NULL, 0, 1, 0),
(17, 'RO00000017', 2, 1, NULL, '2017-09-10 10:10:00', '2017-09-13 22:10:00', 0, '22222222222', '3333333', '333333333', 3333333333333333333, 33, '44444444444444', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 03:35:54', '2017-09-13 03:35:54', NULL, NULL, 0, 1, 0),
(18, 'RO00000018', 2, 1, NULL, '2017-09-10 10:10:00', '2017-09-13 22:10:00', 0, '22222222222', '3333333', '333333333', 3333333333333333333, 33, '44444444444444', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 03:45:06', '2017-09-13 03:45:06', NULL, NULL, 0, 1, 0),
(19, 'RO00000019', 2, 1, NULL, '2017-09-10 10:10:00', '2017-09-13 22:10:00', 0, '22222222222', '3333333', '333333333', 3333333333333333333, 33, '44444444444444', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 03:46:48', '2017-09-13 03:46:48', NULL, NULL, 0, 1, 0),
(20, 'RO00000020', 2, 1, NULL, '2017-09-10 10:10:00', '2018-10-02 22:09:00', NULL, '22222222222', '111111111111', '1111111', 1111111111111, 11111, '1111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 06:30:36', '2017-09-13 06:30:36', NULL, NULL, 0, 1, 0),
(21, 'RO00000021', 2, 1, NULL, '2017-09-10 10:10:00', '2018-10-02 22:09:00', 0, '22222222222', '111111111111', '1111111', 1111111111111, 11111, '1111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 06:38:22', '2017-09-13 06:38:22', NULL, NULL, 0, 1, 0),
(22, 'RO00000022', 2, 1, NULL, '2017-09-10 10:10:00', '2018-10-02 22:09:00', 0, '22222222222', '111111111111', '1111111', 1111111111111, 11111, '1111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 06:46:34', '2017-09-13 06:46:34', NULL, NULL, 0, 1, 0),
(23, 'RO00000023', 2, 1, NULL, '2017-09-12 10:10:00', '2017-09-21 22:10:00', NULL, '22222222222', '1111111111111', '111111111', 9223372036854775807, 1111111111111, '11111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 07:34:02', '2017-09-13 07:34:02', NULL, NULL, 0, 1, 0),
(24, 'RO00000024', 2, 1, NULL, '2017-09-12 10:10:00', '2017-09-21 22:10:00', NULL, '22222222222', '1111111111111', '111111111', 9223372036854775807, 1111111111111, '11111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 07:37:56', '2017-09-13 07:37:56', NULL, NULL, 0, 1, 0),
(25, 'RO00000024', 2, 1, NULL, '2017-09-12 10:10:00', '2017-09-21 22:10:00', NULL, '22222222222', '1111111111111', '111111111', 9223372036854775807, 1111111111111, '11111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 07:37:59', '2017-09-13 07:37:59', NULL, NULL, 0, 1, 0),
(26, 'RO00000026', 2, 1, NULL, '2017-09-12 10:10:00', '2017-09-21 22:10:00', NULL, '22222222222', '1111111111111', '111111111', 9223372036854775807, 1111111111111, '11111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 07:39:15', '2017-09-13 07:39:15', NULL, NULL, 0, 1, 0),
(27, 'RO00000026', 2, 1, NULL, '2017-09-12 10:10:00', '2017-09-21 22:10:00', NULL, '22222222222', '1111111111111', '111111111', 9223372036854775807, 1111111111111, '11111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 07:39:17', '2017-09-13 07:39:17', NULL, NULL, 0, 1, 0),
(28, 'RO00000028', 2, 1, NULL, '2017-09-12 10:10:00', '2017-09-21 22:10:00', NULL, '22222222222', '1111111111111', '111111111', 9223372036854775807, 1111111111111, '11111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 07:40:23', '2017-09-13 07:40:23', NULL, NULL, 0, 1, 0),
(29, 'RO00000028', 2, 1, NULL, '2017-09-12 10:10:00', '2017-09-21 22:10:00', NULL, '22222222222', '1111111111111', '111111111', 9223372036854775807, 1111111111111, '11111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 07:40:25', '2017-09-13 07:40:25', NULL, NULL, 0, 1, 0),
(30, 'RO00000028', 2, 1, NULL, '2017-09-12 10:10:00', '2017-09-21 22:10:00', NULL, '22222222222', '1111111111111', '111111111', 9223372036854775807, 1111111111111, '11111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 07:40:27', '2017-09-13 07:40:27', NULL, NULL, 0, 1, 0),
(31, 'RO00000031', 2, 1, NULL, '2017-09-12 10:10:00', '2017-09-21 22:10:00', NULL, '22222222222', '1111111111111', '111111111', 9223372036854775807, 1111111111111, '11111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 07:44:17', '2017-09-13 07:44:17', NULL, NULL, 0, 1, 0),
(32, 'RO00000032', 2, 1, NULL, '2017-09-12 10:10:00', '2017-09-21 22:10:00', NULL, '22222222222', '1111111111111', '111111111', 9223372036854775807, 1111111111111, '11111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 07:46:14', '2017-09-13 07:46:14', NULL, NULL, 0, 1, 0),
(33, 'RO00000033', 2, 1, NULL, '2017-09-10 22:05:00', '2018-10-01 10:09:00', 0, '22222222222', '11111111111111', '111111111', 9223372036854775807, 1111111111, '1111111111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 08:20:44', '2017-09-13 08:20:44', NULL, NULL, 0, 1, 0),
(34, 'RO00000034', 2, 1, NULL, '2017-09-11 10:05:00', '2018-10-01 22:10:00', 0, '22222222222', '111111111111', '222222', 111111111111, 11111111111111111, '2222222222222222222', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 08:24:39', '2017-09-13 08:24:39', NULL, NULL, 0, 1, 0),
(35, 'RO00000035', 2, 1, NULL, '2017-09-03 10:06:00', '2018-02-01 17:05:00', 0, '22222222222', '1111111111111111', '111111111111', 111111111111, 9223372036854775807, '1111111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-13 09:07:41', '2017-09-13 09:07:41', NULL, NULL, 0, 1, 0),
(36, 'RO00000036', 2, 1, NULL, '2017-09-10 10:02:00', '2017-02-02 22:02:00', 0, '22222222222', '22222222222222222222', '2222222222222', 2222222222222222, 22222222222, '2222222222222222', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-14 02:19:13', '2017-09-14 02:19:13', NULL, NULL, 0, 1, 0),
(37, 'RO00000037', 2, 1, NULL, '2017-09-10 10:02:00', '2017-02-02 22:02:00', 0, '22222222222', '22222222222222222222', '2222222222222', 2222222222222222, 22222222222, '2222222222222222', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-14 03:27:31', '2017-09-14 03:27:31', NULL, NULL, 0, 1, 0),
(38, 'RO00000038', 2, 1, NULL, '2017-09-10 22:10:00', '2017-09-22 14:02:00', 0, '22222222222', '22222222222222222222', '22222222222222', 222222222222, 222222222222222, '111111111111111111111', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-15 03:56:52', '2017-09-15 03:56:52', NULL, NULL, 0, 1, 0),
(39, 'RO00000039', 2, 1, NULL, '2017-09-15 08:15:09', '2017-09-15 08:15:09', NULL, '22222222222', NULL, NULL, NULL, NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '2017-09-15 08:15:33', '2017-09-15 08:15:33', NULL, NULL, 0, 1, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `repairorderpartdetails`
--

CREATE TABLE `repairorderpartdetails` (
  `id` int(11) NOT NULL,
  `RepairOrderPartId` int(11) NOT NULL,
  `partId` int(11) NOT NULL,
  `pdPartTypeId` int(11) NOT NULL,
  `UOM` decimal(18,2) NOT NULL,
  `unitPrice` decimal(18,2) NOT NULL,
  `fullfillQty` int(11) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `repairorderparts`
--

CREATE TABLE `repairorderparts` (
  `id` int(11) NOT NULL,
  `repairOrderId` int(11) NOT NULL,
  `repairOrderJobId` int(11) DEFAULT NULL,
  `partId` int(11) NOT NULL,
  `servicePackagePartId` int(11) DEFAULT NULL,
  `pdPartTypeId` int(11) NOT NULL,
  `pdPaymentTypeId` int(11) NOT NULL,
  `UOM` decimal(18,2) NOT NULL,
  `requestQty` decimal(18,2) NOT NULL,
  `unitPrice` decimal(18,2) NOT NULL,
  `discountPercent` decimal(18,2) NOT NULL,
  `discountAmt` decimal(18,2) NOT NULL,
  `totalAfterTaxAmt` decimal(18,2) NOT NULL,
  `availableQty` int(11) NOT NULL,
  `fullfillQty` int(11) NOT NULL,
  `backOrderId` int(11) DEFAULT NULL,
  `subTotal` int(11) NOT NULL,
  `goodWillPercent` decimal(18,2) NOT NULL,
  `goodWillAmt` decimal(18,2) NOT NULL,
  `netAmt` decimal(18,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `repairorderparts`
--

INSERT INTO `repairorderparts` (`id`, `repairOrderId`, `repairOrderJobId`, `partId`, `servicePackagePartId`, `pdPartTypeId`, `pdPaymentTypeId`, `UOM`, `requestQty`, `unitPrice`, `discountPercent`, `discountAmt`, `totalAfterTaxAmt`, `availableQty`, `fullfillQty`, `backOrderId`, `subTotal`, `goodWillPercent`, `goodWillAmt`, `netAmt`) VALUES
(1, 35, 69, 2, 4, 1, 3, '0.00', '100.00', '5.00', '0.00', '0.00', '0.00', 0, 0, NULL, 0, '0.00', '0.00', '0.00'),
(2, 35, 70, 1, 3, 1, 3, '0.00', '10.00', '10.00', '0.00', '0.00', '0.00', 0, 0, NULL, 0, '0.00', '0.00', '0.00'),
(3, 36, 71, 2, 4, 1, 2, '0.00', '100.00', '5.00', '0.00', '0.00', '0.00', 0, 0, NULL, 0, '0.00', '0.00', '0.00'),
(4, 36, 72, 1, 3, 1, 2, '0.00', '10.00', '10.00', '0.00', '0.00', '0.00', 0, 0, NULL, 0, '0.00', '0.00', '0.00'),
(5, 37, 73, 2, 4, 1, 2, '0.00', '100.00', '5.00', '0.00', '0.00', '0.00', 0, 0, NULL, 0, '0.00', '0.00', '0.00'),
(6, 37, 74, 1, 3, 1, 2, '0.00', '10.00', '10.00', '0.00', '0.00', '0.00', 0, 0, NULL, 0, '0.00', '0.00', '0.00'),
(7, 38, 75, 2, 4, 1, 3, '0.00', '100.00', '5.00', '0.00', '0.00', '0.00', 0, 0, NULL, 0, '0.00', '0.00', '0.00'),
(8, 38, 76, 1, 3, 1, 2, '0.00', '10.00', '10.00', '0.00', '0.00', '0.00', 0, 0, NULL, 0, '0.00', '0.00', '0.00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `serviceadvisors`
--

CREATE TABLE `serviceadvisors` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `servicepackagejobs`
--

CREATE TABLE `servicepackagejobs` (
  `id` int(11) NOT NULL,
  `servicePackageVariantId` int(11) NOT NULL,
  `jobId` int(11) DEFAULT NULL,
  `labourCharge` decimal(18,2) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `servicepackagejobs`
--

INSERT INTO `servicepackagejobs` (`id`, `servicePackageVariantId`, `jobId`, `labourCharge`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(2, 1, 1, '100.00', '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0),
(3, 1, 2, '50.00', '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `servicepackagemasters`
--

CREATE TABLE `servicepackagemasters` (
  `id` int(11) NOT NULL,
  `pdPackageTypeId` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `effectiveDateFrom` datetime NOT NULL,
  `effectiveDateTo` datetime NOT NULL,
  `milleage` int(11) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `servicepackagemasters`
--

INSERT INTO `servicepackagemasters` (`id`, `pdPackageTypeId`, `code`, `name`, `description`, `effectiveDateFrom`, `effectiveDateTo`, `milleage`, `version`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 1, 'SP001', 'SP001', 'SP001', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 1, '0000-00-00 00:00:00', NULL, 'Test', 'Test', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `servicepackageparts`
--

CREATE TABLE `servicepackageparts` (
  `id` int(11) NOT NULL,
  `servicePackageJobId` int(11) NOT NULL,
  `partId` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `unitPrice` decimal(18,2) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `servicepackageparts`
--

INSERT INTO `servicepackageparts` (`id`, `servicePackageJobId`, `partId`, `quantity`, `unitPrice`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(3, 2, 1, 10, '10.00', '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0),
(4, 3, 2, 100, '5.00', '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `servicepackagevariants`
--

CREATE TABLE `servicepackagevariants` (
  `id` int(11) NOT NULL,
  `servicePackageId` int(11) NOT NULL,
  `vehicleVariantId` int(11) NOT NULL,
  `totalAmount` decimal(18,2) NOT NULL,
  `Gst` decimal(18,2) NOT NULL,
  `totalPackagePrice` decimal(18,2) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `servicepackagevariants`
--

INSERT INTO `servicepackagevariants` (`id`, `servicePackageId`, `vehicleVariantId`, `totalAmount`, `Gst`, `totalPackagePrice`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 1, 168, '100.00', '100.00', '100.00', '0000-00-00 00:00:00', NULL, 'TEST', 'TEST', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `timeslotdetails`
--

CREATE TABLE `timeslotdetails` (
  `id` int(11) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `numberOfSlots` int(11) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `timeSlotId` int(11) DEFAULT NULL,
  `version` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `timeslotdetails`
--

INSERT INTO `timeslotdetails` (`id`, `startTime`, `endTime`, `numberOfSlots`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`, `timeSlotId`, `version`) VALUES
(1, '07:00:00', '23:00:00', 1, '2017-09-14 00:00:00', '2017-09-14 00:00:00', '1', '1', 0, 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `timeslotmasters`
--

CREATE TABLE `timeslotmasters` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `breakStartTime` time NOT NULL,
  `breakEndTime` time NOT NULL,
  `baysPerSlot` int(11) NOT NULL,
  `pdTimeSlotIntervalId` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `timeslotmasters`
--

INSERT INTO `timeslotmasters` (`id`, `name`, `description`, `startTime`, `endTime`, `breakStartTime`, `breakEndTime`, `baysPerSlot`, `pdTimeSlotIntervalId`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, '1', '1', '08:00:00', '22:00:00', '09:00:00', '10:00:00', 1, 1, 1, '2017-09-14 00:00:00', '2017-09-14 00:00:00', '1', '1', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `timeslotspecialdays`
--

CREATE TABLE `timeslotspecialdays` (
  `id` int(11) NOT NULL,
  `specialDay` datetime DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `pdTimeSlotSpecialDayTypeId` int(11) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `passwords` varchar(255) DEFAULT NULL,
  `passwordSalt` varchar(255) DEFAULT NULL,
  `isLockedOut` int(11) DEFAULT NULL,
  `isDisabled` int(11) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `createdDateTime` datetime DEFAULT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `lastLoginDate` datetime DEFAULT NULL,
  `lastPasswordChangeDate` datetime DEFAULT NULL,
  `failedPasswordDate` datetime DEFAULT NULL,
  `failedPasswordCount` int(11) DEFAULT NULL,
  `lastLogOutDate` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `minLength` int(11) DEFAULT NULL,
  `complexity` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vehiclecustomers`
--

CREATE TABLE `vehiclecustomers` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `registrationNo` varchar(32) DEFAULT NULL,
  `isOwner` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `vehiclecustomers`
--

INSERT INTO `vehiclecustomers` (`id`, `customerId`, `vehicleId`, `registrationNo`, `isOwner`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`) VALUES
(2, 5, 202, '9999', 1, '2017-09-12 10:36:50', '2017-09-12 10:36:50', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vehiclemakes`
--

CREATE TABLE `vehiclemakes` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `vehiclemakes`
--

INSERT INTO `vehiclemakes` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 'code', 'description', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'createdBy', 'updatedBy', 0),
(2, 'INF', 'INFINITI', 1, '2017-01-01 07:00:01', '0000-00-00 00:00:00', 'Admin', '', 0),
(3, 'TYT', 'TOYOTA', 1, '2017-01-01 07:00:02', '0000-00-00 00:00:00', 'Admin', '', 0),
(4, 'LEX', 'LEXUS', 1, '2017-01-01 07:00:03', '0000-00-00 00:00:00', 'Admin', '', 0),
(5, 'HON', 'HONDA', 1, '2017-01-01 07:00:04', '0000-00-00 00:00:00', 'Admin', '', 0),
(6, 'MD', 'MAZDA', 1, '2017-01-01 07:00:05', '0000-00-00 00:00:00', 'Admin', '', 0),
(7, 'HD', 'HYUNDAI', 1, '2017-01-01 07:00:06', '0000-00-00 00:00:00', 'Admin', '', 0),
(8, 'KIA', 'KIA', 1, '2017-01-01 07:00:07', '0000-00-00 00:00:00', 'Admin', '', 0),
(9, 'ISZ', 'ISUZU', 1, '2017-01-01 07:00:08', '0000-00-00 00:00:00', 'Admin', '', 0),
(10, 'PG', 'PEUGEOT', 1, '2017-01-01 07:00:09', '0000-00-00 00:00:00', 'Admin', '', 0),
(11, 'SBR', 'SUBARU', 1, '2017-01-01 07:00:10', '0000-00-00 00:00:00', 'Admin', '', 0),
(12, 'MCD', 'MERCEDES - BENZ', 1, '2017-01-01 07:00:11', '0000-00-00 00:00:00', 'Admin', '', 0),
(13, 'BMW', 'BMW', 1, '2017-01-01 07:00:12', '0000-00-00 00:00:00', 'Admin', '', 0),
(14, 'AU', 'AUDI', 1, '2017-01-01 07:00:13', '0000-00-00 00:00:00', 'Admin', '', 0),
(15, 'GM', 'CHEVROLET', 1, '2017-01-01 07:00:14', '0000-00-00 00:00:00', 'Admin', '', 0),
(16, 'FO', 'FORD', 1, '2017-01-01 07:00:15', '0000-00-00 00:00:00', 'Admin', '', 0),
(17, 'LR', 'LAND ROVER', 1, '2017-01-01 07:00:16', '0000-00-00 00:00:00', 'Admin', '', 0),
(18, 'POR', 'PORSCHE', 1, '2017-01-01 07:00:17', '0000-00-00 00:00:00', 'Admin', '', 0),
(19, 'RN', 'RENAULT', 1, '2017-01-01 07:00:18', '0000-00-00 00:00:00', 'Admin', '', 0),
(20, 'SZK', 'SUZUKI', 1, '2017-01-01 07:00:19', '0000-00-00 00:00:00', 'Admin', '', 0),
(21, 'MIT', 'MITSUBISHI MOTOR', 1, '2017-01-01 07:00:20', '0000-00-00 00:00:00', 'Admin', '', 0),
(22, 'VOL', 'VOLKSWAGEN', 1, '2017-01-01 07:00:21', '0000-00-00 00:00:00', 'Admin', '', 0),
(23, 'AR', 'ALFA ROMEO', 1, '2017-01-01 07:00:22', '0000-00-00 00:00:00', 'Admin', '', 0),
(24, 'CD', 'CADILLAC', 1, '2017-01-01 07:00:23', '0000-00-00 00:00:00', 'Admin', '', 0),
(25, 'MC', 'MCLAREN', 1, '2017-01-01 07:00:24', '0000-00-00 00:00:00', 'Admin', '', 0),
(26, 'UAZ', 'UAZ', 1, '2017-01-01 07:00:25', '0000-00-00 00:00:00', 'Admin', '', 0),
(27, 'MINI', 'MINI COOPER', 1, '2017-01-01 07:00:26', '0000-00-00 00:00:00', 'Admin', '', 0),
(28, 'BL', 'BENTLEY', 1, '2017-01-01 07:00:27', '0000-00-00 00:00:00', 'Admin', '', 0),
(29, 'MR', 'MASERATI', 1, '2017-01-01 07:00:28', '0000-00-00 00:00:00', 'Admin', '', 0),
(30, 'JG', 'JAGUAR', 1, '2017-01-01 07:00:29', '0000-00-00 00:00:00', 'Admin', '', 0),
(31, 'SM', 'SMART', 1, '2017-01-01 07:00:30', '0000-00-00 00:00:00', 'Admin', '', 0),
(32, 'JEEP', 'JEEP', 1, '2017-01-01 07:00:31', '0000-00-00 00:00:00', 'Admin', '', 0),
(33, 'RR', 'ROLLS ROYCE', 1, '2017-01-01 07:00:32', '0000-00-00 00:00:00', 'Admin', '', 0),
(34, 'AM', 'ASTON MARTIN', 1, '2017-01-01 07:00:33', '0000-00-00 00:00:00', 'Admin', '', 0),
(35, 'BG', 'BUGATTI', 1, '2017-01-01 07:00:34', '0000-00-00 00:00:00', 'Admin', '', 0),
(36, 'FRR', 'FERRARI', 1, '2017-01-01 07:00:35', '0000-00-00 00:00:00', 'Admin', '', 0),
(37, 'LB', 'LAMBORGHINI', 1, '2017-01-01 07:00:36', '0000-00-00 00:00:00', 'Admin', '', 0),
(38, 'VV', 'VOLVO', 1, '2017-01-01 07:00:37', '0000-00-00 00:00:00', 'Admin', '', 0),
(39, 'SSY', 'SSANGYONG', 1, '2017-01-01 07:00:38', '0000-00-00 00:00:00', 'Admin', '', 0),
(40, 'SS', 'SAMSUNG', 1, '2017-01-01 07:00:39', '0000-00-00 00:00:00', 'Admin', '', 0),
(41, 'LG', 'LUXGEN', 1, '2017-01-01 07:00:40', '0000-00-00 00:00:00', 'Admin', '', 0),
(42, 'AUDI', 'AUDI', 1, '2017-01-01 07:00:41', '0000-00-00 00:00:00', 'Admin', '', 0),
(43, 'CHEVROLET', 'CHEVROLET', 1, '2017-01-01 07:00:42', '0000-00-00 00:00:00', 'Admin', '', 0),
(44, 'FORD', 'FORD', 1, '2017-01-01 07:00:43', '0000-00-00 00:00:00', 'Admin', '', 0),
(45, 'HONDA', 'HONDA', 1, '2017-01-01 07:00:44', '0000-00-00 00:00:00', 'Admin', '', 0),
(46, 'HUYNDAI', 'HYUNDAI', 1, '2017-01-01 07:00:45', '0000-00-00 00:00:00', 'Admin', '', 0),
(47, 'INFINITI', 'INFINITI', 1, '2017-01-01 07:00:46', '0000-00-00 00:00:00', 'Admin', '', 0),
(48, 'MAZDA', 'MAZDA', 1, '2017-01-01 07:00:47', '0000-00-00 00:00:00', 'Admin', '', 0),
(49, 'MERCEDES-BENZ', 'MERCEDES-BENZ', 1, '2017-01-01 07:00:48', '0000-00-00 00:00:00', 'Admin', '', 0),
(50, 'MITSUBISHI', 'MITSUBISHI', 1, '2017-01-01 07:00:49', '0000-00-00 00:00:00', 'Admin', '', 0),
(51, 'PORSCHE', 'PORSCHE', 1, '2017-01-01 07:00:50', '0000-00-00 00:00:00', 'Admin', '', 0),
(52, 'RENAULT', 'RENAULT', 1, '2017-01-01 07:00:51', '0000-00-00 00:00:00', 'Admin', '', 0),
(53, 'SUBARU', 'SUBARU', 1, '2017-01-01 07:00:52', '0000-00-00 00:00:00', 'Admin', '', 0),
(54, 'SUZUKI', 'SUZUKI', 1, '2017-01-01 07:00:53', '0000-00-00 00:00:00', 'Admin', '', 0),
(55, 'TOY', 'TOYOTA', 1, '2017-01-01 07:00:54', '0000-00-00 00:00:00', 'Admin', '', 0),
(56, 'WOLKSWAGEN', 'WOLKSWAGEN', 1, '2017-01-01 07:00:55', '0000-00-00 00:00:00', 'Admin', '', 0),
(57, 'DEAWOO', 'DEAWOO', 1, '2017-01-01 07:00:56', '0000-00-00 00:00:00', 'Admin', '', 0),
(58, 'AUDI', 'AUDI', 1, '2017-01-01 07:00:57', '0000-00-00 00:00:00', 'Admin', '', 0),
(59, 'CHEVROLET', 'CHEVROLET', 1, '2017-01-01 07:00:58', '0000-00-00 00:00:00', 'Admin', '', 0),
(60, 'FORD', 'FORD', 1, '2017-01-01 07:00:59', '0000-00-00 00:00:00', 'Admin', '', 0),
(61, 'HONDA', 'HONDA', 1, '2017-01-01 07:01:00', '0000-00-00 00:00:00', 'Admin', '', 0),
(62, 'HUYNDAI', 'HYUNDAI', 1, '2017-01-01 07:01:01', '0000-00-00 00:00:00', 'Admin', '', 0),
(63, 'MAZDA', 'MAZDA', 1, '2017-01-01 07:01:02', '0000-00-00 00:00:00', 'Admin', '', 0),
(64, 'MERCEDES-BENZ', 'MERCEDES-BENZ', 1, '2017-01-01 07:01:03', '0000-00-00 00:00:00', 'Admin', '', 0),
(65, 'MITSUBISHI', 'MITSUBISHI', 1, '2017-01-01 07:01:04', '0000-00-00 00:00:00', 'Admin', '', 0),
(66, 'PORSCHE', 'PORSCHE', 1, '2017-01-01 07:01:05', '0000-00-00 00:00:00', 'Admin', '', 0),
(67, 'RENAULT', 'RENAULT', 1, '2017-01-01 07:01:06', '0000-00-00 00:00:00', 'Admin', '', 0),
(68, 'SUBARU', 'SUBARU', 1, '2017-01-01 07:01:07', '0000-00-00 00:00:00', 'Admin', '', 0),
(69, 'SUZUKI', 'SUZUKI', 1, '2017-01-01 07:01:08', '0000-00-00 00:00:00', 'Admin', '', 0),
(70, 'TOY', 'TOYOTA', 1, '2017-01-01 07:01:09', '0000-00-00 00:00:00', 'Admin', '', 0),
(71, 'WOLKSWAGEN', 'WOLKSWAGEN', 1, '2017-01-01 07:01:10', '0000-00-00 00:00:00', 'Admin', '', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vehiclemodels`
--

CREATE TABLE `vehiclemodels` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `vehicleMakeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `vehiclemodels`
--

INSERT INTO `vehiclemodels` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`, `vehicleMakeId`) VALUES
(1, 'N17', 'SUNNY', 1, '2017-01-01 07:35:01', '0000-00-00 00:00:00', 'Admin', '', 0, 1),
(2, 'D40', 'NAVARA', 1, '2017-01-01 07:35:02', '0000-00-00 00:00:00', 'Admin', '', 0, 2),
(3, 'D23', 'NP300 NAVARA', 1, '2017-01-01 07:35:03', '0000-00-00 00:00:00', 'Admin', '', 0, 3),
(4, 'J32', 'TEANA', 1, '2017-01-01 07:35:04', '0000-00-00 00:00:00', 'Admin', '', 0, 4),
(5, 'L33', 'NEW TEANA', 1, '2017-01-01 07:35:05', '0000-00-00 00:00:00', 'Admin', '', 0, 5),
(6, 'F15', 'JUKE', 1, '2017-01-01 07:35:06', '0000-00-00 00:00:00', 'Admin', '', 0, 6),
(7, 'L10', 'GRAND LIVINA', 1, '2017-01-01 07:35:07', '0000-00-00 00:00:00', 'Admin', '', 0, 7),
(8, 'T31', 'X-TRAIL T31', 1, '2017-01-01 07:35:08', '0000-00-00 00:00:00', 'Admin', '', 0, 8),
(9, 'T30', 'X-TRAIL T30', 1, '2017-01-01 07:35:09', '0000-00-00 00:00:00', 'Admin', '', 0, 9),
(10, 'T32', 'X-TRAIL T32', 1, '2017-01-01 07:35:10', '0000-00-00 00:00:00', 'Admin', '', 0, 10),
(11, 'Z51', 'MURANO', 1, '2017-01-01 07:35:11', '0000-00-00 00:00:00', 'Admin', '', 0, 11),
(12, 'Z34', '370Z', 1, '2017-01-01 07:35:12', '0000-00-00 00:00:00', 'Admin', '', 0, 12),
(13, 'E26', 'NV350 URVAN', 1, '2017-01-01 07:35:13', '0000-00-00 00:00:00', 'Admin', '', 0, 13),
(14, 'C11', 'TIIDA', 1, '2017-01-01 07:35:14', '0000-00-00 00:00:00', 'Admin', '', 0, 14),
(15, 'J11', 'QASHQAI', 1, '2017-01-01 07:35:15', '0000-00-00 00:00:00', 'Admin', '', 0, 15),
(16, 'U13', 'BLUEBIRD U13', 1, '2017-01-01 07:35:16', '0000-00-00 00:00:00', 'Admin', '', 0, 16),
(17, 'Y61', 'PATROL', 1, '2017-01-01 07:35:17', '0000-00-00 00:00:00', 'Admin', '', 0, 17),
(18, 'A34', 'MAXIMA', 1, '2017-01-01 07:35:18', '0000-00-00 00:00:00', 'Admin', '', 0, 18),
(19, 'R51', 'PATHFINDER R51', 1, '2017-01-01 07:35:19', '0000-00-00 00:00:00', 'Admin', '', 0, 19),
(20, 'R52', 'PATHFINDER R52', 1, '2017-01-01 07:35:20', '0000-00-00 00:00:00', 'Admin', '', 0, 20),
(21, 'A31', 'CEFIRO A31', 1, '2017-01-01 07:35:21', '0000-00-00 00:00:00', 'Admin', '', 0, 21),
(22, 'A32', 'CEFIRO A32', 1, '2017-01-01 07:35:22', '0000-00-00 00:00:00', 'Admin', '', 0, 22),
(23, 'A33', 'CEFIRO A33', 1, '2017-01-01 07:35:23', '0000-00-00 00:00:00', 'Admin', '', 0, 23),
(24, 'K13', 'MICRA', 1, '2017-01-01 07:35:24', '0000-00-00 00:00:00', 'Admin', '', 0, 24),
(25, 'D10', 'TERRANO', 1, '2017-01-01 07:35:25', '0000-00-00 00:00:00', 'Admin', '', 0, 25),
(26, 'N16', 'SENTRA', 1, '2017-01-01 07:35:26', '0000-00-00 00:00:00', 'Admin', '', 0, 26),
(27, 'J31', 'TEANA/ ALTIMA/ MAXIMA', 1, '2017-01-01 07:35:27', '0000-00-00 00:00:00', 'Admin', '', 0, 27),
(28, 'Z33', '350Z', 1, '2017-01-01 07:35:28', '0000-00-00 00:00:00', 'Admin', '', 0, 28),
(29, 'E12', 'VERSA', 1, '2017-01-01 07:35:29', '0000-00-00 00:00:00', 'Admin', '', 0, 29),
(30, 'Y62', 'PATROL (SAFARI)', 1, '2017-01-01 07:35:30', '0000-00-00 00:00:00', 'Admin', '', 0, 30),
(31, 'P11', 'PRIMERA', 1, '2017-01-01 07:35:31', '0000-00-00 00:00:00', 'Admin', '', 0, 31),
(32, 'D21', 'PICKUP', 1, '2017-01-01 07:35:32', '0000-00-00 00:00:00', 'Admin', '', 0, 32),
(33, 'A60', 'TITAN', 1, '2017-01-01 07:35:33', '0000-00-00 00:00:00', 'Admin', '', 0, 33),
(34, 'U12', 'STANZA', 1, '2017-01-01 07:35:34', '0000-00-00 00:00:00', 'Admin', '', 0, 34),
(35, 'C23', 'SERENA C23', 1, '2017-01-01 07:35:35', '0000-00-00 00:00:00', 'Admin', '', 0, 35),
(36, 'C24', 'SERENA C24', 1, '2017-01-01 07:35:36', '0000-00-00 00:00:00', 'Admin', '', 0, 36),
(37, 'N14', 'PULSAR N14', 1, '2017-01-01 07:35:37', '0000-00-00 00:00:00', 'Admin', '', 0, 37),
(38, 'N15', 'PULSAR N15', 1, '2017-01-01 07:35:38', '0000-00-00 00:00:00', 'Admin', '', 0, 38),
(39, 'Y31', 'CEDRIC (GLORIA) Y31', 1, '2017-01-01 07:35:39', '0000-00-00 00:00:00', 'Admin', '', 0, 39),
(40, 'Y30', 'CEDRIC (GLORIA) Y30', 1, '2017-01-01 07:35:40', '0000-00-00 00:00:00', 'Admin', '', 0, 40),
(41, 'Y32', 'CEDRIC (GLORIA) Y32', 1, '2017-01-01 07:35:41', '0000-00-00 00:00:00', 'Admin', '', 0, 41),
(42, 'Y33', 'CEDRIC (GLORIA) Y33', 1, '2017-01-01 07:35:42', '0000-00-00 00:00:00', 'Admin', '', 0, 42),
(43, 'Y34', 'CEDRIC (GLORIA) Y34', 1, '2017-01-01 07:35:43', '0000-00-00 00:00:00', 'Admin', '', 0, 43),
(44, 'E50', 'ELGRAND PARAMEDIC', 1, '2017-01-01 07:35:44', '0000-00-00 00:00:00', 'Admin', '', 0, 44),
(45, 'D22', 'NAVARA (FRONTIER)', 1, '2017-01-01 07:35:45', '0000-00-00 00:00:00', 'Admin', '', 0, 45),
(46, 'U14', 'BLUEBIRD U14', 1, '2017-01-01 07:35:46', '0000-00-00 00:00:00', 'Admin', '', 0, 46),
(47, 'U30', 'PRESAGE U30', 1, '2017-01-01 07:35:47', '0000-00-00 00:00:00', 'Admin', '', 0, 47),
(48, 'U31', 'PRESAGE U31', 1, '2017-01-01 07:35:48', '0000-00-00 00:00:00', 'Admin', '', 0, 48),
(49, 'C12', 'PULSAR (TIIDA) C12', 1, '2017-01-01 07:35:49', '0000-00-00 00:00:00', 'Admin', '', 0, 49),
(50, 'C13', 'PULSAR C13', 1, '2017-01-01 07:35:50', '0000-00-00 00:00:00', 'Admin', '', 0, 50),
(51, 'V42', 'QUEST V42', 1, '2017-01-01 07:35:51', '0000-00-00 00:00:00', 'Admin', '', 0, 51),
(52, 'RE52', 'QUEST RE52', 1, '2017-01-01 07:35:52', '0000-00-00 00:00:00', 'Admin', '', 0, 52),
(53, 'B17', 'SYLPHY (SENTRA) B17', 1, '2017-01-01 07:35:53', '0000-00-00 00:00:00', 'Admin', '', 0, 53),
(54, 'PIX', 'PIXO', 1, '2017-01-01 07:35:54', '0000-00-00 00:00:00', 'Admin', '', 0, 54),
(55, 'L02B', 'SUNNY', 1, '2017-01-01 07:35:55', '0000-00-00 00:00:00', 'Admin', '', 0, 55),
(56, 'L42L', 'NEW TEANA', 1, '2017-01-01 07:35:56', '0000-00-00 00:00:00', 'Admin', '', 0, 56),
(57, 'L50', 'INFINITI QX60', 1, '2017-01-01 07:35:57', '0000-00-00 00:00:00', 'Admin', '', 0, 57),
(58, 'NAVARA', 'NP300 NAVARA', 1, '2017-01-01 07:35:58', '0000-00-00 00:00:00', 'Admin', '', 0, 58),
(59, 'P32R', 'X-TRAIL', 1, '2017-01-01 07:35:59', '0000-00-00 00:00:00', 'Admin', '', 0, 59),
(60, 'S51', 'INFINITI QX70', 1, '2017-01-01 07:36:00', '0000-00-00 00:00:00', 'Admin', '', 0, 60),
(61, 'Z62', 'INFINITI QX80', 1, '2017-01-01 07:36:01', '0000-00-00 00:00:00', 'Admin', '', 0, 61),
(62, 'J10', 'QASHQAI J10', 1, '2017-01-01 07:36:02', '0000-00-00 00:00:00', 'Admin', '', 0, 62),
(63, 'B16', 'SYLPHY (SENTRA) B16', 1, '2017-01-01 07:36:03', '0000-00-00 00:00:00', 'Admin', '', 0, 63),
(64, 'C26', 'SERENA C26', 1, '2017-01-01 07:36:04', '0000-00-00 00:00:00', 'Admin', '', 0, 64),
(65, 'E52', 'QUEST', 1, '2017-01-01 07:36:05', '0000-00-00 00:00:00', 'Admin', '', 0, 65),
(66, 'Z52', 'MURANO', 1, '2017-01-01 07:36:06', '0000-00-00 00:00:00', 'Admin', '', 0, 66),
(67, 'K11', 'MICRA K11', 1, '2017-01-01 07:36:07', '0000-00-00 00:00:00', 'Admin', '', 0, 67),
(68, 'K12', 'MICRA K12', 1, '2017-01-01 07:36:08', '0000-00-00 00:00:00', 'Admin', '', 0, 68),
(69, 'Y60', 'PATROL Y60', 1, '2017-01-01 07:36:09', '0000-00-00 00:00:00', 'Admin', '', 0, 69),
(70, 'E25', 'URVAN E25', 1, '2017-01-01 07:36:10', '0000-00-00 00:00:00', 'Admin', '', 0, 70),
(71, 'G11', 'BLUEBIRD SYLPHY', 1, '2017-01-01 07:36:11', '0000-00-00 00:00:00', 'Admin', '', 0, 71),
(72, 'B14', 'SENTRA B14', 1, '2017-01-01 07:36:12', '0000-00-00 00:00:00', 'Admin', '', 0, 1),
(73, 'R20', 'TERRANO2', 1, '2017-01-01 07:36:13', '0000-00-00 00:00:00', 'Admin', '', 0, 2),
(74, 'S35', 'ROGUE', 1, '2017-01-01 07:36:14', '0000-00-00 00:00:00', 'Admin', '', 0, 3),
(75, 'ZE0', 'LEAF', 1, '2017-01-01 07:36:15', '0000-00-00 00:00:00', 'Admin', '', 0, 4),
(76, 'Z50', 'MURANO', 1, '2017-01-01 07:36:16', '0000-00-00 00:00:00', 'Admin', '', 0, 5),
(77, 'CA32', 'MAXIMA CA32', 1, '2017-01-01 07:36:17', '0000-00-00 00:00:00', 'Admin', '', 0, 6),
(78, 'CA33', 'MAXIMA CA33', 1, '2017-01-01 07:36:18', '0000-00-00 00:00:00', 'Admin', '', 0, 7),
(79, 'VIOS', 'VIOS', 1, '2017-01-01 07:36:19', '0000-00-00 00:00:00', 'Admin', '', 0, 8),
(80, 'CAMRY', 'CAMRY', 1, '2017-01-01 07:36:20', '0000-00-00 00:00:00', 'Admin', '', 0, 9),
(81, 'HIGHLANDER', 'HIGHLANDER', 1, '2017-01-01 07:36:21', '0000-00-00 00:00:00', 'Admin', '', 0, 10),
(82, 'GT86', 'GT86', 1, '2017-01-01 07:36:22', '0000-00-00 00:00:00', 'Admin', '', 0, 11),
(83, 'ZACE', 'ZACE', 1, '2017-01-01 07:36:23', '0000-00-00 00:00:00', 'Admin', '', 0, 12),
(84, 'ALTIS', 'ALTIS', 1, '2017-01-01 07:36:24', '0000-00-00 00:00:00', 'Admin', '', 0, 13),
(85, 'FORTUNER', 'FORTUNER', 1, '2017-01-01 07:36:25', '0000-00-00 00:00:00', 'Admin', '', 0, 14),
(86, 'INNOVA', 'INNOVA', 1, '2017-01-01 07:36:26', '0000-00-00 00:00:00', 'Admin', '', 0, 15),
(87, 'HIACE', 'HIACE', 1, '2017-01-01 07:36:27', '0000-00-00 00:00:00', 'Admin', '', 0, 16),
(88, 'HILUX', 'HILUX', 1, '2017-01-01 07:36:28', '0000-00-00 00:00:00', 'Admin', '', 0, 17),
(89, 'LANDCRUISER', 'LANDCRUISER', 1, '2017-01-01 07:36:29', '0000-00-00 00:00:00', 'Admin', '', 0, 18),
(90, 'RAV4', 'RAV4', 1, '2017-01-01 07:36:30', '0000-00-00 00:00:00', 'Admin', '', 0, 19),
(91, 'YARIS', 'YARIS', 1, '2017-01-01 07:36:31', '0000-00-00 00:00:00', 'Admin', '', 0, 20),
(92, 'TYT_KHAC', 'OTHER TOYOTA', 1, '2017-01-01 07:36:32', '0000-00-00 00:00:00', 'Admin', '', 0, 21),
(93, 'CRUIZE', 'CRUIZE', 1, '2017-01-01 07:36:33', '0000-00-00 00:00:00', 'Admin', '', 0, 22),
(94, 'AVEO', 'AVEO', 1, '2017-01-01 07:36:34', '0000-00-00 00:00:00', 'Admin', '', 0, 23),
(95, 'TRAX', 'TRAX', 1, '2017-01-01 07:36:35', '0000-00-00 00:00:00', 'Admin', '', 0, 24),
(96, 'SPARK', 'SPARK', 1, '2017-01-01 07:36:36', '0000-00-00 00:00:00', 'Admin', '', 0, 25),
(97, 'ORLANDO', 'ORLANDO', 1, '2017-01-01 07:36:37', '0000-00-00 00:00:00', 'Admin', '', 0, 26),
(98, 'COLORADO', 'COLORADO', 1, '2017-01-01 07:36:38', '0000-00-00 00:00:00', 'Admin', '', 0, 27),
(99, 'CAPTIVA', 'CAPTIVA', 1, '2017-01-01 07:36:39', '0000-00-00 00:00:00', 'Admin', '', 0, 28),
(100, 'GM_KHAC', 'OTHER CHEVROLET', 1, '2017-01-01 07:36:40', '0000-00-00 00:00:00', 'Admin', '', 0, 29),
(101, 'ES250', 'ES250', 1, '2017-01-01 07:36:41', '0000-00-00 00:00:00', 'Admin', '', 0, 30),
(102, 'ES350', 'ES350', 1, '2017-01-01 07:36:42', '0000-00-00 00:00:00', 'Admin', '', 0, 31),
(103, 'GS200', 'GS200', 1, '2017-01-01 07:36:43', '0000-00-00 00:00:00', 'Admin', '', 0, 32),
(104, 'GS350', 'GS350', 1, '2017-01-01 07:36:44', '0000-00-00 00:00:00', 'Admin', '', 0, 33),
(105, 'LS450', 'LS450', 1, '2017-01-01 07:36:45', '0000-00-00 00:00:00', 'Admin', '', 0, 34),
(106, 'NX200', 'NX200', 1, '2017-01-01 07:36:46', '0000-00-00 00:00:00', 'Admin', '', 0, 35),
(107, 'RX200', 'RX200', 1, '2017-01-01 07:36:47', '0000-00-00 00:00:00', 'Admin', '', 0, 36),
(108, 'RX350', 'RX350', 1, '2017-01-01 07:36:48', '0000-00-00 00:00:00', 'Admin', '', 0, 37),
(109, 'GX460', 'GX460', 1, '2017-01-01 07:36:49', '0000-00-00 00:00:00', 'Admin', '', 0, 38),
(110, 'LX570', 'LX570', 1, '2017-01-01 07:36:50', '0000-00-00 00:00:00', 'Admin', '', 0, 39),
(111, 'LC', 'LEXUS LC', 1, '2017-01-01 07:36:51', '0000-00-00 00:00:00', 'Admin', '', 0, 40),
(112, 'LS500', 'LS500', 1, '2017-01-01 07:36:52', '0000-00-00 00:00:00', 'Admin', '', 0, 41),
(113, 'MAZDA2', 'MAZDA 2', 1, '2017-01-01 07:36:53', '0000-00-00 00:00:00', 'Admin', '', 0, 42),
(114, 'MAZDA3', 'MAZDA 3', 1, '2017-01-01 07:36:54', '0000-00-00 00:00:00', 'Admin', '', 0, 43),
(115, 'MAZDA6', 'MAZDA 6', 1, '2017-01-01 07:36:55', '0000-00-00 00:00:00', 'Admin', '', 0, 44),
(116, 'BT50', 'BT50', 1, '2017-01-01 07:36:56', '0000-00-00 00:00:00', 'Admin', '', 0, 45),
(117, 'MX5', 'MX5', 1, '2017-01-01 07:36:57', '0000-00-00 00:00:00', 'Admin', '', 0, 46),
(118, 'CX3', 'CX3', 1, '2017-01-01 07:36:58', '0000-00-00 00:00:00', 'Admin', '', 0, 47),
(119, 'CX5', 'CX5', 1, '2017-01-01 07:36:59', '0000-00-00 00:00:00', 'Admin', '', 0, 48),
(120, 'CX9', 'CX9', 1, '2017-01-01 07:37:00', '0000-00-00 00:00:00', 'Admin', '', 0, 49),
(121, 'MAZDA_KHAC', 'OTHER MAZDA', 1, '2017-01-01 07:37:01', '0000-00-00 00:00:00', 'Admin', '', 0, 50),
(122, 'MORNING', 'MORNING', 1, '2017-01-01 07:37:02', '0000-00-00 00:00:00', 'Admin', '', 0, 51),
(123, 'RIO', 'RIO', 1, '2017-01-01 07:37:03', '0000-00-00 00:00:00', 'Admin', '', 0, 52),
(124, 'CERATO', 'CERATO', 1, '2017-01-01 07:37:04', '0000-00-00 00:00:00', 'Admin', '', 0, 53),
(125, 'SPORTAGE', 'SPORTAGE', 1, '2017-01-01 07:37:05', '0000-00-00 00:00:00', 'Admin', '', 0, 54),
(126, 'CARENS', 'CARENS', 1, '2017-01-01 07:37:06', '0000-00-00 00:00:00', 'Admin', '', 0, 55),
(127, 'RONDO', 'RONDO', 1, '2017-01-01 07:37:07', '0000-00-00 00:00:00', 'Admin', '', 0, 56),
(128, 'OPTIMA', 'OPTIMA', 1, '2017-01-01 07:37:08', '0000-00-00 00:00:00', 'Admin', '', 0, 57),
(129, 'QUORIS', 'QUORIS', 1, '2017-01-01 07:37:09', '0000-00-00 00:00:00', 'Admin', '', 0, 58),
(130, 'SORENTO', 'SORENTO', 1, '2017-01-01 07:37:10', '0000-00-00 00:00:00', 'Admin', '', 0, 59),
(131, 'SEDONA', 'SEDONA', 1, '2017-01-01 07:37:11', '0000-00-00 00:00:00', 'Admin', '', 0, 60),
(132, 'KIA_KHAC', 'OTHER KIA', 1, '2017-01-01 07:37:12', '0000-00-00 00:00:00', 'Admin', '', 0, 61),
(133, 'CITY', 'CITY', 1, '2017-01-01 07:37:13', '0000-00-00 00:00:00', 'Admin', '', 0, 62),
(134, 'JAZZ', 'JAZZ', 1, '2017-01-01 07:37:14', '0000-00-00 00:00:00', 'Admin', '', 0, 63),
(135, 'CIVIC', 'CIVIC', 1, '2017-01-01 07:37:15', '0000-00-00 00:00:00', 'Admin', '', 0, 64),
(136, 'ACCORD', 'ACCORD', 1, '2017-01-01 07:37:16', '0000-00-00 00:00:00', 'Admin', '', 0, 65),
(137, 'CRV', 'CRV', 1, '2017-01-01 07:37:17', '0000-00-00 00:00:00', 'Admin', '', 0, 66),
(138, 'ODYSSY', 'ODYSSY', 1, '2017-01-01 07:37:18', '0000-00-00 00:00:00', 'Admin', '', 0, 67),
(139, 'ACURA', 'ACURA', 1, '2017-01-01 07:37:19', '0000-00-00 00:00:00', 'Admin', '', 0, 68),
(140, 'HONDA_KHAC', 'OTHER HONDA', 1, '2017-01-01 07:37:20', '0000-00-00 00:00:00', 'Admin', '', 0, 69),
(141, 'LEGENCY', 'LEGENCY', 1, '2017-01-01 07:37:21', '0000-00-00 00:00:00', 'Admin', '', 0, 70),
(142, 'IMPREZA', 'IMPREZA', 1, '2017-01-01 07:37:22', '0000-00-00 00:00:00', 'Admin', '', 0, 71),
(143, 'LEVORG', 'LEVORG', 1, '2017-01-01 07:37:23', '0000-00-00 00:00:00', 'Admin', '', 0, 1),
(144, 'OUTBACK', 'OUTBACK', 1, '2017-01-01 07:37:24', '0000-00-00 00:00:00', 'Admin', '', 0, 2),
(145, 'XV', 'SUBARU XV', 1, '2017-01-01 07:37:25', '0000-00-00 00:00:00', 'Admin', '', 0, 3),
(146, 'FORESTER', 'FORESTER', 1, '2017-01-01 07:37:26', '0000-00-00 00:00:00', 'Admin', '', 0, 4),
(147, 'WRX_STI', 'SUBARU WRX STI', 1, '2017-01-01 07:37:27', '0000-00-00 00:00:00', 'Admin', '', 0, 5),
(148, 'BRZ', 'SUBARU BRZ', 1, '2017-01-01 07:37:28', '0000-00-00 00:00:00', 'Admin', '', 0, 6),
(149, 'SUBARU_KHAC', 'OTHER SUBARU', 1, '2017-01-01 07:37:29', '0000-00-00 00:00:00', 'Admin', '', 0, 7),
(150, 'C_CLASS', 'C_CLASS', 1, '2017-01-01 07:37:30', '0000-00-00 00:00:00', 'Admin', '', 0, 8),
(151, 'E_CLASS', 'MERCEDES E_CLASS', 1, '2017-01-01 07:37:31', '0000-00-00 00:00:00', 'Admin', '', 0, 9),
(152, 'S_CLASS', 'MERCEDES S_CLASS', 1, '2017-01-01 07:37:32', '0000-00-00 00:00:00', 'Admin', '', 0, 10),
(153, 'A_CLASS', 'MERCEDES A_CLASS', 1, '2017-01-01 07:37:33', '0000-00-00 00:00:00', 'Admin', '', 0, 11),
(154, 'CLA_CLASS', 'CLA_CLASS', 1, '2017-01-01 07:37:34', '0000-00-00 00:00:00', 'Admin', '', 0, 12),
(155, 'GLA_CLASS', 'GLA_CLASS', 1, '2017-01-01 07:37:35', '0000-00-00 00:00:00', 'Admin', '', 0, 13),
(156, 'GLE_CLASS', 'GLE_CLASS', 1, '2017-01-01 07:37:36', '0000-00-00 00:00:00', 'Admin', '', 0, 14),
(157, 'GL_CLASS', 'GL_CLASS', 1, '2017-01-01 07:37:37', '0000-00-00 00:00:00', 'Admin', '', 0, 15),
(158, 'GLS_CLASS', 'GLS_CLASS', 1, '2017-01-01 07:37:38', '0000-00-00 00:00:00', 'Admin', '', 0, 16),
(159, 'GLC_CLASS', 'GLC_CLASS', 1, '2017-01-01 07:37:39', '0000-00-00 00:00:00', 'Admin', '', 0, 17),
(160, 'G_CLASS', 'G_CLASS', 1, '2017-01-01 07:37:40', '0000-00-00 00:00:00', 'Admin', '', 0, 18),
(161, 'V_CLASS', 'V_CLASS', 1, '2017-01-01 07:37:41', '0000-00-00 00:00:00', 'Admin', '', 0, 19),
(162, 'MCD_KHAC', 'OTHER MERCEDES', 1, '2017-01-01 07:37:42', '0000-00-00 00:00:00', 'Admin', '', 0, 20),
(163, 'MIRAGE', 'MIRAGE', 1, '2017-01-01 07:37:43', '0000-00-00 00:00:00', 'Admin', '', 0, 21),
(164, 'ATTRAGE', 'ATTRAGE', 1, '2017-01-01 07:37:44', '0000-00-00 00:00:00', 'Admin', '', 0, 22),
(165, 'OUTLANDER', 'OUTLANDER', 1, '2017-01-01 07:37:45', '0000-00-00 00:00:00', 'Admin', '', 0, 23),
(166, 'PAJERO', 'PAJERO', 1, '2017-01-01 07:37:46', '0000-00-00 00:00:00', 'Admin', '', 0, 24),
(167, 'TRITON', 'TRITON', 1, '2017-01-01 07:37:47', '0000-00-00 00:00:00', 'Admin', '', 0, 25),
(168, 'MIT_KHAC', 'OTHER MITSUBISHI', 1, '2017-01-01 07:37:48', '0000-00-00 00:00:00', 'Admin', '', 0, 26),
(169, 'D-MAX', 'D-MAX', 1, '2017-01-01 07:37:49', '0000-00-00 00:00:00', 'Admin', '', 0, 27),
(170, 'MU-X', 'MU-X', 1, '2017-01-01 07:37:50', '0000-00-00 00:00:00', 'Admin', '', 0, 28),
(171, 'Q_SERIES', 'Q_SERIES', 1, '2017-01-01 07:37:51', '0000-00-00 00:00:00', 'Admin', '', 0, 29),
(172, 'N_SERIES', 'N_SERIES', 1, '2017-01-01 07:37:52', '0000-00-00 00:00:00', 'Admin', '', 0, 30),
(173, 'ISZ_KHAC', 'OTHER ISUZU', 1, '2017-01-01 07:37:53', '0000-00-00 00:00:00', 'Admin', '', 0, 31),
(174, 'GEZT', 'GEZT', 1, '2017-01-01 07:37:54', '0000-00-00 00:00:00', 'Admin', '', 0, 32),
(175, 'GRANDI10', 'GRAND I10', 1, '2017-01-01 07:37:55', '0000-00-00 00:00:00', 'Admin', '', 0, 33),
(176, 'GRANDI20', 'GRAND I20', 1, '2017-01-01 07:37:56', '0000-00-00 00:00:00', 'Admin', '', 0, 34),
(177, 'GRANDI30', 'GRAND I30', 1, '2017-01-01 07:37:57', '0000-00-00 00:00:00', 'Admin', '', 0, 35),
(178, 'ACCENT', 'ACCENT', 1, '2017-01-01 07:37:58', '0000-00-00 00:00:00', 'Admin', '', 0, 36),
(179, 'AVANTE', 'AVANTE', 1, '2017-01-01 07:37:59', '0000-00-00 00:00:00', 'Admin', '', 0, 37),
(180, 'ELANTRA', 'ELANTRA', 1, '2017-01-01 07:38:00', '0000-00-00 00:00:00', 'Admin', '', 0, 38),
(181, 'CRETA', 'CRETA', 1, '2017-01-01 07:38:01', '0000-00-00 00:00:00', 'Admin', '', 0, 39),
(182, 'SONATA', 'SONATA', 1, '2017-01-01 07:38:02', '0000-00-00 00:00:00', 'Admin', '', 0, 40),
(183, 'GENESIS', 'GENESIS', 1, '2017-01-01 07:38:03', '0000-00-00 00:00:00', 'Admin', '', 0, 41),
(184, 'TUCSON', 'TUCSON', 1, '2017-01-01 07:38:04', '0000-00-00 00:00:00', 'Admin', '', 0, 42),
(185, 'SANTAFE', 'SANTAFE', 1, '2017-01-01 07:38:05', '0000-00-00 00:00:00', 'Admin', '', 0, 43),
(186, 'STAREX', 'STAREX', 1, '2017-01-01 07:38:06', '0000-00-00 00:00:00', 'Admin', '', 0, 44),
(187, 'PORTER', 'PORTER', 1, '2017-01-01 07:38:07', '0000-00-00 00:00:00', 'Admin', '', 0, 45),
(188, 'HYUNDAI_KHAC', 'OTHER HYUNDAI', 1, '2017-01-01 07:38:08', '0000-00-00 00:00:00', 'Admin', '', 0, 46),
(189, 'SPARKDO', 'DEAWOO SPARK', 1, '2017-01-01 07:38:09', '0000-00-00 00:00:00', 'Admin', '', 0, 47),
(190, 'GENIUS', 'GENIUS', 1, '2017-01-01 07:38:10', '0000-00-00 00:00:00', 'Admin', '', 0, 48),
(191, 'DEAWOO_KH?C', 'OTHER DEAWOO', 1, '2017-01-01 07:38:11', '0000-00-00 00:00:00', 'Admin', '', 0, 49),
(192, 'LATITUDE', 'LATITUDE', 1, '2017-01-01 07:38:12', '0000-00-00 00:00:00', 'Admin', '', 0, 50),
(193, 'LOGAN', 'LOGAN', 1, '2017-01-01 07:38:13', '0000-00-00 00:00:00', 'Admin', '', 0, 51),
(194, 'TALISMAN', 'TALISMAN', 1, '2017-01-01 07:38:14', '0000-00-00 00:00:00', 'Admin', '', 0, 52),
(195, 'KOLEOS', 'KOLEOS', 1, '2017-01-01 07:38:15', '0000-00-00 00:00:00', 'Admin', '', 0, 53),
(196, 'DUSTER', 'DUSTER', 1, '2017-01-01 07:38:16', '0000-00-00 00:00:00', 'Admin', '', 0, 54),
(197, 'CLIO_RS', 'CLIO RS', 1, '2017-01-01 07:38:17', '0000-00-00 00:00:00', 'Admin', '', 0, 55),
(198, 'MEGANE', 'MEGANE', 1, '2017-01-01 07:38:18', '0000-00-00 00:00:00', 'Admin', '', 0, 56),
(199, 'SANDERO', 'SANDERO', 1, '2017-01-01 07:38:19', '0000-00-00 00:00:00', 'Admin', '', 0, 57);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `vehicleVariantId` int(11) NOT NULL,
  `engineNo` text,
  `vinNo` text NOT NULL,
  `chassisNo` text,
  `registrationDate` datetime DEFAULT NULL,
  `purchaseDate` datetime DEFAULT NULL,
  `niscareOrRenCare` int(11) DEFAULT NULL,
  `npmp` int(11) DEFAULT NULL,
  `warrantyPeriod` int(11) DEFAULT NULL,
  `warrantyMilleage` int(11) DEFAULT NULL,
  `warrantyExpiryDate` datetime DEFAULT NULL,
  `extendedWarrantyPeriod` int(11) DEFAULT NULL,
  `extendedWarrantyMilleage` int(11) DEFAULT NULL,
  `extendedWarrantyExpiryDate` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `vehicles`
--

INSERT INTO `vehicles` (`id`, `vehicleVariantId`, `engineNo`, `vinNo`, `chassisNo`, `registrationDate`, `purchaseDate`, `niscareOrRenCare`, `npmp`, `warrantyPeriod`, `warrantyMilleage`, `warrantyExpiryDate`, `extendedWarrantyPeriod`, `extendedWarrantyMilleage`, `extendedWarrantyExpiryDate`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`) VALUES
(1, 1, 'YD25368530A??????', 'JN1UC4E26Z0003000', 'JN1UC4E26Z0003000', '2017-02-01 07:00:00', '2017-01-01 08:00:00', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:00', '0000-00-00 00:00:00', 'Admin', '', 0),
(2, 2, 'QR25*814478L*', 'RN3JBNT32HDV01687', 'RN3JBNT32HDV01687', '2017-02-01 07:00:01', '2017-01-01 08:00:01', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:01', '0000-00-00 00:00:00', 'Admin', '', 0),
(3, 3, 'MR20*981930B*', 'RN3JRWT32HDL01866', 'RN3JRWT32HDL01866', '2017-02-01 07:00:02', '2017-01-01 08:00:02', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:02', '0000-00-00 00:00:00', 'Admin', '', 0),
(4, 4, 'QR25*814492L*', 'RN3JBNT32HDV01685', 'RN3JBNT32HDV01685', '2017-02-01 07:00:03', '2017-01-01 08:00:03', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:03', '0000-00-00 00:00:00', 'Admin', '', 0),
(5, 5, 'QR25*814489L*', 'RN3JBNT32HDV01680', 'RN3JBNT32HDV01680', '2017-02-01 07:00:04', '2017-01-01 08:00:04', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:04', '0000-00-00 00:00:00', 'Admin', '', 0),
(6, 6, 'MR20*982392B*', 'RN3JRWT32HDL01820', 'RN3JRWT32HDL01820', '2017-02-01 07:00:05', '2017-01-01 08:00:05', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:05', '0000-00-00 00:00:00', 'Admin', '', 0),
(7, 7, 'QR25*807951L*', 'RN3JBNT32HDV01570', 'RN3JBNT32HDV01570', '2017-02-01 07:00:06', '2017-01-01 08:00:06', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:06', '0000-00-00 00:00:00', 'Admin', '', 0),
(8, 8, 'MR20*995324B*', 'RN3JRWT32HDL01910', 'RN3JRWT32HDL01910', '2017-02-01 07:00:07', '2017-01-01 08:00:07', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:07', '0000-00-00 00:00:00', 'Admin', '', 0),
(9, 9, 'MR20*971148B*', 'RN3JRWT32HDL01764', 'RN3JRWT32HDL01764', '2017-02-01 07:00:08', '2017-01-01 08:00:08', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:08', '0000-00-00 00:00:00', 'Admin', '', 0),
(10, 10, 'QR25*831180L*', 'RN3JBNT32HDV01587', 'RN3JBNT32HDV01587', '2017-02-01 07:00:09', '2017-01-01 08:00:09', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:09', '0000-00-00 00:00:00', 'Admin', '', 0),
(11, 11, 'MR20*988317B*', 'RN3JRWT32HDL01856', 'RN3JRWT32HDL01856', '2017-02-01 07:00:10', '2017-01-01 08:00:10', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:10', '0000-00-00 00:00:00', 'Admin', '', 0),
(12, 12, 'QR25*787423L*', 'RN3JBNT32HDV01923', 'RN3JBNT32HDV01923', '2017-02-01 07:00:11', '2017-01-01 08:00:11', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:11', '0000-00-00 00:00:00', 'Admin', '', 0),
(13, 13, 'MR20*968301B*', 'RN3JRWT32HDL01850', 'RN3JRWT32HDL01850', '2017-02-01 07:00:12', '2017-01-01 08:00:12', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:12', '0000-00-00 00:00:00', 'Admin', '', 0),
(14, 14, 'QR25*787425L*', 'RN3JBNT32HDV01694', 'RN3JBNT32HDV01694', '2017-02-01 07:00:13', '2017-01-01 08:00:13', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:13', '0000-00-00 00:00:00', 'Admin', '', 0),
(15, 15, 'MR20*989646B*', 'RN3JRWT32HDL01875', 'RN3JRWT32HDL01875', '2017-02-01 07:00:14', '2017-01-01 08:00:14', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:14', '0000-00-00 00:00:00', 'Admin', '', 0),
(16, 16, 'QR25*769365L*', 'RN3JBNT32GDV01213', 'RN3JBNT32GDV01213', '2017-02-01 07:00:15', '2017-01-01 08:00:15', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:15', '0000-00-00 00:00:00', 'Admin', '', 0),
(17, 17, 'MR20*989637B*', 'RN3JRWT32HDL01867', 'RN3JRWT32HDL01867', '2017-02-01 07:00:16', '2017-01-01 08:00:16', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:16', '0000-00-00 00:00:00', 'Admin', '', 0),
(18, 18, 'QR25*769336L*', 'RN3JBNT32GDV01201', 'RN3JBNT32GDV01201', '2017-02-01 07:00:17', '2017-01-01 08:00:17', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:17', '0000-00-00 00:00:00', 'Admin', '', 0),
(19, 19, 'MR20*981681B*', 'RN3JRWT32HDL01964', 'RN3JRWT32HDL01964', '2017-02-01 07:00:18', '2017-01-01 08:00:18', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:18', '0000-00-00 00:00:00', 'Admin', '', 0),
(20, 20, 'QR25*760332L*', 'RN3JBNT32HDV01407', 'RN3JBNT32HDV01407', '2017-02-01 07:00:19', '2017-01-01 08:00:19', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:19', '0000-00-00 00:00:00', 'Admin', '', 0),
(21, 21, 'MR20*964678B*', 'RN3JRWT32HDL01795', 'RN3JRWT32HDL01795', '2017-02-01 07:00:20', '2017-01-01 08:00:20', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:20', '0000-00-00 00:00:00', 'Admin', '', 0),
(22, 22, 'QR25*787452L*', 'RN3JBNT32HDV01891', 'RN3JBNT32HDV01891', '2017-02-01 07:00:21', '2017-01-01 08:00:21', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:21', '0000-00-00 00:00:00', 'Admin', '', 0),
(23, 23, 'MR20*949329B*', 'RN3JRWT32HDL01654', 'RN3JRWT32HDL01654', '2017-02-01 07:00:22', '2017-01-01 08:00:22', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:22', '0000-00-00 00:00:00', 'Admin', '', 0),
(24, 24, 'QR25*807947L*', 'RN3JBNT32HDV01573', 'RN3JBNT32HDV01573', '2017-02-01 07:00:23', '2017-01-01 08:00:23', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:23', '0000-00-00 00:00:00', 'Admin', '', 0),
(25, 25, 'MR20*982016B*', 'RN3JRWT32HDL01862', 'RN3JRWT32HDL01862', '2017-02-01 07:00:24', '2017-01-01 08:00:24', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:24', '0000-00-00 00:00:00', 'Admin', '', 0),
(26, 26, 'MR20*968350B*', 'RN3JRWT32HDL01857', 'RN3JRWT32HDL01857', '2017-02-01 07:00:25', '2017-01-01 08:00:25', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:25', '0000-00-00 00:00:00', 'Admin', '', 0),
(27, 27, 'QR25*814475L*', 'RN3JBNT32HDV01682', 'RN3JBNT32HDV01682', '2017-02-01 07:00:26', '2017-01-01 08:00:26', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:26', '0000-00-00 00:00:00', 'Admin', '', 0),
(28, 28, 'QR25*831195L*', 'RN3JBNT32HDV01567', 'RN3JBNT32HDV01567', '2017-02-01 07:00:27', '2017-01-01 08:00:27', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:27', '0000-00-00 00:00:00', 'Admin', '', 0),
(29, 29, 'VK56187905A', 'JN1JANZ62U0060749', 'JN1JANZ62U0060749', '2017-02-01 07:00:28', '2017-01-01 08:00:28', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:28', '0000-00-00 00:00:00', 'Admin', '', 0),
(30, 30, 'QR25*787416L*', 'RN3JBNT32HDV01535', 'RN3JBNT32HDV01535', '2017-02-01 07:00:29', '2017-01-01 08:00:29', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:29', '0000-00-00 00:00:00', 'Admin', '', 0),
(31, 31, 'MR20*982055B*', 'RN3JRWT32HDL01871', 'RN3JRWT32HDL01871', '2017-02-01 07:00:30', '2017-01-01 08:00:30', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:30', '0000-00-00 00:00:00', 'Admin', '', 0),
(32, 32, 'QR25*769364L*', 'RN3JBNT32GDV01203', 'RN3JBNT32GDV01203', '2017-02-01 07:00:31', '2017-01-01 08:00:31', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:31', '0000-00-00 00:00:00', 'Admin', '', 0),
(33, 33, 'MR20*964543B*', 'RN3JRWT32HDL01798', 'RN3JRWT32HDL01798', '2017-02-01 07:00:32', '2017-01-01 08:00:32', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:32', '0000-00-00 00:00:00', 'Admin', '', 0),
(34, 34, 'MR20*982818B*', 'RN3JRWT32HDL01813', 'RN3JRWT32HDL01813', '2017-02-01 07:00:33', '2017-01-01 08:00:33', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:33', '0000-00-00 00:00:00', 'Admin', '', 0),
(35, 35, 'QR25*787443L*', 'RN3JBNT32HDV01936', 'RN3JBNT32HDV01936', '2017-02-01 07:00:34', '2017-01-01 08:00:34', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:34', '0000-00-00 00:00:00', 'Admin', '', 0),
(36, 36, 'MR20*995572B*', 'RN3JRWT32HDL01909', 'RN3JRWT32HDL01909', '2017-02-01 07:00:35', '2017-01-01 08:00:35', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:35', '0000-00-00 00:00:00', 'Admin', '', 0),
(37, 37, 'QR25*760345L*', 'RN3JBNT32HDV01421', 'RN3JBNT32HDV01421', '2017-02-01 07:00:36', '2017-01-01 08:00:36', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:36', '0000-00-00 00:00:00', 'Admin', '', 0),
(38, 38, 'MR20*995895B*', 'RN3JRWT32HDL01917', 'RN3JRWT32HDL01917', '2017-02-01 07:00:37', '2017-01-01 08:00:37', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:37', '0000-00-00 00:00:00', 'Admin', '', 0),
(39, 39, 'QR25*760328L*', 'RN3JBNT32HDV01420', 'RN3JBNT32HDV01420', '2017-02-01 07:00:38', '2017-01-01 08:00:38', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:38', '0000-00-00 00:00:00', 'Admin', '', 0),
(40, 40, 'MR20*982161B*', 'RN3JRWT32HDL01868', 'RN3JRWT32HDL01868', '2017-02-01 07:00:39', '2017-01-01 08:00:39', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:39', '0000-00-00 00:00:00', 'Admin', '', 0),
(41, 41, 'QR25*829835L*', 'RN3JBNT32HDV01563', 'RN3JBNT32HDV01563', '2017-02-01 07:00:40', '2017-01-01 08:00:40', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:40', '0000-00-00 00:00:00', 'Admin', '', 0),
(42, 42, 'MR20*968306B*', 'RN3JRWT32HDL01832', 'RN3JRWT32HDL01832', '2017-02-01 07:00:41', '2017-01-01 08:00:41', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:41', '0000-00-00 00:00:00', 'Admin', '', 0),
(43, 43, 'QR25*807950L*', 'RN3JBNT32HDV01571', 'RN3JBNT32HDV01571', '2017-02-01 07:00:42', '2017-01-01 08:00:42', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:42', '0000-00-00 00:00:00', 'Admin', '', 0),
(44, 44, 'MR20*968249B*', 'RN3JRWT32HDL01884', 'RN3JRWT32HDL01884', '2017-02-01 07:00:43', '2017-01-01 08:00:43', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:43', '0000-00-00 00:00:00', 'Admin', '', 0),
(45, 45, 'QR25*760363L*', 'RN3JBNT32HDV01440', 'RN3JBNT32HDV01440', '2017-02-01 07:00:44', '2017-01-01 08:00:44', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:44', '0000-00-00 00:00:00', 'Admin', '', 0),
(46, 46, 'MR20*982527B*', 'RN3JRWT32HDL01833', 'RN3JRWT32HDL01833', '2017-02-01 07:00:45', '2017-01-01 08:00:45', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:45', '0000-00-00 00:00:00', 'Admin', '', 0),
(47, 47, 'QR25*769370L*', 'RN3JBNT32GDV01216', 'RN3JBNT32GDV01216', '2017-02-01 07:00:46', '2017-01-01 08:00:46', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:46', '0000-00-00 00:00:00', 'Admin', '', 0),
(48, 48, 'MR20*988734B*', 'RN3JRWT32HDL01847', 'RN3JRWT32HDL01847', '2017-02-01 07:00:47', '2017-01-01 08:00:47', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:47', '0000-00-00 00:00:00', 'Admin', '', 0),
(49, 49, 'MR20*992276B*', 'RN3JRWT32HDL01965', 'RN3JRWT32HDL01965', '2017-02-01 07:00:48', '2017-01-01 08:00:48', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:48', '0000-00-00 00:00:00', 'Admin', '', 0),
(50, 50, 'VK56190853A', 'JN1JANZ62U0065012', 'JN1JANZ62U0065012', '2017-02-01 07:00:49', '2017-01-01 08:00:49', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:49', '0000-00-00 00:00:00', 'Admin', '', 0),
(51, 51, 'MR20*968149B*', 'RN3JRWT32HDL01805', 'RN3JRWT32HDL01805', '2017-02-01 07:00:50', '2017-01-01 08:00:50', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:50', '0000-00-00 00:00:00', 'Admin', '', 0),
(52, 52, 'QR25*829832L*', 'RN3JBNT32HDV01589', 'RN3JBNT32HDV01589', '2017-02-01 07:00:51', '2017-01-01 08:00:51', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:51', '0000-00-00 00:00:00', 'Admin', '', 0),
(53, 53, 'QR25*810805L*', 'RN3JBNT32HDV01547', 'RN3JBNT32HDV01547', '2017-02-01 07:00:52', '2017-01-01 08:00:52', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:52', '0000-00-00 00:00:00', 'Admin', '', 0),
(54, 54, 'MR20*968292B*', 'RN3JRWT32HDL01838', 'RN3JRWT32HDL01838', '2017-02-01 07:00:53', '2017-01-01 08:00:53', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:53', '0000-00-00 00:00:00', 'Admin', '', 0),
(55, 55, 'QR25*787464L*', 'RN3JBNT32HDV01700', 'RN3JBNT32HDV01700', '2017-02-01 07:00:54', '2017-01-01 08:00:54', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:54', '0000-00-00 00:00:00', 'Admin', '', 0),
(56, 56, 'QR25*760348L*', 'RN3JBNT32HDV01424', 'RN3JBNT32HDV01424', '2017-02-01 07:00:55', '2017-01-01 08:00:55', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:55', '0000-00-00 00:00:00', 'Admin', '', 0),
(57, 57, 'MR20*968158B*', 'RN3JRWT32HDL01812', 'RN3JRWT32HDL01812', '2017-02-01 07:00:56', '2017-01-01 08:00:56', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:56', '0000-00-00 00:00:00', 'Admin', '', 0),
(58, 58, 'QR25*769342L*', 'RN3JBNT32GDV01208', 'RN3JBNT32GDV01208', '2017-02-01 07:00:57', '2017-01-01 08:00:57', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:57', '0000-00-00 00:00:00', 'Admin', '', 0),
(59, 59, 'MR20*006225C*', 'RN3JRWT32HDL01978', 'RN3JRWT32HDL01978', '2017-02-01 07:00:58', '2017-01-01 08:00:58', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:58', '0000-00-00 00:00:00', 'Admin', '', 0),
(60, 60, 'QR25*814493L*', 'RN3JBNT32HDV01683', 'RN3JBNT32HDV01683', '2017-02-01 07:00:59', '2017-01-01 08:00:59', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:00:59', '0000-00-00 00:00:00', 'Admin', '', 0),
(61, 1, 'QR25*831189L*', 'RN3JBNT32HDV01945', 'RN3JBNT32HDV01945', '2017-02-01 07:01:00', '2017-01-01 08:01:00', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:00', '0000-00-00 00:00:00', 'Admin', '', 0),
(62, 2, 'MR20*968797B*', 'RN3JRWT32HDL01913', 'RN3JRWT32HDL01913', '2017-02-01 07:01:01', '2017-01-01 08:01:01', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:01', '0000-00-00 00:00:00', 'Admin', '', 0),
(63, 3, 'MR20*989835B*', 'RN3JRWT32HDL01882', 'RN3JRWT32HDL01882', '2017-02-01 07:01:02', '2017-01-01 08:01:02', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:02', '0000-00-00 00:00:00', 'Admin', '', 0),
(64, 4, 'MR20*988740B*', 'RN3JRWT32HDL01851', 'RN3JRWT32HDL01851', '2017-02-01 07:01:03', '2017-01-01 08:01:03', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:03', '0000-00-00 00:00:00', 'Admin', '', 0),
(65, 5, 'QR25*831178L*', 'RN3JBNT32HDV01582', 'RN3JBNT32HDV01582', '2017-02-01 07:01:04', '2017-01-01 08:01:04', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:04', '0000-00-00 00:00:00', 'Admin', '', 0),
(66, 6, 'QR25*814494L*', 'RN3JBNT32HDV01677', 'RN3JBNT32HDV01677', '2017-02-01 07:01:05', '2017-01-01 08:01:05', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:05', '0000-00-00 00:00:00', 'Admin', '', 0),
(67, 7, 'MR20*992017B*', 'RN3JRWT32HDL01968', 'RN3JRWT32HDL01968', '2017-02-01 07:01:06', '2017-01-01 08:01:06', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:06', '0000-00-00 00:00:00', 'Admin', '', 0),
(68, 8, 'QR25*814467L*', 'RN3JBNT32HDV01676', 'RN3JBNT32HDV01676', '2017-02-01 07:01:07', '2017-01-01 08:01:07', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:07', '0000-00-00 00:00:00', 'Admin', '', 0),
(69, 9, 'MR20*982337B*', 'RN3JRWT32HDL01837', 'RN3JRWT32HDL01837', '2017-02-01 07:01:08', '2017-01-01 08:01:08', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:08', '0000-00-00 00:00:00', 'Admin', '', 0),
(70, 10, 'QR25*769366L*', 'RN3JBNT32GDV01228', 'RN3JBNT32GDV01228', '2017-02-01 07:01:09', '2017-01-01 08:01:09', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:09', '0000-00-00 00:00:00', 'Admin', '', 0),
(71, 11, 'MR20*006217C*', 'RN3JRWT32HDL01980', 'RN3JRWT32HDL01980', '2017-02-01 07:01:10', '2017-01-01 08:01:10', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:10', '0000-00-00 00:00:00', 'Admin', '', 0),
(72, 12, 'QR25*829833L*', 'RN3JBNT32HDV01576', 'RN3JBNT32HDV01576', '2017-02-01 07:01:11', '2017-01-01 08:01:11', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:11', '0000-00-00 00:00:00', 'Admin', '', 0),
(73, 13, 'MR20*975928B*', 'RN3JRWT32HDL01799', 'RN3JRWT32HDL01799', '2017-02-01 07:01:12', '2017-01-01 08:01:12', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:12', '0000-00-00 00:00:00', 'Admin', '', 0),
(74, 14, 'MR20*989656B*', 'RN3JRWT32HDL01879', 'RN3JRWT32HDL01879', '2017-02-01 07:01:13', '2017-01-01 08:01:13', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:13', '0000-00-00 00:00:00', 'Admin', '', 0),
(75, 15, 'MR20*968221B*', 'RN3JRWT32HDL01803', 'RN3JRWT32HDL01803', '2017-02-01 07:01:14', '2017-01-01 08:01:14', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:14', '0000-00-00 00:00:00', 'Admin', '', 0),
(76, 16, 'QR25*785286L*', 'RN3JBNT32GDV01225', 'RN3JBNT32GDV01225', '2017-02-01 07:01:15', '2017-01-01 08:01:15', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:15', '0000-00-00 00:00:00', 'Admin', '', 0),
(77, 17, 'MR20*995317B*', 'RN3JRWT32HDL01914', 'RN3JRWT32HDL01914', '2017-02-01 07:01:16', '2017-01-01 08:01:16', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:16', '0000-00-00 00:00:00', 'Admin', '', 0),
(78, 18, 'QR25*787424L*', 'RN3JBNT32HDV01925', 'RN3JBNT32HDV01925', '2017-02-01 07:01:17', '2017-01-01 08:01:17', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:17', '0000-00-00 00:00:00', 'Admin', '', 0),
(79, 19, 'MR20*964689B*', 'RN3JRWT32HDL01788', 'RN3JRWT32HDL01788', '2017-02-01 07:01:18', '2017-01-01 08:01:18', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:18', '0000-00-00 00:00:00', 'Admin', '', 0),
(80, 20, 'QR25*760316L*', 'RN3JBNT32HDV01414', 'RN3JBNT32HDV01414', '2017-02-01 07:01:19', '2017-01-01 08:01:19', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:19', '0000-00-00 00:00:00', 'Admin', '', 0),
(81, 21, 'MR20*968541B*', 'RN3JRWT32HDL01758', 'RN3JRWT32HDL01758', '2017-02-01 07:01:20', '2017-01-01 08:01:20', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:20', '0000-00-00 00:00:00', 'Admin', '', 0),
(82, 22, 'QR25*814490L*', 'RN3JBNT32HDV01690', 'RN3JBNT32HDV01690', '2017-02-01 07:01:21', '2017-01-01 08:01:21', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:21', '0000-00-00 00:00:00', 'Admin', '', 0),
(83, 23, 'MR20*982501B*', 'RN3JRWT32HDL01843', 'RN3JRWT32HDL01843', '2017-02-01 07:01:22', '2017-01-01 08:01:22', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:22', '0000-00-00 00:00:00', 'Admin', '', 0),
(84, 24, 'QR25*831177L*', 'RN3JBNT32HDV01578', 'RN3JBNT32HDV01578', '2017-02-01 07:01:23', '2017-01-01 08:01:23', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:23', '0000-00-00 00:00:00', 'Admin', '', 0),
(85, 25, 'MR20*988539B*', 'RN3JRWT32HDL01848', 'RN3JRWT32HDL01848', '2017-02-01 07:01:24', '2017-01-01 08:01:24', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:24', '0000-00-00 00:00:00', 'Admin', '', 0),
(86, 26, 'QR25*785295L*', 'RN3JBNT32GDV01234', 'RN3JBNT32GDV01234', '2017-02-01 07:01:25', '2017-01-01 08:01:25', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:25', '0000-00-00 00:00:00', 'Admin', '', 0),
(87, 27, 'MR20*975985B*', 'RN3JRWT32HDL01793', 'RN3JRWT32HDL01793', '2017-02-01 07:01:26', '2017-01-01 08:01:26', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:26', '0000-00-00 00:00:00', 'Admin', '', 0),
(88, 28, 'QR25*787439L*', 'RN3JBNT32HDV01714', 'RN3JBNT32HDV01714', '2017-02-01 07:01:27', '2017-01-01 08:01:27', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:27', '0000-00-00 00:00:00', 'Admin', '', 0),
(89, 29, 'QR25*785285L*', 'RN3JBNT32GDV01219', 'RN3JBNT32GDV01219', '2017-02-01 07:01:28', '2017-01-01 08:01:28', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:28', '0000-00-00 00:00:00', 'Admin', '', 0),
(90, 30, 'MR20*968549B*', 'RN3JRWT32HDL01754', 'RN3JRWT32HDL01754', '2017-02-01 07:01:29', '2017-01-01 08:01:29', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:29', '0000-00-00 00:00:00', 'Admin', '', 0),
(91, 31, 'MR20*968205B*', 'RN3JRWT32HDL01802', 'RN3JRWT32HDL01802', '2017-02-01 07:01:30', '2017-01-01 08:01:30', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:30', '0000-00-00 00:00:00', 'Admin', '', 0),
(92, 32, 'QR25*814470L*', 'RN3JBNT32HDV01673', 'RN3JBNT32HDV01673', '2017-02-01 07:01:31', '2017-01-01 08:01:31', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:31', '0000-00-00 00:00:00', 'Admin', '', 0),
(93, 33, 'MR20*977062B*', 'RN3JRWT32HDL01827', 'RN3JRWT32HDL01827', '2017-02-01 07:01:32', '2017-01-01 08:01:32', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:32', '0000-00-00 00:00:00', 'Admin', '', 0),
(94, 34, 'QR25*787433L*', 'RN3JBNT32HDV01709', 'RN3JBNT32HDV01709', '2017-02-01 07:01:33', '2017-01-01 08:01:33', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:33', '0000-00-00 00:00:00', 'Admin', '', 0),
(95, 35, 'MR20*982080B*', 'RN3JRWT32HDL01873', 'RN3JRWT32HDL01873', '2017-02-01 07:01:34', '2017-01-01 08:01:34', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:34', '0000-00-00 00:00:00', 'Admin', '', 0),
(96, 36, 'QR25*831198L*', 'RN3JBNT32HDV01949', 'RN3JBNT32HDV01949', '2017-02-01 07:01:35', '2017-01-01 08:01:35', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:35', '0000-00-00 00:00:00', 'Admin', '', 0),
(97, 37, 'MR20*992261B*', 'RN3JRWT32HDL01963', 'RN3JRWT32HDL01963', '2017-02-01 07:01:36', '2017-01-01 08:01:36', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:36', '0000-00-00 00:00:00', 'Admin', '', 0),
(98, 38, 'MR20*992045B*', 'RN3JRWT32HDL01966', 'RN3JRWT32HDL01966', '2017-02-01 07:01:37', '2017-01-01 08:01:37', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:37', '0000-00-00 00:00:00', 'Admin', '', 0),
(99, 39, 'MR20*982808B*', 'RN3JRWT32HDL01814', 'RN3JRWT32HDL01814', '2017-02-01 07:01:38', '2017-01-01 08:01:38', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:38', '0000-00-00 00:00:00', 'Admin', '', 0),
(100, 40, 'VK56194748A', 'JN1JANZ62U0065013', 'JN1JANZ62U0065013', '2017-02-01 07:01:39', '2017-01-01 08:01:39', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:39', '0000-00-00 00:00:00', 'Admin', '', 0),
(101, 41, 'MR20*982383B*', 'RN3JRWT32HDL01815', 'RN3JRWT32HDL01869', '2017-02-01 07:01:40', '2017-01-01 08:01:40', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:40', '0000-00-00 00:00:00', 'Admin', '', 0),
(102, 42, 'MR20*982069B*', 'JN1JANZ62U0065014', 'RN3JRWT32HDL01861', '2017-02-01 07:01:41', '2017-01-01 08:01:41', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:41', '0000-00-00 00:00:00', 'Admin', '', 0),
(103, 43, 'MR20*967513B*', 'RN3JRWT32HDL01815', 'RN3JRWT32HDL01898', '2017-02-01 07:01:42', '2017-01-01 08:01:42', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:42', '0000-00-00 00:00:00', 'Admin', '', 0),
(104, 44, 'MR20*976921B*', 'JN1JANZ62U0065014', 'RN3JRWT32HDL01826', '2017-02-01 07:01:43', '2017-01-01 08:01:43', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:43', '0000-00-00 00:00:00', 'Admin', '', 0),
(105, 45, 'MR20*005976C*', 'RN3JRWT32HDL01816', 'RN3JRWT32HDL01969', '2017-02-01 07:01:44', '2017-01-01 08:01:44', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:44', '0000-00-00 00:00:00', 'Admin', '', 0),
(106, 46, 'MR20*978624B*', 'JN1JANZ62U0065015', 'RN3JRWT32HDL01808', '2017-02-01 07:01:45', '2017-01-01 08:01:45', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:45', '0000-00-00 00:00:00', 'Admin', '', 0),
(107, 47, 'MR20*968924B*', 'RN3JRWT32HDL01816', 'RN3JRWT32HDL01905', '2017-02-01 07:01:46', '2017-01-01 08:01:46', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:46', '0000-00-00 00:00:00', 'Admin', '', 0),
(108, 48, 'MR20*970434B*', 'JN1JANZ62U0065015', 'RN3JRWT32HDL01976', '2017-02-01 07:01:47', '2017-01-01 08:01:47', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:47', '0000-00-00 00:00:00', 'Admin', '', 0),
(109, 49, 'MR20*967545B*', 'RN3JRWT32HDL01817', 'RN3JRWT32HDL01911', '2017-02-01 07:01:48', '2017-01-01 08:01:48', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:48', '0000-00-00 00:00:00', 'Admin', '', 0),
(110, 50, 'MR20*968280B*', 'JN1JANZ62U0065016', 'RN3JRWT32HDL01839', '2017-02-01 07:01:49', '2017-01-01 08:01:49', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:49', '0000-00-00 00:00:00', 'Admin', '', 0),
(111, 51, 'MR20*989565B*', 'RN3JRWT32HDL01817', 'RN3JRWT32HDL01880', '2017-02-01 07:01:50', '2017-01-01 08:01:50', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:50', '0000-00-00 00:00:00', 'Admin', '', 0),
(112, 52, 'MR20*978876B*', 'JN1JANZ62U0065016', 'RN3JRWT32HDL01755', '2017-02-01 07:01:51', '2017-01-01 08:01:51', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:51', '0000-00-00 00:00:00', 'Admin', '', 0),
(113, 53, 'MR20*982346B*', 'RN3JRWT32HDL01818', 'RN3JRWT32HDL01834', '2017-02-01 07:01:52', '2017-01-01 08:01:52', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:52', '0000-00-00 00:00:00', 'Admin', '', 0),
(114, 54, 'MR20*964710B*', 'JN1JANZ62U0065017', 'RN3JRWT32HDL01790', '2017-02-01 07:01:53', '2017-01-01 08:01:53', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:53', '0000-00-00 00:00:00', 'Admin', '', 0),
(115, 55, 'MR20*978804B*', 'RN3JRWT32HDL01818', 'RN3JRWT32HDL01748', '2017-02-01 07:01:54', '2017-01-01 08:01:54', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:54', '0000-00-00 00:00:00', 'Admin', '', 0),
(116, 56, 'MR20*978849B*', 'JN1JANZ62U0065017', 'RN3JRWT32HDL01751', '2017-02-01 07:01:55', '2017-01-01 08:01:55', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:55', '0000-00-00 00:00:00', 'Admin', '', 0),
(117, 57, 'MR20*968226B*', 'RN3JRWT32HDL01819', 'RN3JRWT32HDL01801', '2017-02-01 07:01:56', '2017-01-01 08:01:56', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:56', '0000-00-00 00:00:00', 'Admin', '', 0),
(118, 58, 'MR20*970407B*', 'JN1JANZ62U0065018', 'RN3JRWT32HDL01971', '2017-02-01 07:01:57', '2017-01-01 08:01:57', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:57', '0000-00-00 00:00:00', 'Admin', '', 0),
(119, 59, 'MR20*968273B*', 'RN3JRWT32HDL01819', 'RN3JRWT32HDL01883', '2017-02-01 07:01:58', '2017-01-01 08:01:58', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:58', '0000-00-00 00:00:00', 'Admin', '', 0),
(120, 60, 'MR20*982242B*', 'JN1JANZ62U0065018', 'RN3JRWT32HDL01823', '2017-02-01 07:01:59', '2017-01-01 08:01:59', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:01:59', '0000-00-00 00:00:00', 'Admin', '', 0),
(121, 1, 'MR20*976141B*', 'RN3JRWT32HDL01820', 'RN3JRWT32HDL01768', '2017-02-01 07:02:00', '2017-01-01 08:02:00', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:00', '0000-00-00 00:00:00', 'Admin', '', 0),
(122, 2, 'MR20*968233B*', 'JN1JANZ62U0065019', 'RN3JRWT32HDL01806', '2017-02-01 07:02:01', '2017-01-01 08:02:01', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:01', '0000-00-00 00:00:00', 'Admin', '', 0),
(123, 3, 'MR20*978798B*', 'RN3JRWT32HDL01820', 'RN3JRWT32HDL01752', '2017-02-01 07:02:02', '2017-01-01 08:02:02', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:02', '0000-00-00 00:00:00', 'Admin', '', 0),
(124, 4, 'MR20*888058B* ????????????????', 'JN1JANZ62U0065019', 'RN3JRWT32GDA00678', '2017-02-01 07:02:03', '2017-01-01 08:02:03', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:03', '0000-00-00 00:00:00', 'Admin', '', 0),
(125, 5, 'MR20*888043B* ????????????????', 'RN3JRWT32HDL01821', 'RN3JRWT32GDA00673', '2017-02-01 07:02:04', '2017-01-01 08:02:04', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:04', '0000-00-00 00:00:00', 'Admin', '', 0),
(126, 6, 'MR20*906497B*', 'JN1JANZ62U0065020', 'RN3JRWT32GDA01269', '2017-02-01 07:02:05', '2017-01-01 08:02:05', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:05', '0000-00-00 00:00:00', 'Admin', '', 0),
(127, 7, 'MR20*910924B* ????????????????', 'RN3JRWT32HDL01821', 'RN3JRWT32GDA00715', '2017-02-01 07:02:06', '2017-01-01 08:02:06', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:06', '0000-00-00 00:00:00', 'Admin', '', 0),
(128, 8, 'MR20*908086B* ????????????????', 'JN1JANZ62U0065020', 'RN3JRWT32GDA00716', '2017-02-01 07:02:07', '2017-01-01 08:02:07', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:07', '0000-00-00 00:00:00', 'Admin', '', 0),
(129, 9, 'MR20*892217B* ????????????????', 'RN3JRWT32HDL01822', 'RN3JRWT32GDA00444', '2017-02-01 07:02:08', '2017-01-01 08:02:08', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:08', '0000-00-00 00:00:00', 'Admin', '', 0),
(130, 10, 'MR20*892188B* ????????????????', 'JN1JANZ62U0065021', 'RN3JRWT32GDA00441', '2017-02-01 07:02:09', '2017-01-01 08:02:09', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:09', '0000-00-00 00:00:00', 'Admin', '', 0),
(131, 11, 'MR20*970399B*', 'RN3JRWT32HDL01822', 'RN3JRWT32HDL01972', '2017-02-01 07:02:10', '2017-01-01 08:02:10', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:10', '0000-00-00 00:00:00', 'Admin', '', 0),
(132, 12, 'MR20*976132B*', 'JN1JANZ62U0065021', 'RN3JRWT32HDL01780', '2017-02-01 07:02:11', '2017-01-01 08:02:11', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:11', '0000-00-00 00:00:00', 'Admin', '', 0),
(133, 13, 'MR20*005972C*', 'RN3JRWT32HDL01823', 'RN3JRWT32HDL01970', '2017-02-01 07:02:12', '2017-01-01 08:02:12', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:12', '0000-00-00 00:00:00', 'Admin', '', 0),
(134, 14, 'MR20*961078B*', 'JN1JANZ62U0065022', 'RN3JRWT32HDL01630', '2017-02-01 07:02:13', '2017-01-01 08:02:13', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:13', '0000-00-00 00:00:00', 'Admin', '', 0),
(135, 15, 'MR20*892103B* ????????????????', 'RN3JRWT32HDL01823', 'RN3JRWT32GDA00443', '2017-02-01 07:02:14', '2017-01-01 08:02:14', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:14', '0000-00-00 00:00:00', 'Admin', '', 0),
(136, 16, 'MR20*989575B*', 'JN1JANZ62U0065022', 'RN3JRWT32HDL01865', '2017-02-01 07:02:15', '2017-01-01 08:02:15', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:15', '0000-00-00 00:00:00', 'Admin', '', 0),
(137, 17, 'MR20*991954B*', 'RN3JRWT32HDL01824', 'RN3JRWT32HDL01967', '2017-02-01 07:02:16', '2017-01-01 08:02:16', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:16', '0000-00-00 00:00:00', 'Admin', '', 0),
(138, 18, 'MR20*970382B*', 'JN1JANZ62U0065023', 'RN3JRWT32HDL01974', '2017-02-01 07:02:17', '2017-01-01 08:02:17', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:17', '0000-00-00 00:00:00', 'Admin', '', 0),
(139, 19, 'MR20*991944B*', 'RN3JRWT32HDL01824', 'RN3JRWT32HDL01959', '2017-02-01 07:02:18', '2017-01-01 08:02:18', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:18', '0000-00-00 00:00:00', 'Admin', '', 0),
(140, 20, 'MR20*967156B*', 'JN1JANZ62U0065023', 'RN3JRWT32HDL01782', '2017-02-01 07:02:19', '2017-01-01 08:02:19', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:19', '0000-00-00 00:00:00', 'Admin', '', 0),
(141, 21, 'MR20*988563B*', 'RN3JRWT32HDL01825', 'RN3JRWT32HDL01855', '2017-02-01 07:02:20', '2017-01-01 08:02:20', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:20', '0000-00-00 00:00:00', 'Admin', '', 0),
(142, 22, 'MR20*967066B*', 'JN1JANZ62U0065024', 'RN3JRWT32HDL01777', '2017-02-01 07:02:21', '2017-01-01 08:02:21', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:21', '0000-00-00 00:00:00', 'Admin', '', 0),
(143, 23, 'MR20*992032B*', 'RN3JRWT32HDL01825', 'RN3JRWT32HDL01957', '2017-02-01 07:02:22', '2017-01-01 08:02:22', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:22', '0000-00-00 00:00:00', 'Admin', '', 0),
(144, 24, 'MR20*988515B*', 'JN1JANZ62U0065024', 'RN3JRWT32HDL01859', '2017-02-01 07:02:23', '2017-01-01 08:02:23', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:23', '0000-00-00 00:00:00', 'Admin', '', 0),
(145, 25, 'MR20*989850B*', 'RN3JRWT32HDL01826', 'RN3JRWT32HDL01877', '2017-02-01 07:02:24', '2017-01-01 08:02:24', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:24', '0000-00-00 00:00:00', 'Admin', '', 0),
(146, 26, 'MR20*982369B*', 'JN1JANZ62U0065025', 'RN3JRWT32HDL01829', '2017-02-01 07:02:25', '2017-01-01 08:02:25', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:25', '0000-00-00 00:00:00', 'Admin', '', 0),
(147, 27, 'MR20*988501B*', 'RN3JRWT32HDL01826', 'RN3JRWT32HDL01854', '2017-02-01 07:02:26', '2017-01-01 08:02:26', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:26', '0000-00-00 00:00:00', 'Admin', '', 0),
(148, 28, 'MR20*995901B*', 'JN1JANZ62U0065025', 'RN3JRWT32HDL01920', '2017-02-01 07:02:27', '2017-01-01 08:02:27', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:27', '0000-00-00 00:00:00', 'Admin', '', 0),
(149, 29, 'MR20*967505B*', 'RN3JRWT32HDL01827', 'RN3JRWT32HDL01897', '2017-02-01 07:02:28', '2017-01-01 08:02:28', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:28', '0000-00-00 00:00:00', 'Admin', '', 0),
(150, 30, 'MR20*982519B*', 'JN1JANZ62U0065026', 'RN3JRWT32HDL01853', '2017-02-01 07:02:29', '2017-01-01 08:02:29', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:29', '0000-00-00 00:00:00', 'Admin', '', 0),
(151, 31, 'MR20*964607B*', 'RN3JRWT32HDL01827', 'RN3JRWT32HDL01784', '2017-02-01 07:02:30', '2017-01-01 08:02:30', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:30', '0000-00-00 00:00:00', 'Admin', '', 0),
(152, 32, 'MR20*982250B*', 'JN1JANZ62U0065026', 'RN3JRWT32HDL01836', '2017-02-01 07:02:31', '2017-01-01 08:02:31', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:31', '0000-00-00 00:00:00', 'Admin', '', 0),
(153, 33, 'MR20*982360B*', 'RN3JRWT32HDL01828', 'RN3JRWT32HDL01844', '2017-02-01 07:02:32', '2017-01-01 08:02:32', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:32', '0000-00-00 00:00:00', 'Admin', '', 0),
(154, 34, 'MR20*968258B*', 'JN1JANZ62U0065027', 'RN3JRWT32HDL01807', '2017-02-01 07:02:33', '2017-01-01 08:02:33', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:33', '0000-00-00 00:00:00', 'Admin', '', 0),
(155, 35, 'MR20*976180B*', 'RN3JRWT32HDL01828', 'RN3JRWT32HDL01774', '2017-02-01 07:02:34', '2017-01-01 08:02:34', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:34', '0000-00-00 00:00:00', 'Admin', '', 0),
(156, 36, 'MR20*981922B*', 'JN1JANZ62U0065027', 'RN3JRWT32HDL01863', '2017-02-01 07:02:35', '2017-01-01 08:02:35', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:35', '0000-00-00 00:00:00', 'Admin', '', 0),
(157, 37, 'MR20*968241B*', 'RN3JRWT32HDL01829', 'RN3JRWT32HDL01810', '2017-02-01 07:02:36', '2017-01-01 08:02:36', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:36', '0000-00-00 00:00:00', 'Admin', '', 0),
(158, 38, 'MR20*968142B*', 'JN1JANZ62U0065028', 'RN3JRWT32HDL01816', '2017-02-01 07:02:37', '2017-01-01 08:02:37', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:37', '0000-00-00 00:00:00', 'Admin', '', 0),
(159, 39, 'MR20*967535B*', 'RN3JRWT32HDL01829', 'RN3JRWT32HDL01899', '2017-02-01 07:02:38', '2017-01-01 08:02:38', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:38', '0000-00-00 00:00:00', 'Admin', '', 0),
(160, 40, 'MR20*982169B*', 'JN1JANZ62U0065028', 'RN3JRWT32HDL01845', '2017-02-01 07:02:39', '2017-01-01 08:02:39', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:39', '0000-00-00 00:00:00', 'Admin', '', 0),
(161, 41, 'MR20*995566B*', 'RN3JRWT32HDL01830', 'RN3JRWT32HDL01907', '2017-02-01 07:02:40', '2017-01-01 08:02:40', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:40', '0000-00-00 00:00:00', 'Admin', '', 0),
(162, 42, 'MR20*964702B*', 'JN1JANZ62U0065029', 'RN3JRWT32HDL01800', '2017-02-01 07:02:41', '2017-01-01 08:02:41', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:41', '0000-00-00 00:00:00', 'Admin', '', 0),
(163, 43, 'QR25*814491L*', 'RN3JRWT32HDL01830', 'RN3JBNT32HDV01684', '2017-02-01 07:02:42', '2017-01-01 08:02:42', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:42', '0000-00-00 00:00:00', 'Admin', '', 0),
(164, 44, 'MR20*892203B* ????????????????', 'JN1JANZ62U0065029', 'RN3JRWT32GDA00442', '2017-02-01 07:02:43', '2017-01-01 08:02:43', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:43', '0000-00-00 00:00:00', 'Admin', '', 0),
(165, 45, 'MR20*975938B*', 'RN3JRWT32HDL01831', 'RN3JRWT32HDL01792', '2017-02-01 07:02:44', '2017-01-01 08:02:44', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:44', '0000-00-00 00:00:00', 'Admin', '', 0),
(166, 46, 'MR20*982234B*', 'JN1JANZ62U0065030', 'RN3JRWT32HDL01840', '2017-02-01 07:02:45', '2017-01-01 08:02:45', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:45', '0000-00-00 00:00:00', 'Admin', '', 0),
(167, 47, 'VQ35422958X', 'RN3JRWT32HDL01831', '5N1AL0MM1GC534136', '2017-02-01 07:02:46', '2017-01-01 08:02:46', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:46', '0000-00-00 00:00:00', 'Admin', '', 0),
(168, 48, 'VQ35419871X', 'JN1JANZ62U0065030', '5N1AL0MM0GC534130', '2017-02-01 07:02:47', '2017-01-01 08:02:47', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:47', '0000-00-00 00:00:00', 'Admin', '', 0),
(169, 49, 'VQ35419158X', 'RN3JRWT32HDL01832', '5N1AL0MM8GC534120', '2017-02-01 07:02:48', '2017-01-01 08:02:48', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:48', '0000-00-00 00:00:00', 'Admin', '', 0),
(170, 50, 'VQ35427793X', 'JN1JANZ62U0065031', '5N1AL0MM7GC534156', '2017-02-01 07:02:49', '2017-01-01 08:02:49', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:49', '0000-00-00 00:00:00', 'Admin', '', 0),
(171, 51, 'YD25689655T', 'RN3JRWT32HDL01832', '5N1AL0MMXEC556428', '2017-02-01 07:02:50', '2017-01-01 08:02:50', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:50', '0000-00-00 00:00:00', 'Admin', '', 0),
(172, 52, 'VQ35425358X', 'JN1JANZ62U0065031', '5N1AL0MM6GC534150', '2017-02-01 07:02:51', '2017-01-01 08:02:51', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:51', '0000-00-00 00:00:00', 'Admin', '', 0),
(173, 53, 'VQ35423161X', 'RN3JRWT32HDL01833', '5N1AL0MM5GC534138', '2017-02-01 07:02:52', '2017-01-01 08:02:52', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:52', '0000-00-00 00:00:00', 'Admin', '', 0),
(174, 54, 'VQ35424697X', 'JN1JANZ62U0065032', '5N1AL0MMXGC534152', '2017-02-01 07:02:53', '2017-01-01 08:02:53', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:53', '0000-00-00 00:00:00', 'Admin', '', 0),
(175, 55, 'VQ35419689X', 'RN3JRWT32HDL01833', '5N1AL0MM0GC534127', '2017-02-01 07:02:54', '2017-01-01 08:02:54', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:54', '0000-00-00 00:00:00', 'Admin', '', 0),
(176, 56, 'VQ35425725X', 'JN1JANZ62U0065032', '5N1AL0MM4GC534146', '2017-02-01 07:02:55', '2017-01-01 08:02:55', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:55', '0000-00-00 00:00:00', 'Admin', '', 0),
(177, 57, 'VQ35425979X', 'RN3JRWT32HDL01834', '5N1AL0MMXGC534149', '2017-02-01 07:02:56', '2017-01-01 08:02:56', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:56', '0000-00-00 00:00:00', 'Admin', '', 0),
(178, 58, 'VQ35427207X', 'JN1JANZ62U0065033', '5N1AL0MM1GC534153', '2017-02-01 07:02:57', '2017-01-01 08:02:57', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:57', '0000-00-00 00:00:00', 'Admin', '', 0),
(179, 59, 'VQ35374530X', 'RN3JRWT32HDL01834', '5N1AL0MM2GC534128', '2017-02-01 07:02:58', '2017-01-01 08:02:58', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:58', '0000-00-00 00:00:00', 'Admin', '', 0),
(180, 60, 'VQ35422948X', 'JN1JANZ62U0065033', '5N1AL0MM3GC534137', '2017-02-01 07:02:59', '2017-01-01 08:02:59', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:02:59', '0000-00-00 00:00:00', 'Admin', '', 0),
(181, 1, 'VQ35425729X', 'RN3JRWT32HDL01835', '5N1AL0MM2GC534145', '2017-02-01 07:03:00', '2017-01-01 08:03:00', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:00', '0000-00-00 00:00:00', 'Admin', '', 0),
(182, 2, 'VQ35428440X', 'JN1JANZ62U0065034', '5N1AL0MM0GC534158', '2017-02-01 07:03:01', '2017-01-01 08:03:01', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:01', '0000-00-00 00:00:00', 'Admin', '', 0),
(183, 3, 'VQ35419502X', 'RN3JRWT32HDL01835', '5N1AL0MM5GC534124', '2017-02-01 07:03:02', '2017-01-01 08:03:02', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:02', '0000-00-00 00:00:00', 'Admin', '', 0),
(184, 4, 'VQ35423031X', 'JN1JANZ62U0065034', '5N1AL0MM8GC534134', '2017-02-01 07:03:03', '2017-01-01 08:03:03', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:03', '0000-00-00 00:00:00', 'Admin', '', 0),
(185, 5, 'VQ35426123X', 'RN3JRWT32HDL01836', '5N1AL0MM8GC534151', '2017-02-01 07:03:04', '2017-01-01 08:03:04', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:04', '0000-00-00 00:00:00', 'Admin', '', 0),
(186, 6, 'VQ35419933X', 'JN1JANZ62U0065035', '5N1AL0MM4GC534129', '2017-02-01 07:03:05', '2017-01-01 08:03:05', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:05', '0000-00-00 00:00:00', 'Admin', '', 0),
(187, 7, 'VQ35424500X', 'RN3JRWT32HDL01836', '5N1AL0MM5GC534141', '2017-02-01 07:03:06', '2017-01-01 08:03:06', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:06', '0000-00-00 00:00:00', 'Admin', '', 0),
(188, 8, 'VQ35419350X', 'JN1JANZ62U0065035', '5N1AL0MM3GC534123', '2017-02-01 07:03:07', '2017-01-01 08:03:07', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:07', '0000-00-00 00:00:00', 'Admin', '', 0),
(189, 9, 'VQ35423138X', 'RN3JRWT32HDL01837', '5N1AL0MM7GC534139', '2017-02-01 07:03:08', '2017-01-01 08:03:08', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:08', '0000-00-00 00:00:00', 'Admin', '', 0),
(190, 10, 'VQ35419453X', 'JN1JANZ62U0065036', '5N1AL0MM7GC534125', '2017-02-01 07:03:09', '2017-01-01 08:03:09', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:09', '0000-00-00 00:00:00', 'Admin', '', 0),
(191, 11, 'VQ35418970X', 'RN3JRWT32HDL01837', '5N1AL0MM1GC534119', '2017-02-01 07:03:10', '2017-01-01 08:03:10', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:10', '0000-00-00 00:00:00', 'Admin', '', 0),
(192, 12, 'VQ35424286X', 'JN1JANZ62U0065036', '5N1AL0MM3GC534140', '2017-02-01 07:03:11', '2017-01-01 08:03:11', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:11', '0000-00-00 00:00:00', 'Admin', '', 0),
(193, 13, 'VQ35419005X', 'RN3JRWT32HDL01838', '5N1AL0MMXGC534118', '2017-02-01 07:03:12', '2017-01-01 08:03:12', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:12', '0000-00-00 00:00:00', 'Admin', '', 0),
(194, 14, 'VQ35424739X', 'JN1JANZ62U0065037', '5N1AL0MM9GC534143', '2017-02-01 07:03:13', '2017-01-01 08:03:13', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:13', '0000-00-00 00:00:00', 'Admin', '', 0),
(195, 15, 'MR20*976015B*', 'RN3JRWT32HDL01838', 'RN3JRWT32HDL01796', '2017-02-01 07:03:14', '2017-01-01 08:03:14', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:14', '0000-00-00 00:00:00', 'Admin', '', 0),
(196, 16, 'MR20*968524B*', 'JN1JANZ62U0065037', 'RN3JRWT32HDL01757', '2017-02-01 07:03:15', '2017-01-01 08:03:15', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:15', '0000-00-00 00:00:00', 'Admin', '', 0),
(197, 17, 'MR20*902216B* ????????????????', 'RN3JRWT32HDL01839', 'RN3JRWT32GDL00898', '2017-02-01 07:03:16', '2017-01-01 08:03:16', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:16', '0000-00-00 00:00:00', 'Admin', '', 0),
(198, 18, 'MR20*967174B*', 'JN1JANZ62U0065038', 'RN3JRWT32HDL01775', '2017-02-01 07:03:17', '2017-01-01 08:03:17', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:17', '0000-00-00 00:00:00', 'Admin', '', 0),
(199, 19, 'MR20*982534B*', 'RN3JRWT32HDL01839', 'RN3JRWT32HDL01835', '2017-02-01 07:03:18', '2017-01-01 08:03:18', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:18', '0000-00-00 00:00:00', 'Admin', '', 0),
(200, 20, 'MR20*980564B*', 'JN1JANZ62U0065038', 'RN3JRWT32HDL01830', '2017-02-01 07:03:19', '2017-01-01 08:03:19', 0, 0, 0, 0, '0000-00-00 00:00:00', 0, 0, '0000-00-00 00:00:00', 1, '2017-01-01 08:03:19', '0000-00-00 00:00:00', 'Admin', '', 0),
(201, 169, NULL, '222', '444', '2017-09-12 00:00:00', '2017-09-13 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2017-09-12 10:36:18', '2017-09-12 10:36:18', NULL, NULL, 0),
(202, 168, NULL, '22222222222', '2222222222222222', '2017-09-11 00:00:00', '2017-09-11 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2017-09-12 10:36:50', '2017-09-12 10:36:50', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vehiclevariants`
--

CREATE TABLE `vehiclevariants` (
  `id` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `vehicleModelId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `vehiclevariants`
--

INSERT INTO `vehiclevariants` (`id`, `code`, `description`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`, `vehicleModelId`) VALUES
(1, 'N17_1.5_MT_L', 'SUNNY 1.5L L', 1, '2017-01-01 08:01:01', '0000-00-00 00:00:00', 'Admin', '', 0, 1),
(2, 'N17_1.5_MT_XL', 'SUNNY 1.5L XL', 1, '2017-01-01 08:01:02', '0000-00-00 00:00:00', '', '', 0, 1),
(3, 'N17_1.5_AT_XV', 'SUNNY 1.5L XV', 1, '2017-01-01 08:01:03', '0000-00-00 00:00:00', '', '', 0, 1),
(4, 'N17_1.6_AT', 'ALMERA 1.6L AT', 1, '2017-01-01 08:01:04', '0000-00-00 00:00:00', '', '', 0, 1),
(5, 'N17_1.6_MT', 'ALMERA 1.6L MT', 1, '2017-01-01 08:01:05', '0000-00-00 00:00:00', '', '', 0, 1),
(6, 'D40_2.5_AT', 'NAVARA 2.5L AT', 1, '2017-01-01 08:01:06', '0000-00-00 00:00:00', '', '', 0, 2),
(7, 'D40_2.5_MT', 'NAVARA 2.5L MT', 1, '2017-01-01 08:01:07', '0000-00-00 00:00:00', '', '', 0, 2),
(8, 'D23_2.5_AT_4X2', 'NP300 NAVARA 2.5L EL', 1, '2017-01-01 08:01:08', '0000-00-00 00:00:00', '', '', 0, 3),
(9, 'D23_2.5_MT_4X2', 'NP300 NAVARA 2.5L E', 1, '2017-01-01 08:01:09', '0000-00-00 00:00:00', '', '', 0, 3),
(10, 'D23_2.5_AT_4X4', 'NP300 NAVARA 2.5L VL', 1, '2017-01-01 08:01:10', '0000-00-00 00:00:00', '', '', 0, 3),
(11, 'D23_2.5_MT_4X4', 'NP300 NAVARA 2.5L SL', 1, '2017-01-01 08:01:11', '0000-00-00 00:00:00', '', '', 0, 3),
(12, 'J32_2.5_CVT', 'TEANA 2.5L CVT', 1, '2017-01-01 08:01:12', '0000-00-00 00:00:00', '', '', 0, 4),
(13, 'J32_3.5_CVT', 'TEANA 3.5L CVT', 1, '2017-01-01 08:01:13', '0000-00-00 00:00:00', '', '', 0, 4),
(14, 'L33_2.5_CVT', 'NEW TEANA 2.5L SL', 1, '2017-01-01 08:01:14', '0000-00-00 00:00:00', '', '', 0, 5),
(15, 'L33_3.5_CVT', 'NEW TEANA 3.5L SL', 1, '2017-01-01 08:01:15', '0000-00-00 00:00:00', '', '', 0, 5),
(16, 'F15_1.6_CVT', 'JUKE 1.6L CVT', 1, '2017-01-01 08:01:16', '0000-00-00 00:00:00', '', '', 0, 6),
(17, 'F15_1.6_MCCVT', 'JUKE 1.6L MC CVT', 1, '2017-01-01 08:01:17', '0000-00-00 00:00:00', '', '', 0, 6),
(18, 'F15_1.6_MT', 'JUKE 1.6L MT', 1, '2017-01-01 08:01:18', '0000-00-00 00:00:00', '', '', 0, 6),
(19, 'L10_1.8_AT', 'GRAND LIVINA 1.8L AT', 1, '2017-01-01 08:01:19', '0000-00-00 00:00:00', '', '', 0, 7),
(20, 'L10_1.8_MT', 'GRAND LIVINA 1.8L MT', 1, '2017-01-01 08:01:20', '0000-00-00 00:00:00', '', '', 0, 7),
(21, 'T31_2.5_CVT', 'X-TRAIL 2.5L CVT', 1, '2017-01-01 08:01:21', '0000-00-00 00:00:00', '', '', 0, 8),
(22, 'T32_2.0_CVT_2WD', 'X-TRAIL 2.0L CVT 2WD', 1, '2017-01-01 08:01:22', '0000-00-00 00:00:00', '', '', 0, 10),
(23, 'T32_2.0_CVT_4WD', 'X-TRAIL 2.0L CVT 4WD', 1, '2017-01-01 08:01:23', '0000-00-00 00:00:00', '', '', 0, 10),
(24, 'T32_2.5_CVT', 'X-TRAIL 2.5L CVT', 1, '2017-01-01 08:01:24', '0000-00-00 00:00:00', '', '', 0, 10),
(25, 'Z51_3.5_CVT', 'MURANO 3.5L CVT', 1, '2017-01-01 08:01:25', '0000-00-00 00:00:00', '', '', 0, 11),
(26, 'Z34_3.7_AT', '370Z 3.7L AT', 1, '2017-01-01 08:01:26', '0000-00-00 00:00:00', '', '', 0, 12),
(27, 'E26_2.5_MT', 'URVAN 2.5L MT', 1, '2017-01-01 08:01:27', '0000-00-00 00:00:00', '', '', 0, 13),
(28, 'C11_1.6_AT', 'TIIDA HATCHBACK 1.6P AT', 1, '2017-01-01 08:01:28', '0000-00-00 00:00:00', '', '', 0, 14),
(29, 'C11_1.6_MT', 'TIIDA HATCHBACK 1.6P MT', 1, '2017-01-01 08:01:29', '0000-00-00 00:00:00', '', '', 0, 14),
(30, 'J11', 'QASHQAI', 1, '2017-01-01 08:01:30', '0000-00-00 00:00:00', '', '', 0, 15),
(31, 'U13', 'BLUEBIRD U13', 1, '2017-01-01 08:01:31', '0000-00-00 00:00:00', '', '', 0, 16),
(32, 'U14', 'BLUEBIRD U14', 1, '2017-01-01 08:01:32', '0000-00-00 00:00:00', '', '', 0, 46),
(33, 'Y61_4.2_MT', 'PATROL GL 4.2 MT', 1, '2017-01-01 08:01:33', '0000-00-00 00:00:00', '', '', 0, 17),
(34, 'Y61_3.0_MT', 'PATROL GL 3.0 MT', 1, '2017-01-01 08:01:34', '0000-00-00 00:00:00', '', '', 0, 17),
(35, 'A34', 'MAXIMA', 1, '2017-01-01 08:01:35', '0000-00-00 00:00:00', '', '', 0, 18),
(36, 'R51', 'PATHFINDER R51', 1, '2017-01-01 08:01:36', '0000-00-00 00:00:00', '', '', 0, 19),
(37, 'R52', 'PATHFINDER R52', 1, '2017-01-01 08:01:37', '0000-00-00 00:00:00', '', '', 0, 20),
(38, 'A31', 'CEFIRO A31', 1, '2017-01-01 08:01:38', '0000-00-00 00:00:00', '', '', 0, 21),
(39, 'A32', 'CEFIRO A32', 1, '2017-01-01 08:01:39', '0000-00-00 00:00:00', '', '', 0, 22),
(40, 'A33', 'CEFIRO A33', 1, '2017-01-01 08:01:40', '0000-00-00 00:00:00', '', '', 0, 23),
(41, 'K13', 'MICRA', 1, '2017-01-01 08:01:41', '0000-00-00 00:00:00', '', '', 0, 24),
(42, 'B17', 'SYLPHY (SUNNY)', 1, '2017-01-01 08:01:42', '0000-00-00 00:00:00', '', '', 0, 53),
(43, 'RE52', 'QUEST RE52', 1, '2017-01-01 08:01:43', '0000-00-00 00:00:00', '', '', 0, 52),
(44, 'V42', 'QUEST V42', 1, '2017-01-01 08:01:44', '0000-00-00 00:00:00', '', '', 0, 51),
(45, 'C12', 'PULSAR (TIIDA) C12', 1, '2017-01-01 08:01:45', '0000-00-00 00:00:00', '', '', 0, 49),
(46, 'C13', 'PULSAR C13', 1, '2017-01-01 08:01:46', '0000-00-00 00:00:00', '', '', 0, 50),
(47, 'U30', 'PRESAGE U30', 1, '2017-01-01 08:01:47', '0000-00-00 00:00:00', '', '', 0, 47),
(48, 'U31', 'PRESAGE U31', 1, '2017-01-01 08:01:48', '0000-00-00 00:00:00', '', '', 0, 48),
(49, 'D10', 'TERRANO', 1, '2017-01-01 08:01:49', '0000-00-00 00:00:00', '', '', 0, 25),
(50, 'N16', 'PULSAR N16', 1, '2017-01-01 08:01:50', '0000-00-00 00:00:00', '', '', 0, 26),
(51, 'PIX', 'PIXO', 1, '2017-01-01 08:01:51', '0000-00-00 00:00:00', '', '', 0, 54),
(52, 'J31_TEANA', 'TEANA J31', 1, '2017-01-01 08:01:52', '0000-00-00 00:00:00', '', '', 0, 27),
(53, 'D22', 'NAVARA (FRONTIER)', 1, '2017-01-01 08:01:53', '0000-00-00 00:00:00', '', '', 0, 45),
(54, 'J31_ALTIMA', 'ALTIMA', 1, '2017-01-01 08:01:54', '0000-00-00 00:00:00', '', '', 0, 27),
(55, 'E50', 'ELGRAND PARAMEDIC', 1, '2017-01-01 08:01:55', '0000-00-00 00:00:00', '', '', 0, 44),
(56, 'J31_MAXIMA', 'MAXIMA', 1, '2017-01-01 08:01:56', '0000-00-00 00:00:00', '', '', 0, 27),
(57, 'Y30', 'CEDRIC (GLORIA) Y30', 1, '2017-01-01 08:01:57', '0000-00-00 00:00:00', '', '', 0, 40),
(58, 'Z33', '350Z', 1, '2017-01-01 08:01:58', '0000-00-00 00:00:00', '', '', 0, 28),
(59, 'Y31', 'CEDRIC (GLORIA) Y31', 1, '2017-01-01 08:01:59', '0000-00-00 00:00:00', '', '', 0, 39),
(60, 'E12', 'VERSA', 1, '2017-01-01 08:02:00', '0000-00-00 00:00:00', '', '', 0, 29),
(61, 'Y32', 'CEDRIC (GLORIA) Y32', 1, '2017-01-01 08:02:01', '0000-00-00 00:00:00', '', '', 0, 41),
(62, 'Y33', 'CEDRIC (GLORIA) Y33', 1, '2017-01-01 08:02:02', '0000-00-00 00:00:00', '', '', 0, 42),
(63, 'Y34', 'CEDRIC (GLORIA) Y34', 1, '2017-01-01 08:02:03', '0000-00-00 00:00:00', '', '', 0, 43),
(64, 'Y62', 'PATROL (SAFARI)', 1, '2017-01-01 08:02:04', '0000-00-00 00:00:00', '', '', 0, 30),
(65, 'N14', 'PULSAR N14', 1, '2017-01-01 08:02:05', '0000-00-00 00:00:00', '', '', 0, 37),
(66, 'N15', 'PULSAR N15', 1, '2017-01-01 08:02:06', '0000-00-00 00:00:00', '', '', 0, 38),
(67, 'P11', 'PRIMERA', 1, '2017-01-01 08:02:07', '0000-00-00 00:00:00', '', '', 0, 31),
(68, 'C23', 'SERENA C23', 1, '2017-01-01 08:02:08', '0000-00-00 00:00:00', '', '', 0, 35),
(69, 'C24', 'SERENA C24', 1, '2017-01-01 08:02:09', '0000-00-00 00:00:00', '', '', 0, 36),
(70, 'U12', 'STANZA', 1, '2017-01-01 08:02:10', '0000-00-00 00:00:00', '', '', 0, 34),
(71, 'A60', 'TITAN', 1, '2017-01-01 08:02:11', '0000-00-00 00:00:00', '', '', 0, 33),
(72, 'D21', 'PICKUP', 1, '2017-01-01 08:02:12', '0000-00-00 00:00:00', '', '', 0, 32),
(73, 'F15_HR16_MC_CVT', 'JUKE 1.6 MC CVT', 1, '2017-01-01 08:02:13', '0000-00-00 00:00:00', '', '', 0, 6),
(74, 'L02B_15L_CKD', 'SUNNY 1.5 L', 1, '2017-01-01 08:02:14', '0000-00-00 00:00:00', '', '', 0, 1),
(75, 'L02B_15XL_CKD', 'SUNNY 1.5 XL', 1, '2017-01-01 08:02:15', '0000-00-00 00:00:00', '', '', 0, 1),
(76, 'L02B_15XV_CKD', 'SUNNY 1.5 XV', 1, '2017-01-01 08:02:16', '0000-00-00 00:00:00', '', '', 0, 1),
(77, 'L42L_QR25_CVT', 'NEW TEANA 2.5 SL', 1, '2017-01-01 08:02:17', '0000-00-00 00:00:00', '', '', 0, 5),
(78, 'L42L_VQ35_CVT', 'NEW TEANA 3.5 SL', 1, '2017-01-01 08:02:18', '0000-00-00 00:00:00', '', '', 0, 5),
(79, 'L50_QX60_CVT', 'INFINITI QX60 3.5 CVT', 1, '2017-01-01 08:02:19', '0000-00-00 00:00:00', '', '', 0, 57),
(80, 'L50_QX60_P_CVT', 'INFINITI QX60 3.5 CVT PREMIUM', 1, '2017-01-01 08:02:20', '0000-00-00 00:00:00', '', '', 0, 57),
(81, 'H60A_2.5_4X2AT', 'NP300 NAVARA EL', 1, '2017-01-01 08:02:21', '0000-00-00 00:00:00', '', '', 0, 3),
(82, 'H60A_2.5_4X2MT', 'NP300 NAVARA E', 1, '2017-01-01 08:02:22', '0000-00-00 00:00:00', '', '', 0, 3),
(83, 'H60A_2.5_4X4AT', 'NP300 NAVARA VL', 1, '2017-01-01 08:02:23', '0000-00-00 00:00:00', '', '', 0, 3),
(84, 'H60A_2.5_4X4MT', 'NP300 NAVARA SL', 1, '2017-01-01 08:02:24', '0000-00-00 00:00:00', '', '', 0, 3),
(85, 'P32R_2.0HIGH', 'X-TRAIL T32 SL', 1, '2017-01-01 08:02:25', '0000-00-00 00:00:00', '', '', 0, 10),
(86, 'P32R_2.0MID', 'X-TRAIL T32', 1, '2017-01-01 08:02:26', '0000-00-00 00:00:00', '', '', 0, 10),
(87, 'P32R_2.5HIGH', 'X-TRAIL T32 SV 4WD', 1, '2017-01-01 08:02:27', '0000-00-00 00:00:00', '', '', 0, 10),
(88, 'S51_QX70_CVT', 'INFINITI QX70 3.7 CVT', 1, '2017-01-01 08:02:28', '0000-00-00 00:00:00', '', '', 0, 60),
(89, 'Z62_QX80_CVT', 'INFINITI QX80 5.6 CVT', 1, '2017-01-01 08:02:29', '0000-00-00 00:00:00', '', '', 0, 61),
(90, 'J10', 'QASHQAI J10', 1, '2017-01-01 08:02:30', '0000-00-00 00:00:00', '', '', 0, 62),
(91, 'T30', 'X-TRAIL T30', 1, '2017-01-01 08:02:31', '0000-00-00 00:00:00', '', '', 0, 9),
(92, 'B16', 'SYLPHY (SENTRA) B16', 1, '2017-01-01 08:02:32', '0000-00-00 00:00:00', '', '', 0, 63),
(93, 'C26', 'SERENA C26', 1, '2017-01-01 08:02:33', '0000-00-00 00:00:00', '', '', 0, 64),
(94, 'E52', 'QUEST E52', 1, '2017-01-01 08:02:34', '0000-00-00 00:00:00', '', '', 0, 65),
(95, 'Z50', 'MURANO', 1, '2017-01-01 08:02:35', '0000-00-00 00:00:00', '', '', 0, 76),
(96, 'K11', 'MICRA K11', 1, '2017-01-01 08:02:36', '0000-00-00 00:00:00', '', '', 0, 67),
(97, 'K12', 'MICRA K12', 1, '2017-01-01 08:02:37', '0000-00-00 00:00:00', '', '', 0, 68),
(98, 'Y60', 'PATROL Y60', 1, '2017-01-01 08:02:38', '0000-00-00 00:00:00', '', '', 0, 69),
(99, 'E25', 'URVAN E25', 1, '2017-01-01 08:02:39', '0000-00-00 00:00:00', '', '', 0, 70),
(100, 'G11', 'BLUEBIRD SYLPHY', 1, '2017-01-01 08:02:40', '0000-00-00 00:00:00', '', '', 0, 71),
(101, 'B14', 'SENTRA B14', 1, '2017-01-01 08:02:41', '0000-00-00 00:00:00', '', '', 0, 72),
(102, 'R20', 'TERRANO2', 1, '2017-01-01 08:02:42', '0000-00-00 00:00:00', '', '', 0, 73),
(103, 'S35', 'ROGUE', 1, '2017-01-01 08:02:43', '0000-00-00 00:00:00', '', '', 0, 74),
(104, 'ZE0', 'LEAF', 1, '2017-01-01 08:02:44', '0000-00-00 00:00:00', '', '', 0, 75),
(105, 'CA32', 'MAXIMA CA32', 1, '2017-01-01 08:02:45', '0000-00-00 00:00:00', '', '', 0, 77),
(106, 'CA33', 'MAXIMA CA33', 1, '2017-01-01 08:02:46', '0000-00-00 00:00:00', '', '', 0, 78),
(107, 'VIOS', 'TOYOTA VIOS', 1, '2017-01-01 08:02:47', '0000-00-00 00:00:00', '', '', 0, 79),
(108, 'CAMRY', 'TOYOTA CAMRY', 1, '2017-01-01 08:02:48', '0000-00-00 00:00:00', '', '', 0, 80),
(109, 'HIGHLANDER', 'TOYOTA HIGHLANDER', 1, '2017-01-01 08:02:49', '0000-00-00 00:00:00', '', '', 0, 81),
(110, 'GT86', 'TOYOTA GT86', 1, '2017-01-01 08:02:50', '0000-00-00 00:00:00', '', '', 0, 82),
(111, 'ZACE', 'TOYOTA ZACE', 1, '2017-01-01 08:02:51', '0000-00-00 00:00:00', '', '', 0, 83),
(112, 'ALTIS', 'TOYOTA ALTIS', 1, '2017-01-01 08:02:52', '0000-00-00 00:00:00', '', '', 0, 84),
(113, 'FORTUNER', 'TOYOTA FORTUNER', 1, '2017-01-01 08:02:53', '0000-00-00 00:00:00', '', '', 0, 85),
(114, 'INNOVA', 'TOYOTA INNOVA', 1, '2017-01-01 08:02:54', '0000-00-00 00:00:00', '', '', 0, 86),
(115, 'HIACE', 'TOYOTA HIACE', 1, '2017-01-01 08:02:55', '0000-00-00 00:00:00', '', '', 0, 87),
(116, 'HILUX', 'TOYOTA HILUX', 1, '2017-01-01 08:02:56', '0000-00-00 00:00:00', '', '', 0, 88),
(117, 'LANDCRUISER', 'TOYOTA LANDCRUISER', 1, '2017-01-01 08:02:57', '0000-00-00 00:00:00', '', '', 0, 89),
(118, 'RAV4', 'TOYOTA RAV4', 1, '2017-01-01 08:02:58', '0000-00-00 00:00:00', '', '', 0, 90),
(119, 'YARIS', 'TOYOTA YARIS', 1, '2017-01-01 08:02:59', '0000-00-00 00:00:00', '', '', 0, 91),
(120, 'GIULIA', 'ALFA GIULIA', 1, '2017-01-01 08:03:00', '0000-00-00 00:00:00', '', '', 0, 92),
(121, 'ROMEO', 'ALFA ROMEO', 1, '2017-01-01 08:03:01', '0000-00-00 00:00:00', '', '', 0, 93),
(122, 'STELVIO', 'ALFA STELVIO', 1, '2017-01-01 08:03:02', '0000-00-00 00:00:00', '', '', 0, 94),
(123, 'A3', 'AUDI A3', 1, '2017-01-01 08:03:03', '0000-00-00 00:00:00', '', '', 0, 95),
(124, 'ACCENT', 'HYUNDAI ACCENT', 1, '2017-01-01 08:03:04', '0000-00-00 00:00:00', '', '', 0, 96),
(125, 'AVANTE', 'HYUNDAI AVANTE', 1, '2017-01-01 08:03:05', '0000-00-00 00:00:00', '', '', 0, 97),
(126, 'A4', 'AUDI A4', 1, '2017-01-01 08:03:06', '0000-00-00 00:00:00', '', '', 0, 98),
(127, 'A5', 'AUDI A5', 1, '2017-01-01 08:03:07', '0000-00-00 00:00:00', '', '', 0, 99),
(128, 'A6', 'AUDI A6', 1, '2017-01-01 08:03:08', '0000-00-00 00:00:00', '', '', 0, 100),
(129, 'A7', 'AUDI A7', 1, '2017-01-01 08:03:09', '0000-00-00 00:00:00', '', '', 0, 101),
(130, 'A8L', 'AUDI A8L', 1, '2017-01-01 08:03:10', '0000-00-00 00:00:00', '', '', 0, 102),
(131, 'Q2', 'AUDI Q2', 1, '2017-01-01 08:03:11', '0000-00-00 00:00:00', '', '', 0, 103),
(132, 'Q3', 'AUDI Q3', 1, '2017-01-01 08:03:12', '0000-00-00 00:00:00', '', '', 0, 104),
(133, 'Q5', 'AUDI Q5', 1, '2017-01-01 08:03:13', '0000-00-00 00:00:00', '', '', 0, 105),
(134, 'Q7', 'AUDI Q7', 1, '2017-01-01 08:03:14', '0000-00-00 00:00:00', '', '', 0, 106),
(135, 'R8', 'AUDI R8', 1, '2017-01-01 08:03:15', '0000-00-00 00:00:00', '', '', 0, 107),
(136, 'RS7', 'AUDI RS7', 1, '2017-01-01 08:03:16', '0000-00-00 00:00:00', '', '', 0, 108),
(137, 'VENZA', 'TOYOTA VENZA', 1, '2017-01-01 08:03:17', '0000-00-00 00:00:00', '', '', 0, 109),
(138, 'S8', 'AUDI S8', 1, '2017-01-01 08:03:18', '0000-00-00 00:00:00', '', '', 0, 110),
(139, 'TT_S', 'AUDI TT S', 1, '2017-01-01 08:03:19', '0000-00-00 00:00:00', '', '', 0, 111),
(140, 'CRETA', 'HYUNDAI CRETA', 1, '2017-01-01 08:03:20', '0000-00-00 00:00:00', '', '', 0, 112),
(141, 'ELANTRA', 'HYUNDAI ELANTRA', 1, '2017-01-01 08:03:21', '0000-00-00 00:00:00', '', '', 0, 113),
(142, 'GENESIS', 'HYUNDAI GENESIS', 1, '2017-01-01 08:03:22', '0000-00-00 00:00:00', '', '', 0, 114),
(143, 'GEZT', 'HYUNDAI GEZT', 1, '2017-01-01 08:03:23', '0000-00-00 00:00:00', '', '', 0, 115),
(144, 'GENIUS', 'DEAWOO GENIUS', 1, '2017-01-01 08:03:24', '0000-00-00 00:00:00', '', '', 0, 116),
(145, 'GRANDI20', 'HYUNDAI I20', 1, '2017-01-01 08:03:25', '0000-00-00 00:00:00', '', '', 0, 117),
(146, 'SPARKDO', 'DEAWOO SPART', 1, '2017-01-01 08:03:26', '0000-00-00 00:00:00', '', '', 0, 118),
(147, 'GRANDI30', 'HYUNDAI I30', 1, '2017-01-01 08:03:27', '0000-00-00 00:00:00', '', '', 0, 119),
(148, 'PORTER', 'HYUNDAI PORTER', 1, '2017-01-01 08:03:28', '0000-00-00 00:00:00', '', '', 0, 120),
(149, 'ECOSPORT', 'FORD ECOSPORT', 1, '2017-01-01 08:03:29', '0000-00-00 00:00:00', '', '', 0, 121),
(150, 'ESCAPE', 'FORD ESCAPE', 1, '2017-01-01 08:03:30', '0000-00-00 00:00:00', '', '', 0, 122),
(151, 'EVEREST', 'FORD EVEREST', 1, '2017-01-01 08:03:31', '0000-00-00 00:00:00', '', '', 0, 123),
(152, 'EXPLORER', 'FORD EXPLORER', 1, '2017-01-01 08:03:32', '0000-00-00 00:00:00', '', '', 0, 124),
(153, 'SANTAFE', 'HYUNDAI SANTAFE', 1, '2017-01-01 08:03:33', '0000-00-00 00:00:00', '', '', 0, 125),
(154, 'SONATA', 'HYUNDAI SONATA', 1, '2017-01-01 08:03:34', '0000-00-00 00:00:00', '', '', 0, 126),
(155, 'STAREX', 'HYUNDAI STAREX', 1, '2017-01-01 08:03:35', '0000-00-00 00:00:00', '', '', 0, 127),
(156, 'TUCSON', 'HYUNDAI TUCSON', 1, '2017-01-01 08:03:36', '0000-00-00 00:00:00', '', '', 0, 128),
(157, 'CARENS', 'KIA CARENS', 1, '2017-01-01 08:03:37', '0000-00-00 00:00:00', '', '', 0, 129),
(158, 'F150', 'FORD F150', 1, '2017-01-01 08:03:38', '0000-00-00 00:00:00', '', '', 0, 130),
(159, 'FIESTA', 'FORD FIESTA', 1, '2017-01-01 08:03:39', '0000-00-00 00:00:00', '', '', 0, 131),
(160, 'FOCUS', 'FORD FOCUS', 1, '2017-01-01 08:03:40', '0000-00-00 00:00:00', '', '', 0, 132),
(161, 'RANGER', 'FORD RANGER', 1, '2017-01-01 08:03:41', '0000-00-00 00:00:00', '', '', 0, 133),
(162, 'TRANSIT', 'FORD TRANSIT', 1, '2017-01-01 08:03:42', '0000-00-00 00:00:00', '', '', 0, 134),
(163, 'CERATO', 'KIA CERATO', 1, '2017-01-01 08:03:43', '0000-00-00 00:00:00', '', '', 0, 135),
(164, 'XJL', 'JAGUAR XJL', 1, '2017-01-01 08:03:44', '0000-00-00 00:00:00', '', '', 0, 136),
(165, 'DISCOVERY', 'LAND ROVER DISCOVERY', 1, '2017-01-01 08:03:45', '0000-00-00 00:00:00', '', '', 0, 137),
(166, 'SCIROCCO', 'VOLKSWAGEN SCIROCCO', 1, '2017-01-01 08:03:46', '0000-00-00 00:00:00', '', '', 0, 138),
(167, 'MORNING', 'KIA MORNING', 1, '2017-01-01 08:03:47', '0000-00-00 00:00:00', '', '', 0, 139),
(168, 'OPTIMA', 'KIA OPTIMA', 1, '2017-01-01 08:03:48', '0000-00-00 00:00:00', '', '', 0, 140),
(169, 'QUORIS', 'KIA QUORIS', 1, '2017-01-01 08:03:49', '0000-00-00 00:00:00', '', '', 0, 141),
(170, 'RIO', 'KIA RIO', 1, '2017-01-01 08:03:50', '0000-00-00 00:00:00', '', '', 0, 142),
(171, 'MAZDA3', 'MAZDA 3', 1, '2017-01-01 08:03:51', '0000-00-00 00:00:00', '', '', 0, 143),
(172, 'AVEO', 'CHEVROLET AVEO', 1, '2017-01-01 08:03:52', '0000-00-00 00:00:00', '', '', 0, 144),
(173, 'KIA RONDO', 'KIA RONDO', 1, '2017-01-01 08:03:53', '0000-00-00 00:00:00', '', '', 0, 145),
(174, 'CAPTIVA', 'CHEVROLET CAPTIVA', 1, '2017-01-01 08:03:54', '0000-00-00 00:00:00', '', '', 0, 146),
(175, 'CRV', 'HONDA CRV', 1, '2017-01-01 08:03:55', '0000-00-00 00:00:00', '', '', 0, 147),
(176, 'SEDONA', 'KIA SEDONA', 1, '2017-01-01 08:03:56', '0000-00-00 00:00:00', '', '', 0, 148),
(177, 'COLORADO', 'CHEVROLET COLORADO', 1, '2017-01-01 08:03:57', '0000-00-00 00:00:00', '', '', 0, 149),
(178, 'SORENTO', 'KIA SORENTO', 1, '2017-01-01 08:03:58', '0000-00-00 00:00:00', '', '', 0, 150),
(179, 'CRUIZE', 'CHEVROLET CRUIZE', 1, '2017-01-01 08:03:59', '0000-00-00 00:00:00', '', '', 0, 151),
(180, 'G_CLASS', 'G_CLASS', 1, '2017-01-01 08:04:00', '0000-00-00 00:00:00', '', '', 0, 152),
(181, 'ORLANDO', 'CHEVROLET ORLANDO', 1, '2017-01-01 08:04:01', '0000-00-00 00:00:00', '', '', 0, 153),
(182, 'SPORTAGE', 'KIA SPORTAGE', 1, '2017-01-01 08:04:02', '0000-00-00 00:00:00', '', '', 0, 154),
(183, 'SPARK', 'CHEVROLET SPARK', 1, '2017-01-01 08:04:03', '0000-00-00 00:00:00', '', '', 0, 155),
(184, 'BT50', 'MAZDA BT50', 1, '2017-01-01 08:04:04', '0000-00-00 00:00:00', '', '', 0, 156),
(185, 'TRAX', 'CHEVROLET TRAX', 1, '2017-01-01 08:04:05', '0000-00-00 00:00:00', '', '', 0, 157),
(186, 'CX3', 'MAZDA CX3', 1, '2017-01-01 08:04:06', '0000-00-00 00:00:00', '', '', 0, 158),
(187, 'CX5', 'MAZDA CX5', 1, '2017-01-01 08:04:07', '0000-00-00 00:00:00', '', '', 0, 159),
(188, 'CX9', 'MAZDA CX9', 1, '2017-01-01 08:04:08', '0000-00-00 00:00:00', '', '', 0, 160),
(189, 'BEETLE', 'VOLKSWAGEN BEETLE', 1, '2017-01-01 08:04:09', '0000-00-00 00:00:00', '', '', 0, 161),
(190, 'JETTA', 'VOLKSWAGEN JETTA', 1, '2017-01-01 08:04:10', '0000-00-00 00:00:00', '', '', 0, 162),
(191, 'PASSAT', 'VOLKSWAGEN PASSAT', 1, '2017-01-01 08:04:11', '0000-00-00 00:00:00', '', '', 0, 163),
(192, '208', 'PEUGEOT 208', 1, '2017-01-01 08:04:12', '0000-00-00 00:00:00', '', '', 0, 164),
(193, 'POLO', 'VOLKSWAGEN POLO', 1, '2017-01-01 08:04:13', '0000-00-00 00:00:00', '', '', 0, 165),
(194, 'SHARAN', 'VOLKSWAGEN SHARAN', 1, '2017-01-01 08:04:14', '0000-00-00 00:00:00', '', '', 0, 166),
(195, 'TIGUAN', 'VOLKSWAGEN TIGUAN', 1, '2017-01-01 08:04:15', '0000-00-00 00:00:00', '', '', 0, 167),
(196, 'MAZDA2', 'MAZDA 2', 1, '2017-01-01 08:04:16', '0000-00-00 00:00:00', '', '', 0, 168),
(197, 'TOUAREG', 'VOLKSWAGEN TOUAREG', 1, '2017-01-01 08:04:17', '0000-00-00 00:00:00', '', '', 0, 169),
(198, 'MAZDA6', 'MAZDA 6', 1, '2017-01-01 08:04:18', '0000-00-00 00:00:00', '', '', 0, 170),
(199, 'RX350', 'RX350', 1, '2017-01-01 08:04:19', '0000-00-00 00:00:00', '', '', 0, 171),
(200, 'MX5', 'MAZDA MX5', 1, '2017-01-01 08:04:20', '0000-00-00 00:00:00', '', '', 0, 172);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `workshops`
--

CREATE TABLE `workshops` (
  `id` int(11) NOT NULL,
  `pdWorkShopTypeId` int(11) NOT NULL,
  `pdCityId` int(11) NOT NULL,
  `code` varchar(150) NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdBy` varchar(150) DEFAULT NULL,
  `updatedBy` varchar(150) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `address` varchar(150) NOT NULL,
  `telephoneNo` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `psxWorkshop` tinyint(1) DEFAULT NULL,
  `spcIntegration` tinyint(1) DEFAULT NULL,
  `runningProductivity` tinyint(1) DEFAULT NULL,
  `combineRenault` tinyint(1) DEFAULT NULL,
  `standaloneRenault` tinyint(1) DEFAULT NULL,
  `poNotificationEmailFrom` varchar(250) DEFAULT NULL,
  `poNotificationEmailTo` varchar(250) DEFAULT NULL,
  `poNotificationEmailCC` varchar(250) DEFAULT NULL,
  `lCSISMSShortName` varchar(250) DEFAULT NULL,
  `lCSIWorkshopContact` varchar(250) DEFAULT NULL,
  `gSTServiceLocation` varchar(250) NOT NULL,
  `bPCode` varchar(250) NOT NULL,
  `bPCode1` varchar(250) NOT NULL,
  `pdRegionId` int(11) NOT NULL,
  `companyRegistrationNo` varchar(250) DEFAULT NULL,
  `totalWorkbayNumber` int(11) NOT NULL,
  `pdCountryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `workshops`
--

INSERT INTO `workshops` (`id`, `pdWorkShopTypeId`, `pdCityId`, `code`, `name`, `status`, `createdDateTime`, `updatedDateTime`, `createdBy`, `updatedBy`, `isDeleted`, `address`, `telephoneNo`, `email`, `psxWorkshop`, `spcIntegration`, `runningProductivity`, `combineRenault`, `standaloneRenault`, `poNotificationEmailFrom`, `poNotificationEmailTo`, `poNotificationEmailCC`, `lCSISMSShortName`, `lCSIWorkshopContact`, `gSTServiceLocation`, `bPCode`, `bPCode1`, `pdRegionId`, `companyRegistrationNo`, `totalWorkbayNumber`, `pdCountryId`) VALUES
(1, 1, 1, 'THANG LONG', 'THANG LONG', 1, '0000-00-00 00:00:00', NULL, NULL, NULL, 0, 'HA NOI', '098871211', 'abc@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '111111', '1111111', '1111', 1, NULL, 1, 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `timeSlotDetailId` (`timeSlotDetailId`),
  ADD KEY `vehicleCustomerId` (`vehicleCustomerId`);

--
-- Chỉ mục cho bảng `bayemployees`
--
ALTER TABLE `bayemployees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bayId` (`bayId`),
  ADD KEY `employeeId` (`employeeId`);

--
-- Chỉ mục cho bảng `bays`
--
ALTER TABLE `bays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pdJobTypeId` (`pdJobTypeId`),
  ADD KEY `pdHoistId` (`pdHoistId`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pdCountryId` (`pdCountryId`),
  ADD KEY `pdIdTypeId` (`pdIdTypeId`),
  ADD KEY `pdRaceId` (`pdRaceId`),
  ADD KEY `pdSalutationId` (`pdSalutationId`),
  ADD KEY `pdOccupationId` (`pdOccupationId`),
  ADD KEY `pdEmploymentStatusId` (`pdEmploymentStatusId`),
  ADD KEY `firstlanguageId` (`firstlanguageId`),
  ADD KEY `secondLanguageId` (`secondLanguageId`);

--
-- Chỉ mục cho bảng `employeeroles`
--
ALTER TABLE `employeeroles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employeeId` (`employeeId`),
  ADD KEY `pdEmployeeRoleId` (`pdEmployeeRoleId`);

--
-- Chỉ mục cho bảng `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `jobfulfilmentitems`
--
ALTER TABLE `jobfulfilmentitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobFulfilmentId` (`jobFulfilmentId`),
  ADD KEY `bayId` (`bayId`),
  ADD KEY `repairOrderJobId` (`repairOrderJobId`),
  ADD KEY `jobFulfilmentItemStatusId` (`jobFulfilmentItemStatusId`);

--
-- Chỉ mục cho bảng `jobfulfilments`
--
ALTER TABLE `jobfulfilments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repairOrderId` (`repairOrderId`),
  ADD KEY `suggestedBayId` (`suggestedBayId`),
  ADD KEY `jobFulfilmentStatusId` (`jobFulfilmentStatusId`);

--
-- Chỉ mục cho bảng `jobgroups`
--
ALTER TABLE `jobgroups`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `jobmasters`
--
ALTER TABLE `jobmasters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobGroupId` (`jobGroupId`),
  ADD KEY `pdJobTypeId` (`pdJobTypeId`);

--
-- Chỉ mục cho bảng `jobpartitems`
--
ALTER TABLE `jobpartitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobPartId` (`jobPartId`),
  ADD KEY `partId` (`partId`);

--
-- Chỉ mục cho bảng `jobpartmasters`
--
ALTER TABLE `jobpartmasters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleVariantId` (`vehicleVariantId`),
  ADD KEY `jobId` (`jobId`);

--
-- Chỉ mục cho bảng `jobprices`
--
ALTER TABLE `jobprices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobId` (`jobId`);

--
-- Chỉ mục cho bảng `jobsections`
--
ALTER TABLE `jobsections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobGroupId` (`jobGroupId`);

--
-- Chỉ mục cho bảng `jobtechnicianfulfilments`
--
ALTER TABLE `jobtechnicianfulfilments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobFulfilmentItemId` (`jobFulfilmentItemId`),
  ADD KEY `employeeId` (`employeeId`);

--
-- Chỉ mục cho bảng `jobtimespentdetails`
--
ALTER TABLE `jobtimespentdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobFulfilmentItemId` (`jobFulfilmentItemId`),
  ADD KEY `jobTimeSpentDetailStatusId` (`jobTimeSpentDetailStatusId`);

--
-- Chỉ mục cho bảng `jpcbs`
--
ALTER TABLE `jpcbs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repairOrderId` (`repairOrderId`),
  ADD KEY `bayId` (`bayId`),
  ADD KEY `serviceAdvisorId` (`serviceAdvisorId`),
  ADD KEY `jPCBStatusId` (`jPCBStatusId`);

--
-- Chỉ mục cho bảng `partmasters`
--
ALTER TABLE `partmasters`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `partprices`
--
ALTER TABLE `partprices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `partId` (`partId`);

--
-- Chỉ mục cho bảng `pdcities`
--
ALTER TABLE `pdcities`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdcomebackjobs`
--
ALTER TABLE `pdcomebackjobs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdcountries`
--
ALTER TABLE `pdcountries`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdemployeeroles`
--
ALTER TABLE `pdemployeeroles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdemployeestatuses`
--
ALTER TABLE `pdemployeestatuses`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdhoisttypes`
--
ALTER TABLE `pdhoisttypes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdidtypes`
--
ALTER TABLE `pdidtypes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdjobfulfilmentitemstatuses`
--
ALTER TABLE `pdjobfulfilmentitemstatuses`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdjobfulfilmentstatuses`
--
ALTER TABLE `pdjobfulfilmentstatuses`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdjobsources`
--
ALTER TABLE `pdjobsources`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdjobstatuses`
--
ALTER TABLE `pdjobstatuses`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdjobtimespentdetailstatuses`
--
ALTER TABLE `pdjobtimespentdetailstatuses`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdjobtypes`
--
ALTER TABLE `pdjobtypes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdjpcbstatuses`
--
ALTER TABLE `pdjpcbstatuses`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdlanguages`
--
ALTER TABLE `pdlanguages`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdoccupations`
--
ALTER TABLE `pdoccupations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdpackagetypes`
--
ALTER TABLE `pdpackagetypes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdparttypes`
--
ALTER TABLE `pdparttypes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdpaymenttypes`
--
ALTER TABLE `pdpaymenttypes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdraces`
--
ALTER TABLE `pdraces`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdregions`
--
ALTER TABLE `pdregions`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdrepairorderbaystatuses`
--
ALTER TABLE `pdrepairorderbaystatuses`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdrepairorderstatuses`
--
ALTER TABLE `pdrepairorderstatuses`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdsalutations`
--
ALTER TABLE `pdsalutations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdstates`
--
ALTER TABLE `pdstates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pdCountryId` (`pdCountryId`);

--
-- Chỉ mục cho bảng `pdtimeslotintervals`
--
ALTER TABLE `pdtimeslotintervals`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdtimeslotspecialdaytypes`
--
ALTER TABLE `pdtimeslotspecialdaytypes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `pdworkshoptypes`
--
ALTER TABLE `pdworkshoptypes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `repairorderbays`
--
ALTER TABLE `repairorderbays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repairOrderBayStatusId` (`repairOrderBayStatusId`);

--
-- Chỉ mục cho bảng `repairorderjobs`
--
ALTER TABLE `repairorderjobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repairOrderId` (`repairOrderId`),
  ADD KEY `servicePackageJobId` (`servicePackageJobId`),
  ADD KEY `jobId` (`jobId`),
  ADD KEY `pdComeBackJobId` (`pdComeBackJobId`),
  ADD KEY `pdPaymentTypeId` (`pdPaymentTypeId`),
  ADD KEY `pdJobSourceId` (`pdJobSourceId`),
  ADD KEY `pdJobStatusId` (`pdJobStatusId`);

--
-- Chỉ mục cho bảng `repairordermasters`
--
ALTER TABLE `repairordermasters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `statusId` (`statusId`),
  ADD KEY `repairordermasters_ibfk_2` (`vehicleCustomerId`),
  ADD KEY `repairordermasters_ibfk_3` (`workShopId`),
  ADD KEY `repairordermasters_ibfk_4` (`appointmentId`);

--
-- Chỉ mục cho bảng `repairorderpartdetails`
--
ALTER TABLE `repairorderpartdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `RepairOrderPartId` (`RepairOrderPartId`),
  ADD KEY `pdPartTypeId` (`pdPartTypeId`);

--
-- Chỉ mục cho bảng `repairorderparts`
--
ALTER TABLE `repairorderparts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repairOrderId` (`repairOrderId`),
  ADD KEY `partId` (`partId`),
  ADD KEY `servicePackagePartId` (`servicePackagePartId`),
  ADD KEY `pdPartTypeId` (`pdPartTypeId`),
  ADD KEY `pdPaymentTypeId` (`pdPaymentTypeId`),
  ADD KEY `repairorderparts_ibfk_6` (`repairOrderJobId`);

--
-- Chỉ mục cho bảng `serviceadvisors`
--
ALTER TABLE `serviceadvisors`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `servicepackagejobs`
--
ALTER TABLE `servicepackagejobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `servicePackageVariantId` (`servicePackageVariantId`),
  ADD KEY `jobId` (`jobId`);

--
-- Chỉ mục cho bảng `servicepackagemasters`
--
ALTER TABLE `servicepackagemasters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pdPackageTypeId` (`pdPackageTypeId`);

--
-- Chỉ mục cho bảng `servicepackageparts`
--
ALTER TABLE `servicepackageparts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `servicePackageJobId` (`servicePackageJobId`),
  ADD KEY `partId` (`partId`);

--
-- Chỉ mục cho bảng `servicepackagevariants`
--
ALTER TABLE `servicepackagevariants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `servicePackageId` (`servicePackageId`),
  ADD KEY `vehicleVariantId` (`vehicleVariantId`);

--
-- Chỉ mục cho bảng `timeslotdetails`
--
ALTER TABLE `timeslotdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `timeSlotId` (`timeSlotId`);

--
-- Chỉ mục cho bảng `timeslotmasters`
--
ALTER TABLE `timeslotmasters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pdTimeSlotIntervalId` (`pdTimeSlotIntervalId`);

--
-- Chỉ mục cho bảng `timeslotspecialdays`
--
ALTER TABLE `timeslotspecialdays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pdTimeSlotSpecialDayTypeId` (`pdTimeSlotSpecialDayTypeId`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD UNIQUE KEY `Users_userName_unique` (`userName`);

--
-- Chỉ mục cho bảng `vehiclecustomers`
--
ALTER TABLE `vehiclecustomers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Chỉ mục cho bảng `vehiclemakes`
--
ALTER TABLE `vehiclemakes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `vehiclemodels`
--
ALTER TABLE `vehiclemodels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleMakeId` (`vehicleMakeId`);

--
-- Chỉ mục cho bảng `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleVariantId` (`vehicleVariantId`);

--
-- Chỉ mục cho bảng `vehiclevariants`
--
ALTER TABLE `vehiclevariants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleModelId` (`vehicleModelId`);

--
-- Chỉ mục cho bảng `workshops`
--
ALTER TABLE `workshops`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pdWorkShopTypeId` (`pdWorkShopTypeId`),
  ADD KEY `pdCityId` (`pdCityId`),
  ADD KEY `pdRegionId` (`pdRegionId`),
  ADD KEY `pdCountryId` (`pdCountryId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `bayemployees`
--
ALTER TABLE `bayemployees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `bays`
--
ALTER TABLE `bays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT cho bảng `employeeroles`
--
ALTER TABLE `employeeroles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `jobfulfilmentitems`
--
ALTER TABLE `jobfulfilmentitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `jobfulfilments`
--
ALTER TABLE `jobfulfilments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `jobgroups`
--
ALTER TABLE `jobgroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT cho bảng `jobmasters`
--
ALTER TABLE `jobmasters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT cho bảng `jobpartitems`
--
ALTER TABLE `jobpartitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `jobpartmasters`
--
ALTER TABLE `jobpartmasters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `jobprices`
--
ALTER TABLE `jobprices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `jobsections`
--
ALTER TABLE `jobsections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `jobtechnicianfulfilments`
--
ALTER TABLE `jobtechnicianfulfilments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `jobtimespentdetails`
--
ALTER TABLE `jobtimespentdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `jpcbs`
--
ALTER TABLE `jpcbs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `partmasters`
--
ALTER TABLE `partmasters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT cho bảng `partprices`
--
ALTER TABLE `partprices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `pdcities`
--
ALTER TABLE `pdcities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT cho bảng `pdcomebackjobs`
--
ALTER TABLE `pdcomebackjobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT cho bảng `pdcountries`
--
ALTER TABLE `pdcountries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT cho bảng `pdemployeeroles`
--
ALTER TABLE `pdemployeeroles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `pdemployeestatuses`
--
ALTER TABLE `pdemployeestatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT cho bảng `pdhoisttypes`
--
ALTER TABLE `pdhoisttypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `pdidtypes`
--
ALTER TABLE `pdidtypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `pdjobfulfilmentitemstatuses`
--
ALTER TABLE `pdjobfulfilmentitemstatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `pdjobfulfilmentstatuses`
--
ALTER TABLE `pdjobfulfilmentstatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `pdjobsources`
--
ALTER TABLE `pdjobsources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT cho bảng `pdjobstatuses`
--
ALTER TABLE `pdjobstatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `pdjobtimespentdetailstatuses`
--
ALTER TABLE `pdjobtimespentdetailstatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `pdjobtypes`
--
ALTER TABLE `pdjobtypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `pdjpcbstatuses`
--
ALTER TABLE `pdjpcbstatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `pdlanguages`
--
ALTER TABLE `pdlanguages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT cho bảng `pdoccupations`
--
ALTER TABLE `pdoccupations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT cho bảng `pdpackagetypes`
--
ALTER TABLE `pdpackagetypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `pdparttypes`
--
ALTER TABLE `pdparttypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `pdpaymenttypes`
--
ALTER TABLE `pdpaymenttypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT cho bảng `pdraces`
--
ALTER TABLE `pdraces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `pdregions`
--
ALTER TABLE `pdregions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `pdrepairorderbaystatuses`
--
ALTER TABLE `pdrepairorderbaystatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `pdrepairorderstatuses`
--
ALTER TABLE `pdrepairorderstatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `pdsalutations`
--
ALTER TABLE `pdsalutations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `pdstates`
--
ALTER TABLE `pdstates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `pdtimeslotintervals`
--
ALTER TABLE `pdtimeslotintervals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `pdtimeslotspecialdaytypes`
--
ALTER TABLE `pdtimeslotspecialdaytypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `pdworkshoptypes`
--
ALTER TABLE `pdworkshoptypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `repairorderbays`
--
ALTER TABLE `repairorderbays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `repairorderjobs`
--
ALTER TABLE `repairorderjobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT cho bảng `repairordermasters`
--
ALTER TABLE `repairordermasters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT cho bảng `repairorderpartdetails`
--
ALTER TABLE `repairorderpartdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `repairorderparts`
--
ALTER TABLE `repairorderparts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT cho bảng `serviceadvisors`
--
ALTER TABLE `serviceadvisors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `servicepackagejobs`
--
ALTER TABLE `servicepackagejobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT cho bảng `servicepackagemasters`
--
ALTER TABLE `servicepackagemasters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `servicepackageparts`
--
ALTER TABLE `servicepackageparts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT cho bảng `servicepackagevariants`
--
ALTER TABLE `servicepackagevariants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `timeslotdetails`
--
ALTER TABLE `timeslotdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `timeslotmasters`
--
ALTER TABLE `timeslotmasters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `timeslotspecialdays`
--
ALTER TABLE `timeslotspecialdays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `vehiclecustomers`
--
ALTER TABLE `vehiclecustomers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT cho bảng `vehiclemakes`
--
ALTER TABLE `vehiclemakes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
--
-- AUTO_INCREMENT cho bảng `vehiclemodels`
--
ALTER TABLE `vehiclemodels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;
--
-- AUTO_INCREMENT cho bảng `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;
--
-- AUTO_INCREMENT cho bảng `vehiclevariants`
--
ALTER TABLE `vehiclevariants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;
--
-- AUTO_INCREMENT cho bảng `workshops`
--
ALTER TABLE `workshops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`timeSlotDetailId`) REFERENCES `timeslotdetails` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`vehicleCustomerId`) REFERENCES `vehiclecustomers` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `bayemployees`
--
ALTER TABLE `bayemployees`
  ADD CONSTRAINT `bayemployees_ibfk_1` FOREIGN KEY (`bayId`) REFERENCES `bays` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bayemployees_ibfk_2` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `bays`
--
ALTER TABLE `bays`
  ADD CONSTRAINT `bays_ibfk_1` FOREIGN KEY (`pdJobTypeId`) REFERENCES `pdjobtypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `bays_ibfk_2` FOREIGN KEY (`pdHoistId`) REFERENCES `pdhoisttypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`pdCountryId`) REFERENCES `pdcountries` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `customers_ibfk_2` FOREIGN KEY (`pdIdTypeId`) REFERENCES `pdidtypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `customers_ibfk_3` FOREIGN KEY (`pdRaceId`) REFERENCES `pdraces` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `customers_ibfk_4` FOREIGN KEY (`pdSalutationId`) REFERENCES `pdsalutations` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `customers_ibfk_5` FOREIGN KEY (`pdOccupationId`) REFERENCES `pdoccupations` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `customers_ibfk_6` FOREIGN KEY (`pdEmploymentStatusId`) REFERENCES `pdemployeestatuses` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `customers_ibfk_7` FOREIGN KEY (`firstlanguageId`) REFERENCES `pdlanguages` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `customers_ibfk_8` FOREIGN KEY (`secondLanguageId`) REFERENCES `pdlanguages` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `employeeroles`
--
ALTER TABLE `employeeroles`
  ADD CONSTRAINT `employeeroles_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employeeroles_ibfk_2` FOREIGN KEY (`pdEmployeeRoleId`) REFERENCES `pdemployeeroles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `jobfulfilmentitems`
--
ALTER TABLE `jobfulfilmentitems`
  ADD CONSTRAINT `jobfulfilmentitems_ibfk_1` FOREIGN KEY (`jobFulfilmentId`) REFERENCES `jobfulfilments` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jobfulfilmentitems_ibfk_2` FOREIGN KEY (`bayId`) REFERENCES `bays` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jobfulfilmentitems_ibfk_3` FOREIGN KEY (`repairOrderJobId`) REFERENCES `repairorderjobs` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jobfulfilmentitems_ibfk_4` FOREIGN KEY (`jobFulfilmentItemStatusId`) REFERENCES `pdjobfulfilmentitemstatuses` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `jobfulfilments`
--
ALTER TABLE `jobfulfilments`
  ADD CONSTRAINT `jobfulfilments_ibfk_1` FOREIGN KEY (`repairOrderId`) REFERENCES `repairordermasters` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jobfulfilments_ibfk_2` FOREIGN KEY (`suggestedBayId`) REFERENCES `bays` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jobfulfilments_ibfk_3` FOREIGN KEY (`jobFulfilmentStatusId`) REFERENCES `pdjobfulfilmentstatuses` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `jobmasters`
--
ALTER TABLE `jobmasters`
  ADD CONSTRAINT `jobmasters_ibfk_1` FOREIGN KEY (`jobGroupId`) REFERENCES `jobgroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jobmasters_ibfk_2` FOREIGN KEY (`pdJobTypeId`) REFERENCES `pdjobtypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `jobpartitems`
--
ALTER TABLE `jobpartitems`
  ADD CONSTRAINT `jobpartitems_ibfk_1` FOREIGN KEY (`jobPartId`) REFERENCES `jobpartmasters` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jobpartitems_ibfk_2` FOREIGN KEY (`partId`) REFERENCES `partmasters` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `jobpartmasters`
--
ALTER TABLE `jobpartmasters`
  ADD CONSTRAINT `jobpartmasters_ibfk_1` FOREIGN KEY (`vehicleVariantId`) REFERENCES `vehiclevariants` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jobpartmasters_ibfk_2` FOREIGN KEY (`jobId`) REFERENCES `jobmasters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `jobprices`
--
ALTER TABLE `jobprices`
  ADD CONSTRAINT `jobprices_ibfk_1` FOREIGN KEY (`jobId`) REFERENCES `jobmasters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `jobsections`
--
ALTER TABLE `jobsections`
  ADD CONSTRAINT `jobsections_ibfk_1` FOREIGN KEY (`jobGroupId`) REFERENCES `jobgroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `jobtechnicianfulfilments`
--
ALTER TABLE `jobtechnicianfulfilments`
  ADD CONSTRAINT `jobtechnicianfulfilments_ibfk_1` FOREIGN KEY (`jobFulfilmentItemId`) REFERENCES `jobfulfilmentitems` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jobtechnicianfulfilments_ibfk_2` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `jobtimespentdetails`
--
ALTER TABLE `jobtimespentdetails`
  ADD CONSTRAINT `jobtimespentdetails_ibfk_1` FOREIGN KEY (`jobFulfilmentItemId`) REFERENCES `jobfulfilmentitems` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jobtimespentdetails_ibfk_2` FOREIGN KEY (`jobTimeSpentDetailStatusId`) REFERENCES `pdjobtimespentdetailstatuses` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `jpcbs`
--
ALTER TABLE `jpcbs`
  ADD CONSTRAINT `jpcbs_ibfk_1` FOREIGN KEY (`repairOrderId`) REFERENCES `repairordermasters` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jpcbs_ibfk_2` FOREIGN KEY (`bayId`) REFERENCES `bays` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jpcbs_ibfk_3` FOREIGN KEY (`serviceAdvisorId`) REFERENCES `serviceadvisors` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jpcbs_ibfk_4` FOREIGN KEY (`jPCBStatusId`) REFERENCES `pdjpcbstatuses` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `partprices`
--
ALTER TABLE `partprices`
  ADD CONSTRAINT `partprices_ibfk_1` FOREIGN KEY (`partId`) REFERENCES `partmasters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `pdstates`
--
ALTER TABLE `pdstates`
  ADD CONSTRAINT `pdstates_ibfk_1` FOREIGN KEY (`pdCountryId`) REFERENCES `pdcountries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `repairorderbays`
--
ALTER TABLE `repairorderbays`
  ADD CONSTRAINT `repairorderbays_ibfk_1` FOREIGN KEY (`repairOrderBayStatusId`) REFERENCES `pdrepairorderbaystatuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `repairorderjobs`
--
ALTER TABLE `repairorderjobs`
  ADD CONSTRAINT `repairorderjobs_ibfk_1` FOREIGN KEY (`repairOrderId`) REFERENCES `repairordermasters` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `repairorderjobs_ibfk_2` FOREIGN KEY (`servicePackageJobId`) REFERENCES `servicepackagejobs` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `repairorderjobs_ibfk_3` FOREIGN KEY (`jobId`) REFERENCES `jobmasters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `repairorderjobs_ibfk_4` FOREIGN KEY (`pdComeBackJobId`) REFERENCES `pdcomebackjobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `repairorderjobs_ibfk_5` FOREIGN KEY (`pdPaymentTypeId`) REFERENCES `pdpaymenttypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `repairorderjobs_ibfk_6` FOREIGN KEY (`pdJobSourceId`) REFERENCES `pdjobsources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `repairorderjobs_ibfk_7` FOREIGN KEY (`pdJobStatusId`) REFERENCES `pdjobstatuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `repairordermasters`
--
ALTER TABLE `repairordermasters`
  ADD CONSTRAINT `repairordermasters_ibfk_1` FOREIGN KEY (`statusId`) REFERENCES `pdrepairorderstatuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `repairordermasters_ibfk_2` FOREIGN KEY (`vehicleCustomerId`) REFERENCES `vehiclecustomers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `repairordermasters_ibfk_3` FOREIGN KEY (`workShopId`) REFERENCES `workshops` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `repairordermasters_ibfk_4` FOREIGN KEY (`appointmentId`) REFERENCES `appointments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `repairorderpartdetails`
--
ALTER TABLE `repairorderpartdetails`
  ADD CONSTRAINT `repairorderpartdetails_ibfk_1` FOREIGN KEY (`RepairOrderPartId`) REFERENCES `repairorderparts` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `repairorderpartdetails_ibfk_2` FOREIGN KEY (`pdPartTypeId`) REFERENCES `pdparttypes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `repairorderparts`
--
ALTER TABLE `repairorderparts`
  ADD CONSTRAINT `repairorderparts_ibfk_1` FOREIGN KEY (`repairOrderId`) REFERENCES `repairordermasters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `repairorderparts_ibfk_2` FOREIGN KEY (`partId`) REFERENCES `partmasters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `repairorderparts_ibfk_3` FOREIGN KEY (`servicePackagePartId`) REFERENCES `servicepackageparts` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `repairorderparts_ibfk_4` FOREIGN KEY (`pdPartTypeId`) REFERENCES `pdparttypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `repairorderparts_ibfk_5` FOREIGN KEY (`pdPaymentTypeId`) REFERENCES `pdpaymenttypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `repairorderparts_ibfk_6` FOREIGN KEY (`repairOrderJobId`) REFERENCES `repairorderjobs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `servicepackagejobs`
--
ALTER TABLE `servicepackagejobs`
  ADD CONSTRAINT `servicepackagejobs_ibfk_1` FOREIGN KEY (`servicePackageVariantId`) REFERENCES `servicepackagevariants` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `servicepackagejobs_ibfk_2` FOREIGN KEY (`jobId`) REFERENCES `jobmasters` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `servicepackagemasters`
--
ALTER TABLE `servicepackagemasters`
  ADD CONSTRAINT `servicepackagemasters_ibfk_1` FOREIGN KEY (`pdPackageTypeId`) REFERENCES `pdpackagetypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `servicepackageparts`
--
ALTER TABLE `servicepackageparts`
  ADD CONSTRAINT `servicepackageparts_ibfk_1` FOREIGN KEY (`servicePackageJobId`) REFERENCES `servicepackagejobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `servicepackageparts_ibfk_2` FOREIGN KEY (`partId`) REFERENCES `partmasters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `servicepackagevariants`
--
ALTER TABLE `servicepackagevariants`
  ADD CONSTRAINT `servicepackagevariants_ibfk_1` FOREIGN KEY (`servicePackageId`) REFERENCES `servicepackagemasters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `servicepackagevariants_ibfk_2` FOREIGN KEY (`vehicleVariantId`) REFERENCES `vehiclevariants` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `timeslotdetails`
--
ALTER TABLE `timeslotdetails`
  ADD CONSTRAINT `timeslotdetails_ibfk_1` FOREIGN KEY (`timeSlotId`) REFERENCES `timeslotmasters` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `timeslotmasters`
--
ALTER TABLE `timeslotmasters`
  ADD CONSTRAINT `timeslotmasters_ibfk_1` FOREIGN KEY (`pdTimeSlotIntervalId`) REFERENCES `pdtimeslotintervals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `timeslotspecialdays`
--
ALTER TABLE `timeslotspecialdays`
  ADD CONSTRAINT `timeslotspecialdays_ibfk_1` FOREIGN KEY (`pdTimeSlotSpecialDayTypeId`) REFERENCES `pdtimeslotspecialdaytypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `vehiclecustomers`
--
ALTER TABLE `vehiclecustomers`
  ADD CONSTRAINT `vehiclecustomers_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vehiclecustomers_ibfk_2` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `vehiclemodels`
--
ALTER TABLE `vehiclemodels`
  ADD CONSTRAINT `vehiclemodels_ibfk_1` FOREIGN KEY (`vehicleMakeId`) REFERENCES `vehiclemakes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`vehicleVariantId`) REFERENCES `vehiclevariants` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `vehiclevariants`
--
ALTER TABLE `vehiclevariants`
  ADD CONSTRAINT `vehiclevariants_ibfk_1` FOREIGN KEY (`vehicleModelId`) REFERENCES `vehiclemodels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `workshops`
--
ALTER TABLE `workshops`
  ADD CONSTRAINT `workshops_ibfk_1` FOREIGN KEY (`pdWorkShopTypeId`) REFERENCES `pdworkshoptypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `workshops_ibfk_2` FOREIGN KEY (`pdCityId`) REFERENCES `pdcities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `workshops_ibfk_3` FOREIGN KEY (`pdRegionId`) REFERENCES `pdcountries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `workshops_ibfk_4` FOREIGN KEY (`pdCountryId`) REFERENCES `pdcountries` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
