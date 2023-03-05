<script lang="ts">
  import { useParams } from 'svelte-navigator';
  import type { Collection } from 'private-notes-api';
  import api, { callApi } from '@/api';

  const params = useParams();
  const promise = callApi<Collection>(api.getCollection, $params.collectionId);
</script>

<div>
  {#await promise}
    <p>Loading...</p>
  {:then collection}
    <h2 class="text-xl font-bold border-b-2 border-slate-100 mb-4">
      {collection.name}
    </h2>

    <ul>
      {#each collection.notes as note (note.noteId)}
        <li>{note.title}</li>
      {/each}
    </ul>
  {:catch}
    <p>Fetching collection details failed...</p>
  {/await}
</div>
