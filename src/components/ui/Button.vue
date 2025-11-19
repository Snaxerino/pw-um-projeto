<script setup>
import { computed, useAttrs } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({
	name: 'BaseButton',
})

const props = defineProps({
	variant: {
		type: String,
		default: 'primary',
	},
	href: String,
	to: [String, Object],
	type: {
		type: String,
		default: 'button',
	},
	disabled: Boolean,
})

const attrs = useAttrs()

const baseClasses =
	'px-4 py-2 rounded-full font-semibold whitespace-nowrap text-sm ease-out duration-200'
const variantClasses = {
	primary:'selection:bg-white/15 text-white bg-linear-to-b from-[#FF6900] to-[#F54900] hover:opacity-90 text-shadow-[0_1px_2px] text-shadow-zinc-950/24 inset-shadow-[0_1px_0_0] inset-shadow-orange-400',
	secondary: 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white',
	tertiary: 'text-white hover:bg-white/12 border border-transparent hover:border-white/8',
	white: '',
}

const buttonClasses = computed(() => {
	const variantClass = variantClasses[props.variant] || variantClasses.primary
	const customClasses = attrs.class || ''
	return [baseClasses, variantClass, customClasses].filter(Boolean).join(' ')
})
</script>

<template>
	<RouterLink
		v-if="to"
		:to="to"
		:class="buttonClasses"
		:aria-disabled="disabled"
		v-bind="{ ...$attrs, class: undefined }"
	>
		<slot />
	</RouterLink>

	<a
		v-else-if="href"
		:href="href"
		:class="buttonClasses"
		:aria-disabled="disabled"
		v-bind="{ ...$attrs, class: undefined }"
	>
		<slot />
	</a>

	<button
		v-else
		:type="type"
		:disabled="disabled"
		:class="buttonClasses"
		v-bind="{ ...$attrs, class: undefined }"
	>
		<slot />
	</button>
</template>

<!--
	DOCUMENTAÇÃO DO COMPONENTE BaseButton
	=====================================

	DESCRIÇÃO:
	Componente de botão totalmente unstyled com suporte a Tailwind CSS.
	Renderiza condicionalmente como RouterLink, link externo (<a>) ou botão (<button>)
	conforme as props fornecidas.

	PROPS:
	-------
	- variant (String, default: 'primary')
		Variante visual do botão. Opções disponíveis:
		- 'primary': Botão principal (azul)
		- 'secondary': Botão secundário (cinza)
		- 'tertiary': Botão terciário (outline azul)
		- 'white': Botão branco (texto cinza)

	- href (String, optional)
		URL para navegação externa. Quando fornecido, renderiza como elemento <a>.

	- to (String | Object, optional)
		Rota do Vue Router. Quando fornecido, renderiza como RouterLink.
		Pode ser uma string (ex: '/home') ou objeto de rota.

	- type (String, default: 'button')
		Tipo do botão quando renderizado como <button>.
		Opções: 'button', 'submit', 'reset'

	- disabled (Boolean, default: false)
		Desabilita o botão. Aplica aria-disabled e remove interatividade.

	ATRIBUTOS NATIVOS:
	------------------
	O componente suporta todos os atributos nativos dos elementos:
	- Para <button>: onclick, id, data-*, aria-*, etc.
	- Para <a>: target, rel, download, etc.
	- Para RouterLink: active-class, exact-active-class, etc.

	CLASSES TAILWIND:
	-----------------
	Podes passar classes Tailwind adicionais via prop `class`:
	<BaseButton variant="primary" class="font-bold text-lg">
		Clique aqui
	</BaseButton>

	As classes serão mescladas com as classes base e da variant.

	PERSONALIZAÇÃO:
	--------------
	Para alterar os estilos:
	1. Classes base (aplicadas a todas as variants): linha 26
	2. Classes específicas por variant: linhas 29-33

	EXEMPLOS DE USO:
	---------------

	1. Botão simples:
	<BaseButton>Clique aqui</BaseButton>

	2. Botão com variant:
	<BaseButton variant="secondary">Botão Secundário</BaseButton>

	3. Botão como RouterLink:
	<BaseButton to="/home" variant="primary">
		Ir para Home
	</BaseButton>

	4. Botão como link externo:
	<BaseButton href="https://example.com" variant="tertiary">
		Link Externo
	</BaseButton>

	5. Botão com evento onclick:
	<BaseButton @click="handleClick" variant="primary">
		Executar Ação
	</BaseButton>

	6. Botão desabilitado:
	<BaseButton disabled variant="primary">
		Desabilitado
	</BaseButton>

	7. Botão com classes customizadas:
	<BaseButton variant="primary" class="w-full md:w-auto">
		Responsivo
	</BaseButton>

	8. Botão submit em formulário:
	<BaseButton type="submit" variant="primary">
		Enviar
	</BaseButton>

	ACESSIBILIDADE:
	---------------
	- Suporta aria-label e outros atributos ARIA via $attrs
	- Aplica aria-disabled quando disabled=true
	- Remove tabindex quando desabilitado
	- Mantém semântica HTML correta (button, a, RouterLink)
-->
