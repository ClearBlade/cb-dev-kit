import { getPortals, getDatasources } from '../templates/getAssets.js';
import { portal, datasource, type, unitTests } from '../templates/flagConsts.js';

export default {
  description: `add a datasource parser to the src directory`,
  prompts: [
    {
      type: 'list',
      name: portal,
      message: 'Select portal',
      choices: getPortals()
    }, {
      type: 'list',
      name: datasource,
      message: 'Select datasource',
      choices: (name) => getDatasources(name.portal)
    }, {
      type: 'list',
      name: type,
      message: 'Select file type',
      choices: ['js', 'ts']
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