import { NextFunction, Request, Response } from 'express'

class GetUserController {
    static async handle({ user }: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.json({ user })
        } catch (err) {
            next(err)
        }
    }
}

export default GetUserController
