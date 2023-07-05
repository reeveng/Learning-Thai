<!-- eventually create a mobile friendly table :) -->

<script lang="ts">
	export let data: any[] = [];
</script>

<table class="table">
	<thead>
		<tr>
			{#each Object.keys(data[0]) as key}
				<th class="text-left">{key}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as item}
			<tr>
				{#each Object.values(item) as value}
					<td>{value}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="postcss">
	/* ----------------------------------
		Table
	   ---------------------------------- */
	:global(table) {
		@apply table-auto rounded-lg overflow-hidden mb-10 border-neutral-600;
	}

	:global(tr) {
		@apply border-neutral-600 border-b-4;
	}

	:global(tr:last-of-type) {
		@apply border-none;
	}

	:global(th) {
		@apply font-bold text-xl bg-neutral-600;
	}

	:global(tr:nth-child(even)) {
		@apply bg-black;
	}
	/* ----------------------------------
		Table end
	   ---------------------------------- */
</style>
