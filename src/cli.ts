import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { runTsTransform } from './runner';
import * as path from 'path';

async function main() {
  const argv = yargs(hideBin(process.argv))
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
    .parseSync();

  console.log(JSON.stringify(argv));

  console.log(chalk.green(chalk.bold(`Running '${argv.transform}' on ${argv.paths} ✌`)));
  const { _, transform, paths, $0, t, p, ...rest } = argv;
  const transformPath = path.resolve(`src/transforms/${argv.transform}/index.ts`);
  await runTsTransform(transformPath, argv.paths, rest);
}

main();
