<script lang="ts">
	import { translations, type TranslationType } from '$data/translations';
	import { titlize } from '$utils/titlize';
	import { onMount } from 'svelte';
	import { HISTORY, MAX_HISTORY } from '$constants/localStorage';

	type DisplayOption = keyof TranslationType;

	const ABSOLUTE_MIN_AMOUNT_OF_HISTORY = 6;
	const OPTIONS: DisplayOption[] = ['english', 'pronounciation', 'thai'];

	let displayOption = OPTIONS[0];
	let showAnswer = false;
	let showSettings = false;
	let currentIndex = -1;
	let history: number[] = [];

	let maxHistoryLength = ABSOLUTE_MIN_AMOUNT_OF_HISTORY;

	function nextTranslation() {
		resetShowAnswer();

		updateCurrentIndex();
	}

	function resetHistory() {
		history = [];
		localStorage.removeItem(HISTORY);
		history = [...history]; // Reassign history to trigger UI update

		nextTranslation();
	}

	function updateMaxHistory() {
		localStorage.setItem(MAX_HISTORY, maxHistoryLength.toString());
		resetHistory();
	}

	onMount(() => {
		// Load value from localStorage on component mount
		const storedMaxHistory = localStorage.getItem(MAX_HISTORY);
		if (storedMaxHistory) {
			maxHistoryLength = parseInt(storedMaxHistory);
		}

		// Load history from local storage
		const storedHistory = localStorage.getItem(HISTORY);
		if (storedHistory) {
			history = JSON.parse(storedHistory);
		}

		updateCurrentIndex(); // Initialize currentIndex with a random index
	});

	function resetShowAnswer() {
		showAnswer = false;
	}

	function getRandomIndex() {
		return Math.floor(Math.random() * translations.length);
	}

	function updateCurrentIndex() {
		let newIndex = getRandomIndex();
		while (history.includes(newIndex) && history.length != translations.length) {
			newIndex = getRandomIndex();
		}
		currentIndex = newIndex;

		// Update history
		if (history.length >= maxHistoryLength) {
			history.pop();
		}
		history.unshift(currentIndex);
		localStorage.setItem(HISTORY, JSON.stringify(history));
		history = [...history]; // Reassign history to trigger UI update
	}

	function previousTranslation() {
		resetShowAnswer();

		const previousIndex = history[1]; // Get the second item from history since the first is the current translation
		if (previousIndex !== undefined) {
			history.shift(); // Remove the item at index 1
			const previousIndex = history[0]; // Get the new second item from history
			currentIndex = previousIndex;

			history = [...history];
		}
	}

	function toggleAnswer() {
		showAnswer = !showAnswer;
	}
	function toggleSettings() {
		showSettings = !showSettings;
	}
</script>

<!-- Start of file -->

<h1>Flash cards</h1>

<div class="settings-container">
	<button on:click={toggleSettings}>{showSettings ? 'Hide' : 'Show'} settings</button>

	{#if showSettings}
		<div class="card settings">
			<div class="settings-item">
				<label for="displayOption" class="text-sm font-bold text-neutral-400">
					What do you want to practice?
				</label>
				<select id="displayOption" bind:value={displayOption} class="">
					{#each OPTIONS as option}
						<option value={option}>{titlize(option)}</option>
					{/each}
				</select>
			</div>

			<div class="settings-item">
				<label for="displayOption" class="text-sm font-bold text-neutral-400">
					The word needs to be encountered {maxHistoryLength} times before it can be shown again.
					<br />
					How often would you want a word to return {`(min: ${ABSOLUTE_MIN_AMOUNT_OF_HISTORY}, max: ${
						translations.length - ABSOLUTE_MIN_AMOUNT_OF_HISTORY
					})`}?
				</label>
				<input
					bind:value={maxHistoryLength}
					min={ABSOLUTE_MIN_AMOUNT_OF_HISTORY}
					max={translations.length - ABSOLUTE_MIN_AMOUNT_OF_HISTORY}
					type="number"
					class="bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-neutral-400 px-4 py-2 rounded-md"
					pattern="[0-9]+"
					on:change={updateMaxHistory}
				/>
			</div>

			<div class="settings-item">
				<label for="resetHistory" class="text-sm font-bold text-neutral-400">
					Would you like to reset your history?
				</label>
				<button id="resetHistory" on:click={resetHistory}>Reset</button>
			</div>
		</div>
	{/if}
</div>

{#if currentIndex !== -1}
	<div class="card">
		<p>{translations[currentIndex][displayOption]}</p>

		{#if showAnswer}
			<h3 class="font-bold text-lg mt-5">Answer</h3>
			<ul class="list-inside list-disc">
				{#each OPTIONS as itemToShow}
					{#if itemToShow !== displayOption}
						<li>{translations[currentIndex][itemToShow]}</li>
					{/if}
				{/each}
			</ul>
		{/if}
	</div>
	<div class="button-toolbar">
		<button on:click={previousTranslation} disabled={history.length < 2}>Previous</button>
		<button on:click={toggleAnswer}>{showAnswer ? 'Hide' : 'Show'}</button>
		<button on:click={nextTranslation}>Next</button>
	</div>
{:else}
	<p>Loading...</p>
{/if}

<div class="w-full flex gap-10 flex-col">
	<h2 class="text-center">History</h2>
	{#if history.length <= 1}
		<p>No history yet.</p>
	{:else}
		<table class="p-0 m-0">
			<tr>
				{#each OPTIONS.filter((i) => i != displayOption) as option}
					<th class="px-6 py-4">{titlize(option)}</th>
				{/each}
			</tr>
			{#each history.slice(1) as item (item)}
				<tr>
					{#each OPTIONS.filter((i) => i != displayOption) as option}
						<td class="px-6 py-4">{translations[item][option]}</td>
					{/each}
				</tr>
			{/each}
		</table>
	{/if}
</div>

<!-- End of file -->

<style lang="postcss">
	.settings-item {
		@apply flex gap-4 flex-col w-full justify-center;
	}

	.button-toolbar {
		@apply flex gap-8;
	}

	.settings {
		@apply w-full gap-10 flex;
		min-height: auto;
	}

	.settings-container {
		@apply flex items-center justify-center flex-col gap-10;
	}

	.card {
		@apply bg-neutral-800 rounded-2xl w-full flex flex-col items-center p-4 outline outline-2 outline-neutral-600;
		min-height: 15rem;
	}

	select {
		@apply appearance-none bg-neutral-800 border-4 border-yellow-500 text-yellow-500 rounded p-2 text-center hover:bg-neutral-600;
	}

	option {
		@apply text-neutral-800 select-none cursor-default hover:bg-neutral-600;
	}
</style>
