<script setup>
import NavigationLayout from '../shared/NavigationLayout.vue'
</script>

<template>
	<div class="h-screen bg-neutral-950 relative text-white">
		<slot></slot>
		<NavigationLayout />
	</div>
</template>
