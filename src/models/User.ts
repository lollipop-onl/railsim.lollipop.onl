/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Base, property } from './util';

/** ユーザープロフィール情報 */
export class UserProfile extends Base {
  /** ユーザー名 */
  @property name: string;

  /** BIO */
  @property bio?: string;

  /** アバター画像 */
  @property avatar: string;

  /** ヒーロー画像 */
  @property hero?: string;
}

/** コアのユーザー情報 */
export class UserCore extends Base {
  /** アカウントがアクティブかどうか */
  @property isActive = false;
}

/** プライベートなユーザー情報 */
export class UserPrivate extends Base {
  /** 総ダウンロード数 */
  @property totalDownloads = 0;
}
