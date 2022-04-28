// this file is for adding custom types for libraries and services to node namespace's global interface
export {}; // this file needs to be a module
declare global {
  namespace NodeJS {
    interface Global {
      ClearBlade: CbServer.ClearBladeInt;
      log: (arg: string) => void;
    }
  }
}