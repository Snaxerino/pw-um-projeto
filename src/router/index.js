import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		//public
		{
			path: '/',
			name: 'home',
			component: () => import('../views/public/HomePage.vue'),
		},
		{
			path: '/features',
			name: 'features',
			component: () => import('../views/public/FeaturesPage.vue'),
		},
		{
			path: '/pricing',
			name: 'pricing',
			component: () => import('../views/public/PricingPage.vue'),
		},
		{
			path: '/faqs',
			name: 'faqs',
			component: () => import('../views/public/FaqsPage.vue'),
		},
		{
			path: '/blog',
			name: 'blog',
			component: () => import('../views/public/BlogPage.vue'),
		},
		{
			path: '/log-in',
			name: 'log-in',
			component: () => import('../views/auth/LogInPage.vue'),
		},
		{
			path: '/get-started',
			name: 'get-started',
			component: () => import('../views/auth/GetStartedPage.vue'),
		},
		// private
		{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import('@/views/private/DashboardPage.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/workouts',
			name: 'workouts',
			component: () => import('@/views/private/WorkoutsPage.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/nutrition',
			name: 'nutrition',
			component: () => import('@/views/private/NutritionPage.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/bot',
			name: 'bot',
			component: () => import('@/views/private/BotPage.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/users',
			name: 'users',
			component: () => import('@/views/private/UsersPage.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/settings',
			name: 'settings',
			component: () => import('@/views/private/SettingsPage.vue'),
			meta: { requiresAuth: true },
		},
	],
})

// Navigation guard para proteger rotas privadas
router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore()
	
	// Inicializa utilizadores se ainda não foi feito
	if (!authStore.users.length) {
		await authStore.initializeUsers()
	}

	// Verifica se a rota requer autenticação
	if (to.meta.requiresAuth) {
		if (authStore.isAuthenticated) {
			next()
		} else {
			next({ name: 'log-in' })
		}
	} else {
		next()
	}
})

export default router