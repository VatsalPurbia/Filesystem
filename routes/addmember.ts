import { Response, Request } from "express";
import { GroupMember } from "../models/GroupMember";


const addmember = async (req, res) => {

    const { userId } = req.body;
    const { groupId } = req.params;
    const groupMember = await GroupMember.create({ groupId, userId });
    res.send({ groupMember });
}

export default addmember;