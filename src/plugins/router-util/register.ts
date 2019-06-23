import { Context } from '@nuxt/vue-app';
import { RouterUtilPlugin } from '@/plugins/router-util/';

export default (context: Context, inject: Function) => {
  inject('routerUtil', new RouterUtilPlugin(context));
};
