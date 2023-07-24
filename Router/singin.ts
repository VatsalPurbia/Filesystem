import express from 'express'
import { appendFile } from 'fs'
import {singin} from '../controllers/users'

import uservalidator from '../middlewear/validation'

const router =express.Router()


router.post('/singin' , uservalidator ,  singin)

export default router
