const { getPortals, getWidgets } = require('../templates/getAssets');
const { portalTypes } = require('../templates/configConsts');
const { portal, widgetId, type } = require('../templates/flagConsts');

module.exports = {
  description: `add a widget's parser(s) to the src directory`,
  prompts: [{
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
        value: widget.split('_').pop()
      }
    })
  }, {
    type: 'list',
    name: type,
    message: 'Select file type',
    choices: portalTypes.map(type => type.slice(1))
  }],
  actions: [{
    type: 'createFile'
  }]
}