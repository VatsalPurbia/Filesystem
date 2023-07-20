import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import User, { userSchema } from '../Models/User';
import jwt, { sign } from 'jsonwebtoken'


export const singin = async (req: Request, res: Response) => {
    const { username, email, password, token } = req.body;
    const newUser = new User({ username, email, password })

    User.create(req.body).then((savedUser) => {

        const token = sign({ email, username, password }, 'secretKey', { expiresIn: '2 days' });

        console.log(token)
        console.log(savedUser)

        res.status(200).json({ message: 'user successfully created', token })

    }).catch((erro) => {

        console.log(erro)

    })


}

export const login = async (req : Request, res : Response) => {
    try {

        const { email, password } = req.body;


        const user = await User.findOne({ email });

        if (!user) {

            res.status(404).json({ message: 'User not found' });
        } else {

            if (user.password === password) {
                const token = sign({ email, username: user.username, password }, 'secretKey', { expiresIn: '2 days' });

                res.status(200).json({ token });
            } else {

                res.status(401).json({ message: 'Invalid credentials' });
            }
        }
    } catch (err) {

        res.status(500).json({ message: 'Internal server error' });
    }
};



