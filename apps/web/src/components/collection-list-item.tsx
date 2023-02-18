import { component$, useResource$, Resource } from '@builder.io/qwik';
import { getCollection } from '~/api';
import type { Collection } from '~/api/types';

interface CollectionListItemProps {
  collection: Collection;
  active: boolean;
}

const CollectionListItem = component$(
  ({ collection, active }: CollectionListItemProps) => {
    const collectionResource = useResource$<Collection>(
      async ({ track, cleanup }) => {
        const abortController = new AbortController();
        console.log('Running notes');
        track(() => active);
        cleanup(() => abortController.abort('cleanup'));
        return getCollection(collection.collectionId, abortController);
      },
    );

    return (
      <li>
        {collection.name}
        <Resource
          value={collectionResource}
          onPending={() => <div>Loading...</div>}
          onRejected={() => <div>Failed to load notes</div>}
          onResolved={({ notes }) => (
            <ul class="pl-4">
              {notes?.map((note) => (
                <li>{note.title}</li>
              ))}
            </ul>
          )}
        />
      </li>
    );
  },
);

export default CollectionListItem;
