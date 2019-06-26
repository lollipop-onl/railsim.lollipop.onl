import Vue from 'vue';
import {
  Convertor,
  DefineActionContext,
  DefineStoreModule,
} from '@lollipop-onl/vuex-typesafe-helper';
import { UserProfile } from '@/models';

export interface IState {
  /** 初期化されているか */
  initialized: boolean;
  /** ログインしているか */
  loggedIn: boolean;
  /** ログインユーザーのプロフィール */
  profile?: UserProfile['Value'];
}

export const state = (): IState => ({
  initialized: false,
  loggedIn: false,

});

export const getters = {};
export type Getters = Convertor<typeof getters, {}>;

export const mutations = {
  /**
   * 初期化を完了する
   */
  completeInitialization(state: IState) {
    state.initialized = true;
  },
  /**
   * ログイン状態を更新する
   */
  updateLoginStatus(state: IState, status: boolean) {
    state.loggedIn = status;
  },
  /**
   * ユーザーのプロフィールを更新する
   */
  updateProfile(state: IState, profile?: UserProfile['Value']) {
    state.profile = profile;
  },
};
export type Mutations = Convertor<typeof mutations, {
  'auth/completeInitialization': 'completeInitialization';
  'auth/updateLoginStatus': 'updateLoginStatus';
  'auth/updateProfile': 'updateProfile';
}>;

export type Ctx = DefineActionContext<IState, typeof getters, typeof mutations>;
export const actions = {
  /**
   * Googleアカウントでログインする
   */
  async login(this: Vue): Promise<void> {
    await this.$firebase.auth.signInWithGoogle();
  },
  /**
   * ログアウトする
   */
  async logout(this: Vue, { commit }: Ctx): Promise<void> {
    await this.$firebase.auth.signOut();

    commit('updateLoginStatus', false);
  },
};
export type Actions = Convertor<typeof actions, {
  'auth/login': 'login';
  'auth/logout': 'logout';
}>;

export type Store = DefineStoreModule<'auth', IState, Getters, Mutations, Actions>;
