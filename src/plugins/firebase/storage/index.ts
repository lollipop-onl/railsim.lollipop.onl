/**
 * Firebase storage関連のクラス
 */

import * as firebase from 'firebase/app';
import uuidv4 from 'uuid/v4';

class FirebaseStorage {
  /** ファイルパスを生成する */
  public static getFilePath(userId = 'admin', fileName = uuidv4()): string {
    return `/userdata/${userId}/${fileName}`;
  }

  /**
   * @constructor
   * @param app Firebase App
   * @param storageRef Storage reference
   */
  public constructor(
    private readonly app: firebase.app.App,
    private storage = app.storage(),
  ) { } // eslint-disable-line no-empty-function

  /**
   * ファイルをアップロードする
   * @param file ファイルデータ
   * @param userId ユーザーID
   */
  public upload(
    file: Blob | Uint8Array | ArrayBuffer,
    userId?: string,
    fileName?: string,
  ): firebase.storage.UploadTask {
    const filePath = FirebaseStorage.getFilePath(userId, fileName);
    const ref = this.storage.ref(filePath);

    return ref.put(file);
  }
}

export default FirebaseStorage;
