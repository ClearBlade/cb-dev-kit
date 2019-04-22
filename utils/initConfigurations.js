module.exports = {
  scripts: {
    "build:all": "webpack --config cb-dev-kit/webpack.config.js --config-name all",
    "build:all-portals": "webpack --config cb-dev-kit/webpack.config.js --config-name allPortals",
    "build:portal": "webpack --config cb-dev-kit/webpack.config.js --config-name portal",
    "build:all-services": "webpack --config cb-dev-kit/webpack.config.js --config-name allServices",
    "build:service": "webpack --config cb-dev-kit/webpack.config.js --config-name service",
    "build:all-widgets": "webpack --config cb-dev-kit/webpack.config.js --config-name allWidgets",
    "build:widget": "webpack --config cb-dev-kit/webpack.config.js --config-name widget",
    "build:internal-resource": "webpack --config cb-dev-kit/webpack.config.js --config-name internalResource",
    "build:all-libraries": "webpack --config cb-dev-kit/webpack.config.js --config-name allLibraries",
    "build:library": "webpack --config cb-dev-kit/webpack.config.js --config-name library",
    "start:clearblade-hot-reload": "npm-run-all --parallel start:watch start:server",
    "start:watch": "webpack --config cb-dev-kit/webpack.config.js --config-name clearbladeHotReload",
    "start:server": "clearblade-hot-reload start",
    "test": "echo \"Error: no test specified\" && exit 1",
    "test:watch": "jest --watchAll"
  },
  packages: {
    "@babel/core": "^7.3.3",
    "@babel/polyfill": "^7.2.5",
    "@babel/preset-env": "^7.3.1",
    "@babel/preset-react": "^7.0.0",
    "@babel/preset-typescript": "^7.3.3",
    "@types/clearbladejs-server": "^1.1.1",
    "@types/jest": "^24.0.6",
    "@types/node": "^11.9.4",
    "@types/react": "^16.8.10",
    "babel-jest": "^24.1.0",
    "babel-loader": "^8.0.5",
    "chalk": "^2.4.2",
    "chokidar": "^2.1.5",
    "jest": "^24.1.0",
    "jest-cli": "^24.1.0",
    "npm-run-all": "^4.1.5",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "source-map-loader": "^0.2.4",
    "ts-jest": "^24.0.0",
    "typescript": "^3.3.3",
    "webpack": "^4.29.4",
    "webpack-cli": "^3.3.0"
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