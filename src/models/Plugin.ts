/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Base, property } from './util';

/** プラグイン情報 */
export class Plugin extends Base {
  /** プラグイン名 */
  @property name: string;

  /** プラグインの説明 */
  @property description: string;

    /** 投稿者のユーザーID */
    @property userId: string;

  /** ダウンロードURL */
  @property downloadUrl: string;

  /** カテゴリ */
  @property category: string[];
}
