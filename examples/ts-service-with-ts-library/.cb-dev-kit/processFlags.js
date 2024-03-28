import flagConsts from './flagConsts.js';
import processFlags from './processFlags.js';
import { portalConfig, allWidgetsConfig, serviceConfig, widgetConfig, internalResourceConfig, libraryConfig, clearbladeHotReloadConfig } from './configConsts.js';

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
  if (mapEntityToWebpackConfig(entity).indexOf(processFlags.configName) > -1 && !val) {
    error(`Missing ${entity} flag`, true);
  }
  return val;
}

export const portal = getFlagValue(flagConsts.portal);
export const widgetId = getFlagValue(flagConsts.widgetId);
export const internalResource = getFlagValue(flagConsts.internalResource) || ''; // necessary for split in webpack config
export const service = getFlagValue(flagConsts.service);
export const library = getFlagValue(flagConsts.library);
export const messagePort = getFlagValue(flagConsts.messagePort);
export const noSSL = getFlagValue(f.noSSL);
export const caPath = getFlagValue(flagConsts.caPath);
export const configName = process.argv[process.argv.indexOf('--config-name') + 1];

export default {
  portal: portal,
  widgetId: widgetId,
  internalResource: internalResource, // necessary for split in webpack config
  service: service,
  library: library,
  messagePort: messagePort,
  noSSL: noSSL,
  caPath: caPath,
  configName: configName
}
