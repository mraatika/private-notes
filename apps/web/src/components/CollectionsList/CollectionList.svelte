<script lang="ts">
  import type { Collection } from 'private-notes-api';
  import CollectionListItem from './CollectionListItem.svelte';

  export let collections: Collection[];
  $: activeId = collections[0].collectionId;
</script>

<ul>
  {#each collections as collection (collection.collectionId)}
    <CollectionListItem
      {collection}
      active={collection.collectionId === activeId}
    />
  {/each}
</ul>
