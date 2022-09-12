// Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
const connection = require('./db/connection')

// Empty array collects answers to prompts
let employess = [];

// Function initializes app using inquirer
function init () {
    return inquirer
    // Array of queston prompts
    .prompt ([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View All Employess', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        },
        // {
        //     type: 'input',
        //     name: 'department_name',
        //     message: 'What is the name of the department?',
        // },
        // {
        //     type: 'input',
        //     name: 'role',
        //     message: 'What is the name of the role?',
        // },
        // {
        //     type: 'input',
        //     name: 'salary',
        //     message: 'What is the salary of the role?',
        // },
        // {
        //     type: 'input',
        //     name: 'department_role',
        //     message: 'Which department does the role belong to?',
        // },
        // {
        //     type: 'input',
        //     name: 'employee_firstname',
        //     message: "What is the employee's first name?",
        // },
        // {
        //     type: 'input',
        //     name: 'employee_lastname',
        //     message: "What is the employee's last name?",
        // },
        // {
        //     type: 'input',
        //     name: 'employee_role',
        //     message: "What is the employee's role?",
        // },
        // {
        //     type: 'input',
        //     name: 'employee_manager',
        //     message: "Who is the employee's manager?",
        // },
        // {
        //     type: 'input',
        //     name: 'update_role',
        //     message: "Which employee's role do you want to update?",
        // },
        // {
        //     type: 'input',
        //     name: 'assign_role',
        //     message: 'Which role do you want to assign the selected employee?',
        // }

    ]).then ((answers) =>{
       
        if (answers.options === 'View All Employess') {
            viewALLEmployess();
            console.log(answers);
        } else if (answers.options === 'Add Employee') {
            addEmployee();
        } else if (answers.options === 'Update Employee Role') {

        } else if (answers.options === 'View All Roles') {
            viewAllRoles();

        } else if (answers.options === 'Add Role') {
            addRole();
        } else if (answers.options === 'View All Departments') {

            viewAllDepartments();

        } else if (answers.options === 'Add Department') {

            addDepartment();

        } else if (answers.options === 'Quit') {

        }
    })

    function viewALLEmployess() {
        connection.query("SELECT * FROM employee JOIN role ON employee.role_id = role.id", (err, data) => {
            if (err) {
               console.log(err); 
            }
            console.table (data)
            init();
        })
    }

    function viewAllRoles() {
        connection.query("SELECT * FROM role JOIN department ON role.department_id = department.id", (err, data) => {
            if (err) {
               console.log(err); 
            }
            console.table (data)
            init();
        })
    }

    function viewAllDepartments() {
        connection.query("SELECT * FROM department", (err, data) => {
            if (err) {
               console.log(err); 
            }
            console.table (data)
            init();
        })
    }

    function addDepartment() {
        inquirer.prompt (
               {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department?',
        }
        ).then ((answers) =>{
            connection.query("INSERT INTO department (name) VALUES (?)", [answers.department_name], (err, data) => {
                if (err) {
                    console.log(err); 
                 }
                 console.table (data)
                 init();
            })
        })
    }

    function addRole() {
        inquirer.prompt ([
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
        ).then ((answers) =>{
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.role_name, answers.salary, answers.department_id], (err, data) => {
                if (err) {
                    console.log(err); 
                 }
                 console.table (data)
                 init();
            })
        })
    }

    function addEmployee() {
        inquirer.prompt ([
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
                        type: 'input',
                        name: 'employee_role',
                        message: "What is the employee's role?",
                    },
                    {
                        type: 'input',
                        name: 'employee_manager',
                        message: "Who is the employee's manager?",
                    }, 
    ]
        ).then ((answers) =>{
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.employee_firstname, answers.employee_lastname, answers.employee_role, answers.employee_manager], (err, data) => {
                if (err) {
                    console.log(err); 
                 }
                 console.table (data)
                 init();
            })
        })
    }

}

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