/** アプリ設定のオブジェクト */
export interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  datebaseUrl: string;
  messagingSenderId: string;
  projectId: string;
  storageBucket: string;
}

/** Firebaseのイベント */
export type FirebaseEventName = 'onAuthStateChanged' | 'initialized';
