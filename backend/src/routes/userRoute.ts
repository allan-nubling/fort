import { Router } from 'express'

import CreateUserController from '@controllers/user/CreateUserController'
import GetUserController from '@controllers/user/GetUserController'
import Auth from '@middlewares/Auth'

const userRoute = Router()

userRoute.get('/', Auth.user, GetUserController.handle)

userRoute.post('/create', CreateUserController.handle)

export default userRoute
