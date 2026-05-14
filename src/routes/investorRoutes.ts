import express from "express";

const router = express.Router();

import {
    login,
    createInvestor,
    getInvestor,
    getHoldings,
    getNetWorth,
    getTransactions
} from "../controller/investorController";



router.post("/login", login);

router.post("/", createInvestor);

router.get("/:investorId", getInvestor);

router.get("/:investorId/holdings", getHoldings);

router.get("/:investorId/networth", getNetWorth);

router.get("/:investorId/transactions", getTransactions);



export default router;