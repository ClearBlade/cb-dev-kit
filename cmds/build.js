import error from '../templates/error.js';
import flagConsts from '../templates/flagConsts.js';
import child_process from 'child_process';

const spawn = child_process.spawnSync
export default (args) => {
  if (args[flagConsts.all] || args[flagConsts.allServices] || args[flagConsts.allLibraries] || args[flagConsts.allPortals] 
    || args[flagConsts.allWidgets] || args.A || args.S || args.L || args.P || args.W) {
    //Handle the "all" options
    if (args[flagConsts.all] || args.A) {
      spawn(`npm run build:all`, [], { shell: true, stdio: 'inherit' });
    } else if (args[flagConsts.allServices] || args.S) {
      spawn(`npm run build:all-services`, [], { shell: true, stdio: 'inherit' });
    } else if (args[flagConsts.allLibraries] || args.L) {
      spawn(`npm run build:all-libraries`, [], { shell: true, stdio: 'inherit' });
    } else if (args[flagConsts.allPortals] || args.P) {
      spawn(`npm run build:all-portals`, [], { shell: true, stdio: 'inherit' });
    } else if (args[flagConsts.allWidgets] || args.W) {
      if (args[flagConsts.portal] || args.p) {
        spawn(`npm run build:all-widgets --portal=${args[flagConsts.portal] ? args[flagConsts.portal] : args.p}`, [], { shell: true, stdio: 'inherit' });
      } else {
        error(`Please specify a --portal(-P) flag to build all widgets. See cb-dev-kit help build for more info.`, true);
      }
    }
  } else if (args[flagConsts.service] || args.s) {
    spawn(`npm run build:service --service=${args.service ? args.service : args.s}`, [], { shell: true, stdio: 'inherit' });
  } else if (args[flagConsts.library] || args.l) {
    spawn(`npm run build:library --library=${args[flagConsts.library] ? args[flagConsts.library] : args.l}`, [], { shell: true, stdio: 'inherit' });
  } else if (args[flagConsts.portal] || args.p) { 
    if (args[flagConsts.widgetId] || args.w) {
      spawn(`npm run build:widget --portal=${args[flagConsts.portal] ? args[flagConsts.portal] : args.p} --widgetId=${args[flagConsts.widgetId] ? args[flagConsts.widgetId] : args.w}`, [], { shell: true, stdio: 'inherit' });
    } else if (args[flagConsts.internalResource] || args.i) {
      spawn(`npm run build:internal-resource --portal=${args[flagConsts.portal] ? args[flagConsts.portal] : args.p} --internalResource=${args[flagConsts.internalResource] ? args[flagConsts.internalResource] : args.i}`, [], { shell: true, stdio: 'inherit' });
    } else {
      spawn(`npm run build:portal --portal=${args[flagConsts.portal] ? args[flagConsts.portal] : args.p}`, [], { shell: true, stdio: 'inherit' });
    }
  } else {
    error('Please specify either a --portal(-p), --service(-s), --library(-l), or --all(-a) flag to build asset(s). See cb-dev-kit help build for more info.', true);
  }
}