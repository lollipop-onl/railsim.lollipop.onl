import { bind } from 'helpful-decorators';
import { Component, Vue } from 'nuxt-property-decorator';
import { Route } from 'vue-router';
import { ILayoutProps } from '@/types/layout';
import { NoCache } from '@/utils';

declare module 'vue/types/vue' {
  interface Vue {
    layoutProps: ILayoutProps;
  }
}

/**
 * ページコンポーネントからのPropsを受け取れるようにする
 */
@Component
export default class LayoutMixin extends Vue {
  /** 更新をかけるタイムスタンプ */
  public timestamp = 0;

  /** ストアの購読をやめるための関数 */
  private unsubscribeStore: Function | void;

  /** ナビゲーションの購読をやめるための関数 */
  private unsubscribeNavigation: Function | void;

  /** Lifecycle event */
  public mounted(): void {
    this.timestamp = Date.now();

    this.unsubscribeStore = this.$store.subscribe(() => {
      this.timestamp = Date.now();
    });
    this.unsubscribeNavigation = this.$router.afterEach(this.onNavigation);
  }

  /** Lifecycle event */
  public beforeDestroy(): void {
    if (this.unsubscribeStore) {
      this.unsubscribeStore();
    }

    if (this.unsubscribeNavigation) {
      this.unsubscribeNavigation();
    }
  }

  /** Layout Props */
  public get layoutProps(): ILayoutProps {
    const { pageComponent, $nuxt } = this;

    if (!this.timestamp) return {};

    if (!pageComponent) return {};

    const { $options } = pageComponent;
    const { layoutProps } = $options;

    if (!layoutProps) return {};

    const props = layoutProps.call(pageComponent);
    const isError = !!($nuxt as any).nuxt.err;

    return {
      ...props,
      isError,
    };
  }

  /** Reference page component */
  /* eslint-disable */
  @NoCache
  public get pageComponent(): Vue | void {
    const { componentInstance } = this.$vnode;

    if (!componentInstance) return;

    // FIXME 判定に関係ありそうなプロパティを持つコンポーネントをNuxtと認定
    const nuxt = componentInstance.$children.find((component: any) => (
      typeof component.nuxt === 'object' && component._name === '<Nuxt>'
    ));

    if (!nuxt) return;

    return nuxt.$children[0];
  }
  /* eslint-enable */

  /**
   * on navigation
   */
  @bind
  private onNavigation(to: Route): void {
    const matchedComponent = to.matched[0];

    if (!matchedComponent) return;

    const pageComponent: any = matchedComponent.components.default;
    const { options } = pageComponent;

    const updateTimestamp = ((): void => {
      this.timestamp = Date.now();

      options.created = options.created.filter((cb: Function) => cb !== updateTimestamp);
    });

    options.created.push(updateTimestamp);
  }
}
