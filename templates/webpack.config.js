const {
  getAllLibrariesEntries,
  getAllServicesEntries,
  getAllWidgetsEntries,
  getAllPortalsEntries,
  getAllEntries,
  getWidgetEntries,
  getPortalEntries,
} = require("./getEntryPoints");
const {
  portal,
  internalResource,
  service,
  library,
  widgetId,
  configName,
} = require("./processFlags");
const {
  allLibrariesConfig,
  allServicesConfig,
  allWidgetsConfig,
  allPortalsConfig,
  portalConfig,
  allConfig,
  serviceConfig,
  widgetConfig,
  internalResourceConfig,
  libraryConfig,
  clearbladeHotReloadConfig,
} = require("./configConsts");
const {
  getLibrariesPath,
  getServicesPath,
  getWidgetsPath,
  getPortalsPath,
  getAllPath,
  getLibraryPath,
  getServicePath,
  getInternalResourcePath,
  getPortalConfigPath,
  getWidgetPath,
} = require("./getAssets");
const { allFileTypes } = require("./configConsts");
const path = require("path");
const webpack = require("webpack");

const codeEngineEnvironment = {
  // The environment supports arrow functions ('() => { ... }').
  arrowFunction: false,
  // The environment supports BigInt as literal (123n).
  bigIntLiteral: false,
  // The environment supports const and let for variable declarations.
  const: false,
  // The environment supports destructuring ('{ a, b } = obj').
  destructuring: false,
  // The environment supports an async import() function to import EcmaScript modules.
  dynamicImport: false,
  // The environment supports 'for of' iteration ('for (const x of array) { ... }').
  forOf: false,
  // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
  module: false,
};

const createConfigForCodeAssets = (
  getEntryPath,
  getOutputFilename,
  getOutputPath
) => ({
  entry: {
    index: [
      path.resolve(__dirname, "polyfills/env.js"),
      "@babel/polyfill",
      getEntryPath(),
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      window: path.resolve(__dirname, "polyfills/window.js"),
      process: path.resolve(__dirname, "polyfills/process.js"),
      setImmediate: path.resolve(__dirname, "polyfills/setImmediate.js"),
      Buffer: ["buffer", "Buffer"],
      // Blob: ["blob-polyfill", "Blob"],
    }),
  ],
  output: {
    filename: getOutputFilename(),
    path: getOutputPath(),
    environment: codeEngineEnvironment,
  },
});

// add or override configuration options here
const generateConfig = () => {
  switch (configName) {
    case allConfig:
      return {
        entry: getAllEntries(),
        output: {
          filename: "[name]",
          path: getAllPath(),
        },
        externals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      };
    case allPortalsConfig:
      return {
        entry: getAllPortalsEntries(),
        output: {
          filename: "[name]",
          path: getPortalsPath(),
        },
        externals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      };
    case portalConfig:
      return {
        entry: getPortalEntries(portal),
        output: {
          filename: "[name]",
          path: getPortalConfigPath(portal),
        },
        externals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      };
    case allWidgetsConfig:
      return {
        entry: getAllWidgetsEntries(portal),
        output: {
          filename: "[name]",
          path: getWidgetsPath(portal),
        },
        externals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      };
    case widgetConfig:
      return {
        entry: getWidgetEntries(portal, widgetId),
        output: {
          filename: "[name]",
          path: getWidgetPath(portal, widgetId),
        },
        externals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      };
    case internalResourceConfig:
      return {
        entry: `${getInternalResourcePath(portal, internalResource, true)}/${
          internalResource.split(".")[0]
        }`,
        output: {
          filename: internalResource,
          path: getInternalResourcePath(portal, internalResource),
        },
        externals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      };
    case clearbladeHotReloadConfig:
      return {
        mode: "development", // so only the changed module is built
        entry: getPortalEntries(portal),
        output: {
          filename: `[name]`,
          path: getPortalConfigPath(portal),
        },
        watch: true,
        externals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      };
    case allServicesConfig:
      return {
        // todo: apply env.js to all service entries
        entry: getAllServicesEntries(),
        output: {
          filename: `[name]`,
          path: getServicesPath(),
          environment: codeEngineEnvironment,
        },
      };
    case serviceConfig:
      return createConfigForCodeAssets(
        () => `${getServicePath(service, true)}/${service}`,
        () => `${service}.js`,
        () => getServicePath(service)
      );
    // todo: apply entry and plugins to libraries
    case allLibrariesConfig:
      return {
        entry: getAllLibrariesEntries(),
        output: {
          filename: `[name]`,
          path: getLibrariesPath(),
          environment: codeEngineEnvironment,
        },
      };
    case libraryConfig:
      return createConfigForCodeAssets(
        () => `${getLibraryPath(library, true)}/${library}`,
        () => `${library}.js`,
        () => getLibraryPath(library)
      );
  }
};

const baseConfig = {
  name: configName,
  module: {
    rules: [
      {
        test: /\.tsx?$|\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
    ],
  },
  resolve: {
    extensions: allFileTypes,
    fallback: {
      assert: require.resolve("assert/"),
      util: require.resolve("util/"),
      path: "path-browserify",
      crypto: require.resolve("crypto-browserify"),
      // buffer: require.resolve("buffer/"),
      buffer: false,
      events: path.resolve(__dirname, "polyfills/events/index.js"),
      // stream: path.resolve(__dirname, "polyfills/stream/index.js"),
      stream: "stream-browserify",
      url: "url",
      http: path.resolve(__dirname, "polyfills/http/index.js"),
      https: path.resolve(__dirname, "polyfills/https/index.js"),
      child_process: false,
      dns: false,
      fs: false,
      net: path.resolve(__dirname, "polyfills/net/index.js"),
      os: false,
      tls: path.resolve(__dirname, "polyfills/tls/index.js"),
      vm: false,
      zlib: false,
      tty: path.resolve(__dirname, "polyfills/tty.js"),
      module: false,
      querystring: require.resolve("querystring-es3"),
    },
    // ignore the browser field when processing an npm's package.json, if it exists
    aliasFields: [],
  },
  optimization: {
    minimize: false,
  },
};

module.exports = {
  ...baseConfig,
  ...generateConfig(),
};
