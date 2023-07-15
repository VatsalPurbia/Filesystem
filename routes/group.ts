import { Response, Request } from "express";
import { Group } from "../models/Group";

const postgroup = async (req, res) => {
    const { name, description } = req.body;
    const group = await Group.create({ name, description });
    res.send({ group });
}

const getgroup = async (req, res) => {
    const groups = await Group.findAll();
    res.send({ groups });
}

export {postgroup , getgroup}