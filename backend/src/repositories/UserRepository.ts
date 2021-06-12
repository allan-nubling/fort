import { EntityRepository, Repository } from 'typeorm'

import { User } from '@entities/User'
import { AlreadyExists, BadRequest } from '@utils/errors'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    nameValidation = (name: string): boolean => !!name.trim() || name.trim().length >= 3

    emailValidation = (email: string): boolean => !!email.match(/[^@]+@[^@.]+\.[^@]+/g)

    async add({ name, password, email }: Partial<User>): Promise<Record<'message', string>> {
        if (!name || !this.nameValidation(name)) {
            throw new BadRequest('name invalid')
        }

        if (!password || !this.nameValidation(password)) {
            throw new BadRequest('password invalid')
        }

        if (!email || !this.emailValidation(email)) {
            throw new BadRequest('email invalid')
        }

        const exists = await this.findOne({ where: [{ email }] })

        if (exists) {
            throw new AlreadyExists('email already exists')
        }

        const user = this.create({ name, email, password })

        this.save(user)

        return { message: 'user added with succes' }
    }
}
