<script>
	import { titlize } from '$utils/titlize';

	const urlSocials = 'https://reeveng.github.io/socials/';
	const urlRepo = 'https://github.com/reeveng/Learning-Thai';

	import github from '$assets/github-mark-white.svg';
</script>

<footer>
	<section>
		<ul>
			<li>
				<a href={urlSocials}>{titlize('Made by JMAD')}</a>
			</li>
			<li>
				<a href={urlRepo}>
					<img class="h-6 w-6" src={github} alt="link to the github project" />
				</a>
			</li>
		</ul>
	</section>
</footer>

<style lang="postcss">
	footer {
		@apply bg-neutral-950 m-0 py-5 w-full flex items-center justify-center;
	}

	section ul {
		@apply list-none m-0 p-0 flex gap-8;
	}

	section ul li a {
		@apply text-white no-underline font-bold hover:text-yellow-500 hover:underline;
	}
</style>
