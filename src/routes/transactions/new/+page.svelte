<script>
  import { page } from '$app/stores';

  let name; 
  let itemId;
  let points;
  let measure;

  console.log('Item ID page:', itemId);
  console.log('Name page:', name);
  // console.log('User ID (server):', userId);
  console.log('Points page:', points);
  console.log('Measure page:', measure);
  // $: name = $page.url.searchParams.get('name');
  // $: userId = $page.url.searchParams.get('userId');
  // $: points = $page.url.searchParams.get('points');
  // $: measure = $page.url.searchParams.get('measure');
</script>



<h1 class="text-2xl font-bold text-gray-800 mx-auto max-w-xl py-6">New Transaction</h1>


<form on:submit|preventDefault={submitForm} class="max-w-xl mx-auto p-6 space-y-4 bg-white rounded-xl shadow">

  <div>
    <label for="name">Product Name</label>
    <input id="name" type="text" bind:value={name} class="w-full border p-2 rounded" />
  </div>

  <div>
    <label for="itemId">Item ID</label>
    <input id="itemId" type="text" bind:value={itemId} class="w-full border p-2 rounded" />
  </div>

  <div>
    <label for="points">Points</label>
    <input id="points" type="number" bind:value={points} class="w-full border p-2 rounded" />
  </div>

  <div>
    <label for="measure">Measure</label>
    <input id="measure" type="text" bind:value={measure} class="w-full border p-2 rounded" />
  </div>

  <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
    Submit Transaction
  </button>
</form>


<!-- 
<script>
  export let data;  

// function navigateToUser(userId) {
//     goto(`/users/${userId}`);
//   }
// <button on:click={() => navigateToUser(user.id)}>View Profile of {user.name}</button>

</script>


 -->