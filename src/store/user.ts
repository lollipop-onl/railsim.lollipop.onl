import Vue from 'vue';
import {
  Convertor,
  DefineActionContext,
  DefineStoreModule,
} from '@lollipop-onl/vuex-typesafe-helper';
import { UserProfile, UserCore } from '@/models';

export interface IState {
  userData: Record<string, UserProfile['Value']>;
}

export const state = (): IState => ({
  /** ユーザーデータ */
  userData: {},
});

export const getters = {};
export type Getters = Convertor<typeof getters, {}>;

export const mutations = {
  /** ユーザーデータを保存する */
  saveUserData(state: IState, user: UserProfile): void {
    const { id } = user;

    Vue.set(state.userData, id, user.value());
  },
};
export type Mutations = Convertor<typeof mutations, {
  'user/saveUserData': 'saveUserData';
}>;

export type Ctx = DefineActionContext<IState, typeof getters, typeof mutations>;
export const actions = {
  /** ユーザーデータを取得する */
  async fetchUserProfile({ commit }: Ctx, userId: string): Promise<UserProfile> {
    const user = await UserProfile.get(userId);

    if (!user) {
      throw new Error();
    }

    commit('saveUserData', user);

    return user;
  },
};
export type Actions = Convertor<typeof actions, {
  'user/fetchUserProfile': 'fetchUserProfile';
}>;

export type Store = DefineStoreModule<'user', IState, Getters, Mutations, Actions>;
