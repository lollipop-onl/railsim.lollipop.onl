import { Component, Vue } from 'nuxt-property-decorator';
import { ILayoutProps } from '@/types/layout';

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
  /** Component mount flag */
  public isMounted = false;

  /** Lifecycle event */
  public mounted(): void {
    this.isMounted = true;
  }

  /** Layout Props */
  public get layoutProps(): ILayoutProps {
    if (!this.isMounted) return {};

    if (!this.pageComponent) return {};

    const { $options } = this.pageComponent;
    const { layoutProps } = $options;

    if (!layoutProps) return {};

    return layoutProps.call(this.pageComponent);
  }

  /** Reference page component */
  /* eslint-disable */
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
}
