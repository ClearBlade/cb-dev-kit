const minimist = require('minimist');
const path = require('path');
const fs = require('fs');

const error = require('./templates/error');
const shell = require('shelljs');
const spawn = require('child_process').spawnSync;
const escape = require('./utils/escapePathName');

console.log('hello!')

module.exports = () => {
  if (fs.existsSync(path.resolve('./system.json'))) {
    const args = minimist(process.argv.slice(2))

    let cmd = args._[0] || 'help';
    console.log('before cwd func');
    const cwd = escape(process.cwd());
    console.log('after cwd func');
  
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
        console.log('inside generate block');
        shell.cd(path.join(__dirname))
        console.log('inside generate block2', cwd);
        spawn(`cwdir=${cwd} npm run plop`, [], { shell: true, stdio: 'inherit' });
        console.log('inside generate block3');
        break
  
      default:
      error(`"${cmd}" is not a valid command. See cb-dev-kit --help for more info.`, true)
      break
    }
  } else {
    error(`Aborting: You must be in a clearblade initialized repo to run a 'cb-dev-kit' command`)
  } 
}