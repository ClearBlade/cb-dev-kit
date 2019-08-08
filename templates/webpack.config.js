const { getAllLibrariesEntries, getAllServicesEntries, getAllWidgetsEntries, getAllPortalsEntries, getAllEntries, getWidgetEntries, getPortalEntries } = require('./getEntryPoints');
const { portal, internalResource, service, library, widgetId, configName } = require("./processFlags");
const { allLibrariesConfig, allServicesConfig, allWidgetsConfig, allPortalsConfig, portalConfig, allConfig, serviceConfig, widgetConfig, internalResourceConfig, libraryConfig, clearbladeHotReloadConfig } = require('./configConsts');
const { getLibrariesPath, getServicesPath, getWidgetsPath, getPortalsPath, getAllPath, getLibraryPath, getServicePath, getInternalResourcePath, getPortalConfigPath, getWidgetPath } = require('./getAssets');
const { allFileTypes } = require('./configConsts');

// add or override configuration options here
const generateConfig = () => {
  switch(configName) {
    case allConfig: 
      return {
        entry: getAllEntries(),
        output: {
          filename: '[name]',
          path: getAllPath()
        },
        externals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    case allPortalsConfig: 
      return {
        entry: getAllPortalsEntries(),
        output: {
          filename: '[name]',
          path: getPortalsPath()
        },
        externals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    case portalConfig: 
      return {
        entry: getPortalEntries(portal),
        output: {
          filename: '[name]',
          path: getPortalConfigPath(portal)
        },
        externals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    case allWidgetsConfig: 
      return {
        entry: getAllWidgetsEntries(portal),
        output: {
          filename: '[name]',
          path: getWidgetsPath(portal)
        },
        externals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    case widgetConfig: 
      return {
        entry: getWidgetEntries(portal, widgetId),
        output: {
          filename: '[name]',
          path: getWidgetPath(portal, widgetId)
        },
        externals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    case internalResourceConfig: 
      return {
        entry: `${getInternalResourcePath(portal, internalResource, true)}/${internalResource.split('.')[0]}`,
        output: {
          filename: internalResource,
          path: getInternalResourcePath(portal, internalResource)
        },
        externals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    case clearbladeHotReloadConfig:
      return {
        mode: 'development', // so only the changed module is built
        entry: getPortalEntries(portal),
        output: {
          filename: `[name]`,
          path: getPortalConfigPath(portal)
        },
        watch: true,
        externals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    case allServicesConfig:
      return {
        entry: getAllServicesEntries(),
        output: {
          filename: `[name]`,
          path: getServicesPath()
        }
      }
    case serviceConfig:
      return {
        entry: `${getServicePath(service, true)}/${service}`,
        output: {
          filename: `${service}.js`,
          path: getServicePath(service)
        }
      }
    case allLibrariesConfig:
      return {
        entry: getAllLibrariesEntries(),
        output: {
          filename: `[name]`,
          path: getLibrariesPath()
        }
      }
    case libraryConfig:
      return {
        entry: `${getLibraryPath(library, true)}/${library}`,
        output: {
          filename: `${library}.js`,
          path: getLibraryPath(library)
        }
      }
    }
  }
  

const baseConfig = {
  name: configName,
  module: {
    rules: [
      {
        test: /\.tsx?$|\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  },
  resolve: {
    extensions: allFileTypes
  },
  optimization: {
    minimize: false
  }
}

module.exports = {
  ...baseConfig,
  ...generateConfig()
};