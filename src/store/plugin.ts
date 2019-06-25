import Vue from 'vue';
import {
  Convertor,
  DefineActionContext,
  DefineStoreModule,
} from '@lollipop-onl/vuex-typesafe-helper';
import { Plugin } from '@/models/Plugin';

type PluginData = Plugin['Value'];

export interface IState {
  pluginData: Record<string, PluginData>;
}

export const state = (): IState => ({
  /** プラグインのデータ */
  pluginData: {},
});

export const getters = {};
export type Getters = Convertor<typeof getters, {}>;

export const mutations = {
  /** プラグインデータを保存する */
  savePluginData(state: IState, plugin: Plugin): void {
    const { id } = plugin;

    Vue.set(state.pluginData, id, plugin.value());
  },
};
export type Mutations = Convertor<typeof mutations, {
  'plugin/savePluginData': 'savePluginData';
}>;

export type Ctx = DefineActionContext<IState, typeof getters, typeof mutations>;
export const actions = {
  /** プラグインデータを取得する */
  async fetchPlugin({ commit }: Ctx, pluginId: string): Promise<Plugin> {
    const plugin = await Plugin.get(pluginId);

    if (!plugin) {
      throw new Error();
    }

    commit('savePluginData', plugin);

    return plugin;
  },
  /** プラグインを作成する */
  async createPlugin(context: Ctx, payload: { data: Plugin['Value'] }): Promise<void> {
    const { data } = payload;
    const plugin = new Plugin(undefined, data);

    await plugin.save();
  },
};
export type Actions = Convertor<typeof actions, {
  'plugin/fetchPlugin': 'fetchPlugin';
  'plugin/createPlugin': 'createPlugin';
}>;

export type Store = DefineStoreModule<'plugin', IState, Getters, Mutations, Actions>;
