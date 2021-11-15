//Dependencies
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

//Connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mickeymouse111!',
    database: 'employee_db'
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as Id" + connection.threadId)
    startPrompt();
});

//prompt 
function startPromt() {
    inquirer.prompt([
        {
            type:"list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add an employee",
                "Add a department",
                "Add a role",
                "Update an employee role",
                "Update an employee manager",
                "View employees by department",
                "Delete an employee",
                "Delete a department",
                "Delete a role",
                "View a department budget"
            ]
        }
    ])
    .then(function(answer) {
        switch (answer.choice) {
            case "View all employees":
                viewAllEmployees();
                break;
            
            case "View all departments":
                viewAllDepartments();
                break;

            case "View all roles":
                viewAllRoles();
                break;

            case "Add an employee":
                addEmployee();
                break;
            
            case "Add a department":
                addDepartment();
                break;

            case "Add a role":
                addRole();
                break;

            case "Update an employee role":
                updateEmployeeRole();
                break;

            case "Update an employee manager":
                updateEmployeeManager();
                break;

            case "View employees by department":
                employeeDepartment();
                break;

            case "Delete an employee":
                deleteEmployee();
                break;

            case "Delete a department":
                deleteDepartment();
                break;

            case "Delete a role":
                deleteRole();
                break;

            case "View a department budget":
                departmentBudget();
                break;
        }
    })
};

//View all employees
function viewAllEmployees() {
    
}