<script setup>
import logo from '@/assets/imgs/logo.svg';
import LoginForm from '@/components/forms/LoginForm.vue';
</script>

<template>
	<div class="h-screen flex flex-col">
		<header class="px-4 lg:px-8 w-full z-200 bg-zinc-950 border-b border-zinc-900">
			<div class="flex items-center gap-6 max-w-5xl m-auto h-18">
				<router-link to="/">
					<img :src="logo" alt="logo" class="select-none" />
				</router-link>
			</div>
		</header>
		<div class="grid place-items-center grow">
			<div class="flex flex-col items-center gap-4">
				<div class="w-[374px] bg-zinc-950 border rounded-3xl border-zinc-800">
					<div class="p-4">
						<div class="flex flex-col items-center">
							<h5 class="text-2xl font-medium text-center text-white mb-4">Login</h5>
							<p class="text-zinc-400 text-center mb-4 w-50">Welcome back! <br> How are your reps going?</p>
						</div>
						<LoginForm />
					</div>
					<div class="p-4 flex gap-2 items-center justify-center bg-zinc-900 border-t border-zinc-800 text-sm rounded-b-3xl">
						<p class="text-sm text-zinc-400">Are you new here?</p>
						<span class="text-zinc-600">∙</span>
						<router-link to="/get-started" class="text-orange-500 font-medium">Get Started	</router-link>
					</div>
				</div>
				<RouterLink to="/" class="items-center flex gap-1">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="fill" class="text-zinc-600">
						<path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="16"/>
					</svg>
					<p class="text-zinc-400 hover:text-zinc-200 duration-200 ease-out text-sm">Go back</p>
				</RouterLink>
			</div>
		</div>
		<div class="px-4 lg:px-8 w-full border-t border-zinc-900">
			<div class="max-w-5xl m-auto flex items-center justify-between h-18 text-sm">
				<p class="font-medium text-zinc-400">© 2025 Athryx, Inc</p>
				<div class="flex items-center gap-3">
					<p class="text-zinc-400 hover:text-zinc-200 hover:underline duration-200 ease-in-out underline-offset-3 decoration-[0.5px]">Terms of Service</p>
					<span class="text-zinc-600">∙</span>
					<p class="text-zinc-400 hover:text-zinc-200 hover:underline duration-200 ease-in-out underline-offset-3 decoration-[0.5px]">Privacy Police</p>
					<span class="text-zinc-600">∙</span>
					<p class="text-zinc-400 hover:text-zinc-200 hover:underline duration-200 ease-in-out underline-offset-3 decoration-[0.5px]">Support</p>
				</div>
			</div>
		</div>
	</div>
</template>