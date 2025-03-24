<!-- src/lib/components/UI/Button.svelte -->
<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
  export let disabled = false;

  const baseClasses = 'px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  $: variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  }[variant];
  
  $: disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
</script>

<button 
  {type} 
  {disabled} 
  class="{baseClasses} {variantClasses} {disabledClasses}"
  on:click
>
  <slot />
</button>

