const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const error = require('../templates/error');
const initConfigs = require('../utils/initConfigurations');

module.exports = () => {
  if (!fs.existsSync(path.resolve(`package.json`))) {
    shell.exec(`npm init -y`);
  };

  if (!fs.existsSync(path.resolve(`node_modules`))) {
    fs.appendFileSync('.gitignore', '\nnode_modules');
  };

  const packageJson = JSON.parse(fs.readFileSync(path.resolve(`package.json`).toString()));

  const modifiedPackageJson = {
    ...packageJson,
    scripts: {
      ...initConfigs.scripts,
      ...packageJson.scripts,
    },
    devDependencies: {
      ...initConfigs.packages,
      ...packageJson.devDependencies
    },
    babel: {
      ...packageJson.babel,
      ...initConfigs.babel
    },
    jest: {
      ...packageJson.jest,
      ...initConfigs.jest
    }
  }

  fs.writeFileSync(path.resolve(`package.json`), JSON.stringify(modifiedPackageJson), function (err) {
    if (err) error(err);
  });

  shell.exec('npm install');

  fs.mkdirSync(path.resolve(`./cb-dev-kit`));

  const templates = fs.readdirSync(path.join(__dirname, '../templates'));
  for (const file in templates) {
    const content = fs.readFileSync(path.join(__dirname, `../templates/${templates[file]}`).toString());
    fs.writeFileSync(path.resolve(`./cb-dev-kit/${templates[file]}`), content, function (err) {
      if (err) error(err);
    });
  }

  if (!fs.existsSync(path.resolve(`./src`))) {
    fs.mkdirSync(path.resolve(`./src`));
  }
}



