import Vue from 'vue';
import {
  Convertor,
  DefineActionContext,
  DefineStoreModule,
} from '@lollipop-onl/vuex-typesafe-helper';
import { UserProfile, UIDLink } from '@/models';

export interface IState {
  /** 初期化されているか */
  initialized: boolean;
  /** ログインしているか */
  loggedIn: boolean;
  /** ユーザーID */
  userId?: string;
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
   * ユーザーIDを更新する
   */
  updateUserId(state: IState, userId: string) {
    state.userId = userId;
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
  'auth/updateUserId': 'updateUserId';
  'auth/updateProfile': 'updateProfile';
}>;

export type Ctx = DefineActionContext<IState, typeof getters, typeof mutations>;
export const actions = {
  /**
   * ユーザーを作成する
   */
  async signupUser(this: Vue, { commit }: Ctx, payload: {
    email: string;
    password: string;
    userId: string;
  }): Promise<void> {
    const { email, password, userId } = payload;

    try {
      const { user } = await this.$firebase.auth.createUserWithEmailAndPassword(email, password);

      if (!user) {
        return;
      }

      const { uid } = user;
      const uidLink = new UIDLink(uid);

      uidLink.userId = userId;

      const newUser = new UserProfile(userId);

      newUser.name = userId;

      await Promise.all([
        uidLink.save(),
        newUser.save(),
      ]);

      commit('updateProfile', newUser.value());
    } catch (err) {
      throw err;
    }
  },
  /**
   * ログインする
   */
  async login(this: Vue, { commit }: Ctx, payload: {
    email: string;
    password: string;
  }): Promise<void> {
    const { email, password } = payload;
    const { user } = await this.$firebase.auth.signInWithEmailAndPassword(email, password);

    if (!user) {
      return;
    }

    const snapshot = await UserProfile.query().where('uid', '==', user.uid).get();

    if (snapshot.size === 0) {
      return;
    }

    const userProfile = snapshot.docs[0];

    commit('updateProfile', userProfile.data() as UserProfile['Value']);
  },
  /**
   * ログアウトする
   */
  async logout(this: Vue, { commit }: Ctx): Promise<void> {
    await this.$firebase.auth.signOut();

    commit('updateLoginStatus', false);
  },
  /**
   * プロフィールを更新する
   */
  async updateUserProfile({ state, commit }: Ctx, payload: UserProfile['Value']): Promise<void> {
    const { userId } = state;

    if (!userId) {
      return;
    }

    const user = new UserProfile(userId, {});

    user.name = payload.name;
    user.bio = payload.bio;

    await user.update();

    const updatedUserProfile = await UserProfile.get(userId);
    const value = updatedUserProfile && updatedUserProfile.value();

    commit('updateProfile', value);
  },
};
export type Actions = Convertor<typeof actions, {
  'auth/signupUser': 'signupUser';
  'auth/login': 'login';
  'auth/logout': 'logout';
  'auth/updateUserProfile': 'updateUserProfile';
}>;

export type Store = DefineStoreModule<'auth', IState, Getters, Mutations, Actions>;
