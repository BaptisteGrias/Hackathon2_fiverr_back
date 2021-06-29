/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
DROP DATABASE IF EXISTS hackathon2JS;
CREATE DATABASE
/*!32312 IF NOT EXISTS*/
hackathon2JS
/*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE hackathon2JS;
DROP TABLE IF EXISTS fiverrMeet;
CREATE TABLE `fiverrMeet` (
  `idfiverrMeet` int Auto_increment NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `idmeetingType` int NOT NULL,
  `author_id` int NOT NULL,
  `domaine` varchar(45) DEFAULT NULL,
  `description` text,
  `date` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `ville` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idfiverrMeet`, `idmeetingType`, `author_id`),
  KEY `fk_fiverrMeet_meetingType_idx` (`idmeetingType`),
  KEY `fk_fiverrMeet_user1_idx` (`author_id`),
  CONSTRAINT `fk_fiverrMeet_meetingType` FOREIGN KEY (`idmeetingType`) REFERENCES `meetingType` (`idmeetingType`),
  CONSTRAINT `fk_fiverrMeet_user1` FOREIGN KEY (`author_id`) REFERENCES `user` (`iduser`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS friend;
CREATE TABLE `friend` (
  `user_iduser` int Auto_increment NOT NULL,
  `user_iduser1` int NOT NULL,
  PRIMARY KEY (`user_iduser`, `user_iduser1`),
  KEY `fk_user_has_user_user2_idx` (`user_iduser1`),
  KEY `fk_user_has_user_user1_idx` (`user_iduser`),
  CONSTRAINT `fk_user_has_user_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`),
  CONSTRAINT `fk_user_has_user_user2` FOREIGN KEY (`user_iduser1`) REFERENCES `user` (`iduser`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS meetingType;
CREATE TABLE `meetingType` (
  `idmeetingType` int Auto_increment NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idmeetingType`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS message;
CREATE TABLE `message` (
  `idmessage` int Auto_increment NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `text` varchar(45) DEFAULT NULL,
  `date` date NOT NULL,
  `iduser_sender` int NOT NULL,
  `iduser_dest` int NOT NULL,
  PRIMARY KEY (`idmessage`, `iduser_sender`, `iduser_dest`),
  KEY `fk_message_user1_idx` (`iduser_sender`),
  KEY `fk_message_user2_idx` (`iduser_dest`),
  CONSTRAINT `fk_message_user1` FOREIGN KEY (`iduser_sender`) REFERENCES `user` (`iduser`),
  CONSTRAINT `fk_message_user2` FOREIGN KEY (`iduser_dest`) REFERENCES `user` (`iduser`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS user;
CREATE TABLE `user` (
  `iduser` int Auto_increment NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `skill` varchar(100) NOT NULL,
  `ville` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
INSERT INTO
  fiverrMeet(
    idfiverrMeet,
    name,
    region,
    idmeetingType,
    author_id,
    domaine,
    description,
    date,
    image,
    ville
  )
VALUES(
    1,
    'PHP libre',
    'Occitanie',
    1,
    1,
    'Développement Web',
    '4c6f72656d20497073756d2069732073696d706c792064756d6d792074657874206f6620746865207072696e74696e6720616e64207479706573657474696e6720696e6475737472792e204c6f72656d20497073756d20686173206265656e2074686520696e6475737472792773207374616e646172642064756d6d79207465787420657665722073696e6365207468652031353030732c207768656e20616e20756e6b6e6f776e207072696e74657220746f6f6b20612067616c6c6579206f66207479706520616e6420736372616d626c656420697420746f206d616b65206120747970652073706563696d656e20626f6f6b2e20497420686173207375727669766564206e6f74206f6e6c7920666976652063656e7475726965732c2062757420616c736f20746865206c65617020696e746f20656c656374726f6e6963207479706573657474696e672c2072656d61696e696e6720657373656e7469616c6c7920756e6368616e6765642e2049742077617320706f70756c61726973656420696e207468652031393630732077697468207468652072656c65617365206f66204c657472617365742073686565747320636f6e7461696e696e67204c6f72656d20497073756d2070617373616765732c20616e64206d6f726520726563656e746c792077697468206465736b746f70207075626c697368696e6720736f667477617265206c696b6520416c64757320506167654d616b657220696e636c7564696e672076657273696f6e73206f66204c6f72656d20497073756d2e',
    '2021-08-27',
    'https://www.adsmurai.com/hubfs/IPC-php-conference-2017-adsmurai-1.jpg',
    'Montpellier'
  );
INSERT INTO
  fiverrMeet (
    name,
    region,
    idmeetingType,
    author_id,
    domaine,
    description,
    date,
    image,
    ville
  )
VALUES
  (
    'Dev Co-working',
    'PACA',
    2,
    2,
    'Développement Web',
    'Join me in my co-working space. We will have so much fun, believe me! Do not forget to bring your friends.',
    '2021-06-29T22:00:00.000Z',
    'https://www.adsmurai.com/hubfs/IPC-php-conference-2017-adsmurai-1.jpg',
    'Marseille'
  );
INSERT INTO
  meetingType(idmeetingType, name)
VALUES(2, 'Collaboration');
INSERT INTO
  meetingType(idmeetingType, name)
VALUES(3, 'Event');
INSERT INTO
  user(
    iduser,
    name,
    firstname,
    email,
    password,
    region,
    skill,
    ville
  )
VALUES(
    1,
    'Nicolas',
    'Julien',
    'juju45815@gmail.com',
    'jujubg45',
    'Occitanie',
    'Web developer',
    'Montpellier'
  );
INSERT INTO
  user(
    iduser,
    name,
    firstname,
    email,
    password,
    region,
    skill,
    ville
  )
VALUES(
    2,
    'Bensouna',
    'Sarah',
    'chocolatelover@hotmail.com',
    'sarahbg40',
    'Nouvelle-Aquitaine',
    'Web developer',
    'Bayonne'
  );