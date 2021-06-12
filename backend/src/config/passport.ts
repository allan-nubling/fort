import jwt from 'jsonwebtoken'
import pjwt from 'passport-jwt'
import { getRepository } from 'typeorm'

import { User } from '@entities/User'

export const jwtOptions = {
    jwtFromRequest: pjwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.APP_KEY
}

export const strategy = new pjwt.Strategy(jwtOptions, async (jwtPayLoad, next): Promise<void> => {
    const user = await getRepository(User).findOne({ where: { id: jwtPayLoad.id } })
    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

export function genToken(payload: { id: number }): string {
    return jwt.sign({ ...payload, type: 'login' }, jwtOptions.secretOrKey)
}
