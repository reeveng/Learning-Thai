<script lang="ts">
	import translations from '../data/translations.json';
</script>

<h1>Learning Thai</h1>

<p>
	It's my intention to every day learn some Thai words. I'll write them down, try to form sentences
	with them that make sense to a native Thai speaker, maybe eventually I'll understand the writing
	system too, when I compare the written words and their pronounciations 👍.
</p>

<main>
	<table>
		<thead>
			<tr>
				<th>nr.</th>
				{#each Object.keys(translations[0]) as key}
					<th>{key}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each translations as translation, index}
				<tr>
					<td>{index + 1}</td>
					{#each Object.values(translation) as value}
						<td>{value}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</main>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 8px;
		border: 1px solid #ccc;
	}

	th {
		background-color: #f0f0f0;
		font-weight: bold;
	}

	tr:nth-child(even) {
		background-color: #f9f9f9;
	}
</style>
