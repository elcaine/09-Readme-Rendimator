// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  // console.log("gmd>>>\n", data.Title);
  if(data.Title === ''){ data.Title = `<<<No title entered>>>`;}
  let str = `# ${data.Title}\n`;

  // License crap here
  for(const key in data){
    if(key === `Title`){ continue;}
    if(data[key] === ''){ data[key] = '<nothing entered>';}
    str = `${str}#${key}\n${data[key]}\n`;
  }
  // return `# ${data.title}`;
  return str;
}

module.exports = generateMarkdown;
