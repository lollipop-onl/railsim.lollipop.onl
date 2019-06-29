/**
 * @file ファイルサイズをいい感じに表示するフィルター
 * @see https://gist.github.com/james2doyle/4aba55c22f084800c199
 */

const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const bytes = (input: any): string => {
  const bytes = +input;

  if (Number.isNaN(bytes)) {
    // eslint-disable-next-line no-console
    console.error('[filters/byets] Input value cannot parse number.');

    return '-';
  }

  if (bytes === 0) {
    return '-';
  }

  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1000)), UNITS.length - 1);
  const num = (bytes / (1000 ** exponent)).toFixed(2);
  const unit = UNITS[exponent];

  return `${num} ${unit}`;
};
