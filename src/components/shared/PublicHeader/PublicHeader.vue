<script setup>
import logo from '@/assets/imgs/logo.svg';
import { publicNavigationItems } from '@/constants/PublicNavigation.js';
import Button from '@/components/ui/Button.vue';
import MenuButton from '@/components/shared/PublicHeader/MenuButton.vue';
</script>

<template>
	<header class="px-4 lg:px-8 fixed top-0 left-0 w-full z-200 bg-zinc-950">
		<div class="flex items-center gap-6 max-w-5xl m-auto py-4.5">
			<div class="w-full">
				<router-link to="/">
					<img :src="logo" alt="logo" class="select-none" />
				</router-link>
			</div>
			<nav class="hidden lg:block">
				<ul class="flex items-center gap-6">
					<li v-for="item in publicNavigationItems" :key="item.id">
						<router-link
							:to="item.route"
							class="text-center font-medium text-sm text-zinc-400 hover:text-white ease-out duration-200 select-none">
							{{ item.label }}
						</router-link>
					</li>
				</ul>
			</nav>
			<div class="w-full gap-2 justify-end hidden lg:flex">
				<Button variant="secondary" to="/log-in">Log In</Button>
				<Button to="/get-started">Get started</Button>
			</div>
			<MenuButton />
		</div>
	</header>
</template>