/* eslint-disable no-underscore-dangle, @typescript-eslint/explicit-member-accessibility */
import { WriteBatch } from './types';
import { firestore } from './initialize';
import { Base } from './base';

export enum BatchType {
  save,
  update,
  delete
}

export interface Batchable {
  batchID?: string;
  pack(type: BatchType, batchID: string, batch?: WriteBatch): WriteBatch;
  batch(type: BatchType, batchID: string): void;
}

export class Batch {
  constructor(
    private batch = firestore.batch(),
  ) { } // eslint-disable-line no-empty-function

  public add<T extends Base>(type: BatchType, object: T): void {
    switch (type) {
      case BatchType.save:
        this.batch.set(object.reference, object._value(), { merge: true });
        break;
      case BatchType.update:
        this.batch.set(object.reference, object._updateValue(), { merge: true });
        break;
      case BatchType.delete:
        this.batch.delete(object.reference);
        break;
      default:
        // Do nothing
    }
  }
}
