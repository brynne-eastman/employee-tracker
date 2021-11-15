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
function startPrompt() {
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
                "Update an employee role",
                "Exit"
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
        
            case "Update an employee role":
                updateEmployeeRole();
                break;

            case "Exit":
                exit();
                break;
        }
    })
};

//View all employees
function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}

//View all departments
function viewAllDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
  }

//View all roles
function viewAllRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
    })
}

//Add an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter employee first name"
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter employee last name"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the employee's role?",
            choices: selectRole()          
        },
        {
            type: "rawlist",
            name: "manager_id",
            message: "What is the manager's ID?",
            choices: selectManager()
        }

    ]).then(function (answer) {
        let roleId = selectRole().indexOf(answer.role) + 1
        connection.query("INSERT INTO employee SET",
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            manager_id: managerId,
            role_id: roleId

            
        }, function(err) {
            if (err) throw err
            console.table(answer)
            startPrompt()
        })
    })
}

//Update an employee role
function updateEmployeeRole() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
        // console.log(res)
        if (err) throw err
        console.log(res)
        inquirer.prompt([
              {
                name: "lastName",
                type: "rawlist",
                choices: function() {
                  var lastName = [];
                  for (var i = 0; i < res.length; i++) {
                    lastName.push(res[i].last_name);
                  }
                  return lastName;
                },
                message: "What is the employee's last name? ",
              },
              {
                name: "role",
                type: "rawlist",
                message: "What is the employee's new title? ",
                choices: selectRole()
              },
          ]).then(function(val) {
            var roleId = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET WHERE ?", 
            {
              last_name: val.lastName
               
            }, 
            {
              role_id: roleId
               
            }, 
            function(err){
                if (err) throw err
                console.table(val)
                startPrompt()
            })
      
        });
    }); 
}

