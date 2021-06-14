import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { Shop } from '@entities/Shop'
import { ShopRepository } from '@repositories/ShopRepository'
import { BadRequest } from '@utils/errors'

class EditShopsController {
    static async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params as Record<string, string>

            if (id.match(/\D/i)) throw new BadRequest('invalid id params')

            const { name, state }: Partial<Shop> = req.body

            const response = await getCustomRepository(ShopRepository).edit({ id: parseInt(id, 10), name, state })

            res.json(response)
        } catch (err) {
            next(err)
        }
    }
}

export default EditShopsController
