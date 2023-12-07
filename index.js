import minimist from 'minimist';
import path from 'path';
import fs from 'fs';
import error from './templates/error.js';
import shell from 'shelljs';
import child_process from 'child_process';
import escape from './utils/escapePathName.js';

import init from './cmds/init.js';
import create from './cmds/create.js';
import build from './cmds/build.js';
import clearbladeHotReload from './cmds/clearblade-hot-reload.js';
import version from './cmds/version.js';
import help from './cmds/help.js';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const spawn = child_process.spawnSync;

export default () => {
  if (fs.existsSync(path.resolve('./system.json'))) {
    const args = minimist(process.argv.slice(2))

    let cmd = args._[0] || 'help';
    
    const cwd = escape(process.cwd());

    switch (cmd) {
      case 'init':
        init.default(args);
        break
  
      case 'create':
        create(args);
        break
  
      case 'build':
        build(args);
        break
  
      case 'clearblade-hot-reload':
        clearbladeHotReload(args);
        break
  
      case 'version':
        version(args);
        break
  
      case 'help':
        help(args);
        break
      
      case 'generate':
        shell.cd(path.join(__dirname))
        spawn(`npm run plop`, [], { shell: true, stdio: 'inherit', env: { ...process.env, cwd: cwd} });
        break
  
      default:
      error(`"${cmd}" is not a valid command. See cb-dev-kit --help for more info.`, true)
      break
    }
  } else {
    error(`Aborting: You must be in a clearblade initialized repo to run a 'cb-dev-kit' command`)
  } 
}