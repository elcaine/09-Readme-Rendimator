// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const md = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
    {type: `input`, message: `Enter a project title>> `,    name: `Title`},
    {type: `input`, message: `Project description>> `,      name: `Description`},
    {type: `input`, message: `Table of Contents>> `,        name: `ToC`},
    {type: `input`, message: `Installation>> `,             name: `Install`},
    {type: `input`, message: `Usage>> `,                    name: `Usage`},
    {type: `list`,  message: `License>> `,                  name: `License`, choices: [`MIT`, `ISC`, `Apache`, `BSD`, `<none>`]},
    {type: `input`, message: `Contributing>> `,             name: `Contributors`},
    {type: `input`, message: `Tests>> `,                    name: `Tests`},
    {type: `input`, message: `Questions>> `,                name: `Questions`},
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
        .then((response) => {
            // console.log(`Inquirer .then>> ${response}`);
            const mdStr = md(response);
            console.log(`generateMarkdown output:\n${mdStr}\n==============================`);
        })
        .catch((e) => {
            console.log(`Inquirer had a problem :(\t>> ${e}`);
            // let str = `Name:\n\t ${r[0]} \nLanguages talked: \n\t`;
            // r[1].forEach((element) => { str = `${str} ${element} `;});
            // str = `${str}\nPreferred communido:\n\t ${r[2]}`;
            // fs.writeFile(`${r[0]}.txt`, str, (e) =>{ e ? console.log(e) : console.log("Win");});
        });
}

// Function call to initialize app
init();



