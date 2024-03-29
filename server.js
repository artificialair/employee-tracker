const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

const main = async () => {
    const answers = await inquirer.prompt([
        {
            type: "rawlist", 
            name : "choice", 
            message: "What would you like to do?", 
            choices: [
                "View All Departments", 
                "View All Roles", 
                "View All Employees", 
                "Add Department", 
                "Add Role", 
                "Add Employee", 
                "Update Employee Role",
                "Exit Database"
            ],
        },
    ])
    console.log("")
    switch (answers.choice) {
        case "View All Departments":
            await viewAll("departments");
            break;
        case "View All Roles":
            await viewAll("roles");
            break;
        case "View All Employees":
            await viewAll("employees");
            break;
        case "Add Department":
            await addToDb("departments");
            break;
        case "Add Role":
            await addToDb("roles");
            break;
        case "Add Employee":
            await addToDb("employees");
            break;
        case "Update Employee Role":
            await updateEmployeeRole();
            break;
        case "Exit Database":
            db.end();
            console.log("You have sucessfully exited the database");
            process.exit(0);
    }
    main();
}

// function to SELECT all items from a table
const viewAll = async (dbTable) => {
    let dbQuery;
    if (dbTable === "departments") {
        dbQuery = "SELECT * FROM departments"
    } else if (dbTable === "roles") {
        dbQuery = `SELECT roles.id, roles.title, roles.salary, roles.department_id, departments.name 
                   FROM roles 
                   LEFT JOIN departments 
                   ON roles.department_id = departments.id`
    } else {  // table will always = "employees" here
        dbQuery = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
                   FROM employees 
                   LEFT JOIN roles
                   ON employees.role_id = roles.id
                   LEFT JOIN departments
                   ON departments.id = roles.department_id
                   LEFT JOIN employees AS managers
                   ON employees.manager_id = managers.id`
    }

    try {
        res = await db.promise().query(dbQuery);
        console.table(res[0]);
    } catch (err) { 
        console.error(`Error getting ${dbTable}: ${err}`);
    }
}

// function to INSERT values into a table
const addToDb = async (dbTable) => {
    if (dbTable === "departments") {
        const answer = await inquirer.prompt({
            type: "input",
            name: "name",
            message: "What is the name of the department you would like to add?",
        })
        
        if (!answer || !answer.name) {
            console.log("Department name cannot be blank");
            addToDb("department");  // this might cause memory issues, i do not know a better alternative
        }

        await db.promise().query("INSERT INTO departments SET ?", answer);
        console.log(`Added ${answer.name} to departments.`);
    } else if (dbTable === "roles") {
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the role you would like to add?",
            },
            {
                type: "number",
                name: "salary",
                message: "What is the salary of the role?",
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department is the role in?",
                choices: () => db.promise().query("SELECT * FROM departments").then(([rows]) => rows.map(department => ({name: department.name, value: department.id})))
            }
        ]);

        if (!answer || !answer.title) {
            console.log("Role name cannot be blank");
            addToDb("role");
        }

        await db.promise().query("INSERT INTO roles SET ?", answer);
        console.log(`Added ${answer.title} to roles.`);
    } else {  // table will always = "employees" here
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter the employee's first name.",
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter the employee's last name.",
            },
            {
                type: "list",
                name: "role_id",
                message: "Which role is the employee in?",
                choices: () => db.promise().query("SELECT * FROM roles").then(([rows]) => rows.map(role => ({name: role.title, value: role.id})))
            },
            {
                type: "list",
                name: "manager_id",
                message: "Who is the employee's manager?",
                choices: () => db.promise().query("SELECT * FROM employees").then(([rows]) => rows.map(employee => ({name: employee.first_name + " " + employee.last_name, value: employee.id})))
            }
        ]);
        await db.promise().query("INSERT INTO employees SET ?", answer);
        console.log(`Added ${answer.first_name} ${answer.last_name} to employees.`);
    }
}

const updateEmployeeRole = async () => {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Which employee would you like to update?",
            choices: () => db.promise().query("SELECT * FROM employees").then(([rows]) => rows.map(employee => ({name: employee.first_name + " " + employee.last_name, value: employee.id})))
        },
        {
            type: "list",
            name: "role_id",
            message: "What is their new role?",
            choices: () => db.promise().query("SELECT * FROM roles").then(([rows]) => rows.map(role => ({name: role.title, value: role.id})))
        },
    ])
    await db.promise().query("UPDATE employees SET role_id = ? WHERE id = ?", [answer.role_id, answer.employee_id]);
    console.log(`Role successfully updated.`);
}

main();
