import * as glob from 'glob';
import execa from 'execa';
import chalk from 'chalk';
import * as path from 'path';

type TransformerOptions = {
  [key: string]: any;
};

const flatten = (to: TransformerOptions): string[] => {
  const flattened: string[] = [];
  for (const [k, v] of Object.entries(to)) {
    flattened.push(...[`--${k}`, v as string]);
  }
  return flattened;
};

export const runTsTransform = (
  transformPath: string,
  paths: string,
  transformerOptions: TransformerOptions,
  extensions = ['ts'],
  parser = 'ts'
) => {
  try {
    let foundPaths = glob.sync(paths);

    let jscodeshiftPkg = require('jscodeshift/package');
    let jscodeshiftPath = path.dirname(require.resolve('jscodeshift/package'));
    let binPath = path.join(jscodeshiftPath, jscodeshiftPkg.bin.jscodeshift);

    let binOptions = [
      '--transform',
      transformPath,
      '--extensions',
      extensions.join(','),
      '--parser',
      parser,
      ...flatten(transformerOptions),
      ...foundPaths,
    ];

    return execa(binPath, binOptions, {
      stdio: 'inherit',
      // env: {
      //     CODEMOD_CLI_ARGS: flatten(transformerOptions).join(' '),
      // },
    });
  } catch (error) {
    console.error(chalk.red(error.stack)); // eslint-disable-line no-console
    process.exitCode = 1;

    throw error;
  }
}
