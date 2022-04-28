# Example - TS service with TS library dependency

This example demonstrates how to create both a TS service and library for usage in your ClearBlade system.

## Important files

1. Service: `src/code/services/testTSService/testTSService.ts`

   Things of note:

   a) The service uses the `testTSLibrary` library by referring to the variable that was attached to the `global` object in the library's code

   b) The service makes itself available to be called by the code engine by attaching its entrypoint to the `global` object

2. Service json: `code/services/testTSService/testTSService.json`

   Things of note:

   a) The service's dependencies include `testTSLibrary` so that the code engine knows to load that file

3. Library: `src/code/library/testTSLibrary/testTSLibrary.ts`

   Things of note:

   a) The library's API is made globally available by attaching to the `global` object. That way consumers can access the API by just referring to the name of the variable that was attached to `global`

## How to build

You can use the npm scripts that cb-dev-kit adds in package.json. e.g.,

`npm run build:library -library=testTSLibrary`

`npm run build:service -service=testTSService`
