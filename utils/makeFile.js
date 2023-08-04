const fs = require('fs');

function writeToFile(data){
    // From StackOverflow: https://stackoverflow.com/questions/57742157/node-js-how-to-find-the-desktop-path
    const homeDir = require('os').homedir();
    const desktopDir = `${homeDir}/Desktop/myREADME.md`;
    // console.log(`fileName: ${fileName}\tdata: ${data}`);
    fs.writeFile(desktopDir, data, (e) => { e ? console.log(`wtf(e): ${e}`) : console.log(`win`);});
}

module.exports = writeToFile;
