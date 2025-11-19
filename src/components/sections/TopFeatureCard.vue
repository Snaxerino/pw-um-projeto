<script setup>
defineProps({
	feature: {
		type: Object,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	},
	isActive: {
		type: Boolean,
		required: true,
	},
	featureDurationSeconds: {
		type: Number,
		required: true,
	},
})

// Constantes para valores de estilo
const BAR_WIDTH_FULL = '100%'
const BAR_WIDTH_EMPTY = '0%'
const TRANSITION_PROPERTY_WIDTH = 'width'
const TRANSITION_PROPERTY_NONE = 'none'
const TRANSITION_DURATION_INSTANT = '0s'
</script>

<template>
	<div class="w-full">
		<div class="h-1 bg-zinc-200 mb-8 relative overflow-hidden">
			<div
				class="h-1 bg-orange-500 ease-linear"
				:class="{ 'transition-none': !isActive }"
				:style="{
					width: isActive ? BAR_WIDTH_FULL : BAR_WIDTH_EMPTY,
					transitionProperty: isActive
						? TRANSITION_PROPERTY_WIDTH
						: TRANSITION_PROPERTY_NONE,
					transitionDuration: isActive
						? `${featureDurationSeconds}s`
						: TRANSITION_DURATION_INSTANT,
				}"
			></div>
		</div>
		<div>
			<component :is="feature.icon" class="mb-3" />
			<p class="text-zinc-950 text-lg mb-2 font-medium">{{ feature.displayTitle }}</p>
			<p class="text-zinc-600">{{ feature.description }}</p>
		</div>
	</div>
</template>
