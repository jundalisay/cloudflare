<!-- src/lib/components/Auth/LoginForm.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '../UI/Button.svelte';
  import Input from '../UI/Input.svelte';
  
  const dispatch = createEventDispatcher();
  
  let username = '';
  let password = '';
  let errors = { username: '', password: '', form: '' };
  let loading = false;
  

  async function handleSubmit() {
    // Reset errors
    errors = { username: '', password: '', form: '' };
    
    // Basic validation
    if (!username) errors.username = 'Username is required';
    if (!password) errors.password = 'Password is required';
    if (errors.username || errors.password) return;
    
    loading = true;
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const result = await response.json();
      
      if (!result.success) {
        errors.form = result.error || 'Login failed';
        return;
      }
      
      // Login successful
      dispatch('success', result.user);
    } catch (error) {
      console.error('Login error:', error);
      errors.form = 'An unexpected error occurred';
    } finally {
      loading = false;
    }
  }
</script>


<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <h2 class="text-2xl font-bold text-center">Login</h2>
  
  {#if errors.form}
    <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
      {errors.form}
    </div>
  {/if}
  
  <Input 
    type="text"
    name="username"
    label="Username"
    bind:value={username}
    error={errors.username}
    required
  />
  
  <Input 
    type="password"
    name="password"
    label="Password"
    bind:value={password}
    error={errors.password}
    required
  />
  
  <div>
    <Button type="submit" disabled={loading} class="w-full text-white px-4 py-2 rounded-lg">
      {loading ? 'Logging in...' : 'Login'}
    </Button>
  </div>
  
  <div class="text-center mt-4">
    <p>Don't have an account? <a href="/register" class="text-blue-600 hover:underline">Register</a></p>
  </div>
</form>
