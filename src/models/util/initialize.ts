import { Firestore } from './types';

// eslint-disable-next-line import/no-mutable-exports
let firestore: Firestore;

export const initialize = (appFirestore: Firestore): void => {
  firestore = appFirestore;
};

export { firestore };
