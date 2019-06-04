const { getLibraries } = require('../templates/getAssets');
const { codeTypes } = require('../templates/configConsts');
const { library, type, unitTests } = require('../templates/flagConsts');

module.exports = {
  description: `add a library to the src directory`,
  prompts: [
    {
      type: 'list',
      name: library,
      message: 'Select library',
      choices: getLibraries()
    }, {
      type: 'list',
      name: type,
      message: 'Select file type',
      choices: codeTypes.map(type => type.slice(1))
    },
    {
      type: 'list',
      name: unitTests,
      message: 'Include unit test file?',
      choices: ['yes', 'no'],
      filter: (input) => input === 'yes' ? 'true' : 'false'
    }
  ],
  actions: [{
    type: 'createFile'
  }]
}