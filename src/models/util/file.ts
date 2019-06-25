import { ValueProtocol, FileData } from './types';

export class File implements ValueProtocol {
  public mimeType?: string

  public name?: string

  public url?: string

  public additionalData?: Record<string, any>;

  private updateValues: Record<string, any>;

  public constructor(
    name?: string,
    url?: string,
    mimeType?: string,
    additionalData?: Record<string, any>,
  ) {
    this.defineProperty('mimeType', mimeType);
    this.defineProperty('name', name);
    this.defineProperty('url', url);
    this.defineProperty('additionalData', additionalData);
    this.updateValues = {};
  }

  public init(value: FileData): void {
    this.mimeType = value.mimeType;
    this.name = value.name;
    this.url = value.url;
    this.additionalData = value.additionalData;
    this.updateValues = {};
  }

  public setValue(value: any, key: keyof FileData): void {
    this[key] = value;
  }

  public value(): FileData {
    const value: FileData = {
      name: this.name || '',
      url: this.url || '',
      mimeType: this.mimeType || '',
    };

    if (this.additionalData) {
      value.additionalData = this.additionalData;
    }

    return value;
  }

  public updateValue(): Record<string, any> {
    return this.updateValues;
  }

  public resetUpdateValue(): void {
    this.updateValues = {};
  }

  private defineProperty(key: string, value?: any): void {
    const descriptor: PropertyDescriptor = {
      enumerable: true,
      configurable: true,
      get: () => value,
      set: (newValue) => {
        value = newValue;
        this.updateValues[key] = newValue;
      },
    };

    Object.defineProperty(this, key, descriptor);
  }
}
