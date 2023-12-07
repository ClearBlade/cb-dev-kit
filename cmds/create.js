import error from '../templates/error.js';
import { createFile, consts } from '../utils/generateSrcFiles.js';
import flagConsts from '../templates/flagConsts.js';

export default (args) => {
console.warn(args);

  if (args[flagConsts.service] || args.s) {
    createFile(consts.SERVICES, args);
  } else if (args[flagConsts.library] || args.l) {
    createFile(consts.LIBRARIES, args);
  } else if (args[flagConsts.portal] || args.p) { 
    if (args[flagConsts.widgetId] || args.w) {
      createFile(consts.WIDGETS, args);
    } else if (args[flagConsts.internalResource] || args.i) {
      createFile(consts.INTERNAL_RESOURCES, args);
    } 
    else {
      error('Please specify either a --widgetId(-w) or --internalResource(-i) flag in addition to --portal(-p) to create asset. Note --internalResource names should include the .js extension. See cb-dev-kit help create for more info.', true);
    }
  }
  else {
    error('Please specify either a --portal(-p), --service(-s), or --library(-l) flag to create an asset. See cb-dev-kit help create for more info.', true);
  }
}