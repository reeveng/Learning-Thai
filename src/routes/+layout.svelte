<script>
	import '../app.css';
</script>

<slot />

<style lang="postcss">
	:global(html),
	:global(body) {
		@apply bg-neutral-900 min-w-full min-h-full m-0 p-0;
		font-family: 'JetBrains Mono', monospace, system-ui, -apple-system, BlinkMacSystemFont,
			'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
