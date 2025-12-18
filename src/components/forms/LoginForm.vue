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

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
	error.value = ''
	loading.value = true

	if (!email.value || !password.value) {
		error.value = 'Por favor, preencha todos os campos'
		loading.value = false
		return
	}

	const result = await authStore.login(email.value, password.value)

	if (result.success) {
		router.push('/dashboard')
	} else {
		error.value = result.message
	}

	loading.value = false
}
</script>

<template>
	<form @submit.prevent="handleLogin" class="space-y-4">
		<div v-if="error" class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">{{ error }}</div>
		<div class="flex gap-3">
			<div class="flex justify-center w-full p-2 bg-zinc-900 rounded-[10px] shadow-[0_2px_4px_0] shadow-black inset-shadow-[0_1px_0_0] inset-shadow-zinc-800">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path d="M15.899 7.45882C14.8504 8.11765 14.2027 9.24706 14.2027 10.502C14.2027 11.9137 15.0354 13.2 16.3 13.7333C16.0533 14.549 15.6831 15.302 15.2205 15.9922C14.5419 16.9647 13.8325 17.9686 12.7839 17.9686C11.7352 17.9686 11.4267 17.3412 10.193 17.3412C8.99012 17.3412 8.55831 18 7.57133 18C6.58434 18 5.90578 17.0902 5.1347 15.9608C4.11687 14.3922 3.53084 12.5725 3.5 10.6588C3.5 7.55294 5.47398 5.8902 7.44795 5.8902C8.49663 5.8902 9.36024 6.58039 10.008 6.58039C10.6248 6.58039 11.6118 5.85882 12.7839 5.85882C14.0176 5.82745 15.1896 6.42353 15.899 7.45882ZM12.2287 4.54118C12.753 3.91373 13.0306 3.12941 13.0614 2.31373C13.0614 2.21961 13.0614 2.09412 13.0306 2C12.1361 2.09412 11.3034 2.53333 10.7174 3.22353C10.193 3.81961 9.88458 4.57255 9.85374 5.38824C9.85374 5.48235 9.85374 5.57647 9.88458 5.67059C9.94627 5.67059 10.0388 5.70196 10.1005 5.70196C10.9333 5.63922 11.7043 5.2 12.2287 4.54118Z" fill="white"/>
				</svg>
			</div>
			<div class="flex justify-center w-full p-2 bg-zinc-900 rounded-[10px] shadow-[0_2px_4px_0] shadow-black inset-shadow-[0_1px_0_0] inset-shadow-zinc-800">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <mask id="mask0_333_1179" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="2" width="16" height="16">
    <path d="M17.6896 8.51581H10.1672V11.5916H14.4896C14.4201 12.0268 14.2641 12.4551 14.0356 12.8455C13.7738 13.2929 13.4502 13.6335 13.1185 13.8928C12.1249 14.6698 10.9664 14.8286 10.1619 14.8286C8.1296 14.8286 6.39312 13.4883 5.7209 11.667C5.69377 11.601 5.67576 11.5327 5.65382 11.4652C5.50527 11.0017 5.42411 10.5108 5.42411 10.0005C5.42411 9.46948 5.512 8.96116 5.67225 8.48107C6.30438 6.58761 8.08 5.17337 10.1634 5.17337C10.5824 5.17337 10.986 5.22427 11.3686 5.32579C12.2432 5.5578 12.8618 6.01475 13.2409 6.37619L15.5282 4.0905C14.1369 2.78878 12.3231 2 10.1596 2C8.42997 1.99996 6.83312 2.54985 5.52456 3.47919C4.46336 4.23286 3.59302 5.24192 3.00565 6.41384C2.45931 7.50044 2.16016 8.7046 2.16016 9.99931C2.16016 11.2941 2.45977 12.5107 3.00611 13.5873V13.5946C3.58318 14.7375 4.42706 15.7215 5.4527 16.4717C6.3487 17.1271 7.95533 18 10.1596 18C11.4272 18 12.5506 17.7668 13.5414 17.3298C14.2561 17.0145 14.8894 16.6033 15.4627 16.0748C16.2203 15.3765 16.8136 14.5127 17.2186 13.519C17.6235 12.5252 17.8402 11.4015 17.8402 10.1831C17.8402 9.61571 17.7843 9.03947 17.6896 8.51575V8.51581Z" fill="white"/>
  </mask>
  <g mask="url(#mask0_333_1179)">
    <g filter="url(#filter0_f_333_1179)">
      <path d="M2.04492 10.0536C2.05324 11.3279 2.40909 12.6427 2.94773 13.7041V13.7114C3.33693 14.4822 3.86885 15.0911 4.47469 15.6944L8.13385 14.332C7.44156 13.9731 7.33592 13.7533 6.83966 13.352C6.33253 12.8302 5.95456 12.2312 5.71917 11.5288H5.70969L5.71917 11.5215C5.56432 11.0576 5.54904 10.5653 5.54333 10.0536H2.04492Z" fill="url(#paint0_radial_333_1179)"/>
    </g>
    <g filter="url(#filter1_f_333_1179)">
      <path d="M10.1667 1.94177C9.80504 3.2383 9.94333 4.49857 10.1667 5.23185C10.5844 5.23217 10.9867 5.28297 11.3682 5.38417C12.2427 5.61618 12.8613 6.07314 13.2404 6.43458L15.5862 4.0905C14.1965 2.79033 12.5241 1.94382 10.1667 1.94177Z" fill="url(#paint1_radial_333_1179)"/>
    </g>
    <g filter="url(#filter2_f_333_1179)">
      <path d="M10.1595 1.93152C8.38549 1.93148 6.74766 2.49549 5.40551 3.44869C4.90717 3.80261 4.44985 4.21145 4.04263 4.66608C3.93595 5.68733 4.84122 6.94253 6.63391 6.93215C7.50372 5.89971 8.79014 5.23173 10.2219 5.23173C10.2232 5.23173 10.2245 5.23184 10.2258 5.23185L10.1673 1.93175C10.1647 1.93175 10.1621 1.93152 10.1595 1.93152Z" fill="url(#paint2_radial_333_1179)"/>
    </g>
    <g filter="url(#filter3_f_333_1179)">
      <path d="M16.0146 10.4231L14.4311 11.5331C14.3617 11.9684 14.2055 12.3966 13.977 12.7871C13.7153 13.2345 13.3917 13.575 13.06 13.8344C12.0684 14.6097 10.913 14.7694 10.1087 14.77C9.2774 16.2148 9.13165 16.9385 10.1672 18.1046C11.4486 18.1036 12.5846 17.8676 13.5866 17.4256C14.3109 17.1061 14.9527 16.6894 15.5337 16.1538C16.3014 15.4461 16.9028 14.5708 17.3132 13.5637C17.7236 12.5566 17.943 11.4178 17.943 10.1831L16.0146 10.4231Z" fill="url(#paint3_radial_333_1179)"/>
    </g>
    <g filter="url(#filter4_f_333_1179)">
      <path d="M10.0508 8.39893V11.7084H17.669C17.736 11.2551 17.9576 10.6686 17.9576 10.1831C17.9576 9.6157 17.9018 8.92264 17.8071 8.39893H10.0508Z" fill="#3086FF"/>
    </g>
    <g filter="url(#filter5_f_333_1179)">
      <path d="M4.07864 4.54919C3.60852 5.07407 3.20689 5.66156 2.88844 6.29691C2.34211 7.38352 2.04297 8.70453 2.04297 9.99923C2.04297 10.0175 2.04445 10.0353 2.04457 10.0535C2.28652 10.5269 5.38671 10.4363 5.54297 10.0535C5.54278 10.0357 5.54081 10.0183 5.54081 10.0004C5.54081 9.46934 5.62873 9.07794 5.78898 8.59785C5.98668 8.00567 6.29623 7.46035 6.69205 6.99051C6.78178 6.87361 7.02112 6.62232 7.09095 6.47158C7.11755 6.41417 7.04266 6.38194 7.03847 6.36173C7.03379 6.33913 6.93338 6.35731 6.91088 6.34047C6.83946 6.28701 6.69802 6.2591 6.61214 6.23429C6.42857 6.18125 6.12434 6.06428 5.95536 5.94304C5.42123 5.55978 4.58768 5.10199 4.07864 4.54919Z" fill="url(#paint4_radial_333_1179)"/>
    </g>
    <g filter="url(#filter6_f_333_1179)">
      <path d="M5.96734 6.36398C7.20593 7.12957 7.56213 5.97754 8.38562 5.61705L6.95313 2.58582C6.42618 2.81181 5.92832 3.09259 5.46638 3.42066C4.77651 3.9106 4.16731 4.50847 3.66406 5.18886L5.96734 6.36398Z" fill="url(#paint5_radial_333_1179)"/>
    </g>
    <g filter="url(#filter7_f_333_1179)">
      <path d="M6.47053 14.0977C4.80787 14.7102 4.54758 14.7322 4.39453 15.7836C4.687 16.0749 5.00123 16.3442 5.33515 16.5885C6.23116 17.2439 7.95469 18.1167 10.1589 18.1167C10.1615 18.1167 10.164 18.1165 10.1666 18.1165V14.7115C10.1649 14.7116 10.163 14.7117 10.1613 14.7117C9.33592 14.7117 8.67633 14.4904 8.00005 14.1057C7.83331 14.0109 7.53079 14.2656 7.37701 14.1517C7.16492 13.9947 6.65449 14.287 6.47053 14.0977Z" fill="url(#paint6_radial_333_1179)"/>
    </g>
    <g opacity="0.5" filter="url(#filter8_f_333_1179)">
      <path d="M9.19336 14.6044V18.0576C9.50177 18.0944 9.82274 18.1168 10.1594 18.1168C10.497 18.1168 10.8235 18.0991 11.1408 18.0666V14.6276C10.7852 14.6897 10.4503 14.7117 10.1618 14.7117C9.82957 14.7117 9.50645 14.6723 9.19336 14.6044Z" fill="url(#paint7_linear_333_1179)"/>
    </g>
  </g>
  <defs>
    <filter id="filter0_f_333_1179" x="1.94655" y="9.95522" width="6.2856" height="5.83748" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.0491839" result="effect1_foregroundBlur_333_1179"/>
    </filter>
    <filter id="filter1_f_333_1179" x="9.84597" y="1.8434" width="5.83834" height="4.68953" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.0491839" result="effect1_foregroundBlur_333_1179"/>
    </filter>
    <filter id="filter2_f_333_1179" x="3.93581" y="1.83315" width="6.38814" height="5.19747" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.0491839" result="effect1_foregroundBlur_333_1179"/>
    </filter>
    <filter id="filter3_f_333_1179" x="9.33913" y="10.0847" width="8.70259" height="8.11824" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.0491839" result="effect1_foregroundBlur_333_1179"/>
    </filter>
    <filter id="filter4_f_333_1179" x="9.95241" y="8.30056" width="8.10396" height="3.50618" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.0491839" result="effect1_foregroundBlur_333_1179"/>
    </filter>
    <filter id="filter5_f_333_1179" x="1.9446" y="4.45083" width="5.25045" height="6.02303" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.0491839" result="effect1_foregroundBlur_333_1179"/>
    </filter>
    <filter id="filter6_f_333_1179" x="2.9725" y="1.89425" width="6.10481" height="5.41865" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.345783" result="effect1_foregroundBlur_333_1179"/>
    </filter>
    <filter id="filter7_f_333_1179" x="4.29616" y="13.9857" width="5.9692" height="4.22933" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.0491839" result="effect1_foregroundBlur_333_1179"/>
    </filter>
    <filter id="filter8_f_333_1179" x="9.09499" y="14.506" width="2.144" height="3.70919" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="0.0491839" result="effect1_foregroundBlur_333_1179"/>
    </filter>
    <radialGradient id="paint0_radial_333_1179" cx="0" cy="0" r="1" gradientTransform="matrix(-0.325832 -7.96794 11.715 -0.478149 8.0606 15.5743)" gradientUnits="userSpaceOnUse">
      <stop offset="0.141612" stop-color="#1ABD4D"/>
      <stop offset="0.247515" stop-color="#6EC30D"/>
      <stop offset="0.311547" stop-color="#8AC502"/>
      <stop offset="0.366013" stop-color="#A2C600"/>
      <stop offset="0.445673" stop-color="#C8C903"/>
      <stop offset="0.540305" stop-color="#EBCB03"/>
      <stop offset="0.615636" stop-color="#F7CD07"/>
      <stop offset="0.699345" stop-color="#FDCD04"/>
      <stop offset="0.771242" stop-color="#FDCE05"/>
      <stop offset="0.860566" stop-color="#FFCE0A"/>
    </radialGradient>
    <radialGradient id="paint1_radial_333_1179" cx="0" cy="0" r="1" gradientTransform="matrix(5.53352 -1.35704e-05 -7.77758e-06 7.13951 15.3668 6.26497)" gradientUnits="userSpaceOnUse">
      <stop offset="0.408458" stop-color="#FB4E5A"/>
      <stop offset="1" stop-color="#FF4540"/>
    </radialGradient>
    <radialGradient id="paint2_radial_333_1179" cx="0" cy="0" r="1" gradientTransform="matrix(-7.75286 4.28995 5.82692 10.5107 12.3455 0.89805)" gradientUnits="userSpaceOnUse">
      <stop offset="0.231273" stop-color="#FF4541"/>
      <stop offset="0.311547" stop-color="#FF4540"/>
      <stop offset="0.457516" stop-color="#FF4640"/>
      <stop offset="0.540305" stop-color="#FF473F"/>
      <stop offset="0.699346" stop-color="#FF5138"/>
      <stop offset="0.771242" stop-color="#FF5B33"/>
      <stop offset="0.860566" stop-color="#FF6C29"/>
      <stop offset="1" stop-color="#FF8C18"/>
    </radialGradient>
    <radialGradient id="paint3_radial_333_1179" cx="0" cy="0" r="1" gradientTransform="matrix(-14.06 -18.3365 -6.77483 5.18501 10.2825 17.0691)" gradientUnits="userSpaceOnUse">
      <stop offset="0.131546" stop-color="#0CBA65"/>
      <stop offset="0.209784" stop-color="#0BB86D"/>
      <stop offset="0.297297" stop-color="#09B479"/>
      <stop offset="0.396257" stop-color="#08AD93"/>
      <stop offset="0.477124" stop-color="#0AA6A9"/>
      <stop offset="0.568425" stop-color="#0D9CC6"/>
      <stop offset="0.667385" stop-color="#1893DD"/>
      <stop offset="0.768727" stop-color="#258BF1"/>
      <stop offset="0.858506" stop-color="#3086FF"/>
    </radialGradient>
    <radialGradient id="paint4_radial_333_1179" cx="0" cy="0" r="1" gradientTransform="matrix(-0.994996 8.56811 11.8581 1.37445 9.47992 3.44261)" gradientUnits="userSpaceOnUse">
      <stop offset="0.366013" stop-color="#FF4E3A"/>
      <stop offset="0.457516" stop-color="#FF8A1B"/>
      <stop offset="0.540305" stop-color="#FFA312"/>
      <stop offset="0.615636" stop-color="#FFB60C"/>
      <stop offset="0.771242" stop-color="#FFCD0A"/>
      <stop offset="0.860566" stop-color="#FECF0A"/>
      <stop offset="0.915033" stop-color="#FECF08"/>
      <stop offset="1" stop-color="#FDCD01"/>
    </radialGradient>
    <radialGradient id="paint5_radial_333_1179" cx="0" cy="0" r="1" gradientTransform="matrix(-2.87605 3.17785 -8.97171 -8.1044 8.0812 3.35372)" gradientUnits="userSpaceOnUse">
      <stop offset="0.315904" stop-color="#FF4C3C"/>
      <stop offset="0.603818" stop-color="#FF692C"/>
      <stop offset="0.726837" stop-color="#FF7825"/>
      <stop offset="0.884534" stop-color="#FF8D1B"/>
      <stop offset="1" stop-color="#FF9F13"/>
    </radialGradient>
    <radialGradient id="paint6_radial_333_1179" cx="0" cy="0" r="1" gradientTransform="matrix(-7.75286 -4.28995 5.82692 -10.5107 12.3447 19.1016)" gradientUnits="userSpaceOnUse">
      <stop offset="0.231273" stop-color="#0FBC5F"/>
      <stop offset="0.311547" stop-color="#0FBC5F"/>
      <stop offset="0.366013" stop-color="#0FBC5E"/>
      <stop offset="0.457516" stop-color="#0FBC5D"/>
      <stop offset="0.540305" stop-color="#12BC58"/>
      <stop offset="0.699346" stop-color="#28BF3C"/>
      <stop offset="0.771242" stop-color="#38C02B"/>
      <stop offset="0.860566" stop-color="#52C218"/>
      <stop offset="0.915033" stop-color="#67C30F"/>
      <stop offset="1" stop-color="#86C504"/>
    </radialGradient>
    <linearGradient id="paint7_linear_333_1179" x1="9.19336" y1="16.3606" x2="11.1408" y2="16.3606" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0FBC5C"/>
      <stop offset="1" stop-color="#0CBA65"/>
    </linearGradient>
  </defs>
				</svg>
			</div>
		</div>
		<div class="flex gap-3 items-center">
			<div class="w-full border border-dashed border-zinc-800"></div>
			<p class="uppercase text-zinc-700 text-sm">OR</p>
			<div class="w-full border border-dashed border-zinc-800"></div>
		</div>
		<div class="space-y-1">
			<label for="email" class="block text-sm font-medium text-zinc-300 mb-2">Email</label>
			<input id="email" v-model="email" type="email" required class="text-sm w-full p-2 bg-zinc-900 rounded-[10px] text-white placeholder-zinc-500 focus:outline-none focus:ring-[1.5px] focus:ring-orange-500 focus:border-transparent shadow-[0_2px_4px_0] shadow-black inset-shadow-[0_1px_0_0] inset-shadow-zinc-800" placeholder="athryx@email.com"/>
		</div>
		<div class="space-y-1">
			<label for="password" class="block text-sm font-medium text-zinc-300 mb-2">Password</label>
			<input id="password" v-model="password" type="password" required class="text-sm w-full p-2 bg-zinc-900 rounded-[10px] text-white placeholder-zinc-500 focus:outline-none focus:ring-[1.5px] focus:ring-orange-500 focus:border-transparent shadow-[0_2px_4px_0] shadow-black inset-shadow-[0_1px_0_0] inset-shadow-zinc-800" placeholder="••••••••"/>
		</div>
		<button type="submit" :disabled="loading" class="w-full px-4 py-2 rounded-[10px] font-semibold whitespace-nowrap text-sm ease-out duration-200 selection:bg-white/15 text-white bg-linear-to-b from-[#FF6900] to-[#F54900] hover:opacity-90 text-shadow-[0_1px_2px] text-shadow-zinc-950/24 inset-shadow-[0_1px_0_0] inset-shadow-orange-400">{{ loading ? 'A fazer login...' : 'Entrar' }}</button>
	</form>
</template>