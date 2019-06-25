/**
 * @file FireabseプラグインをVueへ登録する
 */

import Firebase from '@/plugins/firebase/';
import { Context } from '@nuxt/vue-app';

export default ({ env }: Context, inject: Function) => {
  const {
    NUXT_ENV_API_KEY,
    NUXT_ENV_AUTH_DOMAIN,
    NUXT_ENV_DATABASE_URL,
    NUXT_ENV_PROJECT_ID,
    NUXT_ENV_STORAGE_BUCKET,
    NUXT_ENV_MESSAGING_SENDER_ID,
  } = env;

  inject(
    'firebase',
    new Firebase({
      apiKey: NUXT_ENV_API_KEY,
      authDomain: NUXT_ENV_AUTH_DOMAIN,
      datebaseUrl: NUXT_ENV_DATABASE_URL,
      messagingSenderId: NUXT_ENV_MESSAGING_SENDER_ID,
      projectId: NUXT_ENV_PROJECT_ID,
      storageBucket: NUXT_ENV_STORAGE_BUCKET,
    }),
  );
};
