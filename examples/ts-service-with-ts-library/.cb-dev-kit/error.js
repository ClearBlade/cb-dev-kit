import chalk from 'chalk';

export default (message, exit) => {
  console.error(chalk.red(message));
  exit && process.exit(1)
}