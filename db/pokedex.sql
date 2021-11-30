create database Pokedex;
use Pokedex;

CREATE TABLE pokemon(
    campo_id int NOT NULL,
    nombre varchar(25) NOT NULL,
    altura float(5,2) NOT NULL,
    categoria varchar(30) NOT NULL,
    peso float(5,2) NOT NULL,
    habilidad varchar(50) NOT NULL,
    tipo varchar(15) NOT NULL,
    imagen url,
    PRIMARY KEY (campo_id)
);



