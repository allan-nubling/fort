import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { User } from '@entities/User'
import { UserRepository } from '@repositories/UserRepository'

class CreateUserController {
    static async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, password, email }: Partial<User> = req.body

            const response = await getCustomRepository(UserRepository).add({ name, password, email })

            res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    }
}

export default CreateUserController
