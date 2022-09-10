// Packages needed for this application
const inquirer = require('inquirer');
// const fs = require('fs');

// Empty array collects answers to prompts
let employess = [];

// Function initializes app using inquirer
function init () {
    inquirer
    // Array of queston prompts
    .prompt ([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View All Employess', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department?',
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is the name of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'input',
            name: 'department_role',
            message: 'Which department does the role belong to?',
        },
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
        {
            type: 'input',
            name: 'update_role',
            message: "Which employee's role do you want to update?",
        },
        {
            type: 'input',
            name: 'assign_role',
            message: 'Which role do you want to assign the selected employee?',
        }

    ])
}

// Function call to initialize app
init();