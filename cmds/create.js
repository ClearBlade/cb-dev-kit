const error = require('../templates/error');
const { createFile, consts: { WIDGETS, INTERNAL_RESOURCES, DATASOURCES, SERVICES, LIBRARIES } } = require('../utils/generateSrcFiles');

module.exports = (args) => {
  // reliant on portals starting with p, services starting with s, etc...
  if (args.p) { 
    if (args.w) {
      createFile(WIDGETS, args);
    } else if (args.i) {
      createFile(INTERNAL_RESOURCES, args);
    } 
    // else if (args.d) {
    //   createFile(DATASOURCES, args);
    // } 
    else {
      error('Please specify either a -widgetId(-w) or -internalResource(-i) flag in addition to -portal to create asset. Note -internalResource names should include .js extension. See cb-dev-kit help create for more info.', true);
    }
  } else if (args.s) {
    createFile(SERVICES, args);
  } else if (args.l) {
    createFile(LIBRARIES, args);
  } else {
    error('Please specify either a -portal(-p), -service(-s), or -library(-l) flag to create asset. See cb-dev-kit help create for more info.', true);
  }
}