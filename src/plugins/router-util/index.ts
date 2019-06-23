/**
 * @file vue-routerの拡張ユーティリティ
 */

import { Context } from '@nuxt/vue-app';
import { Route } from 'vue-router';

type NavigationHook = (from: Route, to: Route) => boolean | void;
type HookName = 'beforeEach' | 'beforeResolve' | 'afterEach';

export class RouterUtilPlugin {
  /** 登録されたHooks */
  private navigationHooks: Record<HookName, NavigationHook[]> = {
    beforeEach: [],
    beforeResolve: [],
    afterEach: [],
  };

  public constructor(private context: Context) {
    this.registerHook('beforeEach');
    this.registerHook('beforeResolve');
    this.registerHook('afterEach');
  }

  /**
   * beforeEachにフックを登録する
   */
  public addHook(name: HookName, hook: NavigationHook): void {
    // ! すでに登録されていればキャンセル
    const isAdded = this.navigationHooks[name].includes(hook);

    if (isAdded) return;

    this.navigationHooks[name].push(hook);
  }

  /**
   * beforeEachに登録しているフックを削除する
   */
  public removeHook(name: HookName, hook: NavigationHook): void {
    this.navigationHooks[name] = this.navigationHooks[name].filter(_hook => _hook !== hook);
  }

  /**
   * RouterUtilをイベントと紐付ける
   */
  private registerHook(name: HookName): void {
    const { app } = this.context;

    if (!app.router) return;

    app.router[name]((to, from, next?) => {
      const isContinue = this.navigationHooks[name]
        .map(hook => hook(to, from))
        .every(flag => flag !== false);

      if (!next) return;

      if (isContinue) {
        next();
      } else {
        next(false);
      }
    });
  }
}
