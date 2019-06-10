const path = require('path');
const fs = require('fs');
const error = require('../templates/error');
const getFilesFromDir = require('../templates/getFilesFromDir');
const { getWidgetPath, getDatasourcePath, getInternalResourcePath, getServicePath, getLibraryPath } = require('../templates/getAssets');
const { allFileTypes } = require('../templates/configConsts');
const generateUnitTest = require('./generateUnitTest');
const { generateJs, generateHTML } = require('./generateReactTemplate');

const writeNewFile = (path2File, fileType, entityName, includeTests, componentName) => {
  let content = fs.readFileSync(path2File).toString();
  const cwd = process.cwd().length;
  const filePath = `${path2File.slice(0, cwd)}/src/${path2File.slice(cwd)}`.split('/');
  const fileName = filePath.pop();
  const dirPath = filePath.join('/');
  fs.mkdirSync(dirPath, {recursive: true}, (err) => {
    if (err) {
      error(err, true);
    }
  });
  if (!!componentName) {
    content = generateJs(componentName);
    const htmlPath = `${dirPath}/${fileName}`.replace('/src/', '').replace('.js', '.html');
    fs.writeFile(htmlPath, generateHTML(componentName), (err) => {
      if (err) {
        error(err, true);
      }
    })
  }
  fs.writeFile(`${dirPath}/${fileName.replace('.js', `.${fileType}`)}`, content, (err) => {
    if (err) {
      error(err, true);
    }
  });
  if (!!includeTests) {
    const content = generateUnitTest(componentName || entityName)
    fs.writeFile(`${dirPath}/${fileName.replace('.js', `.test.${fileType}`)}`, content, (err) => {
      if (err) {
        error(err, true);
      }
    });
  }
}

module.exports = {
  consts: {
    WIDGETS: 'widgets',
    INTERNAL_RESOURCES: 'internalResources',
    DATASOURCES: 'datasources',
    SERVICES: 'services',
    LIBRARIES: 'libraries'
  },
  createFile: (assetType, args) => {
    const { WIDGETS, INTERNAL_RESOURCES, DATASOURCES, SERVICES, LIBRARIES } = module.exports.consts;
    const portalName = args.p;
    const fileType = args.t || 'js';
    const includeTests = args.u === 'true';
    const componentName = args.r;
    if (allFileTypes.indexOf(`.${fileType}`) > -1) {
      switch (assetType) {
        case WIDGETS:
          const widgetId = args.w;
          const files = getFilesFromDir(getWidgetPath(portalName, widgetId), ['.js']);
          for (let i = 0; i < files.length; i++) {
            writeNewFile(path.resolve(files[i]), fileType, widgetId, includeTests, componentName);
          }
          break;
        case INTERNAL_RESOURCES:
          const intResourceName = args.i;
          writeNewFile(`${getInternalResourcePath(portalName, intResourceName)}/${intResourceName}`, fileType, intResourceName, includeTests);
          break;
        case DATASOURCES:
          const dsName = args.d;
          writeNewFile(`${getDatasourcePath(portalName, dsName)}/parser.js`, fileType, dsName, includeTests);
          break;
        case SERVICES:
          const serviceName = args.s;
          writeNewFile(`${getServicePath(serviceName)}/${serviceName}.js`, fileType, serviceName, includeTests);
          break;
        case LIBRARIES:
          const libraryName = args.l;
          writeNewFile(`${getLibraryPath(libraryName)}/${libraryName}.js`, fileType, libraryName, includeTests);
          break;
      }
    } else {
      error(`Provided file type is not accepted. Type options include js, jsx, ts, or tsx`, true);
    }   
  }
}