import { getLibraries } from '../templates/getAssets.js';
import { codeTypes } from '../templates/configConsts.js';
import { library, type, unitTests } from '../templates/flagConsts.js';

export default {
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