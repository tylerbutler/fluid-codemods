# fluid-codemods


A collection of codemods for fluid-codemods.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx fluid-codemods <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add fluid-codemods
fluid-codemods <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`