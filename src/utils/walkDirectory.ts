import * as klaw from 'klaw';

/**
 * This will walk a directory and return an array of all the contents.
 */
export function walkDirectory (directoryPath: string): Promise<string[]> {
  return new Promise((resolve) => {
    const items = <string[]> []; // files, directories, symlinks, etc
    klaw(directoryPath)
      .on('data', (item) => items.push(item.path))
      .on('end', () => resolve(items));
  });
}
