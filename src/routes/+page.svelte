<script lang="ts">
	import PersonalCard from '$lib/PersonalCard.svelte';
	import { GlobalPool } from '$lib/PersonalData';
</script>

<h1 class="font-black text-4xl text-center text-blue-700 p-2">Esonhugh Blog FriendLink</h1>
<p class="text-blue-500 text-center">
	This is Esonhugh Blog Friendlink, Visit this
	<a class="text-blue-100" href="https://github.com/Esonhugh/friends">Github repo</a>
	to Add your Friend link with PR.
	<br />
	Main Blog: <a class="text-blue-100" href="https://eson.ninja"> eson.ninja </a>
</p>
<div class="p-3">
	<div class="flex-1 gap-3 grid md:grid-cols-3">
		{#each GlobalPool as pd}
			<PersonalCard {pd} />
		{/each}
	</div>
</div>

<footer>
	<p class="text-center p-2">Esonhugh - 2022</p>
</footer>
