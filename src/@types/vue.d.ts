/**
 * @file Vueの型定義を拡張する
 */

import Vue from 'vue';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layoutProps?: Record<string, any>;
  }
}
