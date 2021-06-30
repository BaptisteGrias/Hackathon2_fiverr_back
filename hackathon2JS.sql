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
  `idfiverrMeet` int NOT NULL AUTO_INCREMENT,
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
  `user_iduser` int NOT NULL,
  `user_iduser1` int NOT NULL,
  PRIMARY KEY (`user_iduser`, `user_iduser1`),
  KEY `fk_user_has_user_user2_idx` (`user_iduser1`),
  KEY `fk_user_has_user_user1_idx` (`user_iduser`),
  CONSTRAINT `fk_user_has_user_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`),
  CONSTRAINT `fk_user_has_user_user2` FOREIGN KEY (`user_iduser1`) REFERENCES `user` (`iduser`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS meetingType;
CREATE TABLE `meetingType` (
  `idmeetingType` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idmeetingType`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS message;
CREATE TABLE `message` (
  `idmessage` int NOT NULL AUTO_INCREMENT,
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
  `iduser` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `skill` varchar(100) NOT NULL,
  `ville` varchar(45) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
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
    'Some discussion about PHP',
    '2021-08-27',
    'https://www.adsmurai.com/hubfs/IPC-php-conference-2017-adsmurai-1.jpg',
    'Montpellier'
  );
INSERT INTO
  meetingType(idmeetingType, name)
VALUES(1, 'Conférence');
INSERT INTO
  user(
    iduser,
    name,
    firstname,
    email,
    password,
    region,
    skill,
    ville,
    avatar,
    description
  )
VALUES(
    1,
    'Nicolas',
    'Julien',
    'juju45815@gmail.com',
    'jujubg45',
    'Occitanie',
    'Web developer',
    'Montpellier',
    'https://avatarfiles.alphacoders.com/146/146246.jpg',
    'Hi I m Nicolas, I m here for found collaration for my project, also I created some events abouts. I love music and costume cuir party and i love meet some new freelancer if you want join for create that will be with a great pleasure.'
  );