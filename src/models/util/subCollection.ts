/* eslint-disable no-underscore-dangle */
import { } from 'reflect-metadata';
import { firestore } from './initialize';
import {
  AnySubCollection,
  CollectionReference,
  WriteBatch,
} from './types';
import { Base } from './base';
import { BatchType } from './batch';
import * as DataSourceQuery from './query';

export class SubCollection<T extends Base> implements AnySubCollection {
  public path!: string

  public reference!: CollectionReference

  public key!: string

  public batchID?: string

  public objects: T[] = []

  protected _insertions: T[] = []

  protected _deletions: T[] = []

  public constructor(public parent: Base) { } // eslint-disable-line no-empty-function

  public isSaved(): boolean {
    return this.parent.isSaved;
  }

  public setParent(parent: Base, key: string): void {
    this.parent = parent;
    this.key = key;
    this.path = this.getPath();
    this.reference = this.getReference();
  }

  public getPath(): string {
    return `${this.parent.path}/${this.key}`;
  }

  public getReference(): CollectionReference {
    return firestore.collection(this.getPath());
  }

  public insert(newMember: T): void {
    newMember.setParent(this);

    this.objects.push(newMember);

    if (!this.isSaved()) return;

    this._insertions.push(newMember);
  }

  public delete(member: T): void {
    this.objects.forEach((v, i) => {
      if (v.id !== member.id) return;

      this.objects.splice(i, 1);
    });

    if (this.isSaved()) {
      this._deletions.push(member);
    }

    member.reference = member.getReference();
  }

  public doc<T extends any>(id: string, Type: { new(...args: any[]): T }): T {
    const document = new Type(id);

    document.setParent(this);

    return document;
  }

  public async get(Type: { new(...args: any[]): T }): Promise<T[]> {
    try {
      const snapshot = await this.reference.get();
      const { docs } = snapshot;
      const documents = docs.map((documentSnapshot) => {
        const document = new Type(documentSnapshot.id, documentSnapshot.data());

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.setData(documentSnapshot.data()!);
        document.setParent(this);

        return document;
      });

      this.objects = documents;

      return documents;
    } catch (error) {
      throw error;
    }
  }

  public async contains(id: string): Promise<boolean> {
    try {
      const snapshot = await this.reference.doc(id).get();

      return snapshot.exists;
    } catch (error) {
      throw error;
    }
  }

  public forEach(callbackfn: (value: T, index: number, array: T[]) => void): void {
    this.objects.forEach(callbackfn);
  }

  public pack(type: BatchType, batchID: string, writeBatch?: WriteBatch): WriteBatch {
    const _writeBatch: WriteBatch = writeBatch || firestore.batch();
    switch (type) {
      case BatchType.save:
        this.forEach((document) => {
          document.pack(BatchType.save, batchID, _writeBatch);
        });

        return _writeBatch;
      case BatchType.update: {
        const insertions = this._insertions.filter(item => this._deletions.indexOf(item) < 0);

        insertions.forEach((document) => {
          document.pack(BatchType.update, batchID, _writeBatch);
        });

        const deletions = this._deletions.filter(item => this._insertions.indexOf(item) < 0);

        deletions.forEach((document) => {
          _writeBatch.delete(document.reference);
        });

        return _writeBatch;
      }
      case BatchType.delete:
        this.forEach((document) => {
          _writeBatch.delete(document.reference);
        });

        return _writeBatch;
      default:
        return _writeBatch;
    }
  }

  public query<T extends typeof Base>(type: T): DataSourceQuery.Query<T> {
    return new DataSourceQuery.Query(this.reference, this.reference, type);
  }

  public batch(type: BatchType, batchID: string): void {
    this.forEach((document) => {
      document.batch(type, batchID);
    });
  }
}
