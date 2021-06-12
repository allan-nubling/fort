import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { genToken } from '@config/passport'
import { User } from '@entities/User'
import { NotFound } from '@utils/errors'

class LoginController {
    static async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body

            const user = await getRepository(User).findOne({ where: { email } })
            if (!user || (user && !user.verifyPassword(password))) {
                throw new NotFound('wrong email or password')
            }

            const token = genToken({ id: user.id })

            res.json({ token, user })
        } catch (err) {
            next(err)
        }
    }
}

export default LoginController
