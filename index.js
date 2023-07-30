// TODO: Include packages needed for this application
require('dotenv').config();
const inquirer = require('inquirer');
const wtf = require('./utils/makeFile');
const md = require('./utils/generateMarkdown');
const { Octokit } = require('octokit');
const questions = [];
const licensesGH = [];

// TODO: Create a function to initialize app
function init() {
    getLicenses().then(() => {
        // Build list of license names for Inquirer select-from-list input
        const questionsRay = [];
        for(let i = 0; i < licensesGH.length; i++){
            questionsRay.push(licensesGH[i].name);
        }

        questions.push(
            {type: `input`, message: `Enter a project title>> `,    name: `Title`},
            {type: `input`, message: `Project description>> `,      name: `Description`},
            {type: `input`, message: `Table of Contents>> `,        name: `ToC`},
            {type: `input`, message: `Installation>> `,             name: `Install`},
            {type: `input`, message: `Usage>> `,                    name: `Usage`},
            {type: `list`,  message: `License>> `,                  name: `License`, choices: questionsRay},
            {type: `input`, message: `Contributing>> `,             name: `Contributors`},
            {type: `input`, message: `Tests>> `,                    name: `Tests`},
            {type: `input`, message: `Questions>> `,                name: `Questions`},
        );
    }).then(() => {
        inquirer.prompt(questions)
        .then((response) => {
            const mdStr = md(response, licensesGH);
            // console.log(`generateMarkdown output:\n${mdStr}\n==============================`);
            wtf(mdStr);
        })
        .catch((e) => { console.log(`Inquirer had a problem :(\t>> ${e}`);});
    });
}



async function getLicenses(){
    const octokit = new Octokit({
        auth: process.env.GH_TOKEN
      })
      
    const licenses = await octokit.request('GET /licenses', {
        headers: {'X-GitHub-Api-Version': '2022-11-28'}
        })
    // Populates all licenses' info
    licensesGH.push(...licenses.data);
}

// Function call to initialize app
init();