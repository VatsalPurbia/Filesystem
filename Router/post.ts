import express, { Router } from 'express'
import { appendFile } from 'fs'
import {singin} from '../controllers/users'
import post from '../controllers/posts'
import  { sessionCheck } from '../middlewear/session'
import { pseudoRandomBytes } from 'crypto'

const router = express.Router()

router.post('/post' , sessionCheck , post )

export default router