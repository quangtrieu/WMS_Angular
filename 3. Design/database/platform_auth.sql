-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th4 21, 2017 lúc 10:34 SA
-- Phiên bản máy phục vụ: 5.7.17-log
-- Phiên bản PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `platform_auth`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accesstokens`
--

CREATE TABLE `accesstokens` (
  `id` int(11) NOT NULL,
  `jti` varchar(255) DEFAULT NULL,
  `token` text NOT NULL,
  `expirationDate` datetime NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdUser` varchar(255) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `ClientId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `accesstokens`
--

INSERT INTO `accesstokens` (`id`, `jti`, `token`, `expirationDate`, `createdDateTime`, `updatedDateTime`, `createdUser`, `scope`, `createdAt`, `updatedAt`, `UserId`, `ClientId`) VALUES
(1, '7d437ade-6f4f-4fad-b987-867feb1f197f', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDQzN2FkZS02ZjRmLTRmYWQtYjk4Ny04NjdmZWIxZjE5N2YiLCJzdWIiOiIiLCJleHAiOjE0OTI3NjY3NDMsImlhdCI6MTQ5Mjc2MzE0M30.G_8IvR26L_-zDFKPFeFHMWZBWpu_HwUpLzBFiyUKXHgGsHsDJqZV9R0xbvxa1rOoOKy6JR-RxylBR1EzOTgMjcmVbmST4_2yWTM13DrxhFn-iltEQ5rZMUL11ie6-gtzCCzwpuxOhwQqRibqCdKXTbwQKSvEEUs1AVCcTDSy52mBNBG8MR9gAEu6g8jO2_4f37hQsDGpibLXq1eyZ9ID6wnQ6dRXTBppqYg3CQ7XoZeiRPoev7zUl6nagGxuZqmoweQCH9GODRBnsspbXiPX8twfawMwfOUKQBL4k8XtIco8H4mQ4sdKK6qtvumgvtEoHZM0OHyzhnEQeh8j3iFo4g', '2017-04-21 09:25:43', '2017-04-21 08:25:43', '2017-04-21 08:25:43', 'system', NULL, '2017-04-21 08:25:43', '2017-04-21 08:25:43', NULL, NULL),
(2, 'f84b641f-80f8-48cf-a5cc-f90bbe5a9b78', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmODRiNjQxZi04MGY4LTQ4Y2YtYTVjYy1mOTBiYmU1YTliNzgiLCJzdWIiOjEsImV4cCI6MTQ5Mjc2ODQ2OCwiaWF0IjoxNDkyNzY0ODY4fQ.byViWhI6VjMogQ_lFCqRzhnGdee_d6y1RnT52kcJtvzO9obe-nJZEaGji8f14CjAtX46ovKVbUScmSvxA57gCSGdmItZc-99nJ1Tzz_EfQp64LzhC8k0Wyi8S7NzOrt0wx_jwc_Xh2pCkgD49a54NgMLVqMtk-DCOeOImtiABNeWpakgRZnsm8hzlGUF1VmQ2Kl3E-TEpXrQFlT5Sl4Ppz3zQDJrlmD6_LXi-pbPOJMZ5eJd1ardAsxMk0RXwDjp2STkdU4HYlsafDXV7tOWTZuEjOKJHwCzxtx8zpOsm__Nn7ghYYgVwVW82gQTat3bPQ_qpdVKPdx5ScJugdTVqQ', '2017-04-21 09:54:28', '2017-04-21 08:54:28', '2017-04-21 08:54:28', 'system', NULL, '2017-04-21 08:54:28', '2017-04-21 08:54:28', NULL, 2),
(3, '734f2e26-644c-4491-8ca0-cc2e4cbc88c2', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MzRmMmUyNi02NDRjLTQ0OTEtOGNhMC1jYzJlNGNiYzg4YzIiLCJzdWIiOiIiLCJleHAiOjE0OTI3Njg4OTEsImlhdCI6MTQ5Mjc2NTI5MX0.mGrLzNzXK-3bpE96FxNZtufBS-qYnP9yeYnBHej6zaZ_sAcFkxLTYR5sKcYnllrGa1Nh0AhphVMJ1bOYgKNaIAakLNgScTkbyy3xJelA7LoEUbUn0v5BPInyVaf9X4ZLhYiy1ZS1NOpC-fvo--ni7hyUTHWlJD4f-wrbKBN-wzQXwubSqeCs_DtrnlhFQQgJuYklK2Z0YQGNFEp-QvdNdaFdngzqzx6cH6i-ZPfAVl202276hf0gXPxJpTbzMsu8Z38rAUtpOqb4Ida5EXKb9Crs7YE8hRyvztS-Cip1XQjzIkD3Qas18Z7VB6X9sSdKNlV7l4xHrFG76CdBHIt-Bg', '2017-04-21 10:01:31', '2017-04-21 09:01:31', '2017-04-21 09:01:31', 'system', 'offline_access', '2017-04-21 09:01:31', '2017-04-21 09:01:31', NULL, NULL),
(4, 'ab321321-8413-497a-9261-aa7de98005a6', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYjMyMTMyMS04NDEzLTQ5N2EtOTI2MS1hYTdkZTk4MDA1YTYiLCJzdWIiOiIiLCJleHAiOjE0OTI3NjkxMzcsImlhdCI6MTQ5Mjc2NTUzN30.D_FG3f6vkCB4RlfL9BzE6ElPYycFxTndSoAoOsE2l8OE1bMpOsFOig3EtE8Z_nQQA2E4mprfh3EoXTBodWb3hJzdkQkM7JrkwwT-rBOY23Lz_KxZsX4xRsG6yKlSxvui-mAyrvyOCDrGoCJ4oPQvZSaQO4zhQje8imUeb_dNgP5nmmPPFlGuP0TBlyLwIhx1ugAq0oiQo0H1nXmkNmwxMLLfq55DHDVQIkAst8kU3N8oo2AF_ZVbIMNjIURESfK3VFSiEf3TahLOjtKWSY0w-Tel5QCXZtPRhTcSH-S_ClR6NMLo4JjXNpDDsES0yYE3G-Heq4sy-_gRvXJ_YSKcvQ', '2017-04-21 10:05:37', '2017-04-21 09:05:37', '2017-04-21 09:05:37', 'system', 'offline_access', '2017-04-21 09:05:37', '2017-04-21 09:05:37', NULL, NULL),
(5, 'f3148477-6be1-457b-ae42-15823ba3298b', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMzE0ODQ3Ny02YmUxLTQ1N2ItYWU0Mi0xNTgyM2JhMzI5OGIiLCJzdWIiOiIiLCJleHAiOjE0OTI3NjkyMDgsImlhdCI6MTQ5Mjc2NTYwOH0.kJOsFl_5IKTGubHuy6huA3BD7-RzQZbPRuSh9m1lkaIVlnmVxvkFew_G9F_VP3tGJQjyYyly-6UCS7D-cCQ9678yH_kcaofyuyQzKcMsccp2lzyRID1pJ2FsKIazXsalejyZPW1Rfg-ijz1SfaNDAmuQREaMJ0OdJ61yfVFwynqgLsPWeLpmkpreLcjRy6Y6eHtG5cW1k2mNlPf3mkcE810A0sg-pn8dOsa3jxMJcUINmEaFiYoBvH8InJ2DZW6_sAUuFIOJMjymOjVzNzvlgHVu7lbu-B2zlyxPRtFwqDc_-0-Lk5JsqcckyfZGYYwE6eC-irze729NqMKEasxyiA', '2017-04-21 10:06:48', '2017-04-21 09:06:48', '2017-04-21 09:06:48', 'system', 'offline_access', '2017-04-21 09:06:48', '2017-04-21 09:06:48', NULL, NULL),
(6, '6573c4e8-0501-48f1-9f0a-f7a30763a954', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NTczYzRlOC0wNTAxLTQ4ZjEtOWYwYS1mN2EzMDc2M2E5NTQiLCJzdWIiOjEsImV4cCI6MTQ5Mjc2OTMxMCwiaWF0IjoxNDkyNzY1NzEwfQ.Mf6yaCmUMuUkBp6duHY0msZKTidFEu_KjSD970DrYnqjAYZqeizq6lXf4irhvTOeKtEgCtDmmM4CQcMYWNOlYKUiZ1zpAJZjLFh_RPt3C4wJ6YcK9zrN_jpKa_amK1auXmmnSoWb3qyMs1ZFradSWA1qdyAQ6Ir9EjuvDKqwaux-9JY4Vv3-D_qMAOtWbXB8MQZ-NFA9816UNo5CWxU2GWjMVjbYWz51lIB2EwqYHDGWzyzlYGu284TXhgxyOtmxnT-PRHYuzgo7Wy9LE8CieUUGAueSBF5VGd85M0KrRClWMwTY711mIFGYe9hGpoTw1sHMMDefp9R-eIf-XHCqNQ', '2017-04-21 10:08:30', '2017-04-21 09:08:30', '2017-04-21 09:08:30', 'system', 'offline_access', '2017-04-21 09:08:30', '2017-04-21 09:08:30', NULL, 2),
(7, '923fc34a-2e0f-4a62-96d4-b77b611c4ff9', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjNmYzM0YS0yZTBmLTRhNjItOTZkNC1iNzdiNjExYzRmZjkiLCJzdWIiOjEsImV4cCI6MTQ5Mjc2OTQxMSwiaWF0IjoxNDkyNzY1ODExfQ.pAeAzOOHT_-YRAlxugWRiLkc32T38WXByR-e-PJvWARHB-3lAuwUTQNnDTjIiD7ts1Y9HnUkT4H-3LpbsZAsbO-jEp90SZNt99ILGPjlEecCKQP2A3BKiaPnDb2kQM5waCfjvD9jam9a8VPWE2ymgqPcfutY7VaYSwdjefb0EBUK-VBpYtDCP707x8bERtnoKaAXrkrXA-GhSKNiXke4Qh2rh1Y6zyUWBKc1tL9ukrf4ZDh1DuBFZGpik_tvhX8ylVbbJMldc4SHKJAteZwFUEExPflIoaHzFDFTkS0fYOfE3QC4BnckV2xjlxZuEikxiOhyjwFJK-tkux2YDHhxXA', '2017-04-21 10:10:11', '2017-04-21 09:10:11', '2017-04-21 09:10:11', 'system', 'offline_access', '2017-04-21 09:10:11', '2017-04-21 09:10:11', NULL, 2),
(8, 'e7c6896d-89ec-4d8b-a5a7-57741c06e6d6', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlN2M2ODk2ZC04OWVjLTRkOGItYTVhNy01Nzc0MWMwNmU2ZDYiLCJzdWIiOjEsImV4cCI6MTQ5Mjc2OTQ2NywiaWF0IjoxNDkyNzY1ODY3fQ.dobj0fv5zH1VSN1XhrKQVoS__uQBZWhH7aow8RVPK-NTGyUWqCMAuSl_vzrM2C5psOPSiJDtmm54YZTXxxSsvTV_6YfSpYlMhhjxvzbgf5BhV71Nuh3O1w9TL-1gB3oGgcYmPbxEkjjEZNnrYnA4HcMGD5SiUynvDblK2zVLNgErP5JpG2PQ5u77tOFuk5mhuRMf-f00-FUHKshaszXLQiABdwA1f-LTBg3ZVcq-4mwZPXwxcBc0EP0tlBQyuxS8euWFJq-9zUVipjUV5fEw83C6b3YDTtZyc08hzXk7xJ4GI8BhlEoVQ01-Y9WDZEKQYWcyGyCuuChoT1g9Ewgpew', '2017-04-21 10:11:07', '2017-04-21 09:11:07', '2017-04-21 09:11:07', 'system', 'offline_access', '2017-04-21 09:11:07', '2017-04-21 09:11:07', NULL, 2),
(9, '5ae730f0-7492-4f82-a0c5-b7dd8147999b', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YWU3MzBmMC03NDkyLTRmODItYTBjNS1iN2RkODE0Nzk5OWIiLCJzdWIiOjEsImV4cCI6MTQ5Mjc2OTU4MSwiaWF0IjoxNDkyNzY1OTgxfQ.i-23ksRkKCZyyYQiPpDZyjKU81xVTNX8eNGzIwg7PRUcRN1-m1_sbUrjZKCkiu8e91Navo47_I8yS0bcKraj_EO5cws-j-ldAKNBNkSPjuw8QI23AS97SoWyOFcE0EdU9yYTFLVfmTkVque3ZnF1plAQor4L6z4UdV-PIRUm3DhCRfcm7iSHmZW1rWmka4L-L8ORIDpOdUhY7jqvuQXqwU0kSGTGnST59Rj5x3v6OUYBNdVWfqJoe_8OhjnnFy3xz0VtVH6TfgsA6tdMS5Sz9fdahLXnz22stkprwPB3kzPiycdA16pku_4VVmFUGFZmKS49A6hn9XQNvXASQeSqoQ', '2017-04-21 10:13:01', '2017-04-21 09:13:01', '2017-04-21 09:13:01', 'system', NULL, '2017-04-21 09:13:01', '2017-04-21 09:13:01', NULL, 2),
(10, 'c7cbbe5a-81b9-4c1e-bcb5-147ae344c3a1', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjN2NiYmU1YS04MWI5LTRjMWUtYmNiNS0xNDdhZTM0NGMzYTEiLCJzdWIiOjEsImV4cCI6MTQ5Mjc2OTg0OSwiaWF0IjoxNDkyNzY2MjQ5fQ.Ftal4X5zj3IFkNiWH7p2YjWAxlAKSv9avJdztWu0UGOkOViIZKDEtxFEO79PF8Dj3kXJP0SuCX2_IsLjUS-1hfQwpSdEcik1CitJSp5p9ST1ZPj29OdwhOZ0dCPaZ50gegh1g01j_lN1dALnXIJls8RRGXWFmIS85EUJZ760QslPFJ-yV0q56QzH0owyYvyUTD2WiXR0bebnWc1PDwXzgpjlQO0fEvLTTs7erG24b9tip74FDTd0WMF1krhXAFLD8T9L5bB8zqLI_UhJdRjQJSjf4aOTtAi5RNloLEEGiNp7EylG3n91eFtKQyq5bSXnDAl4s9Xihhhhy3PmXpITWQ', '2017-04-21 10:17:29', '2017-04-21 09:17:29', '2017-04-21 09:17:29', 'system', NULL, '2017-04-21 09:17:29', '2017-04-21 09:17:29', NULL, 2),
(11, '01f6fbe6-80dd-4714-8b58-d4000738a935', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMWY2ZmJlNi04MGRkLTQ3MTQtOGI1OC1kNDAwMDczOGE5MzUiLCJzdWIiOjEsImV4cCI6MTQ5Mjc3MDUwOCwiaWF0IjoxNDkyNzY2OTA4fQ.Y1gEMFQgJRe_MuUbsR8EZBPH6PWHEpcMyIHhE4-cZqriQUtr3PTGoUTvfo7F_4lk0Q68LGSVZ0pkr3oFAz2cBbTdPeauWxCNtWmPk9yPDvMWXXuYEYwXYCqlbVivBYglob7JRQY0Y6gv7kSTt2QvfwG0uAIk9M9D0ne8ob1c33x-u7aeNjlHFlBwPqSrIK8sPw6dbDO_ZEQNVHOrF5ZCI06DwhOq7A7CfeFp_0vAmigH_umX4WTovdaL5pl4ViR7_mapCND-A1ORZ0tW1kMfHLPrld4xsm8Y01EjU9k1FkbdKiTqHp0298sY8yYbpwsTL0iEEiNgzCVGcjbLV7Y3gQ', '2017-04-21 10:28:28', '2017-04-21 09:28:28', '2017-04-21 09:28:28', 'system', NULL, '2017-04-21 09:28:28', '2017-04-21 09:28:28', NULL, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `authorizationcodes`
--

CREATE TABLE `authorizationcodes` (
  `id` int(11) NOT NULL,
  `code` text NOT NULL,
  `jti` varchar(255) DEFAULT NULL,
  `redirectURI` varchar(500) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdUser` varchar(255) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `ClientId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `authorizationcodes`
--

INSERT INTO `authorizationcodes` (`id`, `code`, `jti`, `redirectURI`, `createdDateTime`, `updatedDateTime`, `createdUser`, `scope`, `createdAt`, `updatedAt`, `UserId`, `ClientId`) VALUES
(1, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNWEzYWMzNC0xMDMwLTRkYWMtOWNhMS0wNGI4YjhhY2Y2ZjAiLCJzdWIiOjEsImV4cCI6MTQ5Mjc2MzM5NywiaWF0IjoxNDkyNzYzMDk3fQ.02uvN_BYJpCHx9UySZNCgIppB31V2mS_0sgZ7Mlfuex26RjYKT6TmSnfXpsbuBvzyf6UOvoePS3YTIIrXOXlGS8-1CnjoN761Z2y6xjVv_FWasDd86ZDYG4GR4N8KvqNk2Wz9Cqem3oN6v6dRUbev5qCX1U2K-ukKWAWFGF2rKlCzl2wFy1YKMX4JmhOIFsUjtmzIigq_MkyRf72qd6m1oL4a7aG-pP3LC_arX5Mv1phWE54-k0YUeIjVLyXL9CHW6s3lvBbvzz0YySEx3SauuRr0ggOUa9eANw_EbtQ0RXi685UO6qyNxujZ8B10m5m-1AFbxZs6Da-8YblPIte4A', '35a3ac34-1030-4dac-9ca1-04b8b8acf6f0', 'https://localhost:5000', '2017-04-21 08:24:57', '2017-04-21 08:24:57', 'system', NULL, '2017-04-21 08:24:57', '2017-04-21 08:24:57', NULL, 2),
(2, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYjBjZjg1ZS00ZDVkLTQ1YmYtODg0ZS0xNjFiYzIzNTY0M2MiLCJzdWIiOjEsImV4cCI6MTQ5Mjc2NDg5MywiaWF0IjoxNDkyNzY0NTkzfQ.jSY5_Ce53MnQwbJWK7oDFpFahSRZm2MJmgCcLqWMFJ02F1-EvAJEK-XygTc3yVyKQfzZ93ATlEhfQfzb5frEpGVWy_e21eJdVW_bt7zV-VBrsR0Jtt2OD5AkNHkYG7sg_zZ4jwr3fd1GmFgxeYN4igbKZA2vyzPU_Hy52_Y6wlDJWA9ibDDoSQjyq3GoTk2UkpMrZxeQFemnp3V9ycnfPuApBTNpYBLZYG5HaQQRgVv8nYz6Pa_jS-B-PSFXRFxg9NHhYLlY_ElmDdM8MjpINTDJacbByr9HPWc4YV7SMEFMzyxUV9Ld_mGeLJU9auqVtFjyq9QUYgPOXdFGVKOPJA', '3b0cf85e-4d5d-45bf-884e-161bc235643c', 'https://localhost:5000', '2017-04-21 08:50:05', '2017-04-21 08:49:53', 'system', NULL, '2017-04-21 08:50:05', '2017-04-21 08:50:05', NULL, 2),
(3, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NWU0MzFjNi02ZTE2LTRiZmQtOGViZS01OGRjMDUzMWY4MWIiLCJzdWIiOjEsImV4cCI6MTQ5Mjc2NTA5OSwiaWF0IjoxNDkyNzY0Nzk5fQ.fY70vxMmM0sseNIVs2F7Hgv3A62Aru8YRMfps4Cy-S6EE3JedgLmQaPdxlE7I6K2OCi2FNntD9OBZkLbeqCNg_QL4Si3MQQtP_5n1ZAeTnAIxkhBlOZIssEP9dKeezp5e5yAhkDB3WrqyE7xTSo5PlkTs-yMzuEbyEozbUN-KiM540KoJHIxfyNvRu6n0D7krMuxDjX5w_w-AEGlAWwD0sniCR0viS3sMswCOA646M7EI2-Y31HnGgcPWcnkUL4ieKueRopDK9J0pC_pQz0R4Z_oB34DwYO0dgCfFCWK4xrAYloVD_bk-T0Lpd8OtHChLSpHJP_m6bm0pMPFC75T2g', '85e431c6-6e16-4bfd-8ebe-58dc0531f81b', 'https://localhost:5000', '2017-04-21 08:53:20', '2017-04-21 08:53:19', 'system', NULL, '2017-04-21 08:53:20', '2017-04-21 08:53:20', NULL, 2),
(4, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZDI4NjMxNS1iZWNmLTQxZjctYmFkMC0xM2EzOTM4MzRmNWMiLCJzdWIiOjEsImV4cCI6MTQ5Mjc2NjI3MywiaWF0IjoxNDkyNzY1OTczfQ.habhPlD2Au2OHYKDjMviqGr7L4n5CBk2KKh-wYhNL0GaxESga7YnzwkdyeCYY2ONUX0DODHdsNE9qKC1f12PJSszCKxvZXGNQZpOzTHbd37jA1Ux7w7L0v0x-Q0prppsQWIHXsVViixX7sU_00Jn8DOxA3ghb0LbcJBGN0wi1FE_UqVYNKFdeakGrHXockeVvwOivzGFPqMssAFYb80gA9EQySQe6XTL5XpMF0yq6GAmLWPhJIhDMm3RhrPUG-NEptV_xkqyEwiZ_tCkyQdi5CF57ApymV78jEyJAG0ztJpQgFlTnYUEta8HpmyOZDLZIK45VhayqvQnxoUIK1HZew', '5d286315-becf-41f7-bad0-13a393834f5c', 'https://localhost:5000', '2017-04-21 09:12:53', '2017-04-21 09:12:53', 'system', NULL, '2017-04-21 09:12:53', '2017-04-21 09:12:53', NULL, 2),
(5, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODQyZmM1Ny1lZjkxLTQ3YmYtOTQ3ZS00NzFhOWIxNjU5NWUiLCJzdWIiOjIsImV4cCI6MTQ5Mjc3MDgwNSwiaWF0IjoxNDkyNzcwNTA1fQ.xHMt6-9UsL6Lkes_sby_x6_prs2X9Kd7QZypL0KYAx42g19m2u8hpTYKSdEqVmAdV6u1LtPMp4pcRp6UDo6xCaepiJoGdlumYjeRM9PkjV6kX4Jf-4pcVoXG-jd84aHxacNkLAZdxRijQRH6VuUUCgCeSDugKd4KGEU_E5jIbJ1iRTFkc0PycryylmyV8BDWZ6H8qSrkr7ocYNKUssdxd8zgcvKmL9YpIKKzkr5DlCzbpanw_ElZeIX7HzKytumruPMevPqAMp4uSzV_hWMfZws8mEYeGxRGZ4fJcs6_Fzj5Mh1dBcUMTse2Rtvicy48L0X7MoND_WtCsrUyAD3EZg', '2842fc57-ef91-47bf-947e-471a9b16595e', 'https://localhost:5000', '2017-04-21 10:28:29', '2017-04-21 10:28:25', 'system', NULL, '2017-04-21 10:28:29', '2017-04-21 10:28:29', 1, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `clientId` tinytext NOT NULL,
  `clientSecret` varchar(255) NOT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdUser` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `clients`
