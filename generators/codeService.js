const { getServices } = require('../utils/getAssets');

module.exports = {
  description: `add a code service to the src directory`,
  prompts: [{
    type: 'list',
    name: 'service',
    message: 'Select code service',
    choices: getServices()
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