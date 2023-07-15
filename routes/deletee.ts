import { Response , Request } from "express";
import { Message } from "../models/Messages";


const deletee= async (req: Request, res: Response) => {
    const { groupId } = req.params;
  
    try {
      await Message.destroy({ where: { groupId } });
  
      res.send({ message: 'Messages deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

export default deletee