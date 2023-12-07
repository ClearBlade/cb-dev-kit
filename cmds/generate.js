import { widgetId, react } from '../templates/flagConsts.js';
import widgetGenerator from '../generators/widget.js';
import internalResourceGenerator from '../generators/internalResource.js';
// export datasourceGenerator = from '../generators/datasource.js';
import codeServiceGenerator from '../generators/codeService.js';
import libraryGenerator from '../generators/library.js';

import shell from 'shelljs';

export default (plop) => {
  if (process.env.cwd) {
    process.chdir(process.env.cwd);
  }

  plop.setActionType('createFile', function (answers) {
    if (answers.hasOwnProperty(widgetId)) {
      answers[widgetId] = answers[widgetId].split('_').pop();
      if (answers.hasOwnProperty(react) && answers[react] === 'yes') {
        answers[react] = answers.componentName;
        delete answers.confirmReact;
        delete answers.componentName;
      }
    }
    let cmd = `cb-dev-kit create`;
    for (const flag in answers) {
      cmd += ` --${flag}=${answers[flag]}`;
    }
    shell.exec(cmd)
  });

  plop.setGenerator('widget', widgetGenerator);
  plop.setGenerator('internalResource', internalResourceGenerator);
  // plop.setGenerator('datasource', datasourceGenerator);
  plop.setGenerator('service', codeServiceGenerator);
  plop.setGenerator('library', libraryGenerator);
}
