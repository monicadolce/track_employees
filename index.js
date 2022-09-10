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
            type: 'input',
            name: 'name',
            message: 'What is your name?',
        }
    ])
}

// Function call to initialize app
init();