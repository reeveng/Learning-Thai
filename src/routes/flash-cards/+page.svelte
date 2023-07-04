<script lang="ts">
	import { translations, type TranslationType } from '$data/translations';
	import { titlize } from '$utils/titlize';
	import { onMount } from 'svelte';
	import { HISTORY } from '$constants/localStorage';
	import Header from '$components/Header.svelte';

	type DisplayOption = keyof TranslationType;

	const OPTIONS: DisplayOption[] = ['english', 'pronounciation', 'thai'];

	let displayOption = OPTIONS[0];
	let showAnswer = false;
	let showSettings = false;
	let currentIndex = -1;
	let history: number[] = [];

	const maxHistoryLength = 5 + 1;

	onMount(() => {
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
		while (history.includes(newIndex)) {
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

	function resetHistory() {
		history = [];
		localStorage.removeItem(HISTORY);
		history = [...history]; // Reassign history to trigger UI update

		resetShowAnswer();
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

	<div>
		<button on:click={toggleSettings}>{showSettings ? 'Hide' : 'Show'} settings</button>
		{#if showSettings}
			<div>
				<label for="displayOption" class="text-sm font-medium text-gray-700">Display Option</label>
				<select id="displayOption" bind:value={displayOption} class="">
					{#each OPTIONS as option}
						<option value={option}>{titlize(option)}</option>
					{/each}
				</select>
			</div>
		{/if}
	</div>

	{#if currentIndex !== -1}
		<div class="card">
			<p>{translations[currentIndex][displayOption]}</p>

			{#if showAnswer}
				<h3>Answer</h3>
				<ul>
					{#each OPTIONS as itemToShow}
						{#if itemToShow !== displayOption}
							<li>{translations[currentIndex][itemToShow]}</li>
						{/if}
					{/each}
				</ul>
			{/if}
		</div>
		<div class="flex gap-5">
			<button on:click={previousTranslation} disabled={history.length < 2}>Previous</button>
			<button on:click={toggleAnswer}>{showAnswer ? 'Hide' : 'Show'}</button>
			<button on:click={nextTranslation}>Next</button>
		</div>
	{:else}
		<p>Loading...</p>
	{/if}

	<div>
		<h2>History</h2>
		{#if history.length === 0}
			<p>No history yet.</p>
		{:else}
			<ul>
				{#each history.slice(1) as item (item)}
					<li>{translations[item].thai} - {translations[item].english}</li>
				{/each}
			</ul>
			<button on:click={resetHistory}>Reset History</button>
		{/if}
	</div>
</main>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

	main {
		@apply flex items-center justify-center flex-col gap-10;
	}

	main > * {
		max-width: 67%;
	}

	* {
		@apply text-neutral-200;
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

	button {
		@apply bg-neutral-800 border-4 border-yellow-500 text-yellow-500 hover:bg-neutral-600 hover:outline-2 outline-black rounded-full p-2;
	}

	.card {
		@apply bg-neutral-800 rounded w-full flex flex-col items-center p-4;
		min-height: 15rem;
	}

	.card ul {
		@apply p-0 m-0;
	}

	:global(html) {
		@apply bg-neutral-900 w-full h-full m-0 p-0;
	}
</style>
