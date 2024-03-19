INSERT INTO departments (name)
VALUES ("department 1"),
       ("department 2"),
       ("department 3"),
       ("department 4");

INSERT INTO roles (title, salary, department_id)
VALUES ("role 1", 100, 1),
       ("role 2", 1000, 2),
       ("role 3", 16, 3),
       ("role 4", 1, 4),
       ("role 5", 10000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("employee 1", "last name", 1, NULL),
       ("employee 2", "last name", 2, 1),
       ("employee 3", "last name", 1, 1),
       ("employee 4", "last name", 4, NULL);