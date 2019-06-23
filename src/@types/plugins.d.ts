import Vue from 'vue';
import { RouterUtilPlugin } from '@/plugins/router-util/';

declare module 'vue/types/vue' {
  interface Vue {
    $routerUtil: RouterUtilPlugin;
  }
}
