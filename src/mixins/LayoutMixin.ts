import { Component, Vue } from 'nuxt-property-decorator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TLayoutProps = Record<string, any>;

declare module 'vue/types/vue' {
  interface Vue {
    layoutProps: TLayoutProps;
  }
}

/**
 * ページコンポーネントからのPropsを受け取れるようにする
 */
@Component
export default class LayoutMixin extends Vue {
  /** Layout Props */
  public get layoutProps(): TLayoutProps {
    const route = this.$route.matched[0];

    if (!route) return {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { options = {} } = route.components.default as any;
    const { layoutProps = {} } = options;

    return layoutProps;
  }
}
