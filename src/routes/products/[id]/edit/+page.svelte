<script>
	export let data;
	const product = data.product;
</script>

<form method="POST" class="max-w-xl mx-auto p-6 space-y-4 bg-white rounded-xl shadow">
	<h1 class="text-2xl font-bold text-gray-800">Edit Product</h1>

	<div>
		<label class="block text-sm font-medium text-gray-700">Name</label>
		<input name="name" required value={product.name} class="mt-1 w-full rounded-lg border-gray-300 shadow-sm" />
	</div>

	<div>
		<label class="block text-sm font-medium text-gray-700">Description</label>
		<textarea name="description" rows="3" required class="mt-1 w-full rounded-lg border-gray-300 shadow-sm">
			{product.description}
		</textarea>
	</div>

	<div>
		<label class="block text-sm font-medium text-gray-700">Points</label>
		<input type="number" name="points" value={product.points} required min="0" class="mt-1 w-full rounded-lg border-gray-300 shadow-sm" />
	</div>

	<div>
		<label class="block text-sm font-medium text-gray-700">Photo (URL)</label>
		<input name="photo" value={product.photo} class="mt-1 w-full rounded-lg border-gray-300 shadow-sm" />
	</div>

	<div>
		<label class="block text-sm font-medium text-gray-700">Measure</label>
		<input name="measure" value={product.measure} class="mt-1 w-full rounded-lg border-gray-300 shadow-sm" />
	</div>

	<label for="cats">Categories</label>
	<select
	  id="category"
	  name="category"
	  bind:value={product.category}
	  class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
	>
    	<option value="1">Food</option>
    	<option value="2">Clothes</option>
    	<option value="3">Toys</option>
	</select>

	<button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
		Update Product
	</button>
</form>
