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
    -portal, -p .............. name of portal
      -widgetId, -w .......... ID of widget, source will include all available parsers
      -internalResource, -i .. name of internal resource. Should include .js extension.
      -type, -t .............. (optional) file type of new source file. Options include js, jsx, ts, and tsx. Defaults to js.
    
    -service, -s ........ name of service. Should not include file type extension.
      -type, -t ......... (optional) file type of new source file. Options include js, jsx, ts, and tsx. Defaults to js.
    
    -library, -l ........ name of library. Should not include file type extension.
      -type, -t ......... (optional) file type of new source file. Options include js, jsx, ts, and tsx. Defaults to js.`,

  build: `
    cb-dev-kit build <options>
    builds an asset from src directory into its respective directory in the system

    Options:
    -all, -a ................. build all assets in src directory

    -all-services ............ build all services in src directory

    -all-libraries ........... build all libraries in src directory

    -all-portals ............. build all portals in src directory

    -all-widgets ............. build all widgets in a portal in src directory
      -portal, -p ............ name of portal

    -portal, -p .............. name of portal
      -widgetId, -w .......... (optional) ID of widget
      -internalResource, -i .. (optional) name of internal resource including extension. Should include .js extension.
    
    -service, -s ........ name of service. Should not include file type extension.
    
    -library, -l ........ name of library. Should not include file type extension.`,

  ['clearblade-hot-reload']: `
    cb-dev-kit clearblade-hot-reload <options>
    
    Options:
    -portal, -p ............. name of portal
      -messagePort, -m ...... (optional) messaging port console is listening to, defaults to 1883
      -noSSL, -n ............ (optional) if pointing hotReload at a local platform, please set -noSSL to true
      -caPath, -c ........... (optional) if pointing at a production system and your certificate authority is not DigiCert, you must use -caPath to provide the absolute path of your CA`
      
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}