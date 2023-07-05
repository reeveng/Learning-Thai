<script lang="ts">
	import { translations } from '$data/translations';
	import { clarifications, type ExtendedClarificationType } from '$data/clarifications';

	import { titlize } from '$utils/titlize';
	import { addOccurancesToClarification } from './helper';
	import { humanReadableIndex } from '$utils/humanReadableIndex';
	import { URLS } from '$constants/urls';

	const extendedClarifications: ExtendedClarificationType[] = addOccurancesToClarification(
		clarifications,
		translations
	);
</script>

<!-- Start of file -->

<h1>Learning Thai</h1>

<p class="w-full text-left">
	It's my intention to every day learn some Thai words. I'll write them down, try to form sentences
	with them that make sense to a native Thai speaker, maybe eventually I'll understand the writing
	system too, when I compare the written words and their pronounciations 👍.
</p>

<section class="w-full text-left text-xs">
	<p>
		Do you want an interactive way to learn the words in the table below?
		<a href={URLS.FLASH_CARDS}>
			<button>Check out the flash cards!</button>
		</a>
	</p>

	<p>
		Do you want to learn the individual Thai letters?
		<a href={URLS.ALPHABET}>
			<button>Check out the full alphabet!</button>
		</a>
	</p>
</section>

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

<!-- End of file -->
