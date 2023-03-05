import type { PersistAdapter, PersistProps } from 'private-notes-persist';
import type { components } from '../dist/private-notes-api';
import logger from './logger';

export type Collection = components['schemas']['Collection'];
export type Note = components['schemas']['Note'];
export type ServerError = components['schemas']['Error'];

type RequestInitWithBaseURL = RequestInit & {
  baseUrl: string;
};

/**
 * Api adapter factory
 * @param persistAdapter
 * @returns
 */
export function createApiAdapter(persistAdapter?: PersistAdapter) {
  /**
   * @private
   * @param url
   * @param init
   * @param persistProps
   * @returns
   */
  async function fetchJSON(
    url: string,
    init: RequestInitWithBaseURL,
    persistProps?: PersistProps,
  ) {
    const { baseUrl, headers, ...fetchInit } = init;
    const shouldPersistResult =
      !!persistAdapter && (!fetchInit.method || fetchInit.method === 'GET');

    if (shouldPersistResult) {
      const saved = persistAdapter?.get(url);

      if (saved) {
        logger.debug(`found entry ${url} from local cache, returning`, saved);
        return saved;
      }
    }

    const resp = await fetch(`${baseUrl}/${url}`, {
      ...fetchInit,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const json = await resp.json();

    if (!resp.ok) {
      throw Error((json as ServerError).message);
    }

    if (shouldPersistResult) {
      persistAdapter.put(url, json, persistProps);
    }

    return json;
  }

  /**
   * Fetch all collections from the db
   * @param init
   * @param persistProps
   * @returns
   */
  async function getCollections(
    init: RequestInitWithBaseURL,
    persistProps: PersistProps = { maxAge: 30 * 1000 },
  ): Promise<Collection[]> {
    try {
      logger.debug('getCollections(): Fetching all collections');
      return fetchJSON(`collections`, init, persistProps);
    } catch (e) {
      logger.error(e);
      throw new Error(`Collection listing failed: ${(e as Error).message}`);
    }
  }

  /**
   * Fetch a single collection from the db
   * @param collectionId
   * @param init
   * @param persistProps
   * @returns
   */
  async function getCollection(
    collectionId: string,
    init: RequestInitWithBaseURL,
    persistProps: PersistProps = { maxAge: 30 * 1000 },
  ): Promise<Collection> {
    try {
      logger.debug(`getCollection(): Getting collection ${collectionId}`);
      return fetchJSON(`collections/${collectionId}`, init, persistProps);
    } catch (e) {
      logger.error(e);
      throw new Error(`Collection fetch failed: ${(e as Error).message}`);
    }
  }

  return {
    getCollections,
    getCollection,
  };
}
