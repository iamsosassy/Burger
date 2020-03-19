DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers
(
    id INTEGER NOT NULL
    AUTO_INCREMENT,
    name VARCHAR
    (30) NOT NULL,
    has_Devoured BOOLEAN NOT NULL,
    PRIMARY KEY
    (id)
 )