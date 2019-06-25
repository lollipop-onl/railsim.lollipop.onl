import Vue from 'vue';
import * as C from '@/constants';
import FirebasePlugin from '@/plugins/firebase/';
import { RouterUtilPlugin } from '@/plugins/router-util/';

declare module 'vue/types/vue' {
  interface Vue {
    $C: typeof C;
    $routerUtil: RouterUtilPlugin;
    $firebase: FirebasePlugin;
  }
}
