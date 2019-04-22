const { getLibraries } = require('../utils/getAssets');

module.exports = {
  description: `add a library to the src directory`,
  prompts: [{
    type: 'list',
    name: 'library',
    message: 'Select library',
    choices: getLibraries()
  }, {
    type: 'list',
    name: 'type',
    message: 'Select file type',
    choices: ['js', 'ts']
  }],
  actions: [{
    type: 'createFile'
  }]
}