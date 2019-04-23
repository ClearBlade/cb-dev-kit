const error = require('../templates/error');
const spawn = require('child_process').spawnSync;

module.exports = (args) => {
  // reliant on portals starting with p, services starting with s, etc...
  if (args.p) {
    let script = `npm run start:clearblade-hot-reload -portal=${args.p}`;
    if (args.m) {
      script += ` -messagePort=${args.m}`
    }
    if (args.n) {
      script += ` -noSSL=${args.n}`
    }
    if (args.c) {
      script += ` -caPath=${args.c}`
    }
    spawn(script, [], { shell: true, stdio: 'inherit' });
  } else {
    error('Please specify a -portal(-p) flag start hot reload. See cb-dev-kit help clearblade-hot-reload for more info.', true);
  }
}