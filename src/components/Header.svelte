<script>
	import { titlize } from '$utils/titlize';
	const headerItems = [
		{ name: 'Home', url: '/' },
		{ name: 'Flash Cards', url: '/flash-cards' }
	];
</script>

<header>
	<nav>
		<ul>
			{#each headerItems as { url, name }}
				<li>
					<a href={url}>{titlize(name)}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style lang="postcss">
	header {
		@apply bg-neutral-950 m-0 py-5 w-full flex items-center justify-center;
	}

	nav ul {
		@apply list-none m-0 p-0 flex gap-8;
	}

	nav ul li a {
		@apply text-white no-underline font-bold hover:text-yellow-500 hover:underline;
	}
</style>
