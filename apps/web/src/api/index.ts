import type { Collection, ServerError } from './types';

async function doFetch<T>(url: string, abortController: AbortController) {
  const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/${url}`, {
    signal: abortController.signal,
    headers: {
      'x-api-key': import.meta.env.VITE_SERVER_API_KEY as string,
    },
  });

  const json = await resp.json();

  if (resp.ok) {
    return json as T;
  }

  throw Error((json as ServerError).message);
}

export async function getCollections(abortController: AbortController) {
  try {
    console.log('getting collections');
    return await doFetch<Collection[]>('collections', abortController);
  } catch (e) {
    console.error(e);
    throw new Error(`Collection listing failed: ${(e as Error).message}`);
  }
}

export async function getCollection(
  collectionId: string,
  abortController: AbortController,
) {
  try {
    return doFetch<Collection>(`collections/${collectionId}`, abortController);
  } catch (e) {
    console.error(e);
    throw new Error(`Collection fetch failed: ${(e as Error).message}`);
  }
}
