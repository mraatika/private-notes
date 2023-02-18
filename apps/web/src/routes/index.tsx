import { component$, Resource, useResource$ } from '@builder.io/qwik';
import { getCollections } from '~/api';
import CollectionList from '~/components/collection-list';
import type { Collection } from '~/api/types';

const MainPage = component$(() => {
  const collectionsResource = useResource$<Collection[]>(
    async ({ cleanup }) => {
      const abortController = new AbortController();
      cleanup(() => abortController.abort('cleanup'));
      return getCollections(abortController);
    },
  );

  return (
    <div class="flex h-full bg-cyan-100">
      <div class="basis-1/5 bg-amber-500 p-6">
        <h2>Collections</h2>
        <Resource
          value={collectionsResource}
          onPending={() => <div>Loading...</div>}
          onRejected={() => <div>Failed to load collections :(</div>}
          onResolved={(collections) => (
            <CollectionList collections={collections} />
          )}
        />
      </div>
      <div class="basis-4/5 bg-green-300 p-6">This is the main view</div>
    </div>
  );
});

export default MainPage;
