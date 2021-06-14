/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository } from 'typeorm'

import { Shop } from '@entities/Shop'
import { State, STATE_DUMMY_DATA } from '@entities/State'

export async function injectStates(): Promise<void> {
    const stateRepository = getRepository(State)
    const [_states, count] = await stateRepository.createQueryBuilder('state').getManyAndCount()

    if (count === 0) {
        const data = STATE_DUMMY_DATA.map(state => stateRepository.create(state))
        stateRepository.insert(data)
    }
}

export async function injectShops(): Promise<void> {
    const shopRepository = getRepository(Shop)
    const stateRepository = getRepository(State)

    const [_shops, count] = await shopRepository.createQueryBuilder('shop').getManyAndCount()

    if (count === 0) {
        const [states] = await stateRepository.createQueryBuilder('state').getManyAndCount()

        const data = states.map(state => shopRepository.create({ name: `Estabelecimento ${state.name}`, state }))

        shopRepository.insert(data)
    }
}

export async function injectData(): Promise<void> {
    await injectStates()
    await injectShops()
}
