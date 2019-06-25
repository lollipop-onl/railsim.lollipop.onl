/* eslint-disable no-underscore-dangle, @typescript-eslint/explicit-member-accessibility */
import { QuerySnapshot, DocumentData, DocumentChange } from './types';
import { Base } from './base';
import { Query } from './query';

export class Option<Element extends typeof Base> {
  public timeout = 10;

  public sortBlock?(a: InstanceType<Element>, b: InstanceType<Element>): number;
}

export enum Change {
  initial = 'initial',
  update = 'update',
  error = 'error'
}

export class CollectionChange {
  constructor(
    public type: Change,
    public insertions: number[],
    public modifications: number[],
    public deletions: number[],
  ) { } // eslint-disable-line no-empty-function
}

export class DataSource<Element extends typeof Base> {
  [index: number]: Element;

  public documents: InstanceType<Element>[] = [];

  public changeBlock?(snapshot: QuerySnapshot, change: CollectionChange): void;

  public errorBlock?(error: Error): void;

  public completedBlock?(documents: InstanceType<Element>[]): void

  private Element!: Element;

  public constructor(
    public query: Query<Element>,
    public option = new Option<Element>(),
    private element: Element,
  ) { } // eslint-disable-line no-empty-function

  public doc(index: number): InstanceType<Element> {
    return this.documents[index];
  }

  public on(block: (snapshot: QuerySnapshot, change: CollectionChange) => void): this {
    this.changeBlock = block;

    return this;
  }

  public onError(block: (error: Error) => void): this {
    this.errorBlock = block;

    return this;
  }

  public onCompleted(block: (documents: InstanceType<Element>[]) => void): this {
    this.completedBlock = block;

    return this;
  }

  public listen(): this {
    let isFirst = true;

    this.query.listen({
      next: async (snapshot: QuerySnapshot) => {
        await this._operate(snapshot, isFirst);

        if (isFirst) {
          isFirst = false;
        }
      },
      error: (error: Error) => {
        if (this.errorBlock) {
          this.errorBlock(error);
        }
      },
      complete: () => {
        if (this.completedBlock) {
          this.completedBlock(this.documents);
        }
      },
    });

    return this;
  }

  public async next(): Promise<InstanceType<Element>[]> {
    const snapshot: QuerySnapshot = await this.query.get();
    const documents: InstanceType<Element>[] = await this._operate(snapshot, false);

    if (snapshot.docs.length > 0) {
      const lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
      this.query = this.query.startAfter(lastSnapshot);
    }

    return documents;
  }

  public async get(): Promise<InstanceType<Element>[]> {
    return this.next();
  }

  private async _operate(
    snapshot: QuerySnapshot,
    isFirst: boolean,
  ): Promise<InstanceType<Element>[]> {
    const documents: InstanceType<Element>[] = [];
    const changes: DocumentChange[] = snapshot.docChanges();

    changes.forEach(async (change) => {
      const { type, doc } = change;

      switch (type) {
        case 'added': {
          const document = this._get(doc.id, doc.data());

          documents.push(document);
          documents.sort(this.option.sortBlock);

          if (this.query.isReference) {
            await document.fetch();
          }

          this.documents.push(document);
          this.documents = this.documents.sort(this.option.sortBlock);

          if (isFirst) break;

          const IDs = this.documents.map(({ id }) => id);

          if (!IDs.includes(doc.id) || !this.changeBlock) break;

          const index = IDs.indexOf(doc.id);
          // eslint-disable-next-line max-len
          const collectionChange: CollectionChange = new CollectionChange(Change.update, [index], [], []);

          this.changeBlock(snapshot, collectionChange);

          break;
        }
        case 'modified': {
          this.documents = this.documents.filter(({ id }) => doc.id !== id);
          this.documents = this.documents.sort(this.option.sortBlock);

          const IDs = this.documents.map(({ id }) => id);

          if (!IDs.includes(doc.id) || !this.changeBlock) break;

          const index = IDs.indexOf(doc.id);
          // eslint-disable-next-line max-len
          const collectionChange: CollectionChange = new CollectionChange(Change.update, [], [index], []);

          this.changeBlock(snapshot, collectionChange);

          break;
        }
        case 'removed': {
          this.documents = this.documents.filter(({ id }) => doc.id !== id);
          this.documents = this.documents.sort(this.option.sortBlock);

          const IDs = this.documents.map(({ id }) => id);

          if (!IDs.includes(doc.id) || !this.changeBlock) break;

          const index = IDs.indexOf(doc.id);
          // eslint-disable-next-line max-len
          const collectionChange: CollectionChange = new CollectionChange(Change.update, [], [], [index]);

          this.changeBlock(snapshot, collectionChange);

          break;
        }
        default:
          // Do nothing
      }
    });

    if (isFirst && this.changeBlock) {
      const collectionChange: CollectionChange = new CollectionChange(Change.initial, [], [], []);

      this.changeBlock(snapshot, collectionChange);
    }

    if (this.query.isReference) {
      const promises = documents.map(doc => doc.fetch());

      await Promise.all(promises);
    }

    return documents;
  }

  private _get(id: string, data: DocumentData): InstanceType<Element> {
    if (this.query.isReference) {
      const document = new this.Element(id, {}) as InstanceType<Element>;

      return document;
    }

    const document = new this.Element(id, data) as InstanceType<Element>;

    document.setData(data);
    document.setReference(this.query.reference.doc(id));

    return document;
  }
}
