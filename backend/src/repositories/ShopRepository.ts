import { EntityRepository, getRepository, Repository } from 'typeorm'

import { Shop } from '@entities/Shop'
import { State } from '@entities/State'
import { BadRequest } from '@utils/errors'

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop> {
    nameValidation = (name: string): boolean => !!name.trim() && name.length >= 3

    emailValidation = (email: string): boolean => !!email.match(/[^@]+@[^@.]+\.[^@]+/g)

    stateValidation = async (state: State): Promise<boolean> => {
        const stateExists = await getRepository(State).findOne(state)

        return !!stateExists
    }

    async add({ name, state }: Partial<Shop>): Promise<Record<'message', string>> {
        if (!name || !this.nameValidation(name)) {
            throw new BadRequest('name invalid')
        }

        const stateExists = this.stateValidation(state)

        if (!stateExists) throw new BadRequest('state not found')

        const shop = this.create({ name, state })

        await this.save(shop)

        return { message: 'shop added with succes' }
    }

    async get({
        page,
        limit,
        name,
        uf,
        field,
        order
    }: {
        page: number
        limit: number
        name: string
        uf: string
        field: string
        order: string
    }): Promise<[Shop[], number]> {
        const offset = page * limit
        const query = this.createQueryBuilder('shop')
            .innerJoinAndSelect('shop.state', 'state')
            .offset(offset)
            .limit(limit)
        if (field === 'name') {
            query.orderBy('shop.name', order.toLocaleLowerCase() === 'desc' ? 'DESC' : 'ASC')
        } else if (field === 'uf') {
            query.orderBy('state.uf', order.toLocaleLowerCase() === 'desc' ? 'DESC' : 'ASC')
        }
        if (name) {
            query.where('shop.name like :name', { name: `%${name}%` })
            if (uf) {
                query.andWhere('state.uf = :uf', { uf: uf.toUpperCase() })
            }
        } else if (uf) {
            query.where('state.uf = :uf', { uf: uf.toUpperCase() })
        }

        return query.getManyAndCount()
    }

    async edit({ id, name, state }: Partial<Shop>): Promise<Record<'message', string>> {
        const shop = await this.findOne(id)

        if (!shop) {
            throw new BadRequest('shop not found')
        }

        if (name) {
            if (!name || !this.nameValidation(name)) {
                throw new BadRequest('name invalid')
            }
            shop.name = name
        }

        if (state) {
            const stateExists = this.stateValidation(state)

            if (!stateExists) throw new BadRequest('state not found')

            shop.state = state
        }

        await this.save(shop)

        return { message: 'shop updated with succes' }
    }
}
