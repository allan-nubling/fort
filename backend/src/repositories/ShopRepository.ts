import { EntityRepository, getRepository, Repository } from 'typeorm'

import { Shop } from '@entities/Shop'
import { State } from '@entities/State'
import { BadRequest } from '@utils/errors'

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop> {
    nameValidation = (name: string): boolean => !!name.trim() || name.length >= 3

    emailValidation = (email: string): boolean => !!email.match(/[^@]+@[^@.]+\.[^@]+/g)

    async add({ name, street, state }: Partial<Shop>): Promise<Record<'message', string>> {
        if (!name || !this.nameValidation(name)) {
            throw new BadRequest('name invalid')
        }

        if (!street || !this.nameValidation(street)) {
            throw new BadRequest('street invalid')
        }

        const stateExists = await getRepository(State).findOne(state)

        if (!stateExists) {
            throw new BadRequest('state invalid')
        }

        const shop = this.create({ name, street, state })

        this.save(shop)

        return { message: 'shop added with succes' }
    }

    async get({
        page,
        limit,
        name,
        uf
    }: {
        page: number
        limit: number
        name: string
        uf: string
    }): Promise<[Shop[], number]> {
        const offset = page * limit
        const query = this.createQueryBuilder('shop')
            .innerJoinAndSelect('shop.state', 'state')
            .offset(offset)
            .limit(limit)
        if (name) {
            query.where({ name })
            if (uf) {
                query.orWhere('state.uf = :uf', { uf: uf.toUpperCase() })
            }
        } else if (uf) {
            query.where('state.uf = :uf', { uf: uf.toUpperCase() })
        }

        return query.getManyAndCount()
    }
}
