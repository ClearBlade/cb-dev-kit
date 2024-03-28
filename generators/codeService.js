import { getServices } from '../templates/getAssets.js';
import { codeTypes } from '../templates/configConsts.js';
import { service, type, unitTests } from '../templates/flagConsts.js';

export default {
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