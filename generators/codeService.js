const { getServices } = require('../templates/getAssets');
const { codeTypes } = require('../templates/configConsts');
const { service, type, unitTests } = require('../templates/flagConsts');

module.exports = {
  description: `add a code service to the src directory`,
  prompts: [
    {
      type: 'list',
      name: service,
      message: 'Select code service',
      choices: getServices()
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