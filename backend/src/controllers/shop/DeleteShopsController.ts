import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { Shop } from '@entities/Shop'
import { BadRequest, NotFound } from '@utils/errors'

class DeleteShopsController {
    static async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params as Record<string, string>

            if (id.match(/\D/i)) throw new BadRequest('invalid id params')

            const shopRepository = getRepository(Shop)

            const { affected } = await shopRepository.delete(id)

            if (affected === 0) throw new NotFound('shop not founded')

            res.json({ message: 'data deleted' })
        } catch (err) {
            next(err)
        }
    }
}

export default DeleteShopsController
