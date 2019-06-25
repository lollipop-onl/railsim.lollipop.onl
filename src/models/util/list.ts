/* eslint-disable no-underscore-dangle */
import * as firebase from 'firebase/app';
import { AnyList } from './types';
import { Base } from './base';
import 'reflect-metadata';

export class List<Element extends Base> implements AnyList {
  public key: string = '';

  private _storage: Record<string, Element> = {};

  private _updateValue: Record<string, any> = {};

  public constructor(
    public parent: Base,
    private _Element: { new(...args: any[]): Element },
  ) { } // eslint-disable-line no-empty-function

  public value(): Record<string, any> {
    return Object.entries(this._storage).reduce<Record<string, any>>((value, [id, element]) => {
      value[id] = element.rawValue();

      return value;
    }, {});
  }

  public updateValue(): Record<string, any> {
    return Object.entries(this._storage).reduce<Record<string, any>>((value, [id, element]) => {
      const updateValue = element.updateValue();

      if (Object.keys(updateValue).length > 0) {
        value[id] = updateValue;
      }

      return value;
    }, {});
  }

  public setValue(value: Record<string, any>): void {
    const storage: Record<string, any> = {};

    Object.keys(value).forEach((id) => {
      const data = value[id];
      const element = new this._Element(id, data);

      element.setData(data);
      storage[id] = element;
    });

    this._storage = storage;
  }

  public setParent(parent: Base, key: string): void {
    this.parent = parent;
    this.key = key;
  }

  public append(object: Element): void {
    this._storage[object.id] = object;

    if (!this.parent || !object.isSaved) return;

    this._updateValue[object.id] = object;
  }

  public remove(object: Element): void {
    delete this._storage[object.id];

    if (!this.parent || !object.isSaved) return;

    this._updateValue[object.id] = firebase.firestore.FieldValue.delete();
  }

  public objectOf(key: string): Element {
    return this._storage[key];
  }

  public objects(): Element[] {
    return Object.values(this._storage).map(element => element);
  }

  public clean(): void {
    this._updateValue = {};
  }

  public count(): number {
    return Object.keys(this._storage).length;
  }
}
