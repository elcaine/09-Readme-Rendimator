// TODO: Include packages needed for this application
require('dotenv').config();
const inquirer = require('inquirer');
const wtf = require('./utils/makeFile');
const md = require('./utils/generateMarkdown');
const { Octokit } = require('octokit');
const questions = [];
const licensesGH = [];
const licObject = [];
const daBadges = [];


const fs = require('fs'); 
const badgeList = fs.readFileSync('./data/badges.txt', 'utf-8');


// TODO: Create a function to initialize app
function init() {
    getLicenses().then(() => {
        // xx();
        badgeList.split(/\r?\n/).forEach(line =>  {
            checkEach(line);
        });
        console.log("badgeList()>> ", daBadges.length);
        // Build list of license names for Inquirer select-from-list input
        const questionsRay = [];
        // console.log("badgeList: ", licensesGH);
        for(let i = 0; i < licensesGH.length; i++){
            const name = licensesGH[i].name;
            const url = licensesGH[i].url;
            const badge = licensesGH[i].node_id;
            questionsRay.push(name);
            licObject.push({name, url, badge});
        }
        console.log("licObj>> ", licObject);
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
            const mdStr = md(response, licObject);
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

    /*












        Get that damn badge here!!!















    */

    console.log(`================\nALL LICENSE INFO\n===================`);
    console.log(`license: ${licensesGH}`);
    for(let i = 0; i < licensesGH.length; i++){
        // licObject.push({})
        // console.log(licensesGH[i].key);
        console.log(licensesGH[i]);
        // console.log(`================\n`);
    }
}

// Function call to initialize app
init();


function checkEach(currentLine){
    const daLine = currentLine.toLowerCase();
    // console.log(`inside checkEach\tLkeys.length: ${licensesGH.length}`);
    for(let i = 0; i < licensesGH.length; i++){
        const daKey = licensesGH[i].key.toLowerCase();
        // console.log(`Lkeys[${i}]: ${licensesGH[i].key}`);
        if(daLine.includes(daKey)){
            // console.log(`${licensesGH[i].key}=>\n${currentLine}\n====`);
            daBadges.push(currentLine);
        }
    }
}

// function xx(){
//     const fs = require('fs');
    
//     const badgeList = fs.readFileSync('./data/badges.txt', 'utf-8');
//     badgeList.split(/\r?\n/).forEach(line =>  {
//       checkEach(line);
//     });
//     console.log(`licObject: ${licObject}`);
//     function checkEach(currentLine){
//         const daLine = currentLine.toLowerCase();
//         // console.log(`inside checkEach\tLkeys.length: ${licensesGH.length}`);
//         for(let i = 0; i < licensesGH.length; i++){
//             const daKey = licensesGH[i].key.toLowerCase();
//             // console.log(`Lkeys[${i}]: ${licensesGH[i].key}`);
//             if(daLine.includes(daKey)){
//                 // console.log(`${licensesGH[i].key}=>\n${currentLine}\n====`);
//                 licensesGH[i].badge = currentLine;
//             }
//         }
//     }
// }