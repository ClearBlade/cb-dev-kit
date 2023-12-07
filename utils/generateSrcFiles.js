import path from 'path';
import fs from 'fs';
import error from '../templates/error.js';
import getFilesFromDir from '../templates/getFilesFromDir.js';
import { getWidgetPath, getDatasourcePath, getInternalResourcePath, getServicePath, getLibraryPath } from '../templates/getAssets.js';
import configConsts from '../templates/configConsts.js';
import generateUnitTest from './generateUnitTest.js';
import { generateJs, generateHTML } from './generateReactTemplate.js';

const writeNewFile = (path2File, fileType, entityName, includeTests, componentName) => {
  //See if the file exists, if it does, read its contents. If it does not, generate it.
  let content = fs.readFileSync(path2File).toString();
  const cwd = process.cwd().length;
  const filePath = path.join(path2File.slice(0, cwd), 'src', path2File.slice(cwd)).split(path.sep);
  const fileName = filePath.pop();
  const dirPath = filePath.join(path.sep);
  fs.mkdirSync(dirPath, {recursive: true}, (err) => {
    if (err) {
      error(err, true);
    }
  });
  if (componentName && componentName !== 'no') {
    content = generateJs(componentName);
    const htmlPath = path.join(dirPath, fileName).replace(`src${path.sep}`, '').replace('.js', '.html');
    fs.writeFile(htmlPath, generateHTML(componentName), (err) => {
      if (err) {
        error(err, true);
      }
    })
  }
  fs.writeFile(path.join(dirPath, fileName.replace('.js', `.${fileType}`)), content, (err) => {
    if (err) {
      error(err, true);
    }
  });
  if (!!includeTests) {
    const content = generateUnitTest(componentName && componentName !== 'no' ? componentName : entityName);
    fs.writeFile(path.join(dirPath, fileName.replace('.js', `.test.${fileType}`)), content, (err) => {
      if (err) {
        error(err, true);
      }
    });
  }
}

export const consts = {
  WIDGETS: 'widgets',
  INTERNAL_RESOURCES: 'internalResources',
  DATASOURCES: 'datasources',
  SERVICES: 'services',
  LIBRARIES: 'libraries'
};

export const createFile = (assetType, args) => {
  const { WIDGETS, INTERNAL_RESOURCES, DATASOURCES, SERVICES, LIBRARIES } = consts;
  const portalName = args.portal ? args.portal : args.p;
  const fileType = args.type ? args.type : args.t ? args.t : 'js';
  const includeTests = args.unitTests ? args.unitTests === 'true' : (args.u && args.u === 'true');
  const componentName = args.r;

  if (configConsts.allFileTypes.indexOf(`.${fileType}`) > -1) {
    switch (assetType) {
      case WIDGETS:
        const widgetId = args.widgetId ? args.widgetId : args.w;
        const files = getFilesFromDir(getWidgetPath(portalName, widgetId), ['.js']);
        for (let i = 0; i < files.length; i++) {
          writeNewFile(path.resolve(files[i]), fileType, widgetId, includeTests, componentName);
        }
        break;
      case INTERNAL_RESOURCES:
        const intResourceName = args.internalResource ? args.internalResource : args.i;
        writeNewFile(path.join(getInternalResourcePath(portalName, intResourceName), intResourceName), fileType, intResourceName, includeTests);
        break;
        case DATASOURCES:
          const dsName = args.d;
          writeNewFile(path.join(getDatasourcePath(portalName, dsName), 'parser.js'), fileType, dsName, includeTests);
          break;
      case SERVICES:
        const serviceName = args.service ? args.service : args.s;
        writeNewFile(path.join(getServicePath(serviceName), `${serviceName}.js`), fileType, serviceName, includeTests);
        break;
      case LIBRARIES:
        const libraryName = args.library ? args.library : args.l;
        writeNewFile(path.join(getLibraryPath(libraryName), `${libraryName}.js`), fileType, libraryName, includeTests);
        break;
    }
  } else {
    error(`Provided file type is not accepted. Type options include js, jsx, ts, or tsx`, true);
  }   
}

export default {
  consts: consts,
  createFile: createFile
}