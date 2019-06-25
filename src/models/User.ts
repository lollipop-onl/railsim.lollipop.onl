import { Base, property } from './util';

export class User extends Base {
  @property public name: string;
}
