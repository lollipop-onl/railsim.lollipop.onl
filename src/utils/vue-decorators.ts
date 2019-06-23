/**
 * @file Vue関連のデコレーター
 */

import Vue, { PropOptions } from 'vue';
import { createDecorator, VueDecorator } from 'vue-class-component';

const SYNC_MODEL_PREFIX = 'local__';

/**
 * Modelの値をバケツリレーさせるデコレーター
 * @param [event] イベント名。省略したときはプロパティのキー
 * @param [options] Propのオプション
 * @param [prefix] 仮のPropに付与するプレフィックス。初期値は"local__"
 */
export function SyncModel(
  event?: string,
  options: PropOptions = {},
  prefix = '',
): VueDecorator {
  return createDecorator((componentOptions, k) => {
    const optimizedPrefix = prefix || SYNC_MODEL_PREFIX;
    const localKey = `${optimizedPrefix}${k}`;
    const eventName = event || k;

    (componentOptions.props || ((componentOptions.props = {}) as any))[localKey] = options;
    componentOptions.model = { prop: localKey, event: eventName };

    (componentOptions.computed || ((componentOptions.computed = {}) as any))[k] = {
      get() {
        return this[localKey];
      },
      set(this: Vue, value: any) {
        this.$emit(eventName, value);
      },
    };
  });
}

/**
 * Propの.syncをバケツリレーさせるデコレーター。デコレートしたメンバー名でget/setできるようになる
 * @param key 渡されるProp名。親のコンポーネントからはこの値で渡す
 * @param [options] Propのオプション
 */
export function SyncProp(key: string, options: PropOptions = {}): VueDecorator {
  return createDecorator((componentOptions, k) => {
    (componentOptions.props || ((componentOptions.props = {}) as any))[key] = options;

    (componentOptions.computed || ((componentOptions.computed = {}) as any))[k] = {
      get() {
        return this[key];
      },
      set(this: Vue, value: any) {
        this.$emit(`update:${key}`, value);
      },
    };
  });
}

/**
 * キャッシュしないComputed.get
 */
export const NoCache = createDecorator((options, key) => {
  // @ts-ignore
  options.computed[key].cache = false;
});
