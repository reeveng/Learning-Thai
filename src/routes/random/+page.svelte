<script lang="ts">
	import { translations, type TranslationType } from '$data/translations';
	import { titlize } from '$utils/titlize';
	import { onMount } from 'svelte';

	type DisplayOption = keyof TranslationType;

	const OPTIONS: DisplayOption[] = ['pronounciation', 'english', 'thai'];

	let displayOption = OPTIONS[0];
	let showAnswer = false;
	let currentIndex = -1;
	let history: number[] = [];

	const maxHistoryLength = 5 + 1;

	onMount(() => {
		// Load history from local storage
		const storedHistory = localStorage.getItem('history');
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
		localStorage.setItem('history', JSON.stringify(history));
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
		localStorage.removeItem('history');
		history = [...history]; // Reassign history to trigger UI update

		resetShowAnswer();
	}

	function toggle() {
		showAnswer = !showAnswer;
	}
</script>

<main>
	<h1>Translation Display</h1>
	<div>
		<h2>Display Option</h2>
		<select bind:value={displayOption}>
			{#each OPTIONS as option}
				<option value={option}>{titlize(option)}</option>
			{/each}
		</select>
	</div>

	{#if currentIndex !== -1}
		<div class="translation-container">
			<p>{translations[currentIndex][displayOption]}</p>

			{#if showAnswer}
				<ul>
					{#each OPTIONS as itemToShow}
						{#if itemToShow !== displayOption}
							<li>{translations[currentIndex][itemToShow]}</li>
						{/if}
					{/each}
				</ul>
			{/if}
		</div>
		<div class="flex gap-2">
			<button on:click={previousTranslation} disabled={history.length < 2}>Previous</button>
			<button on:click={toggle}>Show</button>
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
	* {
		@apply text-neutral-200;
	}

	:global(html) {
		@apply bg-neutral-900;
	}
</style>
