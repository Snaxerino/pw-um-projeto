import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
	const user = ref(null)
	const users = ref([])
	const API_URL = 'http://localhost:3000'

	// Verifica se o utilizador está autenticado
	const isAuthenticated = computed(() => !!user.value)

	// Inicializa utilizadores do localStorage ou carrega do servidor
	const initializeUsers = async () => {
		const storedUsers = localStorage.getItem('users')
		
		if (!storedUsers) {
			// Se não houver utilizadores no localStorage, carrega do servidor
			try {
				const response = await fetch(`${API_URL}/users`)
				const data = await response.json()
				users.value = data
				localStorage.setItem('users', JSON.stringify(data))
			} catch (error) {
				console.error('Erro ao carregar utilizadores:', error)
			}
		} else {
			// Se já houver utilizadores no localStorage, usa esses
			users.value = JSON.parse(storedUsers)
		}

		// Verifica se há utilizador logado no localStorage
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			user.value = JSON.parse(storedUser)
		}
	}

	// Login
	const login = async (email, password) => {
		try {
			// Busca utilizador por email
			const response = await fetch(`${API_URL}/users?email=${email}`)
			const data = await response.json()
			
			// Verifica se encontrou utilizador e se a password corresponde
			if (data.length > 0 && data[0].password === password) {
				const loggedUser = { ...data[0] }
				delete loggedUser.password // Remove password antes de guardar
				user.value = loggedUser
				localStorage.setItem('user', JSON.stringify(loggedUser))
				return { success: true, user: loggedUser }
			} else {
				return { success: false, message: 'Email ou password incorretos' }
			}
		} catch (error) {
			console.error('Erro ao fazer login:', error)
			return { success: false, message: 'Erro ao conectar ao servidor' }
		}
	}

	// Registro
	const register = async (name, email, password) => {
		try {
			// Verifica se o email já existe
			const checkResponse = await fetch(`${API_URL}/users?email=${email}`)
			const existingUsers = await checkResponse.json()
			
			if (existingUsers.length > 0) {
				return { success: false, message: 'Este email já está registado' }
			}

			// Cria novo utilizador
			const response = await fetch(`${API_URL}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			})

			const newUser = await response.json()
			const userWithoutPassword = { ...newUser }
			delete userWithoutPassword.password

			// Atualiza lista de utilizadores no localStorage
			users.value.push(newUser)
			localStorage.setItem('users', JSON.stringify(users.value))

			// Faz login automaticamente
			user.value = userWithoutPassword
			localStorage.setItem('user', JSON.stringify(userWithoutPassword))

			return { success: true, user: userWithoutPassword }
		} catch (error) {
			console.error('Erro ao registar:', error)
			return { success: false, message: 'Erro ao registar utilizador' }
		}
	}

	// Logout
	const logout = () => {
		user.value = null
		localStorage.removeItem('user')
	}

	// Busca todos os utilizadores
	const fetchUsers = async () => {
		try {
			const response = await fetch(`${API_URL}/users`)
			const data = await response.json()
			// Remove password e id de cada utilizador
			return data.map(({ password, id, ...user }) => user)
		} catch (error) {
			console.error('Erro ao buscar utilizadores:', error)
			return []
		}
	}

	return {
		user,
		users,
		isAuthenticated,
		initializeUsers,
		login,
		register,
		logout,
		fetchUsers,
	}
})

