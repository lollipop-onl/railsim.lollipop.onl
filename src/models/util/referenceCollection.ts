/* eslint-disable no-underscore-dangle */
import { } from 'reflect-metadata';
import * as firebase from 'firebase/app';
import { firestore } from './initialize';
import { Base } from './base';
import { WriteBatch } from './types';
import { BatchType } from './batch';
import { SubCollection } from './subCollection';
import * as DataSourceQuery from './query';

export class ReferenceCollection<T extends Base> extends SubCollection<T> {
  public doc<T>(id: string, Type: { new(...args: any[]): T }): T {
    const document = new Type(id);
    return document;
  }

  public insert(newMember: T): void {
    this.objects.push(newMember);

    if (!this.isSaved()) return;

    this._insertions.push(newMember);
  }

  public delete(member: T): void {
    this.objects.forEach((v, i) => {
      if (v.id === member.id) {
        this.objects.splice(i, 1);
      }
    });

    if (!this.isSaved()) return;

    this._deletions.push(member);
  }

  public pack(type: BatchType, batchID?: string, writeBatch?: WriteBatch): WriteBatch {
    const _writeBatch: WriteBatch = writeBatch || firestore.batch();
    switch (type) {
      case BatchType.save: {
        this.forEach((document) => {
          if (document.shouldBeReplicated()) {
            const reference = this.reference.doc(document.id);
            const value = document.value();
            value.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            value.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
            _writeBatch.set(reference, value, { merge: true });
          } else {
            const reference = this.reference.doc(document.id);
            const value = {
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            };
            _writeBatch.set(reference, value, { merge: true });
          }
          document.pack(BatchType.save, batchID, _writeBatch);
        });
        return _writeBatch;
      }
      case BatchType.update: {
        const insertions = this._insertions.filter(item => this._deletions.indexOf(item) < 0);

        insertions.forEach((document) => {
          const reference = this.reference.doc(document.id);

          if (document.shouldBeReplicated()) {
            const value = document.value();

            if (document.isSaved) {
              value.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
            } else {
              value.createdAt = firebase.firestore.FieldValue.serverTimestamp();
              value.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
            }

            _writeBatch.set(reference, value, { merge: true });
          } else if (document.isSaved) {
            const value = {
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            };

            _writeBatch.set(reference, value, { merge: true });
          } else {
            const value = {
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            };

            _writeBatch.set(reference, value, { merge: true });
          }

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

  public async get(Type: { new(...args: any[]): T }): Promise<T[]> {
    try {
      const snapshot = await this.reference.get();
      const { docs } = snapshot;
      const documents = docs.map((documentSnapshot) => {
        const document = new Type(documentSnapshot.id, {});

        document.setParent(this);

        return document;
      });

      this.objects = documents;
      return documents;
    } catch (error) {
      throw error;
    }
  }

  public query<T extends typeof Base>(type: T): DataSourceQuery.Query<T> {
    const query = new DataSourceQuery.Query(this.reference, this.reference, type);
    query.isReference = true;
    return query;
  }
}
