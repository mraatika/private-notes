<script>
  import { useParams } from 'svelte-navigator';
  const params = useParams();
</script>

<div>Note: {$params.noteId}</div>
