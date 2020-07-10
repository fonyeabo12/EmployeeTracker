DROP DATABASE IF EXISTS employee_Trackerdb;
CREATE DATABASE employee_Trackerdb;
USE employee_Trackerdb;

CREATE TABLE department (
  id INT auto_increment,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE manager (
  id INT auto_increment,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT auto_increment,
  title VARCHAR(30),
  salary DECIMAL(10,2) NOT NULL,
  department_id INT,
  PRIMARY KEY (id)
);


CREATE TABLE employee (
  id INT NOT NULL auto_increment,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);


INSERT INTO department (id, name)
VALUES (001, "Front End Engineering"), (002, "Back End Engineering"), (003, "Software Engineering"), (004, "Business Development");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 120000.00, 001), 
("Senior Software Developer", 96000.00, 001), 
("Software Developer", 84000.00, 001),
("Manager", 120000.00, 002),
("Senior Software Developer", 96000.00, 002),
("Software Engineer", 84000.00, 002),
("Manager", 120000.00, 003),
("Senior Software Developer", 96000.00, 003),
("Software Engineer", 84000.00, 003),
("Manager", 100000.00, 004),
("Senior Associate", 84000.00, 004),
("Associaate", 60000.00, 004);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charles", "James", 1, 1),
("John", "Doe", 11, 1),
("James", "Moon", 12, 2),
("Jimmy", "Shine", 2, 2),
("Katy", "Smith", 21, 2),
("Rez", "Bond", 22, 2),
("Faco", "Dobbs", 3, 3),
("York", "Caly", 31, 3),
("Man", "Fabs", 32, 3 ),
("Yal", "Uber", 4, 4),
("Jane", "Sombs", 41, 4),
("Babs", "Vill", 42, 4);

