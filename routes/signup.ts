import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const signup = async (req: Request, res: Response) => {

    const { username, password } = req.body;
    const user = await User.create({ username, password });
    const userId = user.id;
    const token = jwt.sign({ userId }, 'secret');
    res.status(201).json({ message: "User created" })
}

export default signup