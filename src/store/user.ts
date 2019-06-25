import Vue from 'vue';
import {
  Convertor,
  DefineActionContext,
  DefineStoreModule,
} from '@lollipop-onl/vuex-typesafe-helper';
import { UserProfile, UserCore, UserPrivate } from '@/models';

export const strict = false;

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
  /** ユーザーを作成する */
  async createUser(context: Ctx, payload: { id: string; data: UserProfile['Value'] }): Promise<void> {
    const { id, data } = payload;
    const user = new UserProfile(id, data);

    await user.save();
  },
};
export type Actions = Convertor<typeof actions, {
  'user/fetchUserProfile': 'fetchUserProfile';
  'user/createUser': 'createUser';
}>;

export type Store = DefineStoreModule<'user', IState, Getters, Mutations, Actions>;
