// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(selLicIn) {
  if(!selLicIn.badge){  
    console.log("Empty license badge>> ", selLicIn);
    return "";
  }
  return selLicIn.badge;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(url) {
if(!url){
  console.log("Empty license url");
  return "";
}  
return `[${url}](${url})`;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(selLicIn) {
  if(!selLicIn){ 
    console.log("Empty license>> ", selLicIn);
    selLicIn.name = "";
  }
  if(!selLicIn.txt){
    console.log("Empty license text>> ", selLicIn);
    selLicIn.txt = "";
  }


  return `## License ${selLicIn.name}
  ${renderLicenseLink(selLicIn.url)}
  ${selLicIn.txt}`; // Returns: "<some license name>: [constructed hyperlink]... \nLicense description"
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(res, licList) {
  // Format title to uppers or blank if empty
  if(!res.title){ res.title = `[ No title entered ]`;}
  else{ res.title = res.title.toUpperCase()}
  
  // Build License components
  let licStr, badgeStr;
  // License object selected that matches Inquirer response
  let selectedLic = licList.find((element) => element.name === res.lic)
  if(!selectedLic){ selectedLic = "";}
  licStr = renderLicenseSection(selectedLic);
  badgeStr = renderLicenseBadge(selectedLic);

  console.log("Litem: ", selectedLic);
  console.log("==================\nafter render: ", licStr, "\n============================");

  return genMDhelper(res, badgeStr, licStr);
}

module.exports = generateMarkdown;

function genMDhelper({title, auth, description, install, usage,
  contribute, tests, github, email}, badge, lic){
    return `# ${title} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${badge}
<a id="descr"></a>
## Description
${description}
<a id="auth"></a>
### By: ${auth}
<a id="toc"></a>
### Table of Contents
1.  [Description](#descr)
2.  [Author](#auth)
3.  [Table of Contents](#toc)
4.  [Installation](#install)
5.  [Usage](#use)
6.  [Contributing Guidelines](#contr)
7.  [Test instructions](#test)
8.  [Questions](#quest)
9.  [License](#lic)

<a id="install"></a>
## Installation
${install}

<a id="use"></a>
## Usage
${usage}

<a id="contr"></a>
## Contributing guidelines
${contribute}

<a id="test"></a>
## Test instructions
${tests}

<a id="quest"></a>
## Questions?
### GitHub: [${github}](https://github.com/${github})
### Email: [${email}](mailto:${email})
Please review my GitHub profile and/or contact me via the email noted above if you have any further questions.

<a id="lic"></a>
## License
${lic}
`;
}
  