export const useAuth = () => {
    const user = useState<any>('user', () => {
        if (process.client) {
            const saved = localStorage.getItem("user")
            return saved ? JSON.parse(saved) : null
        }
        return null
    })

    const login = async (department: string, password: string) => {
        const res: any = await $fetch('/api/login', {
            method: 'POST',
            body: { department, password }
        })

        if (!res.success) return false

        user.value = {
            department,
            role: department === "Kierownik" ? "manager" : "worker"
        }

        localStorage.setItem("user", JSON.stringify(user.value))

        return true
    }

    const logout = () => {
        user.value = null
        localStorage.removeItem("user")
    }

    return { user, login, logout }
}