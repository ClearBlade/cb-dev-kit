const fs = require('fs');
const path = require('path');

// only want to return index for widgets and root service/library/intResource names
const confirmNameForType = (filePath) => {
  const fileName = path.basename(filePath, path.extname(filePath));
  return (filePath.includes('/config/widgets/') && fileName === 'index') ||
    (filePath.includes(`/config/internalResources/${fileName}.js`)) ||
    (filePath.includes(`/code/libraries/${fileName}`)) ||
    (filePath.includes(`/code/services/${fileName}`))
};

module.exports = (dir, fileTypes) => {
  var filesToReturn = [];
  function walkDir(currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var curFile = path.join(currentPath, files[i]);      
      if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) > -1 && confirmNameForType(curFile)) {
        filesToReturn.push(curFile);
      } else if (fs.statSync(curFile).isDirectory()) {
      walkDir(curFile);
      }
    }
  };
  walkDir(dir);
  return filesToReturn; 
}