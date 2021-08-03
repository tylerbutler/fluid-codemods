#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { runTsTransform } from './runner';
import { resolve as presolve } from 'path';

const argv = yargs(hideBin(process.argv))
  //yargs(process.argv)
    .scriptName('fcm')
    .option('paths', {
      alias: 'p',
      type: 'string',
      description: 'Paths (globs supported)',
      demandOption: 'Path required',
    })
    .option('transform', {
      alias: 't',
      type: 'string',
      description: 'Name of transform to run',
      demandOption: 'Transform name required',
    })
    .help()
    .alias("h", "help")
    .parseSync();

// console.log(JSON.stringify(argv));

console.log(chalk.green(chalk.bold(`Running '${argv.transform}' on ${argv.paths} ✌`)));
const { _, transform, paths, $0, t, p, ...rest } = argv;
const transformPath = presolve(__dirname, `../src/transforms/${argv.transform}/index.ts`);
runTsTransform(transformPath, argv.paths, rest);
