import * as klaw from 'klaw';
import * as through2 from 'through2';

const excludeDirFilter = through2.obj(function (item, enc, next) {
  if (!item.stats.isDirectory()) this.push(item)
  next()
})

/**
 * This will walk a directory and return an array of all the contents.
 */
export function walkDirectory (directoryPath: string): Promise<string[]> {
  return new Promise((resolve) => {
    const items = <string[]> [];
    klaw(directoryPath)
      .pipe(excludeDirFilter)
      .on('data', (item: { path: string }) => items.push(item.path))
      .on('end', () => resolve(items));
  });
}
