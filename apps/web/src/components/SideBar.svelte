<script lang="ts">
  import api, { callApi } from '@/api';
  import type { Collection } from 'private-notes-api';
  import PlusCircle from '~icons/lucide/plus-circle';
  import CollectionList from '../components/CollectionsList/CollectionList.svelte';
  import IconButton from './IconButton.svelte';

  const collectionsPromise = callApi<Collection[]>(api.getCollections);
</script>

<h2 class="border-b-2 border-slate-100 mb-4">Collections</h2>

<IconButton label="Add collection" on:click={console.log}>
  <PlusCircle />
</IconButton>

{#await collectionsPromise}
  <p>Loading...</p>
{:then collections}
  <CollectionList {collections} />
{:catch}
  <p>Failed to load collections :(</p>
{/await}
