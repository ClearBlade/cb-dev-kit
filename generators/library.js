const { getLibraries } = require('../templates/getAssets');
const { codeTypes } = require('../templates/configConsts');
const { library, type } = require('../templates/flagConsts');

module.exports = {
  description: `add a library to the src directory`,
  prompts: [{
    type: 'list',
    name: library,
    message: 'Select library',
    choices: getLibraries()
  }, {
    type: 'list',
    name: type,
    message: 'Select file type',
    choices: codeTypes.map(type => type.slice(1))
  }],
  actions: [{
    type: 'createFile'
  }]
}