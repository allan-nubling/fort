import { scryptSync, createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto'

export default class Crypto {
    public static encrypt(value: string): string {
        const key = scryptSync(process.env.APP_KEY, 'salt', 32)

        const iv = Buffer.alloc(16, 0)

        const cipher = createCipheriv('aes-256-cbc', key, iv)

        let encrypted = cipher.update(value, 'utf8', 'hex')
        encrypted += cipher.final('hex')

        return encrypted
    }

    public static decrypt(value: string): string {
        try {
            const key = scryptSync(process.env.APP_KEY, 'salt', 32)

            const iv = Buffer.alloc(16, 0)

            const decipher = createDecipheriv('aes-256-cbc', key, iv)

            let decrypted = decipher.update(value, 'hex', 'utf8')
            decrypted += decipher.final('utf8')

            return decrypted
        } catch (err) {
            if (err.code !== 'ERR_OSSL_EVP_WRONG_FINAL_BLOCK_LENGTH') console.error(err.code)
            return ''
        }
    }

    public static encryptObject(value: Record<string, unknown>): string {
        const stringfiedValue = JSON.stringify(value)
        return this.encrypt(stringfiedValue)
    }

    public static decryptObject(value: string): Record<string, unknown> {
        try {
            const stringfiedValue = this.decrypt(value)
            return JSON.parse(stringfiedValue)
        } catch (err) {
            return { value: this.decrypt(value) }
        }
    }

    public static async hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const salt = randomBytes(8).toString('hex')

            scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err)
                resolve(`${salt}:${derivedKey.toString('hex')}`)
            })
        })
    }

    public static verifyPassword(password: string, hash: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const [salt, key] = hash.split(':')
            scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err)
                resolve(key === derivedKey.toString('hex'))
            })
        })
    }
}
