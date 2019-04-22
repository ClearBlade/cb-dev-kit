const { getPortals, getInternalResources } = require('../utils/getAssets');

module.exports = {
  description: `add an internal resource to the src directory`,
  prompts: [{
    type: 'list',
    name: 'portal',
    message: 'Select portal',
    choices: getPortals()
  }, {
    type: 'list',
    name: 'intResource',
    message: 'Select internal resource',
    choices: (name) => getInternalResources(name.portal)
  }, {
    type: 'list',
    name: 'type',
    message: 'Select file type',
    choices: ['js', 'ts', 'tsx', 'jsx']
  }],
  actions: [{
    type: 'createFile'
  }]
}