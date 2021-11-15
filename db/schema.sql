DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- create department table --
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY_KEY,
    name VARCHAR (30) NOT NULL,
);

-- create role table --
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY_KEY,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL,
    department_id INTEGER NOT NULL
);

-- create employee table --
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY_KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id  INTEGER NOT NULL,
    manager_id INTERGER NULL
);