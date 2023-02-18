import { component$, useStore } from '@builder.io/qwik';
import type { Collection } from '~/api/types';
import CollectionListItem from './collection-list-item';

interface CollectionListProps {
  collections: Collection[];
}

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
const CollectionList = component$(
  ({ collections = [] }: CollectionListProps) => {
    const store = useStore<{ id: string }>({ id: collections[0].collectionId });
    console.log(store.id);
    return (
      <ul>
        {collections.map((collection) => (
          <CollectionListItem
            collection={collection}
            active={collection.collectionId === store.id}
          />
        ))}
      </ul>
    );
  },
);

export default CollectionList;
