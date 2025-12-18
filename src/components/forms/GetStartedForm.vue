<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
	await authStore.initializeUsers()
	if (authStore.isAuthenticated) {
		router.push('/dashboard')
	}
})

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

const handleRegister = async () => {
	error.value = ''
	loading.value = true

	if (!name.value || !email.value || !password.value || !confirmPassword.value) {
		error.value = 'Por favor, preencha todos os campos'
		loading.value = false
		return
	}

	if (password.value !== confirmPassword.value) {
		error.value = 'As passwords não coincidem'
		loading.value = false
		return
	}

	if (password.value.length < 6) {
		error.value = 'A password deve ter pelo menos 6 caracteres'
		loading.value = false
		return
	}

	const result = await authStore.register(name.value, email.value, password.value)

	if (result.success) {
		router.push('/dashboard')
	} else {
		error.value = result.message
	}

	loading.value = false
}
</script>

<template>
	<form @submit.prevent="handleRegister" class="space-y-4">
		<div v-if="error" class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">{{ error }}</div>

		<div>
			<label for="name" class="block text-sm font-medium text-zinc-300 mb-2">Nome</label>
			<input id="name" v-model="name" type="text" required class="ext-sm w-full p-2 bg-zinc-900 rounded-[10px] text-white placeholder-zinc-500 focus:outline-none focus:ring-[1.5px] focus:ring-orange-500 focus:border-transparent shadow-[0_2px_4px_0] shadow-black inset-shadow-[0_1px_0_0] inset-shadow-zinc-800" placeholder="O teu nome"/>
		</div>

		<div>
			<label for="email" class="block text-sm font-medium text-zinc-300 mb-2">Email</label>
			<input id="email" v-model="email" type="email" required class="ext-sm w-full p-2 bg-zinc-900 rounded-[10px] text-white placeholder-zinc-500 focus:outline-none focus:ring-[1.5px] focus:ring-orange-500 focus:border-transparent shadow-[0_2px_4px_0] shadow-black inset-shadow-[0_1px_0_0] inset-shadow-zinc-800" placeholder="seu@email.com"/>
		</div>

		<div>
			<label for="password" class="block text-sm font-medium text-zinc-300 mb-2">Password</label>
			<input id="password" v-model="password" type="password" required class="ext-sm w-full p-2 bg-zinc-900 rounded-[10px] text-white placeholder-zinc-500 focus:outline-none focus:ring-[1.5px] focus:ring-orange-500 focus:border-transparent shadow-[0_2px_4px_0] shadow-black inset-shadow-[0_1px_0_0] inset-shadow-zinc-800" placeholder="••••••••"/>
		</div>

		<div>
			<label for="confirmPassword" class="block text-sm font-medium text-zinc-300 mb-2">Confirmar Password</label>
			<input id="confirmPassword" v-model="confirmPassword" type="password" required class="ext-sm w-full p-2 bg-zinc-900 rounded-[10px] text-white placeholder-zinc-500 focus:outline-none focus:ring-[1.5px] focus:ring-orange-500 focus:border-transparent shadow-[0_2px_4px_0] shadow-black inset-shadow-[0_1px_0_0] inset-shadow-zinc-800" placeholder="••••••••"/>
		</div>

		<button type="submit" :disabled="loading" class="w-full px-4 py-2 rounded-[10px] font-semibold whitespace-nowrap text-sm ease-out duration-200 selection:bg-white/15 text-white bg-linear-to-b from-[#FF6900] to-[#F54900] hover:opacity-90 text-shadow-[0_1px_2px] text-shadow-zinc-950/24 inset-shadow-[0_1px_0_0] inset-shadow-orange-400">{{ loading ? 'A criar conta...' : 'Registar' }}</button>
	</form>
</template>
