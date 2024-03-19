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
    let answer = await askQuestion();
    
    switch (answer) {
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
            break;
        case "Exit Database":
            
            break;
    }
}

const askQuestion = async () => {
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

    return answers.choice
}

// function to SELECT all items from a table
const viewAll = async (dbTable) => {
    if (dbTable === "departments") {
        db.query(`
            SELECT * 
            FROM departments
        `, (err, res) => {
            err 
            ? console.error(err)
            : console.table(res);
        });
    } else if (dbTable === "roles") {
        db.query(`
            SELECT roles.id, roles.title, roles.salary, roles.department_id, departments.name 
            FROM roles 
            LEFT JOIN departments 
            ON roles.department_id = departments.id
        `, (err, res) => {
            err 
            ? console.error(err)
            : console.table(res);
        });
    } else {  // table will always = "employees" here
        db.query(`
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
            FROM employees 
            LEFT JOIN roles
            ON employees.role_id = roles.id
            LEFT JOIN departments
            ON departments.id = roles.department_id
            LEFT JOIN employees AS managers
            ON employees.manager_id = managers.id
        `, (err, res) => {
            err 
            ? console.error(err)
            : console.table(res);
        });
    }
    main();
}

// function to INSERT values into a table
const addToDb = async (dbTable) => {
    console.log ("coming soon")
}

main();
