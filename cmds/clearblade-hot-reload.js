import error from '../templates/error.js';
import child_process from 'child_process';
import flagConsts from '../templates/flagConsts.js';

const spawn = child_process.spawnSync

export default (args) => {
  // reliant on portals starting with p, services starting with s, etc...
  if (args[flagConsts.portal] || args.p) {
    let script = `npm run start:clearblade-hot-reload --portal=${args[flagConsts.portal] ? args[flagConsts.portal] : args.p}`;
    if (args[flagConsts.messagePort]) {
      script += ` --messagePort=${args.m}`
    }
    if (args[flagConsts.noSSL]) {
      script += ` --noSSL=${args[flagConsts.noSSL]}`
    }
    if (args[flagConsts.caPath]) {
      script += ` --caPath=${args[flagConsts.caPath]}`
    }
    spawn(script, [], { shell: true, stdio: 'inherit' });
  } else {
    error('Please specify a --portal(-p) flag start hot reload. See cb-dev-kit help clearblade-hot-reload for more info.', true);
  }
}