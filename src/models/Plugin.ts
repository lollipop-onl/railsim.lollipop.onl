/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Base, property } from './util';

/** プラグイン情報 */
export class Plugin extends Base {
  /** プラグイン名 */
  @property name: string;

  /** プラグインの説明 */
  @property description: string;

  /** ダウンロードURL */
  @property downloadUrl: string;
}
