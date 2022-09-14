// Packages needed for this application
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection')

// Empty array collects answers to prompts
let employess = [];

// Function initializes app using inquirer
function init() {
    return inquirer
        // Array of queston prompts
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What would you like to do?',
                choices: ['View All Employess', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
            }
        ]).then((answers) => {

            if (answers.options === 'View All Employess') {

                viewALLEmployess();

                console.log(answers);

            } else if (answers.options === 'Add Employee') {

                addEmployee();

            } else if (answers.options === 'Update Employee Role') {

                updateEmployeeRole();

            } else if (answers.options === 'View All Roles') {

                viewAllRoles();

            } else if (answers.options === 'Add Role') {

                addRole();

            } else if (answers.options === 'View All Departments') {

                viewAllDepartments();

            } else if (answers.options === 'Add Department') {

                addDepartment();

            }
        })

    function viewALLEmployess() {
        connection.query("SELECT * FROM employee JOIN role ON employee.role_id = role.id", (err, data) => {
            if (err) {
                console.log(err);
            }
            console.table(data)
            init();
        })
    }

    function viewAllRoles() {
        connection.query("SELECT * FROM role JOIN department ON role.department_id = department.id", (err, data) => {
            if (err) {
                console.log(err);
            }
            console.table(data)
            init();
        })
    }

    function viewAllDepartments() {
        connection.query("SELECT * FROM department", (err, data) => {
            if (err) {
                console.log(err);
            }
            console.table(data)
            init();
        })
    }

    function addDepartment() {
        inquirer.prompt(
            {
                type: 'input',
                name: 'department_name',
                message: 'What is the name of the department?',
            }
        ).then((answers) => {
            connection.query("INSERT INTO department (name) VALUES (?)", [answers.department_name], (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.table(data)
                init();
            })
        })
    }

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
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.role_name, answers.salary, answers.department_id], (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.table(data)
                init();
            })
        })
    }

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
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.employee_firstname, answers.employee_lastname, answers.employee_role, answers.employee_manager], (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.table(data)
                init();
            })
        })
    }

    function updateEmployeeRole() {

        // viewALLEmployess()

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
            connection.query("UPDATE employee SET role_id = ? WHERE id = ? ", [answers.role_id, answers.employee_id], (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.table(data)
                init();
            })
        })
    }
}

//Delete data; Add delete route using prepared statement 

// app.delete('/delete/:id', (req, res) => {
//     db.query('DELETE FROM course_names WHERE id = ?', 
//     req.params.id, function (err, results) {
//       if (err) {
//         console.log(err);
//         return res.json((err));
//       }
  
//       return res.json((results));
//     })
//   })        

// Query database using COUNT() and GROUP BY
// db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
//     console.log(results);
//   });

// Query database using SUM(), MAX(), MIN() AVG() and GROUP BY
// db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
//     console.log(results);
//   });






// .then((answers) => {
//     let newManager = new Manager(answers.name, answers.id, answers.email, answers.number)
//     employees.push(newManager)
//     // menu function is called to return to menu prompts
//     menu()
// });

// .then((answers) => {
//     const htmlPageContent = generateHTML(answers);

//     fs.writeFile('index.html', htmlPageContent, (err) =>
//       err ? console.log(err) : console.log('Successfully created index.html!')
//     );
//   });


// Function call to initialize app
init();