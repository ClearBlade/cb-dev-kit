const path = require('path');
const fs = require('fs');
const error = require('./error');

// path constants
const SRC = 'src';
const PORTALS = 'portals';
const CONFIG = 'config';
const WIDGETS = 'widgets';
const INTERNAL_RESOURCES = 'internalResources';
const DATASOURCES = 'datasources';
const CODE = 'code';
const SERVICES = 'services';
const LIBRARIES = 'libraries';

module.exports = {
  getAllPath: (inSrc) => path.resolve(inSrc ? `${SRC}` : `./`),
  
  getPortalsPath: (inSrc) => path.join(module.exports.getAllPath(inSrc), PORTALS),
  getPortals: () => fs.readdirSync(module.exports.getPortalsPath()),
  getPortalPath: (name, inSrc) => {
    if (module.exports.getPortals().indexOf(name) > -1) {
      return path.join(module.exports.getPortalsPath(inSrc), name);
    }
    error(`Could not locate path to portal with name ${name}. Please check that name is correct and that its directory exists.`, true)
  },
  getPortalConfigPath: (name, inSrc) => path.join(module.exports.getPortalPath(name, inSrc), CONFIG),

  getWidgetsPath: (portal, inSrc) => path.join(module.exports.getPortalConfigPath(portal, inSrc), WIDGETS),
  getWidgets: (portal) => fs.readdirSync(module.exports.getWidgetsPath(portal)),
  getWidgetPath: (portal, widgetId, inSrc) => {
    const widgetName = module.exports.getWidgets(portal).find((widget) => widget.split('_').indexOf(widgetId) > -1);
    if (widgetName) {
      return path.join(module.exports.getWidgetsPath(portal, inSrc), widgetName);
    }
    error(`Could not locate path to widget with id ${widgetId}. Please check that id is correct and that its directory exists.`, true);
  },

  getInternalResourcesPath: (portal, inSrc) => path.join(module.exports.getPortalConfigPath(portal, inSrc), INTERNAL_RESOURCES),
  getInternalResources: (portal) => fs.readdirSync(module.exports.getInternalResourcesPath(portal)),
  getInternalResourcePath: (portal, name, inSrc) => {
    if (module.exports.getInternalResources(portal).indexOf(name) > -1) {
      return path.join(module.exports.getInternalResourcesPath(portal, inSrc), name);
    }
    error(`Could not locate path to internal resource with name ${name}. Please check that name is correct and that its directory exists.`, true);
  },

  getDatasourcesPath: (portal, inSrc) => path.join(module.exports.getPortalConfigPath(portal, inSrc), DATASOURCES),
  getDatasources: (portal) => fs.readdirSync(module.exports.getDatasourcesPath(portal)),
  getDatasourcePath: (portal, name, inSrc) => {
    if (module.exports.getDatasources(portal).indexOf(name) > -1) {
      return path.join(module.exports.getDatasourcesPath(portal, inSrc), name);
    }
    error(`Could not locate path to datasource with name ${name}. Please check that name is correct and that its directory exists.`, true);
  },

  getServicesPath: (inSrc) => path.join(module.exports.getAllPath(inSrc), CODE, SERVICES),
  getServices: () => fs.readdirSync(module.exports.getServicesPath()),
  getServicePath: (name, inSrc) => {
    if (module.exports.getServices().indexOf(name) > -1) {
      return path.join(module.exports.getServicesPath(inSrc), name);
    }
    error(`Could not locate path to service with name ${name}. Please check that name is correct and that its directory exists.`, true);
  },

  getLibrariesPath: (inSrc) => path.join(module.exports.getAllPath(inSrc), CODE, LIBRARIES),
  getLibraries: () => fs.readdirSync(module.exports.getLibrariesPath()),
  getLibraryPath: (name, inSrc) => {
    if (module.exports.getLibraries().indexOf(name) > -1) {
      return path.join(module.exports.getLibrariesPath(inSrc), name);
    }
    error(`Could not locate path to library with name ${name}. Please check that name is correct and that its directory exists.`, true);
  }
}