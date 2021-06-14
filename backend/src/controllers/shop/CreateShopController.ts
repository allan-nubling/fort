import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { Shop } from '@entities/Shop'
import { ShopRepository } from '@repositories/ShopRepository'

class CreateShopController {
    static async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, state }: Partial<Shop> = req.body

            const response = await getCustomRepository(ShopRepository).add({ name, state })

            res.status(201).json(response)
        } catch (err) {
            next(err)
        }
    }
}

export default CreateShopController
