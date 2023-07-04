<script lang="ts">
	import { translations } from '$data/translations';
	import { clarifications, type ExtendedClarificationType } from '$data/clarifications';
	import '../app.css';
	import { titlize } from '$utils/titlize';
	import { addOccurancesToClarification } from './helper';
	import { humanReadableIndex } from '$utils/humanReadableIndex';
	import Header from '$components/Header.svelte';

	const extendedClarifications: ExtendedClarificationType[] = addOccurancesToClarification(
		clarifications,
		translations
	);
</script>

<main>
	<Header />

	<h1>Learning Thai</h1>

	<p>
		It's my intention to every day learn some Thai words. I'll write them down, try to form
		sentences with them that make sense to a native Thai speaker, maybe eventually I'll understand
		the writing system too, when I compare the written words and their pronounciations 👍.
	</p>

	<table>
		<thead>
			<tr>
				<th aria-hidden="true" />
				{#each Object.keys(translations[0]) as key}
					<th scope="col" class="px-6 py-4">{titlize(key)}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each translations as translation, index}
				<tr>
					<td aria-hidden="true" class="text-center px-6 py-4 font-bold bg-neutral-600">
						{humanReadableIndex(index)}
					</td>
					{#each Object.values(translation) as value}
						<td class="px-6 py-4">{value}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<h2>Clarifications</h2>

	<p>
		Explaining certain sentences a bit more, since languages can be confusing and not everything is
		directly translatable.
	</p>

	<table>
		<thead>
			<tr>
				{#each Object.keys(extendedClarifications[0]) as key}
					<th class="px-6 py-4">{titlize(key)}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each extendedClarifications as clarification}
				<tr>
					{#each Object.values(clarification) as value}
						<td class="px-6 py-4">{value}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</main>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

	main {
		@apply flex items-center justify-center flex-col gap-10;
	}

	main > * {
		max-width: 67%;
	}

	table {
		@apply table-auto rounded-lg overflow-hidden shadow-md mb-10;
	}

	* {
		@apply text-neutral-200;
	}

	tr {
		@apply border-neutral-600 border-b-4;
	}

	tr:last-of-type {
		@apply border-none;
	}

	th {
		@apply font-bold text-xl bg-neutral-600;
	}

	h1 {
		@apply font-bold text-xl md:text-5xl;
		font-family: 'Press Start 2P', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	h2 {
		@apply font-bold text-lg md:text-3xl;
	}

	h1,
	h2 {
		@apply mt-20;
	}

	tr:nth-child(even) {
		@apply bg-black;
	}

	:global(html) {
		@apply bg-neutral-900 w-full h-full m-0 p-0;
	}
</style>
