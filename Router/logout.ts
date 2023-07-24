import express from 'express'

import { logout } from '../controllers/users'
import uservalidator from '../middlewear/validation'
import { sessionCheck } from '../middlewear/session'


const router = express.Router()

router.post('/logout' , sessionCheck , logout)

export default router