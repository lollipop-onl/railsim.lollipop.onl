/**
 * @file dayjsで日時をフォーマットする
 * @see https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#format-formatstringwithtokens-string
 */

import _dayjs from 'dayjs';

/**
 * @param [format] 日時のフォーマット
 */
export const dayjs = (value: string | number | undefined, format = 'YYYY/MM/DD'): string => {
  const d = _dayjs(value);

  if (!d.isValid) {
    // eslint-disable-next-line no-console
    console.warn(`[Day.js Filter] ${value} is invalid value.`);

    return '';
  }

  return d.format(format);
};
