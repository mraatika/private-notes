import { localStorageAdapter } from 'private-notes-persist';
import { createApiAdapter } from 'private-notes-api';

const api = createApiAdapter(localStorageAdapter);

type ValueOf<T> = T[keyof T];

export function callApi<T>(fn: ValueOf<typeof api>, ...props: any[]): T {
  // @ts-ignore
  return fn(...props, {
    baseUrl: import.meta.env.VITE_SERVER_URL,
    headers: {
      'x-api-key': import.meta.env.VITE_SERVER_API_KEY,
    },
  });
}

export default api;
