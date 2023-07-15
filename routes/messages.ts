import { Response, Request } from "express";
import { GroupMember } from "../models/GroupMember";
import { Message } from "../models/Messages";


const postmessages = async (req, res) => {
    const { text, groupId } = req.body;
    const { userId } = req.body;
    const groupMember = await GroupMember.findOne({ where: { groupId, userId } });
    if (!groupMember) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const message = await Message.create({ text, userId, groupId });
    res.send({ message });
}

const getmessages = async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body.user;
    const groupMember = await GroupMember.findOne({ where: { groupId, userId } });
    if (!groupMember) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const messages = await Message.findAll({ where: { groupId } });
    res.send({ messages });
}

export { postmessages , getmessages }