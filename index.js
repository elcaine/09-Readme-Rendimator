// TODO: Include packages needed for this application
require('dotenv').config();
const inquirer = require('inquirer');
const wtf = require('./utils/makeFile');
const md = require('./utils/generateMarkdown');
const { Octokit } = require('octokit');
const questions = [];
const licensesGH = [];
const licObjects = [];
const daBadges = [];


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
        // console.log("after getLicense()>> ", licObjects, "\nNumber: ", licObjects.length);
        questions.push(
            {type: `input`, message: `Enter a project title>> `,    name: `title`},
            {type: `input`, message: `Project description>> `,      name: `description`},
            {type: `input`, message: `Author>> `,                   name: `auth`},
            {type: `input`, message: `Table of Contents>> `,        name: `toc`},
            {type: `input`, message: `Installation>> `,             name: `install`},
            {type: `input`, message: `Usage>> `,                    name: `usage`},
            {type: `list`,  message: `License>> `,                  name: `lic`, choices: questionsRay},
            {type: `input`, message: `Contributing>> `,             name: `contribute`},
            {type: `input`, message: `Tests>> `,                    name: `tests`},
            {type: `input`, message: `GitHub link>> `,              name: `github`},
            {type: `input`, message: `Email>> `,                    name: `email`},
        );
    }).then(() => {
        inquirer.prompt(questions)
        .then((response) => {
            const mdStr = md(response, licObjects);
            // console.log(`generateMarkdown output:\n${mdStr}\n==============================`);
            wtf(mdStr);
        })
        .catch((e) => { console.log(`Inquirer had a problem :(\t>> ${e}`);});
    });
}



async function getLicenses(){
    // Github list of licenses
    const octokit = new Octokit({
        auth: process.env.GH_TOKEN
    })  
    const licenses = await octokit.request('GET /licenses', {
        headers: {'X-GitHub-Api-Version': '2022-11-28'}
    })
// console.log("??? ", licenses);
    // Populates all licenses' info from GitHub
    licensesGH.push(...licenses.data);
    // console.log("??? ", licensesGH);

    // Adds badge element to license elements found in github list of licenses
    badgeList.split(/\r?\n/).forEach(line =>  {
        checkEach(line);
    });

    // for(lic of licensesGH){
    //     let str = lic.url;
    //     str = str.substring(str.lastIndexOf('/') + 1);
    //     for(b of daBadges){
    //         const bStr = b.toLowerCase();
    //         if(bStr.includes(str)){
    //             lic.badge = b;
    //             break;
    //         }
    //     }
    // }
    // console.log("aft: ", licensesGH);
}

// Function call to initialize app
init();


function checkEach(currentLine){
    const daLine = currentLine.toLowerCase();
    for(lic of licensesGH){




        const licFilePath = lic.url;
        getText(licFilePath, lic);


        
        
        const daKey = lic.key.toLowerCase();
        // If badge line includes 'key' from github list of licenses, set badge
        if(daLine.includes(daKey)){
            // daBadges.push(currentLine);
            lic.badge = currentLine;
            break;
        }
    }
}
    
    async function getText(fp, licObj) {
        let curLic = await fetch(fp);
        let licJson = await curLic.json();
        licObj.url = licJson.html_url;
        console.log("output>>> ", licObj.url, "\n=======================");
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