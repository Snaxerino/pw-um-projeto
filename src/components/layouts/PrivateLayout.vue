<script setup>
import NavigationLayout from '../shared/NavigationLayout.vue'
</script>

<template>
	<div class="h-screen bg-neutral-950 relative">
		<h1 class="text-white">Layout</h1>
		<slot></slot>
		<NavigationLayout />
	</div>
</template>
