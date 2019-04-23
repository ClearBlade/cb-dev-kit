const flagConsts = require('../templates/flagConsts');

const menus = {
  main: `
    cb-dev-kit [command] <options>

    Commands:
    init .................... initialize cb-dev-kit cli application, install packages, add scripts, add webpack configuration, and configure directory
    create .................. sets up an asset in src directory to be accessed by webpack for transpilation or clearblade-hot-reload(@clearblade/clearblade-hot-reload)
    build ................... builds an asset from src directory into its respective directory in the system
    clearblade-hot-reload ... start clearblade-hot-reload server to hot reload changes in portal in browser (@clearblade/clearblade-hot-reload)
    generate ................ launch generator to walk through creating an asset in src directory
    version ................. show package version
    help .................... show help menu. Followed by a command name shows help for the command`,

  init: `
    cb-dev-kit init <options>
    initialize cb-dev-kit cli application, install packages, add scripts, add webpack configuration, and configure directory`,

  create: `
    cb-dev-kit create <options>
    sets up an asset in src directory to be accessed by webpack for transpilation or clearblade-hot-reload(@clearblade/clearblade-hot-reload)

    Options:
    -${flagConsts.portal}, -p .............. name of portal
      -${flagConsts.widgetId}, -w .......... ID of widget, source will include all available parsers
      -${flagConsts.internalResource}, -i .. name of internal resource. Should include .js extension.
      -${flagConsts.type}, -t .............. (optional) file type of new source file. Options include js, jsx, ts, and tsx. Defaults to js.
    
    -${flagConsts.service}, -s ............. name of service. Should not include file type extension.
      -${flagConsts.type}, -t .............. (optional) file type of new source file. Options include js, jsx, ts, and tsx. Defaults to js.
    
    -${flagConsts.library}, -l ............. name of library. Should not include file type extension.
      -${flagConsts.type}, -t .............. (optional) file type of new source file. Options include js, jsx, ts, and tsx. Defaults to js.`,

  build: `
    cb-dev-kit build <options>
    builds an asset from src directory into its respective directory in the system

    Options:
    -${flagConsts.all}, -a ................. build all assets in src directory

    -${flagConsts.allServices} ............. build all services in src directory

    -${flagConsts.allLibraries} ............ build all libraries in src directory

    -${flagConsts.allPortals} .............. build all portals in src directory

    -${flagConsts.allWidgets} .............. build all widgets in a portal in src directory
      -${flagConsts.portal}, -p ............ name of portal

    -${flagConsts.portal}, -p .............. name of portal
      -${flagConsts.widgetId}, -w .......... (optional) ID of widget
      -${flagConsts.internalResource}, -i .. (optional) name of internal resource including extension. Should include .js extension.
    
    -${flagConsts.service}, -s ............. name of service. Should not include file type extension.
    
    -${flagConsts.library}, -l ............. name of library. Should not include file type extension.`,

  ['clearblade-hot-reload']: `
    cb-dev-kit clearblade-hot-reload <options>
    
    Options:
    -${flagConsts.portal}, -p ............. name of portal
      -${flagConsts.messagePort}, -m ...... (optional) messaging port console is listening to, defaults to 1883
      -${flagConsts.noSSL}, -n ............ (optional) if pointing hotReload at a local platform, please set -noSSL to true
      -${flagConsts.caPath}, -c ........... (optional) if pointing at a production system and your certificate authority is not DigiCert, you must use -caPath to provide the absolute path of your CA`
      
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}