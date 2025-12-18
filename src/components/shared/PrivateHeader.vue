<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'
import { useAuthStore } from '@/stores/auth'

defineProps({
	pageName: {
		type: String,
		required: true,
	},
})

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
	await authStore.initializeUsers()
})

const handleLogout = () => {
	authStore.logout()
	router.push('/')
}
</script>

<template>
	<header class="flex items-center justify-between p-8 border-b border-neutral-900">
		<h6 class="text-white">{{ pageName }}</h6>
		<div class="flex items-center gap-2">
			<h1 class="text-base font-medium">{{ authStore.user?.name }}</h1>
			<Button @click="handleLogout" variant="secondary">Logout</Button>
		</div>
	</header>
</template>
