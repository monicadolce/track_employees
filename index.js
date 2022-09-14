// Packages needed for this application
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./connection')

// Function initializes app using inquirer
function init() {
    return inquirer
        // Queston prompt for main menu
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What would you like to do?',
                choices: ['View All Employess', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
            }
        ]).then((answers) => {

            if (answers.options === 'View All Employess') {
                // When View All Employees is selected, the viewAllEmployees function is initiated
                viewALLEmployess();

                console.log(answers);

            } else if (answers.options === 'Add Employee') {
                // When Add Employee is selected, the AddEmployee function is initiated
                addEmployee();

            } else if (answers.options === 'Update Employee Role') {
                // When Update Employee Role is selected, the updateEmployeeRole function is initiated
                updateEmployeeRole();

            } else if (answers.options === 'View All Roles') {
                // When View All Roles is selected, the viewAllRoles function is initiated
                viewAllRoles();

            } else if (answers.options === 'Add Role') {
                 // When Add Role is selected, the addRole function is initiated
                addRole();

            } else if (answers.options === 'View All Departments') {
                // When View All Departments is selected, the viewAllDepartments function is initiated
                viewAllDepartments();

            } else if (answers.options === 'Add Department') {
                // When Add Department is selected, the addDepartment function is initiated
                addDepartment();

            };
        });
        // Function viewAllEmployees executes a query to the database and links employee table to role table using a foreign key reference
    function viewALLEmployess() {
        connection.query("SELECT * FROM employee JOIN role ON employee.role_id = role.id", (err, data) => {
            if (err) {
                console.log(err);
            } 
            // Prints MySQL rows to the console.
            console.table(data)
            // Function call to initialize app bringing user to main menu
            init();
        });
    };
        // Function viewAllRoles executes a query to the database and links role table to department table using a foreign key reference
    function viewAllRoles() {
        connection.query("SELECT * FROM role JOIN department ON role.department_id = department.id", (err, data) => {
            if (err) {
                console.log(err);
            }
            // Prints MySQL rows to the console.
            console.table(data)
            // Function call to initialize app bringing user to main menu
            init();
        });
    };
        // Function viewAllDepartments executes a query to the database and displays department table
    function viewAllDepartments() {
        connection.query("SELECT * FROM department", (err, data) => {
            if (err) {
                console.log(err);
            }
             // Prints MySQL rows to the console.
            console.table(data)
            // Function call to initialize app bringing user to main menu
            init();
        });
    };
        // Function addDepartment asks user for department name
    function addDepartment() {
        inquirer.prompt(
            {
                type: 'input',
                name: 'department_name',
                message: 'What is the name of the department?',
            }
        ).then((answers) => {
            // Executes a query to the database and inserts the user's input into department table
            connection.query("INSERT INTO department (name) VALUES (?)", [answers.department_name], (err, data) => {
                if (err) {
                    console.log(err);
                }
                // Prints MySQL rows to the console.
                console.table(data)
                // Function call to initialize app bringing user to main menu
                init();
            });
        });
    };
         // Function addRole asks user for role name, salary, id of role's department
    function addRole() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'role_name',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'input',
                name: 'department_id',
                message: "What is the id of the role's department?",
            },
        ]
        ).then((answers) => {
            // Executes a query to the database and inserts the user's input into role table
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.role_name, answers.salary, answers.department_id], (err, data) => {
                if (err) {
                    console.log(err);
                }
                 // Prints MySQL rows to the console.
                console.table(data)
                // Function call to initialize app bringing user to main menu
                init();
            });
        });
    };
        // Function addEmployee asks user for first name, last name, the id of employee's role, the id of employee's manager
    function addEmployee() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employee_firstname',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'employee_lastname',
                message: "What is the employee's last name?",
            },
            {
                type: 'number',
                name: 'employee_role',
                message: "What is the id of the employee's role?",
            },
            {
                type: 'number',
                name: 'employee_manager',
                message: "What is the id of the employee's manager?",
            },
        ]
        ).then((answers) => {
            // Executes a query to the database and inserts the user's input into employee table
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.employee_firstname, answers.employee_lastname, answers.employee_role, answers.employee_manager], (err, data) => {
                if (err) {
                    console.log(err);
                }
                 // Prints MySQL rows to the console.
                console.table(data)
                // Function call to initialize app bringing user to main menu
                init();
            });
        });
    };
         // Function updateEmployeeRole asks user for the id of the employee they want to update and the new id to assign to the employee
    function updateEmployeeRole() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'What is the id of the employee you want to update?',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the new id of the role you want to assign to the employee?',
            },
        ]
        ).then((answers) => {
            // Executes a query to the database and updates the id of the employee
            connection.query("UPDATE employee SET role_id = ? WHERE id = ? ", [answers.role_id, answers.employee_id], (err, data) => {
                if (err) {
                    console.log(err);
                }
                 // Prints MySQL rows to the console.
                console.table(data)
                // Function call to initialize app bringing user to main menu
                init();
            });
        });
    };
};

// Function call to initialize app
init();