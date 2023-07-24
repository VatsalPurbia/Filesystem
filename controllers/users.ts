import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import User, { userSchema } from '../Models/User';
import { sessionModel } from '../Models/session'
import jwt, { sign } from 'jsonwebtoken'
import redis from 'redis'
import bcrypt from 'bcrypt'


export const singin = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ error: 'Invalid input' })
    }
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(401).json({
                error: err
            })
        }
        else {
            const newUser = new User({ username, email, password: hash })
            newUser.save().then((savedUser) => {

                res.status(200).json({ message: 'user successfully created' })

            }).catch((erro) => {

                console.log(erro)

            })

        }
    })


}

export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;


        let user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            
            const pass = user?.password
            const passmatch = await bcrypt.compare(password, pass)
            console.log(passmatch)
            if (passmatch) {
                const token = sign({ _id: user?._id, email, username: user?.username }, 'secretKey', { expiresIn: '1h' });
                await sessionModel.create({ userId: user?._id, isActive: true })
                console.log(user?._id)
                res.status(200).json({ message: "login successufull and session created ", token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        }
    } catch (err) {

        res.status(500).json({ message: 'Internal server error' });
    }
};

export const logout = async (req: Request, res: Response) => {
    const token = ""+req.headers.authorization
    let decoded: any
    try {
        decoded = jwt.verify(token, 'secretKey')
        console.log(decoded)
    }
    catch {
        res.status(401).json({ error: 'token not valid' })

    }
    try {
        const data = await sessionModel.findOneAndUpdate({
            userId: decoded._id,
            isActive: true
        },{
            $set: { isActive: false }
        }
        )
    }
    catch (err) {
        console.log(err)
    }
    res.status(200).json({ message: 'Logout successful' });
}

