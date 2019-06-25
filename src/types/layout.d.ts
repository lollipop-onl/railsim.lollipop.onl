/**
 * @file レイアウト関連の型定義
 */

/** Layout Props */
export interface ILayoutProps {
  isError?: boolean;
  breadcrumbs?: IBreadcrumbs[];
}

/** パンくずリスト */
export interface IBreadcrumbs {
  title: string;
  to?: string;
  loading?: boolean;
}
