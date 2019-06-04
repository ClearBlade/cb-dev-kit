const { getPortals, getInternalResources } = require('../templates/getAssets');
const { portalTypes } = require('../templates/configConsts');
const { portal, internalResource, type, unitTests } = require('../templates/flagConsts');

module.exports = {
  description: `add an internal resource to the src directory`,
  prompts: [
    {
      type: 'list',
      name: portal,
      message: 'Select portal',
      choices: getPortals()
    }, {
      type: 'list',
      name: internalResource,
      message: 'Select internal resource',
      choices: (name) => getInternalResources(name.portal)
    }, {
      type: 'list',
      name: type,
      message: 'Select file type',
      choices: portalTypes.map(type => type.slice(1))
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