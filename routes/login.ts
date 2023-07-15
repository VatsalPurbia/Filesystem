import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user: any = await User.findOne({ where: { username } });
    const usernameRegex = /^[a-zA-Z0-9]{4,10}$/; // Alphanumeric, 4-10 characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // At least 8 characters, one lowercase, one uppercase, one digit

    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {

        res.status(400).json({ message: 'Invalid username or password format' });
    } else {

        const validUsername = req.body.username;
        const validPassword = req.body.password

        if (username === validUsername && password === validPassword) {
            const userId = user.id
            const token = jwt.sign({ userId }, 'secret')

            res.send(token).status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    }
};

export default login;