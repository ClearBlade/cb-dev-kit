const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const error = require('../templates/error');
const initConfigs = require('../utils/initConfigurations');

module.exports = {
  generatePackageJson: (originalPackageJson) => {
    const modifiedPackageJson = {
      ...originalPackageJson,
      scripts: {
        ...originalPackageJson.scripts,
        ...initConfigs.scripts
      },
      devDependencies: {
        ...originalPackageJson.devDependencies,
        ...initConfigs.packages
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
      shell.exec(`npm init -y`);
    };

    const packageJson = JSON.parse(fs.readFileSync(path.resolve(`package.json`).toString()));

    fs.writeFileSync(path.resolve(`package.json`), module.exports.generatePackageJson(packageJson), function (err) {
      if (err) error(err);
    });

    shell.exec('npm install');

    if (!fs.existsSync(path.resolve(`./cb-dev-kit`))) {
      fs.mkdirSync(path.resolve(`./cb-dev-kit`));
    };

    const templates = fs.readdirSync(path.join(__dirname, '../templates'));
    for (const file in templates) {
      const content = fs.readFileSync(path.join(__dirname, `../templates/${templates[file]}`).toString());
      fs.writeFileSync(path.resolve(`./cb-dev-kit/${templates[file]}`), content, function (err) {
        if (err) error(err);
      });
    }

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



