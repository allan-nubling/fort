import { Router } from 'express'

import GetStatesController from '@controllers/state/GetStatesController'
import Auth from '@middlewares/Auth'

const stateRoute = Router()

stateRoute.get('/', Auth.user, GetStatesController.handle)

export default stateRoute
