import {
  components,
  operations,
} from 'private-notes-api/dist/private-notes-api';

export type CollectionCreateRequestBody =
  operations['createCollection']['requestBody']['content']['application/json'];

export type NoteCreateRequestBody =
  operations['createNote']['requestBody']['content']['application/json'];

export type Removable = {
  active?: 1 | 0;
};

export type Collection = components['schemas']['Collection'] & Removable;
export type Note = components['schemas']['Note'] & Removable;
export type SimpleCollection = Pick<Collection, 'collectionId', 'name'>;
