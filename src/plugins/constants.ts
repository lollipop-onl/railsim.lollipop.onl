/**
 * @file 定数をグローバルにセットする
 */

import { Context } from '@nuxt/vue-app';
import * as C from '@/constants';

export default (context: Context, inject: Function) => {
  inject('C', C);
};
