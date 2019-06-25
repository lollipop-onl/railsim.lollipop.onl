/* eslint-disable max-len */
import * as firebase from 'firebase/app';

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
