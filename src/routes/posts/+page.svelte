<script>
  import { enhance } from '$app/forms';
  const { data } = $props(); 
  
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }
</script>


<svelte:head>
  <title>Welcome to Pantrypoints!</title>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>



<div class="container mx-auto p-4 max-w-2xl">
  <!-- Post Form -->
  <div class="bg-white shadow-md p-6 rounded-lg mb-6 border border-gray-200">
    <h2 class="text-xl font-semibold mb-4">Create a Post</h2>
    <form method="POST" action="?/createPost" use:enhance>
      <textarea
        name="content"
        rows="4"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="What's on your mind?"
        required
      ></textarea>
      <div class="flex justify-end mt-3">
        <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Post
        </button>
      </div>
    </form>
  </div>

  <!-- Posts List -->
  <h1 class="text-2xl font-bold mb-4">Latest Posts</h1>
  {#each data.items as post}
    <div class="flex items-start bg-white shadow-md p-4 rounded-lg mb-4 border border-gray-200">
      <div class="flex-1">
        <!-- User Info & Date -->
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold text-gray-800">{post.username || 'Anonymous'}</span>
          <span class="text-sm text-gray-500">{formatTimestamp(post.date_created)}</span>
        </div>
        <!-- Post Content -->
        <p class="text-gray-700">{post.content}</p>
      </div>
    </div>
  {/each}
</div>
