<script setup lang="ts">
import Button from '../ui/Button.vue';

</script>

<template>
	<div class="my-28 m-auto text-center flex flex-col items-center">
		<div class="px-3 py-1.5 flex gap-1 rounded-full bg-zinc-900 border border-dashed border-zinc-700 w-fit text-xs font-medium">
			<p class="text-white">v1 just launched.</p>
			<span class="text-zinc-400">See more →</span>
		</div>
		<h1 class="text-[64px] leading-18 text-white font-heading text-balance w-[580px] pt-4">
			Elevate your <span class="text-orange-500">body</span>, unlock your <span class="text-orange-500">potential</span>.
		</h1>
		<p class="text-zinc-400 font-medium pt-5 w-[358px] text-balance">Monitor your workouts, set goals, and track your results. All in one place.</p>
		<div class="flex gap-2 justify-center pt-6">
			<Button variant="secondary">Log In</Button>
			<Button>Get Started</Button>
		</div>
	</div>
</template>