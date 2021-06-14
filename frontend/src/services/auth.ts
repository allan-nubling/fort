import api from './api'

class Auth {
    static key = '@fort'
    static getToken = (): string | null => localStorage.getItem(Auth.key)
    static async check(): Promise<boolean> {
        if (Auth.getToken()) {
            return api
                .get('user')
                .then(() => true)
                .catch(() => false)
        } else {
            return false
        }
    }

    static setToken(token: string): void {
        localStorage.setItem(Auth.key, token)
    }

    static clearToken(): void {
        localStorage.removeItem(Auth.key)
    }
}

export default Auth
