import { components, operations } from './api';

export type CollectionInitObject =
  operations['createCollection']['requestBody']['content']['application/json'];

export type Collection = components['schemas']['Collection'] & {
  active?: 1 | 0;
};

export type SimpleCollection = Pick<Collection, 'collectionId', 'name'>;
