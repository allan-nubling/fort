import { Router } from 'express'

import CreateShopController from '@controllers/shop/CreateShopController'
import GetShopsController from '@controllers/shop/GetShopsController'
import Auth from '@middlewares/Auth'

const shopRoute = Router()

shopRoute.get('/', Auth.user, GetShopsController.handle)

shopRoute.post('/create', Auth.user, CreateShopController.handle)

export default shopRoute
