import express,  { Response , Request } from "express";
import joi from 'joi'

export const Uservalidator = (req : Request , res : Response , next : () => void) =>{
    const validateUser = joi.object({
        username : joi.string().min(3).max(30),
        email : joi.string().email().required(),
        password : joi.string().min(8).max(20)

})
let result = validateUser.validate(req.body)
if(result.error)
{
    res.status(400).json({error : "Invalid userr"})
}
else{
    next()
}
}

export default Uservalidator