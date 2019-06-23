/**
 * @file 検索関連のユーティリティ
 */

import { arrayify } from './toolbox';

interface ISearchQuery {
  keyword?: string;
  tag?: string[];
  category?: string[];
}

type VueRouterQuery = Record<string, string | (string | null)[]>;

/**
 * 検索のクエリをオブジェクトに変換する
 */
export const parseSearchQuery = (query: VueRouterQuery): Required<ISearchQuery> => {
  const { keyword, category, tag } = query;
  const parseArray = (plain: any): string[] => (plain || '').split(',');

  return {
    keyword: arrayify(keyword)[0] || '',
    tag: parseArray(arrayify(tag)[0]),
    category: parseArray(arrayify(category)[0]),
  };
};

/**
 * オブジェクトを検索のクエリに変換する
 */
export const stringifySearchQuery = (query: ISearchQuery): string => {
  const { keyword = '', category = [], tag = [] } = query;
  const searchQuery = [];
  const stringifyArray = (arr: any[]): string => arr.filter(Boolean).sort((a, b) => a - b).join(',');

  if (keyword) {
    searchQuery.push(['keyword', keyword]);
  }

  if (category) {
    searchQuery.push(['category', stringifyArray(category)]);
  }

  if (tag.length > 0) {
    searchQuery.push(['tag', stringifyArray(tag)]);
  }

  return searchQuery.map(q => q.join('=')).join('&');
};
