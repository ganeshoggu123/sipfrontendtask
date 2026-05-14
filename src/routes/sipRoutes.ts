import express from "express";

const router = express.Router();

import {
    createSIP,
    getSIP,
    processSIP,
    getTransactions
} from "../controller/sipController";



router.post("/", createSIP);

router.get("/:sipId", getSIP);

router.post("/:sipId/process", processSIP);

router.get("/:sipId/transactions", getTransactions);



export default router;