module.exports = {
  scripts: {
    "build:all": "webpack --config .cb-dev-kit/webpack.config.js --config-name all",
    "build:all-portals": "webpack --config .cb-dev-kit/webpack.config.js --config-name allPortals",
    "build:portal": "webpack --config .cb-dev-kit/webpack.config.js --config-name portal",
    "build:all-services": "webpack --config .cb-dev-kit/webpack.config.js --config-name allServices",
    "build:service": "webpack --config .cb-dev-kit/webpack.config.js --config-name service",
    "build:all-widgets": "webpack --config .cb-dev-kit/webpack.config.js --config-name allWidgets",
    "build:widget": "webpack --config .cb-dev-kit/webpack.config.js --config-name widget",
    "build:internal-resource": "webpack --config .cb-dev-kit/webpack.config.js --config-name internalResource",
    "build:all-libraries": "webpack --config .cb-dev-kit/webpack.config.js --config-name allLibraries",
    "build:library": "webpack --config .cb-dev-kit/webpack.config.js --config-name library",
    "start:clearblade-hot-reload": "npm-run-all --parallel start:watch start:server",
    "start:watch": "webpack --config .cb-dev-kit/webpack.config.js --config-name clearbladeHotReload",
    "start:server": "clearblade-hot-reload start",
    "test": "jest",
    "test:watch": "jest --watchAll"
  },
  devDependencies: {
    "@babel/core": "^7.11.6",
    "@babel/polyfill": "^7.2.5",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-react": "^7.0.0",
    "@babel/preset-typescript": "^7.10.4",
    "@types/clearbladejs-server": "^1.1.1",
    "@types/jest": "^25.2.1",
    "@types/node": "^13.13.2",
    "@types/react": "^16.8.10",
    "babel-jest": "^25.4.0",
    "babel-loader": "^8.0.5",
    "chalk": "^4.0.0",
    "chokidar": "^3.3.1",
    "jest": "^25.4.0",
    "jest-cli": "^25.4.0",
    "npm-run-all": "^4.1.5",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "source-map-loader": "^0.2.4",
    "ts-jest": "^25.4.0",
    "typescript": "^3.3.3",
    "webpack": "^5.1.0",
    "webpack-cli": "^3.3.0"
  },
  dependencies: {
    "assert": "^2.0.0",
    "buffer": "^5.6.0",
    "builtin-status-codes": "^3.0.0",
    "crypto-browserify": "^3.12.0",
    "path-browserify": "^1.0.1",
    "stream-browserify": "^3.0.0",
    "readable-stream": "2.3.7",
    "stripe": "^8.107.0",
    "url": "^0.11.0",
    "util": "^0.12.3",
    "xtend": "^4.0.2"
  },
  babel: {
    presets: [
      "@babel/preset-react",
      "@babel/typescript",
      [
        "@babel/env",
        {
          "modules": false
        }
      ]
    ]
  },
  jest: {
    "moduleDirectories": [
      "node_modules",
      "src"
    ],
    "transform": {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.tsx?$": "ts-jest"
    },
    "setupFiles": [
      "./src/setupTests.ts"
    ]
  }
}