const error = require('../templates/error');
const spawn = require('child_process').spawnSync;

module.exports = (args) => {
  // reliant on portals starting with p, services starting with s, etc...
  if (args.a) {
    switch (args.l) {
      case '-services':
        spawn(`npm run build:all-services`, [], { shell: true, stdio: 'inherit' });
        break;
      case '-portals':
        spawn(`npm run build:all-portals`, [], { shell: true, stdio: 'inherit' });
        break;
      case '-widgets':
        if (args.p) {
          spawn(`npm run build:all-widgets -portal=${args.p}`, [], { shell: true, stdio: 'inherit' });
        } else {
          error(`Please specify a -portal flag to build all widgets. See cb-dev-kit help build for more info.`, true);
        }
        break;
      case '-libraries':
        spawn(`npm run build:all-libraries`, [], { shell: true, stdio: 'inherit' });
        break;
      default:
        spawn(`npm run build:all`, [], { shell: true, stdio: 'inherit' });
    }
  } else if (args.s) {
    spawn(`npm run build:service -service=${args.s}`, [], { shell: true, stdio: 'inherit' });
  } else if (args.l) {
    spawn(`npm run build:library -library=${args.l}`, [], { shell: true, stdio: 'inherit' });
  } else if (args.p) { 
    if (args.w) {
      spawn(`npm run build:widget -portal=${args.p} -widgetId=${args.w}`, [], { shell: true, stdio: 'inherit' });
    } else if (args.i) {
      spawn(`npm run build:internal-resource -portal=${args.p} -internalResource=${args.i}`, [], { shell: true, stdio: 'inherit' });
    } else {
      spawn(`npm run build:portal -portal=${args.p}`, [], { shell: true, stdio: 'inherit' });
    }
  } else {
    error('Please specify either a -portal(-p), -service(-s), -library(-l), or -all flag to build asset. See cb-dev-kit help build for more info.', true);
  }
}