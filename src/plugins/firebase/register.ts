/**
 * @file FireabseプラグインをVueへ登録する
 */

import Firebase from '@/plugins/firebase/';
import { Context } from '@nuxt/vue-app';
import { RootStore } from '@/types/vuex';
import { UserProfile } from '@/models';

export default (context: Context, inject: Function) => {
  const { env } = context;
  // eslint-disable-next-line prefer-destructuring
  const store: RootStore = context.store;

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

  Firebase.listeners.onAuthStateChanged.push(
    async (loggedIn: boolean, userId?: string, uid?: string) => {
      const { state, commit } = store;

      if (!state.auth.initialized) {
        commit('auth/completeInitialization');
      }

      console.log(userId);

      if (userId) {
        const userProfile = await UserProfile.get(userId);

        console.log(userProfile);

        if (userProfile) {
          commit('auth/updateUserId', userId);
          commit('auth/updateProfile', userProfile.value());
        }
      }

      commit('auth/updateLoginStatus', loggedIn);
    },
  );
};
