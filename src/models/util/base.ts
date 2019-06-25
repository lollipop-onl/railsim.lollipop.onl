/* eslint-disable no-prototype-builtins, no-underscore-dangle */
import * as UUID from 'uuid';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'reflect-metadata';

import { firestore } from './initialize';
import {
  DocumentData, DocumentReference, DocumentSnapshot, Timestamp, CollectionReference, DateType, AnySubCollection, AnyList, ValueProtocol, WriteBatch, Transaction,
} from './types';

export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

const propertyMetadataKey = Symbol('property');

/**
 * プロパティを宣言するためのデコレータ
 */
export function property<T extends Document>(target: T, propertyKey: string): void {
  const properties = Reflect.getMetadata(propertyMetadataKey, target) || [];

  properties.push(propertyKey);

  Reflect.defineMetadata(propertyMetadataKey, properties, target);
}

// 判定系
export function isList(arg: any): arg is AnyList {
  return arg instanceof List;
}


export function isCollection(arg: any): arg is AnySubCollection {
  return (arg instanceof SubCollection)
      || (arg instanceof NestedCollection)
      || (arg instanceof ReferenceCollection);
}

export function isFile(arg: any): arg is File {
  return (arg instanceof File);
}

export function isFileType(arg: any): boolean {
  if (arg instanceof Object) {
    return ((arg as Record<string, any>).hasOwnProperty('mimeType')
          && (arg as Record<string, any>).hasOwnProperty('name')
          && (arg as Record<string, any>).hasOwnProperty('url'));
  }
  return false;
}

export function isFileArray(arg: any): arg is File[] {
  if (arg instanceof Array) {
    return arg.reduce((prev, value) => prev && isFileType(value), true);
  }
  return false;
}

export function isTimestamp(arg: any): arg is firebase.firestore.Timestamp {
  return (arg instanceof firebase.firestore.Timestamp);
}

export const isUndefined = (arg: any): arg is (undefined | null) => (arg === null || arg === undefined);

/**
 * Base class
 * @class
 */
export class Base implements Document {
  public static get triggerPath(): string {
    return `/version/{version}/${this.modelName}/{id}`;
  }

  public static get reference(): CollectionReference {
    return firestore.collection(this.path);
  }

  public static get version(): number {
    return 1;
  }

