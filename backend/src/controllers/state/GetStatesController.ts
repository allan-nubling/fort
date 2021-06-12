import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { State } from '@entities/State'

class GetStatesController {
    static async handle(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const stateRepository = getRepository(State)

            const [states, count] = await stateRepository.createQueryBuilder('state').getManyAndCount()

            res.json({ info: { count }, states })
        } catch (err) {
            next(err)
        }
    }
}

export default GetStatesController
