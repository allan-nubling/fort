import { NextFunction, Request, Response } from 'express'
import { ConnectionOptions, createConnection, getConnection } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import 'reflect-metadata'
import 'pg'
import { Shop } from '@entities/Shop'
import { State } from '@entities/State'
import { User } from '@entities/User'
import { injectData } from '@utils/injectDummyData'

const { DB_USER, DB_HOST, DB_PASSWORD, DB_PORT, DB_DEBUG, DB_SCHEMA, SYNC } = process.env

export default class Database {
    private static config: ConnectionOptions = {
        name: 'default',
        type: 'postgres',
        host: DB_HOST,
        port: Number(DB_PORT),
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_SCHEMA,
        synchronize: JSON.parse(SYNC || 'false'),
        logging: JSON.parse(DB_DEBUG || 'false'),
        namingStrategy: new SnakeNamingStrategy(),
        cache: false,
        entities: [Shop, State, User]
    }

    static async connect(_req: Request, _res: Response, next: NextFunction): Promise<void> {
        try {
            await getConnection('default')
        } catch (error) {
            await createConnection(Database.config)
        }

        next()
    }

    static async staticConnection(): Promise<void> {
        try {
            await getConnection('default')
        } catch (error) {
            await createConnection(Database.config)
            await injectData()
        }
    }
}
