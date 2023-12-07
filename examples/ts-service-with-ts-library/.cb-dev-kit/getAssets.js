import path from 'path';
import fs from 'fs';
import error from './error.js';

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

const checkForAssetDir = (path, asset) => {
  if (fs.existsSync(path)) {
    return fs.readdirSync(path);
  }
  error(`Could not locate ${asset} directory at ${path}. Please add the directory back to the path.`, true);
}

export const getAllPath = (inSrc) => path.resolve(inSrc ? `${SRC}` : process.env.cwd ? process.env.cwd : `.${path.sep}`);
export const getPortalsPath = (inSrc) => path.join(getAllPath(inSrc), PORTALS);
export const getPortals = () => checkForAssetDir(getPortalsPath(), PORTALS);
export const getPortalPath = (name, inSrc) => {
  if (getPortals().indexOf(name) > -1) {
    return path.join(getPortalsPath(inSrc), name);
  }
  error(`Could not locate path to portal with name ${name}. Please check that name is correct and that its directory exists.`, true)
};

export const getPortalConfigPath = (name, inSrc) => path.join(getPortalPath(name, inSrc), CONFIG);
export const getWidgetsPath = (portal, inSrc) => path.join(getPortalConfigPath(portal, inSrc), WIDGETS);
export const getWidgets = (portal) => checkForAssetDir(getWidgetsPath(portal), WIDGETS);
export const getWidgetPath = (portal, widgetId, inSrc) => {
  const widgetName = getWidgets(portal).find((widget) => widget.split('_').indexOf(widgetId) > -1);
  if (widgetName) {
    return path.join(getWidgetsPath(portal, inSrc), widgetName);
  }
  error(`Could not locate path to widget with id ${widgetId}. Please check that id is correct and that its directory exists.`, true);
};

export const getInternalResourcesPath = (portal, inSrc) => path.join(getPortalConfigPath(portal, inSrc), INTERNAL_RESOURCES);
export const getInternalResources = (portal) => checkForAssetDir(getInternalResourcesPath(portal), INTERNAL_RESOURCES);
export const getInternalResourcePath = (portal, name, inSrc) => {
  if (getInternalResources(portal).indexOf(name) > -1) {
    return path.join(getInternalResourcesPath(portal, inSrc), name);
  }
  error(`Could not locate path to internal resource with name ${name}. Please check that name is correct and that its directory exists.`, true);
};

export const getDatasourcesPath = (portal, inSrc) => path.join(getPortalConfigPath(portal, inSrc), DATASOURCES);
export const getDatasources = (portal) => checkForAssetDir(getDatasourcesPath(portal), DATASOURCES);
export const getDatasourcePath = (portal, name, inSrc) => {
  if (getDatasources(portal).indexOf(name) > -1) {
    return path.join(getDatasourcesPath(portal, inSrc), name);
  }
  error(`Could not locate path to datasource with name ${name}. Please check that name is correct and that its directory exists.`, true);
};

export const getServicesPath = (inSrc) => path.join(getAllPath(inSrc), CODE, SERVICES);
export const getServices = () => checkForAssetDir(getServicesPath(), SERVICES);
export const getServicePath = (name, inSrc) => {
  if (getServices().indexOf(name) > -1) {
    return path.join(getServicesPath(inSrc), name);
  }
  error(`Could not locate path to service with name ${name}. Please check that name is correct and that its directory exists.`, true);
};

export const getLibrariesPath = (inSrc) => path.join(getAllPath(inSrc), CODE, LIBRARIES);
export const getLibraries = () => checkForAssetDir(getLibrariesPath(), LIBRARIES);
export const getLibraryPath = (name, inSrc) => {
  if (getLibraries().indexOf(name) > -1) {
    return path.join(getLibrariesPath(inSrc), name);
  }
  error(`Could not locate path to library with name ${name}. Please check that name is correct and that its directory exists.`, true);
};

export default {
  getAllPath: getAllPath,
  getPortalsPath: getPortalsPath,
  getPortals: getPortals,
  getPortalPath: getPortalPath,
  getPortalConfigPath: getPortalConfigPath,
  getWidgetsPath: getWidgetsPath,
  getWidgets: getWidgets,
  getWidgetPath: getWidgetPath,
  getInternalResourcesPath: getInternalResourcesPath,
  getInternalResources: getInternalResources,
  getInternalResourcePath: getInternalResourcePath,
  getDatasourcesPath: getDatasourcesPath,
  getDatasources: getDatasources,
  getDatasourcePath: getDatasourcePath,
  getServicesPath: getServicesPath,
  getServices: getServices,
  getServicePath: getServicePath,
  getLibrariesPath: getLibrariesPath,
  getLibraries: getLibraries,
  getLibraryPath: getLibraryPath
}