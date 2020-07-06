DROP DATABASE IF EXISTS employee_Trackerdb;

CREATE DATABASE employee_Trackerdb;

USE employee_Trackerdb;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES manager(id)
);

CREATE TABLE manager (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charles", "James", 1, 1);

INSERT INTO manager (name)
VALUES ("John Maxwell");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 84000.00, 1);

INSERT INTO department (name)
VALUES ("Front End Engineering");

ALTER TABLE employee
MODIFY manager_id INT;


