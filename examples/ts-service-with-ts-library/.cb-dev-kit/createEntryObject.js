import getFilesFromDir from './getFilesFromDir.js';

const createEntryObject = (path, allowedTypes, parentDir) => {
  const allFiles = getFilesFromDir(path, allowedTypes);
  return allFiles.reduce((allEntries, srcName) => {
    const resultName = `${srcName.slice(
      srcName.indexOf(parentDir) + parentDir.length
    )}`.replace(/\.tsx|\.jsx|\.ts/gi, ".js");
    allEntries[resultName] = srcName;
    return allEntries;
  }, {});
};

export default {
  createEntryObject,
};
