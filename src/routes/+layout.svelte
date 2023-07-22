<script>
	import '../app.css';
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style lang="postcss">
	:global(html),
	:global(body) {
		@apply bg-neutral-900 min-w-full min-h-full m-0 p-0 text-neutral-200;
		font-family: 'JetBrains Mono', monospace, system-ui, -apple-system, BlinkMacSystemFont,
			'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	:global(main) {
		@apply min-h-full  flex items-center justify-center flex-col gap-10 pb-10;
	}

	:global(main > *) {
		max-width: 67%;
	}

	/* ----------------------------------
		Headings
	   ---------------------------------- */
	:global(h1) {
		@apply font-bold text-xl md:text-5xl mt-20;
		font-family: 'Press Start 2P', 'JetBrains Mono', monospace, system-ui, -apple-system,
			BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
	}

	:global(h2) {
		@apply font-bold text-lg md:text-3xl mt-20;
		font-family: 'Press Start 2P', 'JetBrains Mono', monospace, system-ui, -apple-system,
			BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
	}
	/* ----------------------------------
		Headings end
	   ---------------------------------- */

	/* ----------------------------------
		Buttons
	   ---------------------------------- */
	:global(button) {
		@apply bg-neutral-800 border-4 border-yellow-500 text-yellow-500 hover:bg-neutral-600 rounded-full py-2 px-4 text-center my-2;
		min-width: 150px;
	}

	/* ----------------------------------
		Buttons end
	   ---------------------------------- */

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
