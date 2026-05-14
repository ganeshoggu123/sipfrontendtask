        const {
    addInvestor,
    fetchInvestor,
    fetchHoldings,
    fetchNetWorth,
    fetchTransactions,
    loginUser
} = require("../models/investorModel");

const { signJwt } = require("../utility/authManager");

const createInvestor = async (req, res) => {

    try {

        await addInvestor(req.body);

        res.status(201).json({
            message: "Investor created successfully"
        });

    } catch (err) {

        console.log(err);

        if (err.code === "23505") {
            return res.status(400).json({
                message: "Investor already exists"
            });
        }

        res.status(500).json({
            message: "Error creating investor"
        });
    }
};

const getInvestor = async (req, res) => {

    try {

        const investorId = req.params.investorId;

        const result = await fetchInvestor(investorId);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Investor not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching investor"
        });
    }
};

const getHoldings = async (req, res) => {

    try {

        const investorId = req.params.investorId;

        const result = await fetchHoldings(investorId);

        res.status(200).json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching holdings"
        });
    }
};




// GET NET WORTH

const getNetWorth = async (req, res) => {

    try {

        const investorId = req.params.investorId;

        const result = await fetchNetWorth(investorId);

        res.status(200).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching net worth"
        });
    }
};

const getTransactions = async (req, res) => {

    try {

        const investorId = req.params.investorId;

        const result = await fetchTransactions(investorId);

        res.status(200).json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching transactions"
        });
    }
};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await loginUser(email);

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = signJwt({
            email: user.email
        });

        return res.status(200).json({
            message: "Login Success",
            token,
            investorId: user.investor_id,
            userId: user.user_id,
            email: user.email
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Login Error"
        });
    }
};
module.exports = {
    createInvestor,
    getInvestor,
    getHoldings,
    getNetWorth,
    getTransactions,
    login
};