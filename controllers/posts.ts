import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import user from '../Models/User';
import jwt, { sign } from 'jsonwebtoken'
import posts, { postsSchema } from '../Models/posts';

export const post = async (req: Request, res: Response) => {

    const { content, caption } = req.body
    await posts.create(req.body).then((newpost) => {
        res.status(200).json({ message: " post is created" })
    }).catch((error) => {
        res.status(500).json({ message: 'not created  error occured ' });
    })


}

export default post 