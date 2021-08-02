import type { Collection, ImportDeclaration, ImportSpecifier, Transform } from 'jscodeshift';
import {
  packagesToUberPackage,
  specifiersToPackages,
  specifiersToUberPackage,
  uberPackageToPackages,
} from '../data';

const transform: Transform = (fileInfo, api, options) => {
  const js = api.jscodeshift;

  /** If true, convert TO the uber-package; otherwise convert FROM the uber-package. */
  const toUber: boolean = options.uber || false;
  const sourcePackages = [...(toUber ? packagesToUberPackage : uberPackageToPackages).keys()];
  const targetPackages = toUber ? specifiersToUberPackage : specifiersToPackages;

  const makeSpecifier = (imported: string, local: string) => {
    return js.importSpecifier(js.identifier(imported), js.identifier(local));
  };

  /** Returns the first path in a collection. */
  const getFirstPath = (root: Collection) => {
    const c = root.find(js.Program);
    if (c.length > 0) {
      return c.get('body', 0);
    }
  };

  /** Returns the first node in a collection. */
  const getFirstNode = (root: Collection) => {
    const p = getFirstPath(root);
    if (p) {
      return p.node;
    }
  };

  /** Filters a collection to only ImportDeclarations from one of the source packages (either the uber-package or the
   * individual packages). */
  const filterSourceImports = (root: Collection): Collection<ImportDeclaration> => {
    return root.find(js.ImportDeclaration).filter((path) => {
      // Include only imports from source packages
      return sourcePackages.includes(path.value.source.value as string);
    });
  };

  // Save the comments attached to the first node
  const initialAST = js(fileInfo.source);
  const firstNode = getFirstNode(initialAST);
  const { comments } = firstNode;

  const finalImportMap = new Map<string, ImportSpecifier[]>();
  const rewrittenImports: ImportDeclaration[] = [];
  filterSourceImports(initialAST)
    .find(js.ImportSpecifier)
    .forEach((path, i, paths) => {
      const specifier = path.value;
      const importedName = specifier.imported.name;
      const localName = specifier.local?.name;
      if (importedName !== localName) {
        api.report('Renamed import');
      }

      if (targetPackages.has(importedName)) {
        const newPkg = targetPackages.get(importedName);

        if (finalImportMap.has(newPkg!)) {
          finalImportMap.get(newPkg!)!.push(makeSpecifier(importedName, localName!));
        } else {
          finalImportMap.set(newPkg!, [makeSpecifier(importedName, localName!)]);
        }
      } else {
        // This means we found an import that isn't in our mapping.
        api.report(`MISSING: ${importedName}`);
      }
    });

  for (const [pkg, specifiers] of finalImportMap) {
    rewrittenImports.push(js.importDeclaration(specifiers, js.literal(pkg)));
  }

  // Remove the old imports and convert to a string to "save" it
  const outSrc = filterSourceImports(initialAST).remove().toSource();

  // Check for imports remaining in the source after we removed the ones we care about.
  const importsRemaining = js(outSrc).find(js.ImportDeclaration);

  if (importsRemaining.length > 0) {
    // There are still imports, so attach the comment to the first one.
    importsRemaining.at(0).forEach((path) => {
      path.node.comments = comments;
    });
    const output = importsRemaining.at(-1).insertAfter(rewrittenImports);
    return output.toSource();
  } else {
    if (rewrittenImports.length > 0) {
      rewrittenImports[0].comments = comments;
    }
    const output = js(outSrc).find(js.Statement).at(0).insertBefore(rewrittenImports);
    return output.toSource();
  }
};

module.exports = transform;
module.exports.type = 'ts';
module.exports.parser = 'ts';
