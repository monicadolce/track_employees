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
        }
    ])
}

// Function call to initialize app
init();