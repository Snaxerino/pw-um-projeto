<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { privateNavigationItems } from '@/constants/PrivateNavigation'

const route = useRoute()
const activeIndicator = ref()

// Computed que calcula qual item está ativo baseado na rota atual
const activeIndex = computed(() => {
	// Encontra o índice do item que corresponde à rota atual
	return privateNavigationItems.findIndex((item) => item.route === route.path)
})

// Função que atualiza a posição do indicador deslizante
const updateIndicatorPosition = async () => {
	// Aguarda o próximo tick do Vue para garantir que o DOM foi atualizado
	await nextTick()

	if (activeIndicator.value) {
		const items = document.querySelectorAll('[data-nav-item]')

		// Pega o item ativo baseado no índice calculado
		const activeItem = items[activeIndex.value]

		if (activeItem) {
			// Pega o elemento pai (ul) que contém os itens
			const nav = activeItem.parentElement

			// Obtém as dimensões e posição do container da navegação
			const navRect = nav?.getBoundingClientRect()

			// Obtém as dimensões e posição do item ativo
			const itemRect = activeItem.getBoundingClientRect()

			// Se ambos os elementos existem, calcula a posição
			if (navRect && itemRect) {
				// Calcula a distância horizontal do item ativo em relação ao container
				const left = itemRect.left - navRect.left

				// Move o indicador para a posição do item ativo usando CSS transform
				activeIndicator.value.style.transform = `translateX(${left}px)`
			}
		}
	}
}

// Observa mudanças na rota e atualiza a posição do indicador
// immediate: true faz com que execute na primeira renderização
watch(() => route.path, updateIndicatorPosition, { immediate: true })
</script>

<template>
	<nav class="absolute left-1/2 bottom-6 -translate-x-1/2 bg-neutral-900 rounded-full">
		<!-- Indicador ativo com transição -->
		<div
			ref="activeIndicator"
			class="absolute top-1 size-9 bg-neutral-800 rounded-full transition-transform duration-200 ease-out pointer-events-none"
		></div>

		<ul class="flex items-center gap-1 p-1 relative z-10">
			<li
				v-for="(item, index) in privateNavigationItems"
				:key="item.id"
				:data-nav-item="index"
			>
				<router-link
					:to="item.route"
					:title="item.label"
					class="rounded-full size-9 grid place-content-center"
				>
					<span
						v-html="item.svg"
						:class="$route.path === item.route ? 'text-white' : 'text-neutral-400'"
						class="transition-colors duration-200"
					></span>
				</router-link>
			</li>
		</ul>
	</nav>
</template>
