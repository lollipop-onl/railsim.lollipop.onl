/**
 * @file Firebaseの操作全般をラップするプラグイン
 */

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import FirebaseAuth from '@/plugins/firebase/auth';
import FirebaseStorage from '@/plugins/firebase/storage';
import { IFirebaseConfig, FirebaseEventName } from '@/types/firebase';
import { UIDLink } from '@/models';
import { initialize } from '@/models/util';

class Firebase {
  /** イベントリスナーのレコード */
  public static listeners: Record<FirebaseEventName, Function[]> = {
    onAuthStateChanged: [],
    initialized: [],
  };

  /** 初期化済みかどうか */
  private isInitialized = false;

  /**
   * @constructor
   * @param config Firebaseの設定
   */
  public constructor(
    private readonly config: IFirebaseConfig,
    private readonly app = firebase.apps.length > 0
      ? firebase.app()
      : firebase.initializeApp(config),
    public readonly auth = new FirebaseAuth(app),
    public readonly storage = new FirebaseStorage(app),
  ) {
    this.initialize();
  }

  /**
   * Firebaseのイベント発生時に実行するメソッドを登録するデコレーター
   * @param event イベント名
   * @returns Decorator
   */
  public static subscribe(event: FirebaseEventName): Function {
    return (target: any, name: string, descriptor: PropertyDescriptor) => {
      const fn = descriptor.value;

      if (typeof fn !== 'function') {
        // eslint-disable-next-line prettier/prettier
        throw new Error(`@Firebase.subscribe decorator can only be pplied to methods not: ${typeof fn}`);
      }

      Firebase.listeners[event].push(fn);
    };
  }

  /**
   * Firebaseのイベントリスナもどき
   * @param event イベント名
   * @param callback コールバック関数
   */
  public on(event: FirebaseEventName, callback: Function): void {
    // * 初期化済みの場合は即時実行
    if (event === 'initialized' && this.isInitialized) {
      callback();

      return;
    }

    Firebase.listeners[event].push(callback);
  }

  /**
   * Firebaseのイベントリスナを解除
   * @param event イベント名
   * @param callback コールバック関数
   */
  public off(event: FirebaseEventName, callback: Function): void {
    Firebase.listeners[event] = Firebase.listeners[event].filter(cb => cb !== callback);
  }

  /**
   * Firebaseの初期化
   */
  private initialize(): void {
    initialize(this.app.firestore());

    this.app.auth().onAuthStateChanged(async (user) => {
      const uid = user && user.uid;
      const uidLink = uid && await UIDLink.get(uid);
      const userId = uidLink && uidLink.userId;

      Firebase.listeners.onAuthStateChanged.forEach(cb => cb(!!user, userId, uid));

      if (!this.isInitialized) {
        this.isInitialized = true;
        Firebase.listeners.initialized.forEach(cb => cb());
      }
    });
  }
}

export default Firebase;
