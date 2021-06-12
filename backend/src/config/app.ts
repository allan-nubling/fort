import { urlencoded, json } from 'body-parser'
import cors from 'cors'
import express from 'express'
import passport from 'passport'

import handleErrors from '@middlewares/handleErrors'

import routes from '../routes'
import Database from './database'
import { strategy } from './passport'

const app = express()

app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(json())

Database.staticConnection()

passport.use('user', strategy)
app.use(passport.initialize())
app.use(passport.session())
app.use(routes)
app.use(handleErrors)

export default app
