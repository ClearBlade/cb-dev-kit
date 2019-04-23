const fs = require('fs');
const error = require('./error');
const getFilesFromDir = require('./getFilesFromDir');
const { getLibrariesPath, getServicesPath, getWidgetsPath, getPortalsPath, getWidgetPath, getPortalConfigPath, getAllPath } = require('./getAssets');
const { allFileTypes, portalTypes, codeTypes } = require('./configConsts');

const createEntryObject = (path, allowedTypes, parentDir) => {
  const allFiles = getFilesFromDir(path, allowedTypes);
  return allFiles.reduce((allEntries, srcName) => {
    const resultName = `${srcName.slice(srcName.indexOf(parentDir)+parentDir.length)}`.replace(/\.tsx|\.jsx|\.ts/gi, '.js');
    allEntries[resultName] = srcName;
    return allEntries;
  }, {});
}

module.exports = {
  getAllEntries: () => {
    const allPath = getAllPath(true);
    if (fs.existsSync(allPath)) {
      return createEntryObject(allPath, allFileTypes, 'src/');
    }
    error(`Missing src path: ${allPath}. To resolve this issue, create a 'src' directory in the root directory of this system and use cb-dev-kit create or cb-dev-kit generate to add files to it.`, true); 
  },
  getAllPortalsEntries: () => {
    const portalsPath = getPortalsPath(true);
    if (fs.existsSync(portalsPath)) {
      return createEntryObject(portalsPath, portalTypes, 'portals/');
    }
    error(`Missing src path: ${portalsPath}. To resolve this issue, create a 'src' directory in the root directory of this system and use cb-dev-kit create or cb-dev-kit generate to add files to it.`, true); 
  },
  getPortalEntries: (portal) => {
    const configPath = getPortalConfigPath(portal, true);
    if (fs.existsSync(configPath)) {
      return createEntryObject(configPath, portalTypes, 'config/');
    }
    error(`Missing src path: ${configPath}. To resolve this issue, create a 'src' directory in the root directory of this system and use cb-dev-kit create or cb-dev-kit generate to add files to it.`, true); 
  },
  getAllWidgetsEntries: (portal) => {
    const widgetsPath = getWidgetsPath(portal, true);
    if (fs.existsSync(widgetsPath)) {
      return createEntryObject(widgetsPath, portalTypes, 'widgets/');
    }
    error(`Missing src path: ${widgetsPath}. To resolve this issue, create a 'src' directory in the root directory of this system and use cb-dev-kit create or cb-dev-kit generate to add files to it.`, true); 
  },
  getWidgetEntries: (portal, widgetId) => {
    if (widgetId) {
      const widgetPath = getWidgetPath(portal, widgetId, true);
      return createEntryObject(widgetPath, portalTypes, `${widgetId}/`);
    }
    error(`Missing src path for widget with id ${module.exports.widgetId}. To resolve this issue, create a 'src' directory in the root directory of this system and use cb-dev-kit create or cb-dev-kit generate to add files to it.`, true);
  },
  getAllServicesEntries: () => {
    const servicesPath = getServicesPath(true);
    if (fs.existsSync(servicesPath)) {
      return createEntryObject(servicesPath, codeTypes, 'services/');
    }
    error(`Missing src path: ${servicesPath}. To resolve this issue, create a 'src' directory in the root directory of this system and use cb-dev-kit create or cb-dev-kit generate to add files to it.`, true); 
  },
  getAllLibrariesEntries: () => {
    const librariesPath = getLibrariesPath(true);
    if (fs.existsSync(librariesPath)) {
      return createEntryObject(librariesPath, codeTypes, 'libraries/');
    }
    error(`Missing src path: ${librariesPath}. To resolve this issue, create a 'src' directory in the root directory of this system and use cb-dev-kit create or cb-dev-kit generate to add files to it.`, true); 
  },
}