<script lang="ts">
  import { Link } from 'svelte-navigator';
  import type { Collection } from 'private-notes-api';
  import api, { callApi } from '@/api';
  export let active = false;
  export let collection: Collection;

  $: promise = active
    ? callApi<Collection>(api.getCollection, collection.collectionId)
    : undefined;
</script>

<li>
  <Link to={`collection/${collection.collectionId}`}>{collection.name}</Link>

  {#await promise}
    <p>Loading...</p>
  {:then collection}
    <ul class="pl-4">
      {#each collection.notes as note (note.noteId)}
        <li>
          <Link to={`collection/${collection.collectionId}/note/${note.noteId}`}
            >{note.title}</Link
          >
        </li>
      {/each}
    </ul>
  {:catch}
    <p>Fetching collection details failed...</p>
  {/await}
</li>
