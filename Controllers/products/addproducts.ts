import express, { Response, Request } from 'express'
import { productSchema } from '../../Model/Product'
import jwt from 'jsonwebtoken'

export const addProducts = async (req: Request, res: Response) => {
    // const  {porduct_name , description , images , basePrice, title , userId } = req.body 
   
    const token = ""+req.headers.authorization
    let decode : any
    try {

        decode = jwt.verify(token , 'secretKey1')

        const newproduct = await productSchema.create({
            porduct_name: req.body.porduct_name,
            description: req.body.description,
            images: req.body.images,
            basePrice: req.body.basePrice,
            title: req.body.title,
            userId: decode?.id
        })
        console.log("Product is Added Successfully")
        res.status(200).json({ message: "Product Added Successfully" })
        // res.redirect('/home')
    }
    catch (error) {
        throw error

    }
}