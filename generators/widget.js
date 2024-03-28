import { getPortals, getWidgets } from '../templates/getAssets.js';
import { portalTypes } from '../templates/configConsts.js';
import { portal, widgetId, type, unitTests, react } from '../templates/flagConsts.js';

export default {
  description: `add a widget's parser(s) to the src directory`,
  prompts: [
    {
      type: 'list',
      name: portal,
      message: 'Select portal',
      choices: getPortals()
    }, {
      type: 'list',
      name: widgetId,
      message: 'Select widget',
      choices: (name) => getWidgets(name.portal).map((widget) => {
        return {
          name: widget,
          value: widget
        }
      })
    }, {
      when: (resp) => resp[widgetId].split('_')[0] === 'HTML',
      type: 'list',
      name: react,
      message: 'Would you like to make this widget a React component?',
      choices: ['yes', 'no'],
    }, {
      when: (resp) => resp[react] === 'yes',
      type: 'list',
      name: 'confirmReact',
      message: 'This option will override any existing parser code. Are you sure you would like to continue?',
      choices: ['yes', 'no']
    }, {
      when: (resp) => resp.confirmReact === 'yes',
      type: 'input',
      name: 'componentName',
      message: 'What would you like to name the component'
    }, {
      when: (resp) => !resp.hasOwnProperty(react) || resp.hasOwnProperty(react) === 'no',
      type: 'list',
      name: type,
      message: 'Select file type',
      choices: portalTypes.map(type => type.slice(1))
    }, {
      when: (resp) => resp[react] === 'yes',
      type: 'list',
      name: type,
      message: 'Select file type',
      choices: ['jsx', 'tsx']
    }, {
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