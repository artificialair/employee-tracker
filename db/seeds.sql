INSERT INTO departments (name)
VALUES ("Sales"),
       ("Marketing"),
       ("Human Resources"),
       ("Finance"),
       ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 75000, 1),
       ("Sales Representative", 50000, 1),
       ("Marketing Manager", 80000, 2),
       ("Marketing Specialist", 55000, 2),
       ("HR Manager", 70000, 3),
       ("HR Assistant", 45000, 3),
       ("Finance Manager", 85000, 4),
       ("Financial Analyst", 60000, 4),
       ("Engineering Manager", 90000, 5),
       ("Software Engineer", 70000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, NULL),
       ("Emily", "Davis", 2, 1),
       ("David", "Lee", 5, NULL),
       ("Sarah", "Johnson", 3, NULL),
       ("Michael", "Brown", 4, 4),
       ("Jennifer", "Wilson", 6, 3),
       ("Alice", "Thompson", 9, NULL),
       ("James", "Miller", 10, 7),
       ("Daniel", "Roberts", 7, NULL),
       ("Rachel", "White", 8, 9);