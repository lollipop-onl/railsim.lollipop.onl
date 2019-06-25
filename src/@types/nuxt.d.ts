import Vue from 'vue';
import { ErrorParams } from '@nuxt/vue-app';
import { ILayoutProps } from '@/types/layout';

declare module 'vue/types/vue' {
  interface NuxtApp {
    error(params: ErrorParams & Record<string, any>): void;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    layoutProps?(): ILayoutProps;
  }
}
