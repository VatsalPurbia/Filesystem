import express from 'express'
import { appendFile } from 'fs'
import {singin} from '../controllers/users'

const router =express.Router()


router.post('/singin' ,  singin)

export default router
