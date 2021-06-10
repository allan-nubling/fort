import { Router } from 'express'

import ExampleController from '@controllers/ExampleController'

const routes = Router()

routes.get('/', async (_req, res) => {
    res.send('⚡️[server]: Server is running')
})

routes.post('/example', ExampleController.save)

routes.all('*', (_req, res) =>
    res.status(404).json({
        status: 'error',
        message: 'route not found'
    })
)

export default routes
