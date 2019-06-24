/**
 * Firebase認証関連のクラス
 */

import * as firebase from 'firebase/app';

class FirebaseAuth {
  /**
   * @constructor
   * @param app Firebase App
   */
  public constructor(
    private readonly app: firebase.app.App,
    private readonly googleProvider = new firebase.auth.GoogleAuthProvider(),
  ) { } // eslint-disable-line no-empty-function

  /**
   * メールアドレスとパスワードでログインを行う
   */
  public async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> {
    return this.app.auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * Googleアカウントでログインを行う
   */
  public async signInWithGoogle(): Promise<void> {
    await this.app.auth().signInWithRedirect(this.googleProvider);
  }

  /**
   * ログアウトする
   */
  public async signOut(): Promise<void> {
    await this.app.auth().signOut();
  }
}

export default FirebaseAuth;
