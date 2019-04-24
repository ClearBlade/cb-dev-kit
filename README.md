# Clearblade Hot Reload

## Overview

CB Dev Kit provides a CLI application allowing for simpler local development of an exported ClearBlade system by providing a src directory with multiple webpack configurations to handle TypeScript and ES6 transpilation, as well as tools for unit-testing for code-based assets. 

CB Dev Kit also seemlessly integrates with [ClearBlade Hot Reload](https://github.com/ClearBlade/clearblade-hot-reload) for assets that automatically transpile and update portals in real time when saved.

## Applications
CB Dev Kit currently supports transpilation of the following asset types:
* Code Services - js and ts
* Code Libraries - js and ts
* Internal Resources (in portals) - js, ts, tsx, and jsx
* Widget Parsers (in portals) - js, ts, tsx, and jsx



## Prereqs

`ClearBlade Platform System` - A system created in a ClearBlade Platform, such as platform.clearblade.com

## Setup

1. If you haven't already, export your system to your local environment using:
  * [ClearBlade Developer Console](https://docs.clearblade.com/v/4/console/) or 
  * [cb-cli tool](https://github.com/ClearBlade/cb-cli#export):
  ```
  cb-cli export [-exportrows] [-exportusers]
  ```

2. All system assets will transferred to local development environment in their respective folders. All cb-dev-kit commands must be run from an initialized system's directory.


## Usage

### Installation

Install globally if you will be using package on multiple systems (recommended) or install locally to system directory
```
npm i -g cb-dev-kit
```
or
```
npm i --save-dev cb-dev-kit
```

### init
Initialize cb-dev-kit to create src folder, update/create your package.json with the necessary scripts and packages, install all packages, and create a cb-dev-kit directory in the system directory, which contains util functions for handling flag processing and webpack configurations. 
```
cb-dev-kit init
```

### generate
Launches generator to walk through setting up an asset in src directory to be accessed by webpack for transpilation, testing, or [ClearBlade Hot Reload](https://github.com/ClearBlade/clearblade-hot-reload), providing available asset names and types that are available.
```
cb-dev-kit generate
```

### create
(Alternative to generate) Sets up an asset in src directory to be accessed by webpack for transpilation, testing, or [ClearBlade Hot Reload](https://github.com/ClearBlade/clearblade-hot-reload)
```
cb-dev-kit create <options>
```
|Flag|Overview|Example|
|---|---|---|
|portal|Portal name|
|widgetId|ID of widget, source will include all available parsers|```cb-dev-kit create -portal=<portalname> -widgetId=<widgetId>```|
|internalResource|Name of internal resource (including extension)|```cb-dev-kit create -portal=<portalname> -internalResource=<internalResource>```|
|type|(optional) file type of new source file. Options include js, jsx, ts, and tsx. Defaults to js|```cb-dev-kit create -portal=<portalname> -widgetId=<widgetId> -type=tsx```|
|service|Name of service (without file extension)|```cb-dev-kit create -service=<servicename> -type=ts```|
|library|Name of library (without file extension)|```cb-dev-kit create -library=<libraryname> -type=ts```|

### build
Builds an asset or multiple assets from src directory into its respective directory in the system
```
cb-dev-kit build <options>
```
|Flag|Overview|Example|
|---|---|---|
|portal|Portal name. Builds all internal resources and widgets in portal|```cb-dev-kit build -portal=<portalname>```|
|widgetId|ID of widget. Builds all parsers in widget|```cb-dev-kit build -portal=<portalname> -widgetId=<widgetId>```|
|internalResource|Name of internal resource (including extension)|```cb-dev-kit build -portal=<portalname> -internalResource=<internalResource>```|
|service|Name of service (without file extension)|```cb-dev-kit create -service=<servicename> -type=ts```|
|library|Name of library (without file extension)|```cb-dev-kit create -library=<libraryname> -type=ts```|
|all|Builds all assets in src directory|```cb-dev-kit build -all```|
|all-services|Builds all services in src directory|```cb-dev-kit build -all-services```|
|all-libraries|Builds all libraries in src directory|```cb-dev-kit build -all-libraries```|
|all-portals|Builds all portals in src directory|```cb-dev-kit build -all-portals```|
|all-widgets|Builds all widgets in a portal's directory|```cb-dev-kit build -all-widgets -portal=<portalname>```|

### clearblade-hot-reload
Allows any changes made to a portal inside src/ or directly in system's portal directory to update the portal in real time when the file is saved
#### Usage
1. Install globally if you will be using package on multiple systems (recommended) or install locally to system directory
```
npm i -g clearblade-hot-reload
```
or
```
npm i --save-dev clearblade-hot-reload
```

2. Initialize ClearBlade Hot Reload from within the portal by clicking the icon (displayed below) at the top right of the Dev console on the right side. A success notification should display, else check the console for information on any errors.

![alt text](images/clearblade-hot-reload-icon.png "ClearBlade Hot Reload Logo")

3. Initialize the hot reload server from the local system directory.\
```
cb-dev-kit clearblade-hot-reload start
```

|Flag|Overview|Example|
|---|---|---|
|portal|Portal name|-portal=\<portalName>|
|messagePort|Should be set to the same -messagePort the console is running on. Defaults to 1883.|-messagePort=1884|
|noSSL|Disables SSL for non-TLS connections on local systems. If on a production system with TLS enabled, ignore this flag and set -messagePort to 1884|-noSSL=true|
|caPath|If pointing at a production system and your certificate authority is not DigiCert, you must use -caPath to provide the absolute path of your CA.|-caPath=/\*/\*/*/ca.pem|


