import packageJSON from '../package.json' assert {type: 'json'};

export default (args) => {
  console.log(`v${packageJSON.version}`)
}