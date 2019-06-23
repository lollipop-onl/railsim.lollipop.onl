import Vue from 'vue';
import { ILayoutProps } from '@/types/layout';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    layoutProps?(): ILayoutProps;
  }
}
