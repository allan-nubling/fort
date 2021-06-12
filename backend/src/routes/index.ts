import { NextFunction, Request, Response, Router } from 'express'

import { NotFound } from '@utils/errors'

import loginRoute from './loginRoute'
import shopRoutes from './shopRoutes'
import stateRoute from './stateRoute'
import userRoute from './userRoute'

const routes = Router()

routes.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
    res.send('⚡️[server]: Server is running')
})

routes.use('/login', loginRoute)

routes.use('/shop', shopRoutes)

routes.use('/state', stateRoute)

routes.use('/user', userRoute)

routes.use('/*', (_req: Request, _res: Response, next: NextFunction) => {
    next(new NotFound('route not found'))
})

export default routes
