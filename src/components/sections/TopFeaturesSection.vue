<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { topFeatures } from '@/constants/TopFeatures'
import TopFeatureCard from './TopFeatureCard.vue'

const FEATURE_DURATION_MS = 5000

// Inicia com -1 para forçar a animação inicial
const activeFeature = ref(-1)
const features = topFeatures

// Calcula a duração em segundos para usar nas classes CSS
const featureDurationSeconds = computed(() => FEATURE_DURATION_MS / 1000)

let intervalId = null

const startAutoRotation = () => {
	intervalId = setInterval(() => {
		activeFeature.value = (activeFeature.value + 1) % features.length
	}, FEATURE_DURATION_MS)
}

onMounted(async () => {
	// Aguarda o DOM estar pronto e força a animação inicial
	await nextTick()
	// Usa requestAnimationFrame para garantir que o DOM está totalmente renderizado
	requestAnimationFrame(() => {
		activeFeature.value = 0
		startAutoRotation()
	})
})

onUnmounted(() => {
	if (intervalId) {
		clearInterval(intervalId)
	}
})
</script>

<template>
	<div class="px-8 w-full relative mt-28">
		<div class="absolute left-1/2 -translate-x-1/2 -top-30 bg-orange-500/8 blur-[100px] w-232 h-60 rounded-full"></div>
		<div class="isolate z-100 max-w-5xl m-auto aspect-[14.4/9] bg-linear-to-b to-orange-500 from-orange-400 p-4 inset-shadow-[0_1px_0_0] inset-shadow-orange-400 rounded-4xl">
			<div class="w-full h-full ring-8 ring-white/36 rounded-2xl bg-white flex items-center justify-center relative overflow-hidden">
				<img
					v-for="(feature, index) in features"
					:key="feature.id"
					:src="feature.image"
					:alt="feature.displayTitle"
					:class="['select-none absolute w-full h-full object-fill transition-opacity duration-500', activeFeature === index ? 'opacity-100' : 'opacity-0']"
				/>
			</div>
		</div>
		<div class="absolute bg-white h-1/2 left-0 bottom-0 w-full -z-1000"></div>
	</div>
	<div class="px-8 w-full relative py-16 z-20 bg-white">
		<div class="max-w-5xl w-full m-auto flex gap-6">
			<TopFeatureCard
				v-for="(feature, index) in features"
				:key="feature.id"
				:feature="feature"
				:index="index"
				:is-active="activeFeature === index"
				:feature-duration-seconds="featureDurationSeconds"
			/>
		</div>
	</div>
</template>