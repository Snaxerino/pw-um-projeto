import SmartWorkoutsIcon from '@/components/icons/SmartWorkoutsIcon.vue'
import BalancedNutritionIcon from '@/components/icons/BalancedNutritionIcon.vue'
import AICoachIcon from '@/components/icons/AICoachIcon.vue'
import heroImage1 from '@/assets/imgs/hero/1.jpg'
import heroImage2 from '@/assets/imgs/hero/2.jpg'
import heroImage3 from '@/assets/imgs/hero/3.png'

export const topFeatures = [
	{
		id: 0,
		title: 'Feature 1',
		displayTitle: 'Smart Workouts',
		description: 'Create and track personalised training plans based on actual exercises and specific goals.',
		icon: SmartWorkoutsIcon,
		image: heroImage1,
	},
	{
		id: 1,
		title: 'Feature 2',
		displayTitle: 'Balanced Nutrition',
		description: 'Discover foods and balanced meal plans to boost your results at the gym.',
		icon: BalancedNutritionIcon,
		image: heroImage2,
	},
	{
		id: 2,
		title: 'Feature 3',
		displayTitle: 'AI Coach',
		description: 'An intelligent assistant that motivates you, gives you tips and adapts the experience to your progress.',
		icon: AICoachIcon,
		image: heroImage3,
	},
]

