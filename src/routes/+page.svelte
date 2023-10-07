<script lang="ts">
	import { translations } from '$data/translations';
	import { clarifications, type ExtendedClarificationType } from '$data/clarifications';

	import { titlize } from '$utils/titlize';
	import { addOccurrencesToClarification } from './helper';
	import { humanReadableIndex } from '$utils/humanReadableIndex';
	import { URLS } from '$constants/urls';

	const extendedClarifications: ExtendedClarificationType[] = addOccurrencesToClarification(
		clarifications,
		translations
	);
</script>

<!-- Start of file -->

<svelte:head>
	<title>Words and sentences | Learning Thai</title>
</svelte:head>

<h1>Learning Thai</h1>

<p class="w-full text-left">
	It's my intention to every day learn some Thai words. I'll write them down, try to form sentences
	with them that make sense to a native Thai speaker, maybe eventually I'll understand the writing
	system too, when I compare the written words and their pronounciations 👍.
</p>

<section class="w-full text-left text-xs flex flex-col gap-10">
	<p>
		Do you want an interactive way to learn the words in the table below?
		<a class="button" href={URLS.FLASH_CARDS}> Check out the flash cards! </a>
	</p>

	<p>
		Do you want to learn the individual Thai letters?
		<a class="button" href={URLS.ALPHABET}> Check out the full alphabet! </a>
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
				<td aria-hidden="true" class="text-center px-6 py-4 font-bold bg-neutral-800">
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
			<th aria-hidden="true" />
			{#each Object.keys(extendedClarifications[0]) as key}
				<th class="px-6 py-4">{titlize(key)}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each extendedClarifications as clarification, index}
			<tr>
				<td aria-hidden="true" class="text-center px-6 py-4 font-bold bg-neutral-800">
					{humanReadableIndex(index)}
				</td>
				{#each Object.values(clarification) as value}
					<td class="px-6 py-4">{value}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<!-- End of file -->
