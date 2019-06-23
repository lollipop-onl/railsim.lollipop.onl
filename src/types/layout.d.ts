/**
 * @file レイアウト関連の型定義
 */

/** Layout Props */
export interface ILayoutProps {
  breadcrumbs?: IBreadcrumbs[];
}

/** パンくずリスト */
export interface IBreadcrumbs {
  title: string;
  to?: string;
}
