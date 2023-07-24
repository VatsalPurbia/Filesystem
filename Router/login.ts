import express from 'express'
import { appendFile } from 'fs'
import { login } from '../controllers/users'
import uservalidator from '../middlewear/validation'

const router = express.Router()
/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Allow user to login
 *     responses:
 *      200:
 *       description: Success
 */
router.post('/login' , uservalidator ,  login )

export default router