use synkDB

DROP DATABASE IF EXISTS synkDB;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `Users`, `Communities`, `CommunityMembers`, `CommunityChannels`, `CommunityPosts`;
SET FOREIGN_KEY_CHECKS = 1;


CREATE DATABASE synkDB;
