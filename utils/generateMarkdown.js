// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(selLicIn) {
  if(!selLicIn.badge){ return "";}
  return selLicIn.badge;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(url) {
if(!url){ return "";}  
return `[${url}](${url})`;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(selLicIn) {
  if(!selLicIn){ 
    console.log("render works>> ", selLicIn);
    selLicIn.name = "";
  }
  const licTxt = ""; // TODO TODO TODO
  return `## License ${selLicIn.name} ${renderLicenseLink(selLicIn.url)}
  ${licTxt}`; // Returns: "<some license name>: [construved hyperlink]"
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

function genMDhelper({title, auth, description, toc, install, usage,
  contribute, tests, github, email}, badge, lic){
    return `# ${title} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${badge}
## Description
${description}
### By: ${auth}
### Table of Contents
${toc}

## Installation
${install}

## Use
${usage}

## Contributing guidelines:
${contribute}

## Test instructions
${tests}

## Questions?
### GitHub: [${github}](https://${github})
### Email: [${email}](mailto:${email})

${lic}`;
  }
  