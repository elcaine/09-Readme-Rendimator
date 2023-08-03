// TODO: Include packages needed for this application
require('dotenv').config();
const inquirer = require('inquirer');
const wtf = require('./utils/makeFile');
const md = require('./utils/generateMarkdown');
const { Octokit } = require('octokit');
const questions = [];
const licensesGH = [];
const licObjects = [];


const fs = require('fs');
// List of badges (Original Markdown source: https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba)
const badgeList = fs.readFileSync('./data/badges.txt', 'utf-8');


// TODO: Create a function to initialize app
function init() {
    getLicenses().then(() => {
        // Build list of license names for Inquirer select-from-list input AND array of license objects
        const questionsRay = [];
        for(let i = 0; i < licensesGH.length; i++){
            let {name, url, badge} = licensesGH[i];
            questionsRay.push(name);
            licObjects.push({name, url, badge});
        }
        questions.push(
            {type: `input`, message: `Enter a project title>> `,    name: `title`},
            {type: `input`, message: `Project description>> `,      name: `description`},
            {type: `input`, message: `Author>> `,                   name: `auth`},
            // {type: `input`, message: `Table of Contents>> `,        name: `toc`},
            {type: `input`, message: `Installation>> `,             name: `install`},
            {type: `input`, message: `Usage>> `,                    name: `usage`},
            {type: `list`,  message: `License>> `,                  name: `lic`, choices: questionsRay},
            {type: `input`, message: `Contributing>> `,             name: `contribute`},
            {type: `input`, message: `Tests>> `,                    name: `tests`},
            {type: `input`, message: `GitHub username>> `,          name: `github`},
            {type: `input`, message: `Email>> `,                    name: `email`},
        );
        getWrapper();
        
        // console.log(licObjects);
    }).then(() => {
        inquirer.prompt(questions)
        .then((response) => {
            // console.log("start of Inquirer after questions (after .then()) ", licObjects);
            const mdStr = md(response, licObjects);
            wtf(mdStr);
        })
        .catch((e) => { console.log(`Inquirer had a problem :(\t>> ${e}`);});
    });
}

const GETTEXT_ERROR = "ERROR GETTING LICENSE DATA";
function getWrapper(){
    for(let i = 0; i < licObjects.length; i++){
        getText(licObjects[i])
            .then((response)=>{
                // console.log("$$$$ license>> ", response.description);
                if(response === GETTEXT_ERROR){
                    licObjects[i].url = "";
                    licObjects[i].txt = "";

                }else{
                    licObjects[i].url = response.html_url;
                    licObjects[i].txt = response.description;
                }
            });
    }
}

async function getLicenses(){
    // Github list of licenses
    const octokit = new Octokit({
        auth: process.env.GH_TOKEN
    })  
    const licenses = await octokit.request('GET /licenses', {
        headers: {'X-GitHub-Api-Version': '2022-11-28'}
    })
    
    // Populates all licenses' info from GitHub
    licensesGH.push(...licenses.data);
    // console.log("??? ", licensesGH);

    // Adds badge element to license elements found in github list of licenses
    badgeList.split(/\r?\n/).forEach(line =>  {
        checkEach(line);
    });

    // console.log("licensesGH>> ", licensesGH);
}

// Function call to initialize app
init();


function checkEach(currentLine){
    const daLine = currentLine.toLowerCase();
    for(lic of licensesGH){
            const daKey = lic.key.toLowerCase();
            // If badge line includes 'key' from github list of licenses, set badge
            if(daLine.includes(daKey)){
                // daBadges.push(currentLine);
                lic.badge = currentLine;
                // break;
            }

        // console.log("lic.url>> ", lic.url);
    }
    return;        
}
    
async function getText(daLic) {
    const licFilePath = daLic.url;
    const response = await fetch(licFilePath);

    if(!response.ok){ 
        // console.log("response not 200: ");
        return GETTEXT_ERROR;
    }else{
        const data = await response.json();
        return data;
    }
}

// Development code to get badge lines from source (source:  https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba)
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