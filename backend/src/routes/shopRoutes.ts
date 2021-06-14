import { Router } from 'express'

import CreateShopController from '@controllers/shop/CreateShopController'
import DeleteShopsController from '@controllers/shop/DeleteShopsController'
import EditShopsController from '@controllers/shop/EditShopsController'
import GetShopsController from '@controllers/shop/GetShopsController'
import Auth from '@middlewares/Auth'

const shopRoute = Router()

shopRoute.get('/', Auth.user, GetShopsController.handle)

shopRoute.post('/create', Auth.user, CreateShopController.handle)

shopRoute.delete('/delete/:id', Auth.user, DeleteShopsController.handle)

shopRoute.patch('/edit/:id', Auth.user, EditShopsController.handle)

export default shopRoute
