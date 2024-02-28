INSERT INTO department (name)
VALUES ("department 1"),
       ("department 2"),
       ("department 3"),
       ("department 4");

INSERT INTO role (title, salary, department_id)
VALUES ("role 1", 100, 1),
       ("role 2", 1000, 2),
       ("role 3", 16, 3),
       ("role 4", 1, 4),
       ("role 5", 10000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("employee 1", "last name", 1, 1),
       ("employee 2", "last name", 2, 4),
       ("employee 3", "last name", 1, 3),
       ("employee 4", "last name", 4, 4);