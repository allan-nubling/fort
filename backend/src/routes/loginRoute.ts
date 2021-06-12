import { Router } from 'express'

import LoginController from '@controllers/login/LoginController'

const loginRoute = Router()

loginRoute.post('/', LoginController.handle)

export default loginRoute
