<script lang="ts">
  import api, { callApi } from '@/api';
  import type { Collection } from 'private-notes-api';
  import CollectionList from '../components/CollectionsList/CollectionList.svelte';

  const collectionsPromise = callApi<Collection[]>(api.getCollections);
</script>

<h2 class="border-b-2 border-slate-100 mb-4">Collections</h2>

{#await collectionsPromise}
  <p>Loading...</p>
{:then collections}
  <CollectionList {collections} />
{:catch}
  <p>Failed to load collections :(</p>
{/await}
