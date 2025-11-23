<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import LoginForm from '$lib/components/Auth/LoginForm.svelte';
  import { authStore } from '$lib/stores/authStore';
  import { goto } from '$app/navigation';
  
  function handleLoginSuccess(event) {
    const user = event.detail;
    authStore.login(user);
    goto('/');
  }
</script>


<div class="max-w-md mx-auto">

  <div class="flex justify-center py-8">
    <img src="/pp.png" alt="Logo" class="h-16 w-auto">
  </div>
  
  <!-- Form Container -->
  <div class="bg-white p-8 rounded-lg shadow">
    <LoginForm on:success={handleLoginSuccess} />
  </div>
</div>



