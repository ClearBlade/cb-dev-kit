const minimist = require('minimist');
const path = require('path');
const fs = require('fs');

const error = require('./templates/error');
const shell = require('shelljs');
const spawn = require('child_process').spawnSync;
const escape = require('./utils/escapePathName');

module.exports = () => {
  if (fs.existsSync(path.resolve('./system.json'))) {
    const args = minimist(process.argv.slice(2))

    let cmd = args._[0] || 'help';
  
    const cwd = escape(process.cwd());
  
    switch (cmd) {
      case 'init':
        require('./cmds/init').default(args)
        break
  
      case 'create':
        require('./cmds/create')(args)
        break
  
      case 'build':
        require('./cmds/build')(args)
        break
  
      case 'clearblade-hot-reload':
        require('./cmds/clearblade-hot-reload')(args)
        break
  
      case 'version':
        require('./cmds/version')(args)
        break
  
      case 'help':
        require('./cmds/help')(args)
        break
      
      case 'generate':
        shell.cd(path.join(__dirname))
        spawn(`cwd=${cwd} npm run plop`, [], { shell: true, stdio: 'inherit' });
        break
  
      default:
      error(`"${cmd}" is not a valid command. See cb-dev-kit --help for more info.`, true)
      break
    }
  } else {
    error(`Aborting: You must be in a clearblade initialized repo to run a 'cb-dev-kit' command`)
  } 
}