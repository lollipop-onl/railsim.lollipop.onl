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

/** uidとユーザーIDの関連付け */
export class UIDLink extends Base {
  /** ユーザーのID */
  @property userId: string;
}
