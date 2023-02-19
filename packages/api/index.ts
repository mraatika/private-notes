import type { PersistAdapter, PersistProps } from 'private-notes-persist';
import type { components } from './dist/api';

export type Collection = components['schemas']['Collection'];
export type Note = components['schemas']['Note'];
export type ServerError = components['schemas']['Error'];

let persistAdapter: PersistAdapter | null;

type RequestInitWithBaseURL = RequestInit & {
  baseUrl: string;
};

async function fetchJSON(
  url: string,
  init: RequestInitWithBaseURL,
  persistProps?: PersistProps,
) {
  const { baseUrl, headers, ...fetchInit } = init;
  const shouldPersistResult =
    persistAdapter && (!fetchInit.method || fetchInit.method === 'GET');

  if (shouldPersistResult) {
    const saved = persistAdapter?.get(url);

    if (saved) {
      return saved;
    }
  }

  const resp = await fetch(`${baseUrl}/${url}`, {
    ...fetchInit,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const json = await resp.json();

  if (!resp.ok) {
    throw Error((json as ServerError).message);
  }

  if (shouldPersistResult) {
    persistAdapter?.put(url, json, persistProps);
  }

  return json;
}

export function setPersistAdapter(adapter: PersistAdapter | null) {
  persistAdapter = adapter;
}

export async function getCollections(
  init: RequestInitWithBaseURL,
  persistProps: PersistProps = { maxAge: Infinity },
): Promise<Collection[]> {
  try {
    console.info('getCollections(): Fetching all collections');
    return fetchJSON(`collections`, init, persistProps);
  } catch (e) {
    console.error(e);
    throw new Error(`Collection listing failed: ${(e as Error).message}`);
  }
}

export async function getCollection(
  collectionId: string,
  init: RequestInitWithBaseURL,
  persistProps: PersistProps = { maxAge: 15 * 1000 },
): Promise<Collection> {
  try {
    console.info(`getCollection(): Getting collection ${collectionId}`);
    return fetchJSON(`collections/${collectionId}`, init, persistProps);
  } catch (e) {
    console.error(e);
    throw new Error(`Collection fetch failed: ${(e as Error).message}`);
  }
}
