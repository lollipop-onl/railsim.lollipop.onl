/* eslint-disable no-underscore-dangle, no-dupe-class-members */
import {
  FieldPath,
  DocumentSnapshot,
  Query as TQuery,
  QuerySnapshot,
  OrderByDirection,
  CollectionReference,
  WhereFilterOp,
} from './types';
import { Base } from './base';
import { Option, DataSource } from './dataSource';

export class Query<Element extends typeof Base> {
  public constructor(
    public reference: CollectionReference,
    private query: TQuery,
    private _Element: Element,
    public isReference: boolean = false,
  ) { } // eslint-disable-line no-empty-function

  public dataSource(
    option: Option<Element> = new Option(),
  ): DataSource<Element> {
    return new DataSource(this, option, this._Element);
  }

  public listen(observer: {
    next?: (snapshot: QuerySnapshot) => void;
    error?: (error: Error) => void;
    complete?: () => void;
  }): () => void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.query.onSnapshot(observer.next!, observer.error);
  }

  public where(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: any): Query<Element> {
    // eslint-disable-next-line max-len
    const query: Query<Element> = new Query(this.reference, this.query, this._Element, this.isReference);
    query.query = this.query.where(fieldPath, opStr, value);
    return query;
  }

  public orderBy(fieldPath: string | FieldPath, directionStr?: OrderByDirection): Query<Element> {
    // eslint-disable-next-line max-len
    const query: Query<Element> = new Query(this.reference, this.query, this._Element, this.isReference);
    query.query = this.query.orderBy(fieldPath, directionStr);
    return query;
  }

  public limit(limit: number): Query<Element> {
    // eslint-disable-next-line max-len
    const query: Query<Element> = new Query(this.reference, this.query, this._Element, this.isReference);
    query.query = this.query.limit(limit);
    return query;
  }

  public startAt(snapshot: DocumentSnapshot): Query<Element>;

  public startAt(...fieldValues: any[]): Query<Element>;

  public startAt(arg: DocumentSnapshot | any[]): Query<Element> {
    // eslint-disable-next-line max-len
    const query: Query<Element> = new Query(this.reference, this.query, this._Element, this.isReference);
    query.query = this.query.startAt(arg);
    return query;
  }

  public startAfter(snapshot: DocumentSnapshot): Query<Element>

  public startAfter(...fieldValues: any[]): Query<Element>

  public startAfter(arg: DocumentSnapshot | any[]): Query<Element> {
    // eslint-disable-next-line max-len
    const query: Query<Element> = new Query(this.reference, this.query, this._Element, this.isReference);
    query.query = this.query.startAfter(arg);
    return query;
  }

  public endBefore(snapshot: DocumentSnapshot): Query<Element>

  public endBefore(...fieldValues: any[]): Query<Element>

  public endBefore(arg: DocumentSnapshot | any[]): Query<Element> {
    // eslint-disable-next-line max-len
    const query: Query<Element> = new Query(this.reference, this.query, this._Element, this.isReference);
    query.query = this.query.endBefore(arg);
    return query;
  }

  public endAt(snapshot: DocumentSnapshot): Query<Element>

  public endAt(...fieldValues: any[]): Query<Element>

  public endAt(arg: DocumentSnapshot | any[]): Query<Element> {
    // eslint-disable-next-line max-len
    const query: Query<Element> = new Query(this.reference, this.query, this._Element, this.isReference);
    query.query = this.query.endAt(arg);
    return query;
  }

  public async get(): Promise<QuerySnapshot> {
    return this.query.get();
  }
}
