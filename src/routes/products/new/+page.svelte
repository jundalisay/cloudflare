<script>
  export let data;  

// function navigateToUser(userId) {
//     goto(`/users/${userId}`);
//   }
// <button on:click={() => navigateToUser(user.id)}>View Profile of {user.name}</button>

</script>


<form method="POST" class="max-w-xl mx-auto p-6 my-6 space-y-4 bg-white rounded-xl shadow">
  <h1 class="text-2xl font-bold text-gray-800">New Product</h1>

  <div>
    <label class="block text-sm font-medium text-gray-700">Name</label>
    <input name="name" required maxlength="50" class="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700">Description</label>
    <textarea name="description" required rows="3" maxlength="3000" class="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700">Points</label>
    <input type="number" name="points" required min="0" class="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700">Photo (URL)</label>
    <input name="photo" maxlength="80" class="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700">Measure (e.g. kg, pcs)</label>
    <input name="measure" maxlength="30" class="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
  </div>

  <select
    id="category"
    name="category"
    class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
  >
      <option value="1">Food</option>
      <option value="2">Clothes</option>
      <option value="3">Toys</option>
  </select>

  <!-- Hidden user info -->
  <input type="hidden" name="user_id" value={data.user.id} />
  <input type="hidden" name="avatar" value={data.user.avatar} />
  <input type="hidden" name="username" value={data.user.username} />

  <button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
    Create Product
  </button>
</form>
