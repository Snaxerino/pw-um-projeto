<script setup>
import { privateNavigationItems } from '@/constants/PrivateNavigation'
</script>

<template>
	<nav class="absolute left-1/2 bottom-6 -translate-x-1/2 bg-neutral-900 rounded-full">
		<ul class="flex items-center gap-1 p-1 relative z-10">
			<li v-for="item in privateNavigationItems" :key="item.id">
				<router-link
					:to="item.route"
					:title="item.label"
					class="rounded-full size-9 grid place-content-center">
					<span
						v-html="item.svg"
						:class="$route.path === item.route ? 'text-white bg-neutral-800': 'text-neutral-400'"
						class="transition-colors duration-200 p-2.5 rounded-full"></span>
				</router-link>
			</li>
		</ul>
	</nav>
</template>
