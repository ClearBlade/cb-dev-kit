if (process.env.cwd) {
  process.chdir(process.env.cwd);
}

const widgetGenerator = require('../generators/widget');
const internalResourceGenerator = require('../generators/internalResource');
// const datasourceGenerator = require('../generators/datasource');
const codeServiceGenerator = require('../generators/codeService');
const libraryGenerator = require('../generators/library');

const shell = require('shelljs');

module.exports = (plop) => {
  plop.setActionType('createFile', function (answers) {
    let cmd = `cb-dev-kit create`;
    for (const flag in answers) {
      cmd += ` -${flag}=${answers[flag]}`;
    }
    shell.exec(cmd)
  });

  plop.setGenerator('widget', widgetGenerator);
  plop.setGenerator('internalResource', internalResourceGenerator);
  // plop.setGenerator('datasource', datasourceGenerator);
  plop.setGenerator('service', codeServiceGenerator);
  plop.setGenerator('library', libraryGenerator);
}
