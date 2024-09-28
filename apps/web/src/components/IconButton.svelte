<script lang="ts">
  export let label: string;
</script>

<button type="button" aria-label={label} on:click {...$$restProps}>
  <slot />
</button>
