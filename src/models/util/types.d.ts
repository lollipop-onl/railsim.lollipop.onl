/* eslint-disable max-len */
import * as firebase from 'firebase/app';
import { Base } from './base';
import { Batchable } from './batch';

// Firebase alias
export type Firestore = firebase.firestore.Firestore
export type FieldValue = firebase.firestore.FieldValue
export type CollectionReference = firebase.firestore.CollectionReference
export type DocumentReference = firebase.firestore.DocumentReference
export type DocumentSnapshot = firebase.firestore.DocumentSnapshot
export type Query = firebase.firestore.Query
export type QuerySnapshot = firebase.firestore.QuerySnapshot
export type WriteBatch = firebase.firestore.WriteBatch
export type SetOptions = firebase.firestore.SetOptions
export type UpdateData = firebase.firestore.UpdateData
export type FieldPath = firebase.firestore.FieldPath
export type Transaction = firebase.firestore.Transaction
export type Timestamp = firebase.firestore.Timestamp
export type DocumentData = { createdAt: Date; updatedAt: Date } | { [key: string]: any } | firebase.firestore.DocumentData
export type DataOrSnapshot = DocumentData | DocumentSnapshot | DocumentSnapshot
export type DateType = 'createdAt' | 'updatedAt'
export type WhereFilterOp = firebase.firestore.WhereFilterOp
export type OrderByDirection = firebase.firestore.OrderByDirection
export type GetOptions = firebase.firestore.GetOptions
export type DocumentChange = firebase.firestore.DocumentChange
export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

// Field interfaces
/** Value Protocol */
export interface ValueProtocol {
  value(): any;
  updateValue(): any;
  setValue(value: any, key: string): void;
}

/** File Data */
export interface FileData {
  mimeType: string;
  name: string;
  url: string;
  additionalData?: { [key: string]: any };
}

/** Firestore Document */
export interface Document extends Batchable, ValueProtocol {
  [index: string]: any | null | undefined;
  version: number;
  modelName: string;
  path: string;
  id: string;
  reference: DocumentReference;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  getVersion(): number;
  getModelName(): string;
  getPath(): string;
  value(): any;
}

/** Firestore Subcollection */
export interface AnySubCollection extends Batchable {
  path: string;
  reference: CollectionReference;
  key: string;
  setParent<T extends Base>(parent: T, key: string): void;
}

/** Firestore List */
export interface AnyList {
  key: string;
  value(): { [key: string]: any };
  updateValue(): { [key: string]: any };
  setValue(value: { [key: string]: any }): void;
  setParent<T extends Base>(parent: T, key: string): void;
  clean(): void;
}
