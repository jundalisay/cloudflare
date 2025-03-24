<!-- src/lib/components/UI/Input.svelte -->
<script lang="ts">
  export let type: 'text' | 'password' | 'email' = 'text';
  export let name = '';
  export let label = '';
  export let value = '';
  export let placeholder = '';
  export let required = false;
  export let error = '';
  
  $: errorMessage = error;
</script>

<div class="mb-4">
  {#if label}
    <label for={name} class="block text-sm font-medium text-gray-700 mb-1">{label}</label>
  {/if}
  <input
    {type}
    {name}
    {placeholder}
    {required}
    id={name}
    bind:value
    class="w-full px-3 py-2 border {error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  />
  {#if errorMessage}
    <p class="mt-1 text-sm text-red-600">{errorMessage}</p>
  {/if}
</div>

