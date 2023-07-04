<script lang="ts">
	import { translations, type TranslationType } from '$data/translations';
	import { titlize } from '$utils/titlize';
	import { onMount } from 'svelte';
	import { HISTORY, MAX_HISTORY } from '$constants/localStorage';
	import Header from '$components/Header.svelte';

	type DisplayOption = keyof TranslationType;

	const ABSOLUTE_MIN_AMOUNT_OF_HISTORY = 6;
	const OPTIONS: DisplayOption[] = ['english', 'pronounciation', 'thai'];

	let displayOption = OPTIONS[0];
	let showAnswer = false;
	let showSettings = false;
	let currentIndex = -1;
	let history: number[] = [];

	let maxHistoryLength = ABSOLUTE_MIN_AMOUNT_OF_HISTORY;

	function resetHistory() {
		history = [];
		localStorage.removeItem(HISTORY);
		history = [...history]; // Reassign history to trigger UI update

		resetShowAnswer();
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

	function nextTranslation() {
		resetShowAnswer();

		updateCurrentIndex();
	}

	function previousTranslation() {
		resetShowAnswer();

		const previousIndex = history[1]; // Get the second item from history since the first is the current translation
		if (previousIndex !== undefined) {
			currentIndex = previousIndex;
		}
	}

	function toggleAnswer() {
		showAnswer = !showAnswer;
	}
	function toggleSettings() {
		showSettings = !showSettings;
	}
</script>

<main>
	<Header />

	<h1>Translation Display</h1>

	<div class="settings-container">
		<button on:click={toggleSettings}>{showSettings ? 'Hide' : 'Show'} settings</button>

		{#if showSettings}
			<div class="card settings">
				<div class="settings-item">
					<label for="displayOption" class="text-sm font-bold text-neutral-700">
						What do you want to practice?
					</label>
					<select id="displayOption" bind:value={displayOption} class="">
						{#each OPTIONS as option}
							<option value={option}>{titlize(option)}</option>
						{/each}
					</select>
				</div>

				<div class="settings-item">
					<label for="displayOption" class="text-sm font-bold text-neutral-700">
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
					<label for="resetHistory" class="text-sm font-bold text-neutral-700">
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

	<div>
		<h2 class="text-center">History</h2>
		{#if history.length === 0}
			<p>No history yet.</p>
		{:else}
			<ul class="p-0 m-0">
				{#each history.slice(1) as item (item)}
					<li>{translations[item].thai} - {translations[item].english}</li>
				{/each}
			</ul>
		{/if}
	</div>
</main>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

	main {
		@apply flex items-center justify-center flex-col gap-10 pb-10;
	}

	main > * {
		max-width: 67%;
	}

	* {
		@apply text-neutral-200;
	}

	h1 {
		@apply font-bold text-xl md:text-5xl;
		font-family: 'Press Start 2P', 'JetBrains Mono', monospace, system-ui, -apple-system,
			BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
	}

	h2 {
		@apply font-bold text-lg md:text-3xl;
	}

	h1,
	h2 {
		@apply mt-20;
	}

	.settings-item {
		@apply flex gap-4 flex-col w-full justify-center;
	}

	button {
		@apply bg-neutral-800 border-4 border-yellow-500 text-yellow-500 hover:bg-neutral-600 rounded-full p-2 text-center;
		min-width: 150px;
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
