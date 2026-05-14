import express from "express";

const router = express.Router();

import { getProfile } from "../controller/profileController";



router.get("/:investorId", getProfile);



export default router;