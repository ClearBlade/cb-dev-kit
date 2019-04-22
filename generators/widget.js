const { getPortals, getWidgets } = require('../utils/getAssets');

module.exports = {
  description: `add a widget's parser(s) to the src directory`,
  prompts: [{
    type: 'list',
    name: 'portal',
    message: 'Select portal',
    choices: getPortals()
  }, {
    type: 'list',
    name: 'widgetId',
    message: 'Select widget',
    choices: (name) => getWidgets(name.portal).map((widget) => {
      return {
        name: widget,
        value: widget.split('_').pop()
      }
    })
  }, {
    type: 'list',
    name: 'type',
    message: 'Select file type',
    choices: ['js', 'jsx', 'ts', 'tsx']
  }],
  actions: [{
    type: 'createFile'
  }]
}