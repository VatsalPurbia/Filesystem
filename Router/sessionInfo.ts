import { sessionInfo } from "../controllers/sessioninfo";
import express from "express"
import mongoose from "mongoose";

const router = express.Router()


router.get('/sessionInfo' , sessionInfo)

export default router