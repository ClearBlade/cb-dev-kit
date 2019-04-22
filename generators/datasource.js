const { getPortals, getDatasources } = require('../utils/getAssets');

module.exports = {
  description: `add a datasource parser to the src directory`,
  prompts: [{
    type: 'list',
    name: 'portal',
    message: 'Select portal',
    choices: getPortals()
  }, {
    type: 'list',
    name: 'datasource',
    message: 'Select datasource',
    choices: (name) => getDatasources(name.portal)
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