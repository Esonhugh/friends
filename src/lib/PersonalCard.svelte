<script lang="ts">
	import type { PersonalData } from '$lib/PersonalData';
	export let pd: PersonalData;
	import { Avatar } from '@skeletonlabs/skeleton';

	function JumpTo(url: string) {
		window.open(url, '_blank');
	}
</script>

<figure
	class="flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800"
	on:click={() => JumpTo(pd.url)}
>
	<div class="p-4">
		<Avatar
			alt={pd.alias}
			background="bg-surface-500 self-center"
			hover={false}
			initials={pd.alias}
			outlined={true}
			size="xl"
			src={pd.avatar}
		/>
	</div>
	<div class="pt-6 text-center md:text-left space-y-4">
		<blockquote>
			<p class="text-lg font-medium p-2">
				"{pd.remark}"
			</p>
		</blockquote>
		<div class="text-sky-500 dark:text-sky-400 text-center p-1">
			—— {pd.alias}
		</div>
	</div>
</figure>
