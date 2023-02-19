import { resolveExpiry } from './_util';
import type { PersistAdapter, PersistProps } from '../types';

interface LocalStorageEntry<T = unknown> {
  expires: number;
  data: T;
}

const localStorageAdapter: PersistAdapter = {
  put(key, data, props: PersistProps = {}) {
    try {
      const json = {
        expires: resolveExpiry(props),
        data: JSON.stringify(data),
      };
      localStorage.setItem(key, JSON.stringify(json));
    } catch (e) {
      console.error('localStorageAdapter(): Error while formatting data', e);
    }
  },

  get<T>(key: string) {
    const item = localStorage.getItem(key);

    if (!item) {
      return;
    }

    try {
      const { expires, data } = JSON.parse(item) as LocalStorageEntry<T>;

      // if the entry is still valid
      if (expires >= Date.now()) {
        return data;
      } else {
        // if the entry is not valid then remove the item
        localStorageAdapter.remove(key);
      }
    } catch (e) {
      console.error('localStorageAdapter(): Error while parsing saved item', e);
    }
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },
};

export default localStorageAdapter;
