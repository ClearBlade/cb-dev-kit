const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const error = require('../templates/error');
const initConfigs = require('../utils/initConfigurations');
const ncp = require('ncp').ncp;

module.exports = {
  generatePackageJson: (originalPackageJson) => {
    const modifiedPackageJson = {
      ...originalPackageJson,
      scripts: {
        ...originalPackageJson.scripts,
        ...initConfigs.scripts
      },
      dependencies: {
        ...originalPackageJson.dependencies,
        ...initConfigs.dependencies,
      },
      devDependencies: {
        ...originalPackageJson.devDependencies,
        ...initConfigs.devDependencies
      },
      babel: {
        ...originalPackageJson.babel,
        ...initConfigs.babel
      },
      jest: {
        ...originalPackageJson.jest,
        ...initConfigs.jest
      }
    }

    return JSON.stringify(modifiedPackageJson);
  },
  default: () => {
    if (!fs.existsSync(path.resolve(`node_modules`))) {
      fs.appendFileSync('.gitignore', '\nnode_modules');
    };

    if (!fs.existsSync(path.resolve(`package.json`))) {
      const err = shell.exec(`npm init -y`).stderr;
      if (err && err.includes('Invalid name')) {
        error(`Could not execute npm init due to invalid name in file path. Check that file path does not include any spaces or special characters: "${path.resolve()}". If needed, npm init command may be run independently before cb-dev-kit init command.`)
      }
     };

    const packageJson = JSON.parse(fs.readFileSync(path.resolve(`package.json`)).toString());

    fs.writeFileSync(path.resolve(`package.json`), module.exports.generatePackageJson(packageJson), function (err) {
      if (err) error(err);
    });

    shell.exec('npm install');

    if (fs.existsSync(path.resolve(`./cb-dev-kit`))) { // if old directory without "." prefix exists in system, remove it
      const oldPath = path.resolve(`./cb-dev-kit`);
      fs.readdirSync(oldPath).forEach(file => {
        const curPath = path.join(oldPath, file);
        fs.unlinkSync(curPath);
      });
      fs.rmdirSync(oldPath);
    };

    if (!fs.existsSync(path.resolve(`./.cb-dev-kit`))) {
      fs.mkdirSync(path.resolve(`./.cb-dev-kit`));
    };

    ncp(path.resolve('../templates'), path.resolve('./.cb-dev-kit'), function(err) {
      if (err) error(err);
    })

    const srcPath = path.resolve(`./src`);
    if (!fs.existsSync(srcPath)) {
      fs.mkdirSync(srcPath);
    }

    const setupTestsPath = path.resolve(`./src/setupTests.ts`);
    if (!fs.existsSync(setupTestsPath)) {
      const content = fs.readFileSync(path.join(__dirname, '../utils/setupTestsTemplate.ts'));
      fs.writeFileSync(setupTestsPath, content, function(err) {
        if (err) error(err);
      })
    }

    const globalDefPath = path.resolve(`./src/global.d.ts`);
    if (!fs.existsSync(globalDefPath)) {
      const content = fs.readFileSync(path.join(__dirname, '../utils/globalDefTemplate.ts'));
      fs.writeFileSync(globalDefPath, content, function(err) {
        if (err) error(err);
      })
    }
  }
}



