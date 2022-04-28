const { portal, widgetId, internalResource, service, library, messagePort, noSSL, caPath } = require('./flagConsts');
const { configName } = require('./processFlags');
const { portalConfig, allWidgetsConfig, serviceConfig, widgetConfig, internalResourceConfig, libraryConfig, clearbladeHotReloadConfig } = require('./configConsts');

const npmFlag = 'npm_config_';

const mapEntityToWebpackConfig = (entity) => {
  switch (entity) {
    case portal: 
      return [clearbladeHotReloadConfig, widgetConfig, internalResourceConfig, portalConfig, allWidgetsConfig];
    case widgetId:
      return [widgetConfig];
    case internalResource:
      return [internalResourceConfig];
    case service:
      return [serviceConfig];
    case library:
      return [libraryConfig];
    default: // used for messagePort, noSSL, and caPath because they have defaults to fall back to in clearblade-hot-reload
      return []
  }
};

const getFlagValue = (entity) => {
  const val = process.env[`${npmFlag}${entity}`] || process.env[`${npmFlag}${entity}`.toLowerCase()];
  if (mapEntityToWebpackConfig(entity).indexOf(configName) > -1 && !val) {
    error(`Missing ${entity} flag`, true);
  }
  return val;
}

module.exports = {
  portal: getFlagValue(portal),
  widgetId: getFlagValue(widgetId),
  internalResource: getFlagValue(internalResource) || '', // necessary for split in webpack config
  service: getFlagValue(service),
  library: getFlagValue(library),
  messagePort: getFlagValue(messagePort),
  noSSL: getFlagValue(noSSL),
  caPath: getFlagValue(caPath),
  configName: process.argv[process.argv.indexOf('--config-name') + 1]
}
