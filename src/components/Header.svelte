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

<style>
	header {
		@apply bg-neutral-950 p-5 w-full flex items-center justify-center;
	}

	nav ul {
		@apply list-none m-0 p-0 flex gap-8;
	}

	nav ul li a {
		@apply text-white no-underline font-bold;
	}

	nav ul li a:hover {
		@apply text-yellow-500 underline;
	}
</style>
