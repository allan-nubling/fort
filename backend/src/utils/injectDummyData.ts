import { getRepository } from 'typeorm'

import { State, STATE_DUMMY_DATA } from '@entities/State'

export async function injectStates(): Promise<void> {
    const stateRepository = getRepository(State)
    const data = STATE_DUMMY_DATA.map(state => stateRepository.create(state))
    const exists = await stateRepository.findOne({ where: { uf: data[0].uf } })

    if (!exists) {
        stateRepository.insert(data)
    }
}
