<script setup>
defineProps({
	title: {
		type: String,
		required: true,
	},
})
</script>

<template>
	<div>
		<p>{{ title }}</p>
		<ul class="space-y-2">
			<slot />
		</ul>
	</div>
</template>
