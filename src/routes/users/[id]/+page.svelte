<script lang="ts">
  import { goto } from '$app/navigation';
  export let data;
  import { fade, slide } from 'svelte/transition';
  import { scale } from 'svelte/animate';

  function edit(id) {
    goto(`/products/${id}/edit`);
  }  


  let loading = true;
</script>


<div class="min-h-screen bg-gray-100 py-10 flex justify-center items-center">

    <div class="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
      <div class="relative h-48 bg-indigo-600">
        <img
          src={user.avatar}
          alt={user.name}
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full shadow-lg border-4 border-white object-cover"
        />
      </div>
      <div class="px-6 py-8">
        <div class="text-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p class="text-gray-500 text-sm">Enthusiastic Svelte 5 Developer</p>
        </div>
        <div class="mb-4" transition:slide={{ duration: 200, delay: 100 }}>
          <div class="flex items-center gap-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h8.25A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25M9 5.25h6"
              />
            </svg>
            {user.phone}
          </div>
        </div>
        <div class="mb-4" transition:slide={{ duration: 200, delay: 200 }}>
          <div class="flex items-center gap-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25z"
              />
            </svg>
            {user.email}
          </div>
        </div>
        <div transition:slide={{ duration: 200, delay: 300 }}>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">About Me</h3>
          <p class="text-gray-600 text-sm leading-relaxed">{user.description}</p>
        </div>
      </div>
    </div>
</div>