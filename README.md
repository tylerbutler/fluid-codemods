# fluid-codemods

A collection of scripts to update Fluid Framework-based projects in an automated way using the JS AST.

## Usage

To run a codemod from this package, run the following:

```bash
npm i -g @tylerbu/fluid-codemods

fcm -t TRANSFORM_NAME -p some/**/*glob.ts
```

## `update-imports`

This codemod changes the imports of Fluid Framework packages to or from the umbrella
`@fluid-experimental/fluid-framework` package (aka the "uber-package"). This allows you to use the umbrella package for
simplicity during development but switch to individual packages as needed in the future.

```bash
fcm -t update-imports -p some/**/*glob.ts
```

### Examples

To update the Badge example in the FluidFramework repo to use the uber-package, run this in the root of the repo:

```bash
fcm -t update-imports -p "./examples/**/badge/src/**/*.ts" --uber
```

To update the FluidHelloWorld repo to use individual packages, run this in the root of the repo:

```bash
fcm -t update-imports -p "./src/**/*.ts"
```
