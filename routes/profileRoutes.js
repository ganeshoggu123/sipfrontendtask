const express = require("express");
const router = express.Router();

const { getProfile } = require("../controller/profileController");


router.get("/:investorId", getProfile)



module.exports = router;