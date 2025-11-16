import { createRouter, createWebHistory } from 'vue-router'

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
			component: () => import('../views/public/LogInPage.vue'),
		},
		{
			path: '/get-started',
			name: 'get-started',
			component: () => import('../views/public/GetStartedPage.vue'),
		},
		// private
		{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import('@/views/DashboardPage.vue'),
		},
	],
})

export default router