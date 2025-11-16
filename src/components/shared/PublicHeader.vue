<script setup>
	import logo from '../../assets/imgs/logo.svg';
	import { publicNavigationItems } from '@/constants/PublicNavigation.js';
import Button from '../ui/Button.vue';
</script>

<template>
	<header class="px-8">
		<div class="flex items-center gap-6 max-w-[1120px] m-auto py-5">
			<div class="w-full">
				<router-link to="/">
					<img :src="logo" alt="logo" class="select-none" />
				</router-link>
			</div>
			<nav>
				<ul class="flex items-center gap-6">
					<li v-for="item in publicNavigationItems" :key="item.id">
						<router-link
							:to="item.route"
							class="text-center font-medium text-sm text-zinc-400 hover:text-white ease-out duration-200">
							{{ item.label }}
						</router-link>
					</li>
				</ul>
			</nav>
			<div class="w-full flex gap-2 justify-end">
				<Button variant="secondary" to="/log-in">Log In</Button>
				<Button to="/get-started">Get started</Button>
			</div>
			<NavigationLayout />
		</div>
	</header>
</template>