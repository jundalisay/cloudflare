<!-- src/lib/components/Auth/RegisterForm.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from '../UI/Button.svelte';
  import Input from '../UI/Input.svelte';
  
  const dispatch = createEventDispatcher();
  
  let username = '';
  let password = '';
  let confirmPassword = '';
  let errors = { username: '', password: '', confirmPassword: '', form: '' };
  let loading = false;
  
  async function handleSubmit() {
    // Reset errors
    errors = { username: '', password: '', confirmPassword: '', form: '' };
    
    // Basic validation
    if (!username) errors.username = 'Username is required';
    if (!password) errors.password = 'Password is required';
    if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (errors.username || errors.password || errors.confirmPassword) return;
    
    loading = true;
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const result = await response.json();
      
      if (!result.success) {
        errors.form = result.error || 'Registration failed';
        return;
      }
      
      // Registration successful
      dispatch('success');
    } catch (error) {
      console.error('Registration error:', error);
      errors.form = 'An unexpected error occurred';
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <h2 class="text-2xl font-bold text-center">Create an Account</h2>
  
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
  
  <Input 
    type="password"
    name="confirmPassword"
    label="Confirm Password"
    bind:value={confirmPassword}
    error={errors.confirmPassword}
    required
  />
  
  <div>
    <Button type="submit" disabled={loading}>
      {loading ? 'Registering...' : 'Register'}
    </Button>
  </div>
  
  <div class="text-center mt-4">
    <p>Already have an account? <a href="/login" class="text-blue-600 hover:underline">Login</a></p>
  </div>
</form>