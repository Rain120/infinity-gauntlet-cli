#!/usr/bin/env node

const { checkNodeVersion, chalk } = require('power-gem');
const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = +semver[0];

if (major < 8) {
  checkNodeVersion(major, 'Rain120/thanos');
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'Thanos requires Node 8 or higher. \n' +
      'Please update your version of Node.',
  );
  process.exit(1);
}

const program = require('commander');
const minimist = require('minimist');

program.version(`Rain120/thanos ${require('../package').version}`).usage('<command> [options]');

program
  .command('init <app-name>')
  .description('create a new project powered by thanos')
  .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
  .option('-d, --default', 'Skip prompts and use default preset')
  .option('-i, --inlinePreset <json>', 'Skip prompts and use inline JSON string as preset')
  .option('-m, --packageManager <command>', 'Use specified npm client when installing dependencies')
  .option('-r, --registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')
  .option('-g, --git [message]', 'Force git initialization with initial commit message')
  .option('-n, --no-git', 'Skip git initialization')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .option('--merge', 'Merge target directory if it exists')
  .option('-c, --custom', 'Custom init project')
  .option('-y, --yes', 'Direct download project')
  .action((name, cmd) => {
    const options = cleanArgs(cmd);
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          "\n Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored.",
        ),
      );
    }

    // --git makes commander to default git to true
    if (process.argv.includes('-g') || process.argv.includes('--git')) {
      options.forceGit = true;
    }

    require('../lib/init')(name, options);
  });

program
  .command('add [configOptions]')
  .description('add config file in the current file folder')
  .option('-g, --gitignore', 'add the file for gitignore')
  .option('-tsc, --tsconfig', 'add the file for tsconfig.json')
  .option('-c, --commitlint', 'add the file for commitlint.js')
  .option('-p, --prettier', 'add the file for prettier')
  .option('-es, --eslint', 'add the file for eslint')
  .allowUnknownOption()
  .action(options => {
    require('../lib/add')(options, minimist(process.argv.slice(3)));
  });

program
  .command('info')
  .description('print debugging information about your environment')
  .action(cmd => {
    console.log(chalk.bold('\nEnvironment Info:'));
    require('envinfo')
      .run(
        {
          System: ['OS', 'CPU'],
          Binaries: ['Node', 'Yarn', 'npm'],
          Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
          npmPackages: '/**/{typescript,*gem*,*thanos*}',
          npmGlobalPackages: ['Rain120/infinity-gauntlet-cli'],
        },
        {
          showNotFound: true,
          duplicates: true,
          fullTree: true,
        },
      )
      .then(console.log);
  });

// output help information on unknown commands
program.arguments('<command>').action(cmd => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command about ${chalk.yellow(cmd)}.`));
});

// add some useful info on help
program.on('--help', () => {
  console.log(`  Run ${chalk.cyan(`thanos <command> --help`)} for detailed usage of given command.`);
});

program.parse(process.argv);

function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''));
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key];
    }
  });
  return args;
}
