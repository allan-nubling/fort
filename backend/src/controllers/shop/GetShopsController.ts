import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { ShopRepository } from '@repositories/ShopRepository'

class GetShopsController {
    static async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {
                page = '0',
                limit,
                name,
                uf,
                order_by: field = 'name',
                order = 'asc'
            } = req.query as Record<string, string>

            const url = `${req.protocol}://${req.get('host')}${req.path}`

            let parsedPage: number
            if (page === '1' || page === '0' || page.match(/\D/gi)) {
                parsedPage = 0
            } else {
                parsedPage = parseInt(page, 10) - 1
            }

            let parsedLimit = 5
            if (limit && !limit.match(/\D/gi)) {
                parsedLimit = parseInt(limit, 10)
            }

            const shopRepository = getCustomRepository(ShopRepository)

            const [shops, count] = await shopRepository.get({
                page: parsedPage,
                limit: parsedLimit,
                name,
                uf,
                field,
                order
            })

            const infos = {
                count,
                pages: Math.ceil(count / parsedLimit),
                nextPage: ''
            }
            if (parsedPage < infos.pages) {
                infos.nextPage = `${url}?page=${parsedPage + 2}${limit ? `&limit=${limit}` : ''}${
                    name ? `&name=${name}` : ''
                }${uf ? `&uf=${uf}` : ''}`
            }

            res.json({ infos, shops })
        } catch (err) {
            next(err)
        }
    }
}

export default GetShopsController
