-- MySQL dump 10.13  Distrib 8.0.44, for Linux (x86_64)
--
-- Host: localhost    Database: emimanagement
-- ------------------------------------------------------
-- Server version	8.0.44-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_forms`
--

DROP TABLE IF EXISTS `contact_forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_forms` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `status` enum('new','in_progress','resolved','closed','spam') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'new',
  `priority` enum('low','medium','high','urgent') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'medium',
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `assigned_to` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `admin_response` text COLLATE utf8mb4_unicode_ci,
  `responded_at` timestamp NULL DEFAULT NULL,
  `resolved_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_forms_user_id_foreign` (`user_id`),
  KEY `contact_forms_assigned_to_foreign` (`assigned_to`),
  KEY `contact_forms_status_index` (`status`),
  KEY `contact_forms_priority_index` (`priority`),
  KEY `contact_forms_email_index` (`email`),
  KEY `contact_forms_created_at_index` (`created_at`),
  CONSTRAINT `contact_forms_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `contact_forms_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_forms`
--

LOCK TABLES `contact_forms` WRITE;
/*!40000 ALTER TABLE `contact_forms` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_forms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emi_details`
--

DROP TABLE IF EXISTS `emi_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emi_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `loan_detail_id` bigint unsigned NOT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emi_details_loan_detail_id_foreign` (`loan_detail_id`),
  CONSTRAINT `emi_details_loan_detail_id_foreign` FOREIGN KEY (`loan_detail_id`) REFERENCES `loan_details` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emi_details`
--

LOCK TABLES `emi_details` WRITE;
/*!40000 ALTER TABLE `emi_details` DISABLE KEYS */;
INSERT INTO `emi_details` VALUES (1,1,'xC7xRp8HkO',10045.00,'2025-05-01','pending',NULL,NULL),(2,1,'8xGdTvzADN',10045.00,'2025-06-01','pending',NULL,NULL),(3,1,'EQ6wStLZaY',10045.00,'2025-07-01','pending',NULL,NULL),(4,1,'puLzUXmVVE',10045.00,'2025-08-01','pending',NULL,NULL),(5,1,'COtGMC0pUF',10045.00,'2025-09-01','pending',NULL,NULL),(6,1,'hfYt5HuKAm',10045.00,'2025-10-01','pending',NULL,NULL),(7,1,'sJLN8WwW0c',10045.00,'2025-11-01','pending',NULL,NULL),(8,1,'1C5gCWN8X7',10045.00,'2025-12-01','pending',NULL,NULL),(9,1,'FBpD99JJ1v',10045.00,'2026-01-01','pending',NULL,NULL),(10,1,'vUEWIhyCZX',10045.00,'2026-02-01','pending',NULL,NULL),(11,1,'ZklNCgvOT9',10045.00,'2026-03-01','pending',NULL,NULL),(12,1,'QuUCRsyrcL',10045.00,'2026-04-01','pending',NULL,NULL),(13,1,'9NtQEvV8Ao',10045.00,'2026-05-01','pending',NULL,NULL),(14,1,'h0b8cmX503',10045.00,'2026-06-01','pending',NULL,NULL),(15,1,'Icltszr7VJ',10045.00,'2026-07-01','pending',NULL,NULL),(16,1,'yiP5pdnzdj',10045.00,'2026-08-01','pending',NULL,NULL),(17,1,'sxzRgGvFKX',10045.00,'2026-09-01','pending',NULL,NULL),(18,1,'vIa68qSvou',10045.00,'2026-10-01','pending',NULL,NULL),(19,1,'v3eokVG1w0',10045.00,'2026-11-01','pending',NULL,NULL),(20,1,'bBEViXOTdK',10045.00,'2026-12-01','pending',NULL,NULL),(21,1,'LxrLD6QmQO',10045.00,'2027-01-01','pending',NULL,NULL),(24,3,'cNmu3Lq8y9',10045.00,'2025-05-01','paid',NULL,'2025-12-22 21:54:32'),(25,3,'kK8qClxpNY',10045.00,'2025-06-01','paid',NULL,'2025-12-22 21:54:34'),(26,3,'OQ3X9A0Kvc',10045.00,'2025-07-01','paid',NULL,'2025-12-22 21:54:36'),(27,3,'AUVAWCQ2fC',10045.00,'2025-08-01','paid',NULL,'2025-12-22 21:54:39'),(28,3,'oLAOd1OK4q',10045.00,'2025-09-01','paid',NULL,'2025-12-22 21:54:41'),(29,3,'sECP8ZOkO3',10045.00,'2025-10-01','paid',NULL,'2025-12-22 21:54:43'),(30,3,'M9dHyMCFgl',10045.00,'2025-11-01','paid',NULL,'2025-12-22 21:54:45'),(31,3,'V4P1NNAMO8',10045.00,'2025-12-01','paid',NULL,'2025-12-22 21:54:55'),(32,3,'OAp1jH9fcG',10045.00,'2026-01-01','paid',NULL,'2026-01-03 10:07:16'),(33,3,'E1RDkgmgjj',10045.00,'2026-02-01','pending',NULL,NULL),(34,3,'EC9lafmSmc',10045.00,'2026-03-01','pending',NULL,NULL),(35,3,'8B5pcNBeL9',10045.00,'2026-04-01','pending',NULL,NULL),(36,3,'Wuahx2CmMw',10045.00,'2026-05-01','pending',NULL,NULL),(37,3,'lO10tz6VRY',10045.00,'2026-06-01','pending',NULL,NULL),(38,3,'v8avGYIqqE',10045.00,'2026-07-01','pending',NULL,NULL),(39,3,'UJDz4X8xSQ',10045.00,'2026-08-01','pending',NULL,NULL),(40,3,'6Qeh2ykziN',10045.00,'2026-09-01','pending',NULL,NULL),(41,3,'gmglbPu8K4',10045.00,'2026-10-01','pending',NULL,NULL),(42,3,'PgqJniUDC7',10045.00,'2026-11-01','pending',NULL,NULL),(43,3,'czya48n2FW',10045.00,'2026-12-01','pending',NULL,NULL),(44,3,'Yz9sHIbBYx',10045.00,'2027-01-01','pending',NULL,NULL),(45,4,'o1wJsEMoal',4391.00,'2025-12-03','paid',NULL,'2025-12-22 21:58:50'),(46,4,'LBR77dDFHE',4391.00,'2026-01-03','paid',NULL,'2026-01-03 10:07:42'),(47,4,'OtZxeGbinG',4391.00,'2026-02-03','pending',NULL,NULL),(48,4,'Tw1LzZsunm',4391.00,'2026-03-03','pending',NULL,NULL),(49,4,'ro0Eog7qk4',4391.00,'2026-04-03','pending',NULL,NULL),(50,4,'N0ZAzOc97q',4391.00,'2026-05-03','pending',NULL,NULL),(51,4,'Odx8gu7zEI',4391.00,'2026-06-03','pending',NULL,NULL),(52,4,'ANq4MEgcky',4391.00,'2026-07-03','pending',NULL,NULL),(53,4,'QdbTjLdKkJ',4391.00,'2026-08-03','pending',NULL,NULL),(54,5,'Eo1msnoDBF',3631.00,'2025-10-06','paid',NULL,'2025-12-22 22:02:11'),(55,5,'bEKxwA12h5',3631.00,'2025-11-06','paid',NULL,'2025-12-22 22:02:12'),(56,5,'4wLP5DjdrR',3631.00,'2025-12-06','paid',NULL,'2025-12-22 22:02:13'),(57,5,'ot0YzpW6kw',3631.00,'2026-01-06','paid',NULL,'2026-01-03 10:07:52'),(58,5,'tYYX5ZQDdP',3631.00,'2026-02-06','pending',NULL,NULL),(59,5,'ohlCYVoQML',3631.00,'2026-03-06','pending',NULL,NULL),(60,6,'wC4zcSlVq9',15000.00,'2024-12-01','paid',NULL,'2025-12-24 16:57:17'),(61,6,'XcbGuH5FN7',15000.00,'2025-01-01','paid',NULL,'2025-12-24 16:57:22'),(62,6,'8bGNWBkev4',15000.00,'2025-02-01','paid',NULL,'2025-12-24 16:57:24'),(63,6,'5WToqVASOd',15000.00,'2025-03-01','paid',NULL,'2025-12-24 16:57:25'),(64,6,'MbgtIYmefX',15000.00,'2025-04-01','paid',NULL,'2025-12-24 16:57:26'),(65,6,'X6yOzpbLhn',15000.00,'2025-05-01','paid',NULL,'2025-12-24 16:57:26'),(66,6,'ZkQXS46T86',15000.00,'2025-06-01','paid',NULL,'2025-12-24 16:57:28'),(67,6,'9WElsSrMUW',15000.00,'2025-07-01','paid',NULL,'2025-12-24 16:57:29'),(68,6,'U5qMUOinHm',15000.00,'2025-10-01','paid',NULL,'2025-12-24 16:59:16'),(69,6,'8foGH58IdD',15000.00,'2025-11-01','paid',NULL,'2025-12-24 16:59:18'),(70,6,'gBERDHdlOy',15000.00,'2025-12-01','paid',NULL,'2025-12-24 16:59:19'),(71,6,'TcNcy8RkMM',15000.00,'2026-01-01','paid',NULL,'2026-01-03 10:06:48'),(72,6,'AjqxiXYr0H',15000.00,'2026-02-01','pending',NULL,'2025-12-24 16:58:52'),(73,6,'uVHZnfoZav',5000.00,'2026-03-01','pending',NULL,'2025-12-24 16:58:52'),(74,7,'Z148OT6DgZ',8778.00,'2024-01-03','paid',NULL,'2025-12-26 16:38:05'),(75,7,'q218Y3oPLK',8778.00,'2024-02-03','paid',NULL,'2025-12-26 16:38:06'),(76,7,'sG3E2W7sWw',8778.00,'2024-03-03','paid',NULL,'2025-12-26 16:38:08'),(77,7,'BU1SR83uPm',8778.00,'2024-04-03','paid',NULL,'2025-12-26 16:38:09'),(78,7,'EHl0bSWWvP',8778.00,'2024-05-03','paid',NULL,'2025-12-26 16:38:10'),(79,7,'e1uWOv7pg1',8778.00,'2024-06-03','paid',NULL,'2025-12-26 16:38:13'),(80,7,'La30132DLY',8778.00,'2024-07-03','paid',NULL,'2025-12-26 16:38:14'),(81,7,'Ivhz1HM7PT',8778.00,'2024-08-03','paid',NULL,'2025-12-26 16:38:15'),(82,7,'iFu8i00uEr',8778.00,'2024-09-03','paid',NULL,'2025-12-26 16:38:16'),(83,8,'PG9BSP2CJv',84000.00,'2026-02-01','pending',NULL,NULL),(84,9,'Hf3lwEFkYm',30000.00,'2026-02-01','pending',NULL,NULL);
/*!40000 ALTER TABLE `emi_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_details`
--

DROP TABLE IF EXISTS `loan_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `emi_amount` decimal(10,2) DEFAULT NULL,
  `processing_fee` decimal(10,2) DEFAULT NULL,
  `interest_rate` decimal(10,2) DEFAULT NULL,
  `loan_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emi_count` int DEFAULT NULL,
  `disbursed_date` date DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `loan_details_user_id_foreign` (`user_id`),
  CONSTRAINT `loan_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_details`
--

LOCK TABLES `loan_details` WRITE;
/*!40000 ALTER TABLE `loan_details` DISABLE KEYS */;
INSERT INTO `loan_details` VALUES (1,1,'SmartCoin',180000.00,10045.00,5310.00,17.88,'tenure',21,'2025-04-01','open','2025-12-15 13:39:51','2025-12-15 13:39:51'),(3,2,'SmartCoin',180000.00,10045.00,5310.00,17.88,'tenure',21,'2025-04-01','open','2025-12-22 21:54:17','2025-12-22 21:54:17'),(4,2,'Fibe',35000.00,4391.00,1652.00,30.00,'tenure',9,'2025-11-03','open','2025-12-22 21:58:16','2025-12-22 21:58:16'),(5,2,'Moneyview',20000.00,3631.00,1652.00,30.00,'tenure',6,'2025-09-06','open','2025-12-22 22:02:00','2025-12-22 22:02:00'),(6,2,'Razorpod Technologies Pvt Ltd',200000.00,15000.00,0.00,0.00,'emi_amount',14,'2024-11-01','open','2025-12-24 16:56:59','2025-12-24 16:56:59'),(7,2,'SmartCoin',70000.00,8778.00,2478.00,29.88,'tenure',9,'2023-12-03','closed','2025-12-26 16:37:33','2025-12-26 16:38:16'),(8,2,'Ketan Kumar',84000.00,84000.00,0.00,0.00,'tenure',1,'2026-01-01','open','2026-01-03 18:21:23','2026-01-03 18:21:23'),(9,2,'Sarvesh Jha',30000.00,30000.00,0.00,0.00,'tenure',1,'2026-01-01','open','2026-01-03 18:22:05','2026-01-03 18:22:05');
/*!40000 ALTER TABLE `loan_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2024_12_09_192800_create_loan_details_table',1),(5,'2024_12_09_192809_create_emi_details_table',1),(6,'2024_12_14_234738_add_column_in_loan_details_table',1),(7,'2025_12_27_112029_add_google_id_in_users_table',2),(8,'2026_01_02_214405_create_contact_forms_table',3),(9,'2026_01_02_224358_enhance_contact_forms_table',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('7WFScoVgpE9Vm08WwkAdpaf49f08DGmihBuQ3we7',NULL,'94.247.172.129','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2)','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQmllZm5UdVVNQmJUc3lZUklLbkJweXF1eWxQV1g4Q2E3cUl5em1WeSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vYWtrdGVjaG5vbG9neS5vcmciO3M6NToicm91dGUiO3M6Nzoid2VsY29tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1767454644),('DnHvjQdLVOnTDfJQ81jdCNVHEIaTZSj4ww5Uom6K',NULL,'43.130.53.252','Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWjBhT2ptSk1xem01ZWwzZXJXUUJKdWYzWThrWWxYSER4ZktxMGhZMiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vYWtrdGVjaG5vbG9neS5vcmciO3M6NToicm91dGUiO3M6Nzoid2VsY29tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1767453942),('GkpirQ5HHD20lUzZRJMvKIdQ57JvU0D7KKkcd2hM',NULL,'23.27.145.168','Mozilla/5.0 (X11; Linux i686; rv:109.0) Gecko/20100101 Firefox/120.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiRVlBQlZBNnkzN2oyZTBibWZUWlBhUEt2UFdQRndUUjRFVTRiNWxtSCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vYWtrdGVjaG5vbG9neS5vcmciO3M6NToicm91dGUiO3M6Nzoid2VsY29tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1767442063),('Ip0sWuLCvCvgfz2Z8Nlsy8WEFAJoP7lwhl75AUsH',NULL,'4.213.136.62','Mozilla/5.0 (iPad; CPU OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0.1 Mobile/15E148 Safari/604.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiYXdPYkUzOThpblpSd2JIS29SZks1enk1MjNpTGlOQWFCNHpZTTB6ViI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzU6Imh0dHBzOi8vYWtrdGVjaG5vbG9neS5vcmcvaW5kZXgucGhwIjtzOjU6InJvdXRlIjtzOjc6IndlbGNvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1767438686),('KIMoXWM09GzbGXsOF3x7vDSmNPNyyefGkqiPOqcV',2,'157.49.177.135','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUG5vUWY3TENUVkd3RDZzU3BOd0tLR3ZKWlhBYm95V2M5U0N5SmZGQyI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjMxOiJodHRwczovL2Fra3RlY2hub2xvZ3kub3JnL2xvZ2luIjtzOjU6InJvdXRlIjtzOjU6ImxvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mjt9',1767456949),('MpgkkWTgknCNGQame9nwt18EbCX7guY8wTFZit97',2,'157.49.176.19','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiN0NiTmtFR3hZVkdGaGdkNXRKN1hZc0JEQXlibjh0U29aVDVTMDJsNCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mzc6Imh0dHBzOi8vYWtrdGVjaG5vbG9neS5vcmcvbG9hbi1kZXRhaWwiO3M6NToicm91dGUiO3M6MTc6ImxvYW4tZGV0YWlsLmluZGV4Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mjt9',1767444803),('oSXGTmYVjaxB6dedo4SHyePlIeNczOvqJc7WqBn7',NULL,'98.86.118.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVzBGbTd5MXdCZGZuaEdKYU5TdlFGZmM5Y3RVSVQyVnF6UmJob01FeSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vYWtrdGVjaG5vbG9neS5vcmciO3M6NToicm91dGUiO3M6Nzoid2VsY29tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1767442025),('RDg0vQmvE3iDCdDUeEcCmxH3n5yEeNbV9MMtmlJd',NULL,'23.168.216.105','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoicHdROWdQem9CTTVJRWk0cENNQTZJYnZuc21oSFU1UmpKRVEydmxpaSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vYWtrdGVjaG5vbG9neS5vcmciO3M6NToicm91dGUiO3M6Nzoid2VsY29tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1767452364),('xbHio0uRUe7PxoLJiqyeb6l70H4ItPbB4eP35Syb',NULL,'54.174.202.55','Mozilla/5.0 (Linux; U; Android 2.2; en-us; Sprint APA9292KT Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQUlvNnZRVU11dUo2emZJM0YyR1ZtelFnaTlpbU1FcGtjMUhaRllrMyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vYWtrdGVjaG5vbG9neS5vcmciO3M6NToicm91dGUiO3M6Nzoid2VsY29tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1767454338);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `google_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'102064425790258383632','Akshay Kumar Karnwal','karnwalakshay7@gmail.com',NULL,'$2y$12$duhIi.AVfe8pX99BCLRaduyr2fY7o6W7JGdIa8OVJq6jtbfh5X6c6',NULL,'2025-12-15 12:55:21','2025-12-27 12:59:26'),(2,NULL,'Akshay Kumar','akshay.k@razorpod.in',NULL,'$2y$12$gVeWGzziaq8lmajhGOt3lu4n1Nz/V6CSQ6oPi1nTcv9wfgqXORRKi',NULL,'2025-12-15 12:55:22','2025-12-15 12:55:22'),(3,'107197111403061994567','Akshay Kumar Karnwal','karnwalakshay1996@gmail.com',NULL,'$2y$12$HU0HhewjYDwvhJLAljB0gufEqgYKTuyMAn3ugAE2Www9rD223w5py',NULL,'2025-12-27 12:38:57','2025-12-27 12:38:57');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-03 21:48:11
