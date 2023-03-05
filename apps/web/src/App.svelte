<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import '@/app.css';
  import Layout from '@/components/Layout.svelte';
  import SideBar from '@/components/SideBar.svelte';
  import CollectionPage from '@/pages/CollectionPage.svelte';
  import NotePage from './pages/NotePage.svelte';
  import MainPage from './pages/MainPage.svelte';
</script>

<Router>
  <Layout>
    <SideBar slot="aside" />

    <div slot="main">
      <Route path="/"><MainPage /></Route>

      <Route path="/collection/*">
        <Route path="/:collectionId/note/:noteId">
          <NotePage />
        </Route>

        <Route path="/:collectionId">
          <CollectionPage />
        </Route>
      </Route>
    </div>
  </Layout>
</Router>