  public static get modelName(): string {
    return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1].toLowerCase();
  }

  public static get path(): string {
    return `version/${this.version}/${this.modelName}`;
  }

  public static query<T extends typeof Base>(this: T): DataSourceQuery.Query<T> {
    return new DataSourceQuery.Query(this.reference, this.reference, this);
  }

  /** Firestoreから値を取り出す */
  public static async get<T extends typeof Base>(this: T, id: string): Promise<InstanceType<T> | undefined> {
    try {
      const snapshot: DocumentSnapshot = await firestore.doc(`${this.path}/${id}`).get();
      if (snapshot.exists) {
        const document = new this(snapshot.id, {}) as InstanceType<T>;
        document.setData(snapshot.data()!);
        return document;
      }
      return undefined;
    } catch (error) {
      throw error;
    }
  }

  // メンバー定義
  public reference: DocumentReference;

  public snapshot?: DocumentSnapshot;

  public id: string;

  public createdAt!: Timestamp;

  public updatedAt!: Timestamp;

  public isExists: boolean = false;

  public isSaved: boolean = false;

  public isLocalSaved: boolean = false;

  public batchID?: string;

  private _prop: Record<string, any> = {};

  private _updateValues: DocumentData = {};

  /**
   * @constructor
   */
  public constructor(id?: string, data?: DocumentData) {
    if (!firestore) {
      throw Error('[model/util] Model utility is not initialized.');
    }

    this.reference = Base.reference;
    this.id = id || firestore.collection(`version/${Base.version}/${Base.modelName}`).doc().id;

    const properties: (keyof DocumentData)[] = Reflect.getMetadata(propertyMetadataKey, this) || [];

    if (!data) {
      properties.forEach((prop) => {
        const key = prop;

        this.defineProperty(key);
      });

      return;
    }

    properties.forEach((prop) => {
      const key = prop;
      const value = data[key];

      if (!isFileType(value)) {
        this.defineProperty(key, value);

        return;
      }

      const file = new File();

      file.init(value);
      this.defineProperty(key, file);
    });

    const keys = Object.keys(data);

    if (keys.includes('createdAt')) {
      this.defineProperty('createdAt', data.createdAt);
    }

    if (keys.includes('updatedAt')) {
      this.defineProperty('createdAt', data.updatedAt);
    }

    this.isSaved = true;
  }

  public setData(data: DocumentData): this {
    this.isExists = true;

    if (data.createdAt) {
      this.defineProperty('createdAt');
      this._prop.createdAt = data.createdAt;
    }

    if (data.updatedAt) {
      this.defineProperty('updatedAt');
      this._prop.updatedAt = this.updatedAt;
    }

    const properties = this.getProperties();

    properties.forEach((key) => {
      const value = data[key];

      if (isUndefined(value)) {
        return;
      }

      if (isFileType(value)) {
        const file = new File();

        file.init(value);
        this._prop[key] = file;

        return;
      }

      if (isFileArray(value)) {
        this._prop[key] = value.map((fileValue) => {
          const file = new File();
          file.init(fileValue);

          return file;
        });

        return;
      }

      const prop = this._prop[key];
      if (isList(prop)) {
        prop.setValue(value);

        return;
      }

      this._prop[key] = value;
    });

    this._updateValues = {};

    return this;
  }

  public shouldBeReplicated(): boolean {
    return false;
  }

  public getReference(): DocumentReference {
    return firestore.doc(Base.path);
  }

  public getProperties(): (keyof DocumentData)[] {
    return Reflect.getMetadata(propertyMetadataKey, this) || [];
  }

  public setValue<K extends keyof ThisType<this>>(value: any, key: K): void {
    this[key] = value;
  }

  public rawValue(): DocumentData {
    const values: Record<string, any> = {};

    this.eachPropertiesDescriptor((value, key) => {
      if (isUndefined(value)) return;

      if (isCollection(value)) {
        // Do nothing

        return;
      }

      if (isList(value)) {
        values[key] = value.value();

        return;
      }

      if (isFile(value)) {
        values[key] = value.value();

        return;
      }

      if (value instanceof Date) {
        // eslint-disable-next-line no-console
        console.warn('[model/util] Not supported `Date` type.');
      }

      if (isFileArray(value)) {
        values[key] = value.map(file => file.value());

        return;
      }

      values[key] = value;
    });

    return values;
  }

  public value(): DocumentData {
    const values = this.rawValue();
    const serverTimestamp = firebase.firestore.Timestamp.fromDate(new Date());

    values.updatedAt = this.updatedAt || serverTimestamp;
    values.createdAt = this.updatedAt || serverTimestamp;

    return values;
  }

  public _value(): DocumentData {
    const values = this.rawValue();
    const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

    if (this.isSaved) {
      values.updatedAt = serverTimestamp;
    } else {
      values.updatedAt = this.updatedAt || serverTimestamp;
      values.createdAt = this.createdAt || serverTimestamp;
    }

    return values;
  }

  public updateValue(): DocumentData {
    const updateValues = this._updateValues;

    this.eachPropertiesDescriptor((value, key) => {
      if (isUndefined(value)) return;

      if (isList(value)) {
        const updateValue = value.updateValue();

        if (Object.keys(updateValue).length > 0) {
          updateValues[key] = updateValue;
        }

        return;
      }

      if (isFile(value)) {
        if (Object.keys(file).length) {
          updateValues[key] = value.value();
        }

        return;
      }

      if (isFileArray(value)) {
        updateValues[key] = value.map(file => file.value());
      }
    });

    return updateValues;
  }

  public _updateValue(): DocumentData {
    const updateValue = this.updateValue();

    updateValue.updatedAt = firebase.firestore.FieldValue.serverTimestamp();

    return updateValue;
  }

  public pack(type: BatchType, batchID = UUID.v4(), writeBatch = firestore.batch()): WriteBatch {
    if (batchID === this.batchID) {
      return writeBatch;
    }

    this.batchID = batchID;

    const { reference } = Base;

    switch (type) {
      case BatchType.save:
        writeBatch.set(reference, this._value(), { merge: true });

        this.eachPropertiesDescriptor((value, key) => {
          if (!isCollection(value)) return;

          const collection: AnySubCollection = value;
          collection.setParent(this, key);

          const batchable: Batchable = value;
          batchable.pack(BatchType.save, batchID, writeBatch);
        });

        if (this.shouldBeReplicated()) {
          writeBatch.set(reference, this._value, { merge: true });
        }

        return writeBatch;
      case BatchType.update:
        if (this.isSaved) {
          const updateValue = this.updateValue();

          if (Object.keys(updateValue) > 0) {
            writeBatch.set(reference, this._updateValue(), { merge: true });
          }

          if (this.shouldBeReplicated) {
            writeBatch.set(reference, updateValue, { merge: true });
          }
        } else {
          writeBatch.set(reference, this._value(), { merge: true });

          if (this.shouldBeReplicated()) {
            writeBatch.set(reference, this._value(), { merge: true });
          }
        }

        this.eachPropertiesDescriptor((value, key) => {
          if (!isCollection(value)) return;

          const collection: AnySubCollection = value;
          collection.setParent(this, key);

          const batchable: Batchable = value;
          batchable.pack(BatchType.update, batchID, writeBatch);
        });

        return writeBatch;
      case BatchType.delete:
        writeBatch.delete(reference);

        if (this.shouldBeReplicated()) {
          writeBatch.delete(reference);
        }

        return writeBatch;
      default:
        return writeBatch;
    }
  }

  public batch(type: BatchType, batchID = UUID.v4()): void {
    if (batchID === this.batch) return;

    this.batchID = batchID;

    this.isSaved = true;
    this._updateValues = {};

    this.eachPropertiesDescriptor((value, key) => {
      if (isCollection(value)) {
        value.setParent(this, key);
        value.batch(type, batchID);

        return;
      }

      if (isFile(value)) {
        value.resetUpdateValue();

        return;
      }

      if (isList(value)) {
        value.clean();
      }
    });
  }

  public setParent<T extends Base>(parent: SubCollection<T>): void {
    this.path = `${parent.path}/${this.id}`;
    this.setReference(firestore.doc(Base.path));
  }

  public setReference(reference: DocumentReference): void {
    this.reference = reference;

    this.eachPropertiesDescriptor((value, key) => {
      if (!isCollection(value)) return;

      value.setParent(this, key);
    });
  }

  public async save(): Promise<void> {
    const batch = this.pack(BatchType.save);

    try {
      await batch.commit();

      this.batch(BatchType.update);

      this._updateValues = {};
    } catch (err) {
      throw err;
    }
  }


  public async update(): Promise<void> {
    const batch = this.pack(BatchType.update);

    try {
      await batch.commit();

      this.batch(BatchType.update);

      this._updateValues = {};
    } catch (err) {
      throw err;
    }
  }

  public async delete(): any {
    return await Base.reference.delete();
  }

  public async fetch(transaction?: Transaction): void {
    try {
      const snapshot = transaction ? await transaction.get(Base.reference) : await Base.reference.get();
      this.snapshot = snapshot;

      const data = snapshot.data();

      if (data) {
        this.setData(data);
        this.isSaved = true;
      }

      return this;
    } catch (err) {
      throw err;
    }
  }

  private eachPropertiesDescriptor(fn: (value: any, key: keyof DocumentData) => void, properties = this.getProperties()): void {
    properties.forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(this, key);

      if (!descriptor || !descriptor.get) return;

      const value = descriptor.get();

      fn(value, key);
    });
  }

  private defineProperty<T extends keyof ThisType<this>>(key: T | DateType, value?: any): void {
    const descriptor: PropertyDescriptor = {
      enumerable: true,
      configurable: true,
      get: () => this._prop[key],
      set: (newValue) => {
        if (isCollection(newValue)) {
          newValue.setParent(this, key);
        } else if (isList(newValue)) {
          const list: AnyList = newValue;
          list.setParent(this, key);
        } else if (isFile(newValue)) {
          this._updateValues[key] = value.value();
        } else if (isFileArray(newValue)) {
          this._updateValues[key] = (newValue as File[]).map(file => file.value());
        } else {
          this._updateValues[key] = newValue;
        }

        this._prop[key] = newValue;
      },
    };

    Object.defineProperty(this, key, descriptor);
  }
}
