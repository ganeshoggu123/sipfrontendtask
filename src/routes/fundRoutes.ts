import express from "express";

const router = express.Router();

import {
    createFund,
    getFunds,
    updateNAV
} from "../controller/fundController";



router.post("/", createFund);

router.get("/", getFunds);

router.put("/:fundId/nav", updateNAV);



export default router;