--

INSERT INTO `clients` (`id`, `name`, `description`, `clientId`, `clientSecret`, `createdDateTime`, `updatedDateTime`, `createdUser`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'DMS', 'the project for Dealer management system like workshop, repairOrder, Invoice, Part..', 'xyz123', 'ssh-password', '2017-04-13 00:00:00', '2017-04-13 00:00:00', 'system', 1, '2017-04-13 00:00:00', '2017-04-13 00:00:00'),
(2, 'TCEAS', 'TCEAS', 'abc123', 'ssh-secret', '2017-04-13 00:00:00', '2017-04-13 00:00:00', 'system', 1, '2017-04-13 00:00:00', '2017-04-13 00:00:00'),
(3, 'RSA', 'project rsa', 'trustedClient', 'ssh-otherpassword', '2017-04-14 04:17:10', NULL, 'system', 1, '2017-04-14 04:17:10', '2017-04-14 04:17:10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `refreshtokens`
--

CREATE TABLE `refreshtokens` (
  `id` int(11) NOT NULL,
  `refreshToken` text NOT NULL,
  `jti` varchar(255) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `createdDateTime` datetime NOT NULL,
  `updatedDateTime` datetime DEFAULT NULL,
  `createdUser` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ClientId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `refreshtokens`
--

INSERT INTO `refreshtokens` (`id`, `refreshToken`, `jti`, `scope`, `createdDateTime`, `updatedDateTime`, `createdUser`, `createdAt`, `updatedAt`, `ClientId`, `UserId`) VALUES
(1, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNzM0Y2RmZS02MzI2LTQwNjAtODNjNy01ZmU3YzM1YTNjM2MiLCJzdWIiOjEsImV4cCI6MTU0NTMyNTI5MiwiaWF0IjoxNDkyNzY1MjkyfQ.VBqjJhpiF52hMABwkbIVcujLq3lfUPHxCVvgxszrpBa3WRbjTo2TvOTBTfJcjcYPVAXNS0Hg8gH9qpGDk3v-n_JeEGewAp5Mx2VhZxtzxBLVAv_5a1nLjJbCrUc457rvw4ZMxW2zu3EOiXR9lckn4Ssp8qk0lb5YGAjcPWK2uhn_TjDlGsylteLJqadukJAyTHCdaNTNhn_Dm3-rbtI2Qg_N9R6D4b9IPKoM60jWkcAgfaM-Wkt10YWKBSj8VN9bR2VTGpyc2UQv1OcbX8kcJuhlnS0FQPhc3s47uxgc5EOH0E3pfE8Anxhz-sjd_M3B1DR_-sxauMfWxUbCBm0kcQ', '0734cdfe-6326-4060-83c7-5fe7c35a3c3c', 'offline_access', '2017-04-21 09:01:32', '2017-04-21 09:01:32', 'system', '2017-04-21 09:01:32', '2017-04-21 09:01:32', 2, NULL),
(2, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZTJlMDRjNy05MWIzLTQyY2UtYjY5NS0xYWRhZmE1MjQ0ZWYiLCJzdWIiOjEsImV4cCI6MTU0NTMyNTUzOSwiaWF0IjoxNDkyNzY1NTM5fQ.xxUdjZWFsuORYEyHIWr3vlKjL-e8_IsT_ELabBBjBUQ571e4n1-lxh8hwXMsF8iJQlF_GQMufzpfSA-DQnOeuTZGK_BTmF9qEcRiyP27o9Rph9PloeAQFds6A71NgdYiz-1rk-_pgEFzKLxhVuPmrdBEC_ULLrB2BLZHncO7BKpV1ePjl1Ik_Q7suuhZyb1oeUVqlWuSGi2xq_4AiCOAcLTG8Q2V9fTHxm1nol2rIX9wd9gHfv7UKUsqjcGqptHKiEvs5UcyPp-WkaqjVkynGYbc9j1XPCpOLTv41a8ToOJ3cXx4E18dtgKYzn6uOnsRd0CzSQdh2OcnGNg93T0Ytg', '3e2e04c7-91b3-42ce-b695-1adafa5244ef', 'offline_access', '2017-04-21 09:05:39', '2017-04-21 09:05:39', 'system', '2017-04-21 09:05:39', '2017-04-21 09:05:39', 2, NULL),
(3, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYzJlZWZlNi02NzQwLTQ2MmYtODcxMS0wZDMxMGE5Njk3MmIiLCJzdWIiOjEsImV4cCI6MTU0NTMyNTYxNiwiaWF0IjoxNDkyNzY1NjE2fQ.H1EdbJ6MiLavLB4CF4hSqmtlxV2YYw4Vt__hR9VAnVZHaUT44L1ifTr1zp3WGOM_MtB18u4bpxHaT6vEyu2-YJf1VPMBzGgSB4wPY8XpfTWMIX8LLt4KmA5thTrEi0nKwMi_VKKyFsN9U6keXNMoUnrRzIovMxpGZbDbCdodmZIMhBVxXXa4mCQZ2P8DeQc37iM0udtoEsouk0gcfajZccm1Go0j1UGYs_be5UhZ_-ewFdC2TGWxKQxPGxqLrEYFgPqM5oWv4qHFYAFr1RyFkRGa-QvsDvyJME0-WB1N7dmJvGuGsTQ5QFwQ1ObbZwREWdeZPcHfs_kOKPVafbRMwQ', 'dc2eefe6-6740-462f-8711-0d310a96972b', 'offline_access', '2017-04-21 09:06:56', '2017-04-21 09:06:56', 'system', '2017-04-21 09:06:56', '2017-04-21 09:06:56', 2, NULL),
(4, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZjFhMTQ1NS03NTUxLTRjZTctYWEyZS00ZTEzOTIzMTgxYzIiLCJzdWIiOjEsImV4cCI6MTU0NTMyNTg2OCwiaWF0IjoxNDkyNzY1ODY4fQ.I6j151rnlye55WiZXp68tIR8Z7rxGD6mL4eYhk9iWNyRsUHJQNBvkTQZgCdrhdrNtn596cFlAUlsz_HZPcIzLmjxoygCXwjgAlLHXd6-fVMHrWy5kL3HVn0vR5reh8wqjSrNLU-ENhDV_LJAvV-Ycepg-VDTlyiZmOGnnlis3BKT0lOUv3gCky106wQnsTg6-3epaaWfMPavQzKxuS7nsN-F3oPbRfOMF58ifEUI1lj-OfnSnKkBawXfmlNV67QYZg5UpQgFVIhziRlnLGg15Zhxs1fB2lHCVw9YRAQKYMdCgfvAHxkSn5-tOGqOgiSMPUlfDy3hySUGavF7ZXs94g', 'af1a1455-7551-4ce7-aa2e-4e13923181c2', 'offline_access', '2017-04-21 09:11:08', '2017-04-21 09:11:08', 'system', '2017-04-21 09:11:08', '2017-04-21 09:11:08', 2, NULL);

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
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `userName`, `password`, `passwords`, `passwordSalt`, `isLockedOut`, `isDisabled`, `fullName`, `createdDateTime`, `updatedDateTime`, `lastLoginDate`, `lastPasswordChangeDate`, `failedPasswordDate`, `failedPasswordCount`, `lastLogOutDate`, `email`, `firstName`, `lastName`, `address`, `telephone`, `expiryDate`, `minLength`, `complexity`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Jindo', '$2a$10$1HVaaDB/fD6E908BwpgeJOFM.S/OqXqIaEAGa/iIDAvw.S6Ih3IUu', '$2a$10$1HVaaDB/fD6E908BwpgeJOFM.S/OqXqIaEAGa/iIDAvw.S6Ih3IUu,', '905b7fa8-8428-402f-94ef-fed088069763', 0, 0, 'Vũ Tiến Hòa', '2017-04-21 10:10:36', NULL, NULL, NULL, NULL, NULL, NULL, 'jindo@gmail.com', 'Nguyễn', 'Tú', 'xuân đỉnh - Hà Nội', '0988170213', NULL, 0, NULL, 1, '2017-04-21 10:10:36', '2017-04-21 10:10:36');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `accesstokens`
--
ALTER TABLE `accesstokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `ClientId` (`ClientId`);

--
-- Chỉ mục cho bảng `authorizationcodes`
--
ALTER TABLE `authorizationcodes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `ClientId` (`ClientId`);

--
-- Chỉ mục cho bảng `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ClientId` (`ClientId`),
  ADD KEY `UserId` (`UserId`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `accesstokens`
--
ALTER TABLE `accesstokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT cho bảng `authorizationcodes`
--
ALTER TABLE `authorizationcodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT cho bảng `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT cho bảng `refreshtokens`
--
ALTER TABLE `refreshtokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `accesstokens`
--
ALTER TABLE `accesstokens`
  ADD CONSTRAINT `accesstokens_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `accesstokens_ibfk_2` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `authorizationcodes`
--
ALTER TABLE `authorizationcodes`
  ADD CONSTRAINT `authorizationcodes_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `authorizationcodes_ibfk_2` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD CONSTRAINT `refreshtokens_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `refreshtokens_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
