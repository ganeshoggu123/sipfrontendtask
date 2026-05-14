const express = require("express");

const router = express.Router();

const {
    login,
    createInvestor,
    getInvestor,
    getHoldings,
    getNetWorth,
    getTransactions
} = require("../controller/investorController");

router.post("/login", login);

router.post("/", createInvestor);

router.get("/:investorId", getInvestor);

router.get("/:investorId/holdings", getHoldings);

router.get("/:investorId/networth", getNetWorth);
router.get("/:investorId/transactions", getTransactions);


module.exports = router;